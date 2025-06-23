import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { appStyles } from '../../styles/AppStyles';
import { NavigationConstants } from '../../utils/constants/NavigationConstants';
import { startUpload } from '../../slice/videoThunks';
import { AppDispatch } from '../../store/store';

type ShareScreenNavigationProp = StackNavigationProp<any, 'ShareScreen'>;

const ShareScreen = () => {
  const navigation = useNavigation<ShareScreenNavigationProp>();
  const isFocused = useIsFocused();
  const dispatch = useDispatch<AppDispatch>();
  const selectedVideoUri = useSelector(
    (state: any) => state.video.selectedVideoUri,
  );
  // Get latest taggedPeople from Redux
  const taggedPeople = useSelector((state: any) => state.video.taggedPeople);
  // Get latest selectedLocation from Redux
  const selectedLocation = useSelector(
    (state: any) => state.video.selectedLocation,
  );

  const [caption, setCaption] = useState('');
  const [postToFeed, setPostToFeed] = useState(true);

  const handleShare = () => {
    if (!selectedVideoUri) {
      Alert.alert('Error', 'No video selected to share.');
      return;
    }

    const reel = {
      id: `${selectedVideoUri}-${Date.now()}`,
      uri: selectedVideoUri,
      caption,
      taggedPeople,
      location: selectedLocation,
      timestamp: Date.now(),
    };

    dispatch(startUpload(reel)); // ✅ no TS error now

    navigation.reset({
      index: 0,
      routes: [{ name: NavigationConstants.HOME }],
    });
  };

  return (
    <View style={appStyles.shareScreenContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={appStyles.topNavContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={appStyles.backButton}
            >
              <Text style={appStyles.backButtonText}>&larr;</Text>
            </TouchableOpacity>
            <Text style={appStyles.topNavTitle}>New Reel</Text>
            <View style={{ width: 48 }} />
          </View>

          <View style={appStyles.shareHeader}>
            <View style={appStyles.shareVideoThumbnailContainer}>
              <Image
                source={{
                  uri:
                    selectedVideoUri ||
                    `https://placehold.co/100x100/372758/white?text=Video`,
                }}
                style={appStyles.shareVideoThumbnail}
                resizeMode="cover"
              />
            </View>
            <TextInput
              placeholder="Write a caption..."
              placeholderTextColor="#9ca3af"
              style={appStyles.captionInput}
              multiline
              value={caption}
              onChangeText={setCaption}
            />
          </View>

          <View style={appStyles.shareOptionsList}>
            <View style={appStyles.shareOptionInfo}>
              <Text style={appStyles.shareOptionInfoTitle}>Share to Reels</Text>
              <Text style={appStyles.shareOptionInfoText}>
                Your video may appear in Reels and can be seen on the Reels tab
                of your profile.
              </Text>
            </View>

            <View style={appStyles.shareOptionItem}>
              <Text style={appStyles.shareOptionLabel}>Also share to Feed</Text>
              <Switch
                value={postToFeed}
                onValueChange={setPostToFeed}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={Platform.OS === 'android' ? '#f4f3f4' : '#f5dd4b'}
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                console.log('Navigating to Tag People Screen');
                navigation.navigate(NavigationConstants.TAG_PEOPLE_SCREEN);
              }}
              style={appStyles.shareOptionItem}
            >
              <View style={appStyles.shareOptionIconText}>
                <Text style={appStyles.iconPlaceholder}>👤</Text>
                <Text style={appStyles.shareOptionLabel}>Tag people</Text>
                {taggedPeople.length > 0 && (
                  <Text style={appStyles.shareOptionValue}>
                    {taggedPeople.length} selected
                  </Text>
                )}
              </View>
              <Text style={appStyles.arrowIcon}>&gt;</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                console.log('Navigating to Add Location Screen');
                navigation.navigate(NavigationConstants.ADD_LOCATION_SCREEN);
              }}
              style={appStyles.shareOptionItem}
            >
              <View style={appStyles.shareOptionIconText}>
                <Text style={appStyles.iconPlaceholder}>📍</Text>
                <Text style={appStyles.shareOptionLabel}>Add location</Text>
                {selectedLocation && (
                  <Text style={appStyles.shareOptionValue}>
                    {selectedLocation}
                  </Text>
                )}
              </View>
              <Text style={appStyles.arrowIcon}>&gt;</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={appStyles.shareBottomButtons}>
          <TouchableOpacity style={appStyles.draftButton}>
            <Text style={appStyles.draftButtonText}>Save draft</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare} style={appStyles.shareButton}>
            <Text style={appStyles.shareButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ShareScreen;
