import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import VideoPlayer from 'react-native-video-controls';
import { useSelector } from 'react-redux';
import { appStyles } from '../../styles/AppStyles';

const VideoPreviewScreen: React.FC = () => {
  const navigation = useNavigation();

  const selectedVideoUri = useSelector(
    (state: any) => state.video.selectedVideoUri,
  );

  return (
    <View
      style={[
        appStyles.videoPreviewContainer,
        { backgroundColor: 'black', flex: 1 },
      ]}
    >
      <TouchableOpacity
        style={appStyles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require('../../assets/images/close.png')}
          style={{ width: 24, height: 24, tintColor: 'white' }}
        />
      </TouchableOpacity>

      {selectedVideoUri && (
        <VideoPlayer
          source={{ uri: selectedVideoUri }}
          style={appStyles.videoPlayerPlaceholder}
          tapAnywhereToPause={true}
          disableFullscreen={true}
          disableBack={true}
          showOnStart={false} // don't show controls on start
          controlTimeout={2000} // auto-hide controls quickly
          showControlsOnLoad={false} // hide controls on load
          navigator={null} // remove built-in nav handling
        />
      )}
    </View>
  );
};

export default VideoPreviewScreen;
