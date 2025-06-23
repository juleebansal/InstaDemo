import { request, PERMISSIONS, RESULTS, PermissionStatus } from 'react-native-permissions'; // Import PermissionStatus
import { Platform, Alert, Linking } from 'react-native';

/**
 * Requests media library permissions (photos and videos).
 * Handles specific permissions for different Android API levels.
 */
export const requestMediaPermissions = async (): Promise<boolean> => {
    // Use PermissionStatus as the type here
    let photoPermissionStatus: PermissionStatus;
    let videoPermissionStatus: PermissionStatus = RESULTS.GRANTED; // Assume granted if not applicable or explicitly requested

    if (Platform.OS === 'ios') {
        // On iOS, PHOTO_LIBRARY usually grants access to both photos and videos.
        // PHOTO_LIBRARY_ADD_ONLY is for writing, PHOTO_LIBRARY is for reading.
        photoPermissionStatus = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    } else if (Platform.OS === 'android') {
        if (Number(Platform.Version) >= 33) {
            // Android 13 (API 33) and above: Granular media permissions
            photoPermissionStatus = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
            videoPermissionStatus = await request(PERMISSIONS.ANDROID.READ_MEDIA_VIDEO);
        } else {
            // Android 12 (API 32) and below: READ_EXTERNAL_STORAGE covers all media.
            photoPermissionStatus = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
        }
    } else {
        console.warn('Unsupported platform for media library permissions');
        return false;
    }

    const allPermissionsGranted = (
        photoPermissionStatus === RESULTS.GRANTED &&
        videoPermissionStatus === RESULTS.GRANTED
    );

    if (allPermissionsGranted) {
        console.log('Media library permissions granted.');
        return true;
    } else {
        Alert.alert(
            'Permission Required',
            'Please enable photo and video access in your device settings to select media.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Open Settings', onPress: () => Linking.openSettings() },
            ],
            { cancelable: false }
        );
        return false;
    }
};

/**
 * Requests camera access permission.
 */
export const requestCameraPermission = async (): Promise<boolean> => {
    // Use PermissionStatus as the type here
    let result: PermissionStatus;
    if (Platform.OS === 'ios') {
        result = await request(PERMISSIONS.IOS.CAMERA);
    } else if (Platform.OS === 'android') {
        result = await request(PERMISSIONS.ANDROID.CAMERA);
    } else {
        console.warn('Unsupported platform for camera permission');
        return false;
    }

    if (result === RESULTS.GRANTED) {
        console.log('Camera permission granted.');
        return true;
    } else {
        Alert.alert(
            'Camera Permission Required',
            'Please enable camera access in your device settings to take photos and videos.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Open Settings', onPress: () => Linking.openSettings() },
            ],
            { cancelable: false }
        );
        return false;
    }
};