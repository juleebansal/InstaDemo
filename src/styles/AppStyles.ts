import { StyleSheet } from 'react-native';



export const appStyles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#1a0d33', // Dark purple gradient start
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
  },
 
  
  screenContent: {
    flex: 1,
  },

  // Top Navigation (generic, used by other screens)
  topNavContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1c1c1c',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    padding: 8,
    borderRadius: 24,
  },
  backButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  topNavTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    flexGrow: 1,
    textAlign: 'center',
  },
  nextButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    backgroundColor: '#81b0ff',
  },
  nextButtonText: {
    color: 'white',
    fontWeight: '600',
  },


  // Video Preview Screen
  videoPreviewContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlayerPlaceholder: {
    width: '100%',
    height: '100%',
  },
  
  closeButton: {
    position: 'absolute',
    top: 40, // Adjust for status bar
    right: 20,
    zIndex: 1,
    padding: 8,
  },
  



  // Share Screen
  shareScreenContainer: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  shareHeader: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#1c1c1c',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    alignItems: 'center',
  },
  shareVideoThumbnailContainer: {
    width: 96,
    height: 96,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 16,
    backgroundColor: 'black',
  },
  shareVideoThumbnail: {
    width: '100%',
    height: '100%',
  },
  captionInput: {
    flex: 1,
    backgroundColor: '#333',
    color: 'white',
    borderRadius: 8,
    padding: 12,
    minHeight: 96,
    textAlignVertical: 'top',
  },
  shareOptionsList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  shareOptionInfo: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  shareOptionInfoTitle: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  shareOptionInfoText: {
    color: '#aaa',
    fontSize: 13,
  },
  shareOptionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  shareOptionIconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareOptionLabel: {
    color: 'white',
    fontSize: 16,
    marginLeft: 12,
  },
  shareOptionValue: {
    color: '#aaa',
    fontSize: 14,
    marginLeft: 8,
  },
  iconPlaceholder: {
    fontSize: 20,
    marginRight: 8,
    color: 'white', // Ensure placeholder icons are white
  },
  iconStyle: {
    width: 20,
    height: 20,
    
  },
  arrowIcon: {
    color: '#aaa',
    fontSize: 16,
  },
  shareBottomButtons: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#1c1c1c',
    borderTopWidth: 1,
    borderTopColor: '#333',
    justifyContent: 'space-between',
  },
  draftButton: {
    flex: 1,
    backgroundColor: '#333',
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 8,
    alignItems: 'center',
  },
  draftButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    borderRadius: 25,
    marginLeft: 8,
    alignItems: 'center',
  },
  shareButtonText: {
    color: 'white',
    fontWeight: '600',
  },

  // Tag People Screen
  tagScreenContainer: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  tagSearchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tagSearchInput: {
    backgroundColor: '#333',
    color: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  tagUserList: {
    flex: 1,
  },
  tagUserItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  tagUserAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tagUserAvatarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tagUserName: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
  tagSelectedIcon: {
    fontSize: 20,
    color: '#81b0ff',
  },
  tagDoneButton: {
    paddingVertical: 16,
    backgroundColor: '#81b0ff',
    alignItems: 'center',
    borderRadius: 0,
  },
  tagDoneButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },

  // Add Location Screen
  locationScreenContainer: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  locationSearchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  locationSearchInput: {
    backgroundColor: '#333',
    color: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  locationList: {
    flex: 1,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  locationName: {
    color: 'white',
    fontSize: 16,
    flex: 1,
    marginLeft: 12,
  },

  // Home Screen
  homeScreenContainer: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#1c1c1c',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  
  homeHeaderTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    flexGrow: 1, // Allow title to take available space
    textAlign: 'center',
    marginLeft: -20, // Adjust to center "Instagram" better if icons take space
  },
 
  uploadStatusCard: {
    width: '100%', // Full width
    height: 150, // Fixed height
    marginHorizontal: 0, // Remove horizontal margin for full width
    marginVertical: 16, // Keep vertical margin
    padding: 16,
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  uploadStatusThumbnailContainer: {
    width: 120, // Adjust thumbnail size within the card
    height: 120, // Adjust thumbnail size within the card
    borderRadius: 6,
    overflow: 'hidden',
    marginRight: 16,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadStatusThumbnail: {
    width: '100%',
    height: '100%',
  },
  uploadStatusDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  uploadStatusTitle: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
    textTransform: 'capitalize',
  },
  uploadStatusSuccess: {
    color: '#4CAF50',
    fontSize: 14,
    marginTop: 4,
  },
  uploadStatusProcessing: {
    color: '#FFD700',
    fontSize: 14,
    marginTop: 4,
  },
  homeReelsSection: {
    flex: 1,
    // padding: 16, // Padding handled by individual items/contentContainerStyle
  },
  homeReelsSectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 16, // Apply horizontal padding here
  },
  noReelsText: {
    color: '#aaa',
    textAlign: 'center',
    paddingVertical: 40,
    fontSize: 16,
  },
  homeReelsGrid: {
    justifyContent: 'space-between',
  },
  homeReelCard: {
    width: '100%', // Half width minus padding/margin (16px left/right + 8px gap)
    marginBottom: 16,
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  homeReelThumbnailContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: 'black',
    
    
  },
  homeReelThumbnail: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeReelOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeReelOverlayText: {
    color: 'white',
    fontSize: 14,
    textTransform: 'capitalize',
  },
  homeReelDetails: {
    padding: 12,
  },
  homeReelCaption: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  homeReelMetaText: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 2,
  },
  homeReelStatusText: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 8,
  },
  // New styles for Instagram Home Screen layout
  storiesContainer: {
    height: 100, // Fixed height for stories row
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    backgroundColor: '#0a0a0a',
  },
  storiesList: {
    paddingHorizontal: 12,
    alignItems: 'center', // Vertically center items in the scroll view
  },
  storyItem: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 70, // Fixed width for each story item
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ff69b4', // Pink border for stories
    marginBottom: 4,
  },
  storyUsername: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 0, // No vertical margin, already separated by storiesContainer bottom border
  },
  homeFeedList: {
    paddingVertical: 8,
  },
  feedPlaceholder: {
    padding: 20,
    alignItems: 'center',
  },
  feedPlaceholderText: {
    color: '#aaa',
    fontSize: 16,
  },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#1c1c1c',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  bottomNavIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, // Distribute space evenly
  },
  bottomNavText: {
    color: 'white',
    fontSize: 10,
    marginTop: 4,
  },
  bottomNavIconColor: {
    color: 'white', // Explicitly set icon color to white
  },
  bottomNavProfileIcon: {
    width: 20,
    height: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'white',
  },
  uploadOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 8,
  },
  progressBarBackground: {
    width: '100%',
    height: 8,
    backgroundColor: '#555',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#81b0ff',
  },
  uploadStatusText: {
    color: 'white',
    marginTop: 4,
    textAlign: 'center',
  },
});
