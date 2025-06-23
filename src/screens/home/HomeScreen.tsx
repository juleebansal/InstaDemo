import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { StackNavigationProp } from '@react-navigation/stack';
import { appStyles } from '../../styles/AppStyles';
import { NavigationConstants } from '../../utils/constants/NavigationConstants';
import ReelListItem from './ReelListitem';

// Define the shape of a single uploaded reel
interface UploadedReel {
  id: string;
  uri: string;
  caption: string;
  status: 'idle' | 'uploading' | 'processing' | 'uploaded' | 'error';
  taggedPeople: string[];
  location: string | null;
  timestamp: number;
}

// Define the navigation prop type for this screen
type HomeScreenNavigationProp = StackNavigationProp<any, 'HomeScreen'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>(); // Get navigation object
  const isFocused = useIsFocused();
  const uploadedReels = useSelector((state: any) => state.video.uploadedReels);
  const uploadStatus = useSelector((state: any) => state.video.uploadStatus);
  const uploadProgress = useSelector(
    (state: any) => state.video.uploadProgress,
  );
  const selectedVideoUri = useSelector(
    (state: any) => state.video.selectedVideoUri,
  );

  const currentUploadingReel = uploadedReels.find(
    (reel: UploadedReel) =>
      reel.uri === selectedVideoUri &&
      (reel.status === 'uploading' || reel.status === 'processing'),
  );

  // Filter and sort completed reels for display in the grid
  const sortedCompletedReels = [...uploadedReels]
    .filter((reel: UploadedReel) => reel.status === 'uploaded')
    .sort((a, b) => b.timestamp - a.timestamp); // Newest first

  useEffect(() => {
    if (isFocused) {
      console.log(
        'HomeScreen Focused: Uploaded Reels Count:',
        uploadedReels.length,
      );
      console.log('HomeScreen Focused: Current Upload Status:', uploadStatus);
      console.log('HomeScreen Focused: Selected Video URI:', selectedVideoUri);
      console.log(
        'HomeScreen Focused: Current Uploading Reel (derived):',
        currentUploadingReel ? currentUploadingReel.id : 'None',
      );
    }
  }, [
    isFocused,
    uploadedReels,
    uploadStatus,
    selectedVideoUri,
    currentUploadingReel,
  ]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appStyles.homeScreenContainer.backgroundColor,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={appStyles.homeHeader}>
            <Text style={appStyles.homeHeaderTitle}>Instagram</Text>
          </View>

          <View style={appStyles.storiesContainer}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={[
                'Your Story',
                'JamieShar',
                'tiffanyyoung',
                'photosbyean',
                'Lieli',
                'loft/232',
                'kenzoere',
              ]}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <View style={appStyles.storyItem}>
                  <Image
                    source={{
                      uri: 'https://mrwallpaper.com/images/high/cute-doll-profile-picture-nvpnw043qr6i5go6.webp',
                    }}
                    style={appStyles.storyAvatar}
                    onError={() => {
                      console.warn('Failed to load avatar, showing fallback.');
                    }}
                  />
                  <Text style={appStyles.storyUsername} numberOfLines={1}>
                    {item}
                  </Text>
                </View>
              )}
              contentContainerStyle={appStyles.storiesList}
            />
          </View>

          <View style={appStyles.separator} />

          {currentUploadingReel && (
            <View style={appStyles.uploadStatusCard}>
              <View style={appStyles.uploadStatusThumbnailContainer}>
                <Image
                  source={{
                    uri:
                      currentUploadingReel.uri ||
                      `https://knetic.org.uk/placeholder/`,
                  }}
                  style={appStyles.uploadStatusThumbnail}
                  resizeMode="cover"
                />
              </View>
              <View style={appStyles.uploadStatusDetails}>
                <Text style={appStyles.uploadStatusTitle}>
                  {currentUploadingReel.status} Reel
                </Text>
                {currentUploadingReel.status === 'uploading' && (
                  <View style={appStyles.progressBarBackground}>
                    <View
                      style={[
                        appStyles.progressBarFill,
                        { width: `${uploadProgress}%` },
                      ]}
                    />
                  </View>
                )}
                {currentUploadingReel.status === 'uploaded' && (
                  <Text style={appStyles.uploadStatusSuccess}>
                    Your reel is live!
                  </Text>
                )}
                {currentUploadingReel.status === 'processing' && (
                  <Text style={appStyles.uploadStatusProcessing}>
                    Almost there...
                  </Text>
                )}
              </View>
            </View>
          )}

          {/* Section to display uploaded reels / main feed (conceptual) */}
          <View style={appStyles.homeReelsSection}>
            {sortedCompletedReels.length === 0 ? (
              <Text style={appStyles.noReelsText}>
                No reels uploaded yet. Try uploading one!
              </Text>
            ) : (
              <FlatList
                data={sortedCompletedReels}
                renderItem={({ item, index }) => (
                  <ReelListItem data={item} index={index} />
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={appStyles.homeFeedList}
                showsVerticalScrollIndicator={false}
              />
            )}

            <View style={appStyles.feedPlaceholder}>
              <Text style={appStyles.feedPlaceholderText}></Text>
            </View>
          </View>
        </View>

        {/* Bottom Navigation Bar (Conceptual) */}
        <View style={appStyles.bottomNavBar}>
          <TouchableOpacity style={appStyles.bottomNavIcon}>
            <Image
              style={appStyles.iconStyle}
              source={require('../../assets/images/home.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={appStyles.bottomNavIcon}>
            <Image
              style={appStyles.iconStyle}
              source={require('../../assets/images/search.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={appStyles.bottomNavIcon}
            onPress={() =>
              navigation.navigate(NavigationConstants.GALLERY_BOTTOM_SHEET)
            }
          >
            <Image
              style={appStyles.iconStyle}
              source={require('../../assets/images/more.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={appStyles.bottomNavIcon}>
            <Image
              style={appStyles.iconStyle}
              source={require('../../assets/images/film.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={appStyles.bottomNavIcon}>
            <Image
              source={{ uri: `https://placehold.co/28x28/372758/white?text=P` }}
              style={appStyles.bottomNavProfileIcon}
            />
            <Text style={appStyles.bottomNavText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
