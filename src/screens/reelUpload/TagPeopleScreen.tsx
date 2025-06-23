import React, { useState } from 'react'; // Import useEffect for logging
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { setTaggedPeople } from '../../slice/videoSlice';
import { appStyles } from '../../styles/AppStyles';

type TagPeopleScreenNavigationProp = StackNavigationProp<
  any,
  'TagPeopleScreen'
>;

const TagPeopleScreen = () => {
  const navigation = useNavigation<TagPeopleScreenNavigationProp>();
  const dispatch = useDispatch();
  const taggedPeople = useSelector((state: any) => state.video.taggedPeople);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock user data for demonstration
  const mockUsers = [
    'john_doe',
    'jane_smith',
    'alex_wilson',
    'emily_clark',
    'david_miller',
    'sarah_jones',
    'michael_brown',
    'olivia_davis',
    'william_garcia',
    'sophia_rodriguez',
  ];

  // Filter users based on search term
  const filteredUsers = mockUsers.filter(user =>
    user.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleToggleTag = (user: string) => {
    const newTaggedPeople = taggedPeople.includes(user)
      ? taggedPeople.filter((p: string) => p !== user)
      : [...taggedPeople, user];
    dispatch(setTaggedPeople(newTaggedPeople));
    console.log('Tagged people updated in Redux:', newTaggedPeople);
  };

  /**
   * Handles the "Done" button press.
   * Navigates back to the previous screen (ShareScreen).
   */
  const handleDone = () => {
    navigation.goBack(); // Go back to ShareScreen
  };

  /**
   * Renders a single user item in the FlatList.
   */
  const renderUserItem = ({ item: user }: { item: string }) => (
    <TouchableOpacity
      style={appStyles.tagUserItem}
      onPress={() => handleToggleTag(user)}
    >
      <View style={appStyles.tagUserAvatar}>
        <Text style={appStyles.tagUserAvatarText}>
          {user.charAt(0).toUpperCase()}
        </Text>
      </View>
      <Text style={appStyles.tagUserName}>{user}</Text>
      {taggedPeople.includes(user) && (
        <Text style={appStyles.tagSelectedIcon}>✅</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={appStyles.tagScreenContainer}>
      {/* Top Navigation for Tag People Screen */}
      <View style={appStyles.topNavContainer}>
        {/* Back button that also uses handleDone */}
        <TouchableOpacity onPress={handleDone} style={appStyles.backButton}>
          <Text style={appStyles.backButtonText}>&larr;</Text>
        </TouchableOpacity>
        <Text style={appStyles.topNavTitle}>Tag people</Text>
        {/* Done button on the right */}
        <TouchableOpacity onPress={handleDone} style={appStyles.nextButton}>
          <Text style={appStyles.nextButtonText}>Done</Text>
        </TouchableOpacity>
      </View>

      <View style={appStyles.tagSearchContainer}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#9ca3af"
          style={appStyles.tagSearchInput}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>
      <FlatList
        data={filteredUsers}
        renderItem={renderUserItem}
        keyExtractor={item => item}
        style={appStyles.tagUserList}
        ListEmptyComponent={() => (
          <Text style={appStyles.noReelsText}>
            No users found or matching search.
          </Text>
        )}
      />
    </View>
  );
};

export default TagPeopleScreen;
