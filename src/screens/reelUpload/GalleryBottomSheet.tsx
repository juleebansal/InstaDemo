import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Alert,
  StyleSheet,
} from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { setSelectedVideo } from '../../slice/videoSlice';
import { NavigationConstants } from '../../utils/constants/NavigationConstants';

type GalleryBottomSheetNavigationProp = StackNavigationProp<
  any,
  'GalleryBottomSheet'
>;

type VideoItem = {
  uri: string;
};

const GalleryBottomSheet = () => {
  const navigation = useNavigation<GalleryBottomSheetNavigationProp>();
  const dispatch = useDispatch();
  const [galleryVideos, setGalleryVideos] = useState<VideoItem[]>([]);
  const [selectedUri, setSelectedUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const requestPermissionAndFetch = async () => {
      try {
        let hasPermission = false;

        if (Platform.OS === 'android') {
          if (Platform.Version >= 33) {
            const result = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
              {
                title: 'Access media',
                message: 'We need permission to access your videos',
                buttonPositive: 'OK',
              },
            );
            hasPermission = result === PermissionsAndroid.RESULTS.GRANTED;
          } else {
            const result = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
              {
                title: 'Access media',
                message: 'We need permission to access your gallery',
                buttonPositive: 'OK',
              },
            );
            hasPermission = result === PermissionsAndroid.RESULTS.GRANTED;
          }

          if (!hasPermission) {
            Alert.alert(
              'Permission denied',
              'Cannot access gallery without permission.',
            );
            setIsLoading(false);
            return;
          }
        }

        const photos = await CameraRoll.getPhotos({
          first: 50,
          assetType: 'Videos',
        });

        const videos = photos.edges.map(edge => ({
          uri: edge.node.image.uri,
        }));

        setGalleryVideos(videos);
      } catch (e) {
        console.error(e);
        Alert.alert('Error', 'Failed to load videos from gallery.');
      } finally {
        setIsLoading(false);
      }
    };

    requestPermissionAndFetch();
  }, []);

  const toggleSelect = (uri: string) => {
    setSelectedUri(prev => (prev === uri ? null : uri));
  };

  const handleNext = () => {
    if (selectedUri) {
      dispatch(setSelectedVideo(selectedUri));
      navigation.navigate(NavigationConstants.SHARE_SCREEN);
    } else {
      Alert.alert('No video selected', 'Please select a video to proceed.');
    }
  };

  const renderItem = ({ item }: { item: VideoItem }) => {
    const isSelected = selectedUri === item.uri;

    return (
      <TouchableOpacity
        style={styles.thumbnailContainer}
        onPress={() => toggleSelect(item.uri)}
      >
        <Image
          source={{ uri: item.uri }}
          style={styles.thumbnail}
          resizeMode="cover"
          onError={() => {
            console.warn(`Failed to load image for ${item.uri}`);
          }}
        />
        {isSelected && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>1</Text>
          </View>
        )}
        <View style={styles.durationOverlay}>
          <Text style={styles.durationText}>
            0:{Math.floor(Math.random() * 50) + 10}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>&times;</Text>
        </TouchableOpacity>
        <Text style={styles.title}>New Reel</Text>
        <TouchableOpacity
          onPress={handleNext}
          disabled={!selectedUri}
          style={[styles.nextButton, !selectedUri && styles.nextButtonDisabled]}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loaderText}>Loading videos...</Text>
        </View>
      ) : (
        <FlatList
          data={galleryVideos}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.uri + index}
          numColumns={3}
        />
      )}
    </View>
  );
};

export default GalleryBottomSheet;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  backText: { fontSize: 24, color: '#fff' },
  title: { fontSize: 16, color: '#fff' },
  nextButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  nextButtonDisabled: {
    backgroundColor: '#555',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loaderText: { color: '#fff', marginTop: 10 },
  thumbnailContainer: {
    flex: 1 / 3,
    aspectRatio: 1,
    margin: 1,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
  },
  durationOverlay: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 3,
    paddingHorizontal: 3,
  },
  durationText: {
    color: '#fff',
    fontSize: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 0.5,
    borderTopColor: '#333',
  },
  footerText: { color: '#999' },
  footerActive: { color: '#fff', fontWeight: 'bold' },
});
