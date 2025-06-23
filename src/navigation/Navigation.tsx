import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

// Import navigation constants for clean routing
import { NavigationConstants } from '../utils/constants/NavigationConstants';
import HomeScreen from '../screens/home/HomeScreen';
import GalleryBottomSheet from '../screens/reelUpload/GalleryBottomSheet';
import VideoPreviewScreen from '../screens/reelUpload/VideoPreviewScreen';
import ShareScreen from '../screens/reelUpload/ShareScreen';
import TagPeopleScreen from '../screens/reelUpload/TagPeopleScreen';
import AddLocationScreen from '../screens/reelUpload/AddLocationScreen';

// Create a stack navigator
const Stack = createNativeStackNavigator<any>();

/**
 * Defines the main navigation stack for the application.
 * Configures screens and their initial routes.
 */
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={NavigationConstants.HOME}>
        {/* Home Screen: Main application feed */}
        <Stack.Screen
          name={NavigationConstants.HOME}
          component={HomeScreen}
          options={{ headerShown: false }} // Hide header for full control
        />
        {/* Gallery Screen: For selecting videos */}
        <Stack.Screen
          name={NavigationConstants.GALLERY_BOTTOM_SHEET}
          component={GalleryBottomSheet}
          options={{
            headerShown: false, // Custom header handled by component or no header
            presentation: 'modal', // Make it slide up as a modal on iOS/Android
          }}
        />
        {/* Video Preview Screen: Displays selected video before sharing options */}
        <Stack.Screen
          name={NavigationConstants.VIDEO_PREVIEW_SCREEN}
          component={VideoPreviewScreen}
          options={{ headerShown: false }} // Custom header handled by component
        />
        {/* Share Screen: For adding caption, tags, location, and finalizing upload */}
        <Stack.Screen
          name={NavigationConstants.SHARE_SCREEN}
          component={ShareScreen}
          options={{ headerShown: false }} // Custom header handled by component
        />
        {/* Tag People Screen: For tagging users in the reel */}
        <Stack.Screen
          name={NavigationConstants.TAG_PEOPLE_SCREEN}
          component={TagPeopleScreen}
          options={{ headerShown: false }} // Custom header handled by component
        />
        {/* Add Location Screen: For adding a location to the reel */}
        <Stack.Screen
          name={NavigationConstants.ADD_LOCATION_SCREEN}
          component={AddLocationScreen}
          options={{ headerShown: false }} // Custom header handled by component
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
