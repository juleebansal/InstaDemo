import React from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NavigationConstants } from '../../utils/constants/NavigationConstants';
import { appStyles } from '../../styles/AppStyles';
import { setSelectedVideo } from '../../slice/videoSlice';
import { useDispatch } from 'react-redux';

const ReelListItem = (props: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  if (!props.data) {
    return null;
  }
  const handlePress = () => {
    if (props.data) {
      dispatch(setSelectedVideo(props.data.uri));
      navigation.navigate(NavigationConstants.VIDEO_PREVIEW_SCREEN);
    }
  };

  return (
    <View style={appStyles.homeReelCard}>
      <View style={appStyles.homeReelThumbnailContainer}>
        <ImageBackground
          source={{
            uri:
              props.data.uri ||
              `https://placehold.co/300x300/372758/white?text=Reel+${
                props.index + 1
              }`,
          }}
          style={appStyles.homeReelThumbnail}
          resizeMode="cover"
        >
          <TouchableOpacity onPress={handlePress}>
            <Image
              source={require('../../assets/images/play_button.png')}
              style={{ width: 50 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </ImageBackground>
        {props.data.status !== 'uploaded' && (
          <View style={appStyles.homeReelOverlay}>
            <Text style={appStyles.homeReelOverlayText}>
              {props.data.status}...
            </Text>
          </View>
        )}
      </View>
      <View style={appStyles.homeReelDetails}>
        <Text style={appStyles.homeReelCaption} numberOfLines={2}>
          {props.data.caption || 'No caption'}
        </Text>
        {props.data.taggedPeople.length > 0 && (
          <Text style={appStyles.homeReelMetaText}>
            Tagged: {props.data.taggedPeople.join(', ')}
          </Text>
        )}
        {props.data.location && (
          <Text style={appStyles.homeReelMetaText}>
            Location: {props.data.location}
          </Text>
        )}
        <Text style={appStyles.homeReelStatusText}>{props.data.status}</Text>
      </View>
    </View>
  );
};

export default ReelListItem;
