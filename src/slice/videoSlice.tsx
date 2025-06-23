import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of a single uploaded reel
export interface UploadedReel {
  id: string; // Unique ID for each reel
  uri: string;
  caption: string;
  status: 'idle' | 'uploading' | 'processing' | 'uploaded' | 'error';
  taggedPeople: string[];
  location: string | null;
  timestamp: number; // For sorting/display order
}

// Define the shape of our Redux state
export interface VideoState {
  selectedVideoUri: string | null;
  uploadProgress: number;
  uploadStatus: 'idle' | 'uploading' | 'processing' | 'uploaded' | 'error';
  taggedPeople: string[];
  selectedLocation: string | null;
  currentScreen:
    | 'gallery'
    | 'preview'
    | 'share'
    | 'tagPeople'
    | 'addLocation'
    | 'home';
  uploadedReels: UploadedReel[];
  isAppReady: boolean; // To indicate if initial loading/persistence is done
}

// Initial state for Redux
export const initialState: VideoState = {
  selectedVideoUri: null,
  uploadProgress: 0,
  uploadStatus: 'idle',
  taggedPeople: [],
  selectedLocation: null,
  currentScreen: 'preview',
  uploadedReels: [],
  isAppReady: false,
};

// Create a Redux slice
const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setSelectedVideo: (state, action: PayloadAction<string | null>) => {
      state.selectedVideoUri = action.payload;
    },
    setUploadProgress: (state, action: PayloadAction<number>) => {
      state.uploadProgress = action.payload;
    },
    setUploadStatus: (
      state,
      action: PayloadAction<VideoState['uploadStatus']>,
    ) => {
      state.uploadStatus = action.payload;
    },
    setTaggedPeople: (state, action: PayloadAction<string[]>) => {
      state.taggedPeople = action.payload;
    },
    setSelectedLocation: (state, action: PayloadAction<string | null>) => {
      state.selectedLocation = action.payload;
    },
    setCurrentScreen: (
      state,
      action: PayloadAction<VideoState['currentScreen']>,
    ) => {
      state.currentScreen = action.payload;
    },
    addUploadedReel: (state, action: PayloadAction<UploadedReel>) => {
      state.uploadedReels.push(action.payload);
      state.uploadedReels.sort((a, b) => b.timestamp - a.timestamp); // Sort by latest first
    },
    updateUploadedReelStatus: (
      state,
      action: PayloadAction<{ uri: string; newStatus: UploadedReel['status'] }>,
    ) => {
      const { uri, newStatus } = action.payload;
      const index = state.uploadedReels.findIndex(reel => reel.uri === uri);
      if (index !== -1) {
        state.uploadedReels[index].status = newStatus;
      }
    },
    resetUploadState: state => {
      state.selectedVideoUri = null;
      state.uploadProgress = 0;
      state.uploadStatus = 'idle';
      state.taggedPeople = [];
      state.selectedLocation = null;
    },
    setAppReady: (state, action: PayloadAction<boolean>) => {
      state.isAppReady = action.payload;
    },
    rehydrateState: (state, action: PayloadAction<VideoState>) => {
      Object.assign(state, action.payload);
      state.uploadedReels.sort((a, b) => b.timestamp - a.timestamp);
    },
  },
});

export const {
  setSelectedVideo,
  setUploadProgress,
  setUploadStatus,
  setTaggedPeople,
  setSelectedLocation,
  setAppReady,
  setCurrentScreen,
  addUploadedReel,
  updateUploadedReelStatus,
  resetUploadState,
  rehydrateState,
} = videoSlice.actions;

export default videoSlice.reducer;
