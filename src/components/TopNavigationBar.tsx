import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentScreen, resetUploadState } from '../slice/videoSlice';
import { appStyles } from '../styles/AppStyles'; // Import shared styles

const TopNavigationBar: React.FC = () => {
  const dispatch = useDispatch();
  const currentScreen = useSelector((state: any) => state.video.currentScreen);
  const selectedVideoUri = useSelector(
    (state: any) => state.video.selectedVideoUri,
  );
  const uploadStatus = useSelector((state: any) => state.video.uploadStatus);

  const handleBack = () => {
    if (currentScreen === 'share') {
      dispatch(setCurrentScreen('preview'));
    } else if (
      currentScreen === 'tagPeople' ||
      currentScreen === 'addLocation'
    ) {
      dispatch(setCurrentScreen('share'));
    } else if (currentScreen === 'home') {
      if (
        uploadStatus === 'idle' ||
        uploadStatus === 'uploaded' ||
        uploadStatus === 'error'
      ) {
        dispatch(setCurrentScreen('preview'));
      }
    } else if (currentScreen === 'preview') {
      dispatch(resetUploadState());
      dispatch(setCurrentScreen('preview'));
    }
  };

  const showBackButton = currentScreen !== 'home';
  const showNextButton = currentScreen === 'preview';

  return (
    <View style={appStyles.topNavContainer}>
      {showBackButton && (
        <TouchableOpacity onPress={handleBack} style={appStyles.backButton}>
          <Text style={appStyles.backButtonText}>&larr;</Text>
        </TouchableOpacity>
      )}
      <Text style={appStyles.topNavTitle}>
        {currentScreen === 'preview' && 'New reel'}
        {currentScreen === 'share' && 'New reel'}
        {currentScreen === 'tagPeople' && 'Tag people'}
        {currentScreen === 'addLocation' && 'Add location'}
        {currentScreen === 'home' && 'Instagram'}
      </Text>
      {showNextButton && (
        <TouchableOpacity
          onPress={() => {
            if (selectedVideoUri && uploadStatus === 'idle') {
              dispatch(setCurrentScreen('share'));
            }
          }}
          style={[
            appStyles.nextButton,
            (!selectedVideoUri || uploadStatus !== 'idle') &&
              appStyles.disabledButton,
          ]}
          disabled={!selectedVideoUri || uploadStatus !== 'idle'}
        >
          <Text style={appStyles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      )}
      {currentScreen === 'share' && <View style={{ width: 48 }} />}
    </View>
  );
};

export default TopNavigationBar;
