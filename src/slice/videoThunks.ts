import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addUploadedReel,
  setUploadProgress,
  setUploadStatus,
  resetUploadState,
  updateUploadedReelStatus,
} from './videoSlice';

interface UploadPayload {
  id: string;
  uri: string;
  caption: string;
  taggedPeople: string[];
  location: string | null;
  timestamp: number;
}

export const startUpload = createAsyncThunk<void, UploadPayload>(
  'video/startUpload',
  async (reelData, { dispatch }) => {
    // Add reel with 'uploading' status
    dispatch(addUploadedReel({ ...reelData, status: 'uploading' }));
    dispatch(setUploadStatus('uploading'));

    let progress = 0;
    while (progress < 100) {
      await new Promise(resolve => setTimeout(resolve, 200));
      progress += 5;
      dispatch(setUploadProgress(progress));
    }

    // Update to 'processing'
    dispatch(setUploadStatus('processing'));
    dispatch(
      updateUploadedReelStatus({
        uri: reelData.uri,
        newStatus: 'processing',
      }),
    );

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Update to 'uploaded'
    dispatch(setUploadStatus('uploaded'));
    dispatch(
      updateUploadedReelStatus({
        uri: reelData.uri,
        newStatus: 'uploaded',
      }),
    );

    dispatch(resetUploadState());
  },
);
