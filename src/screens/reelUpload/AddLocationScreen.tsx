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
import { setSelectedLocation } from '../../slice/videoSlice';
import { appStyles } from '../../styles/AppStyles';

type AddLocationScreenNavigationProp = StackNavigationProp<
  any,
  'AddLocationScreen'
>;

const AddLocationScreen = () => {
  const navigation = useNavigation<AddLocationScreenNavigationProp>();

  const dispatch = useDispatch();
  const selectedLocation = useSelector(
    (state: any) => state.video.selectedLocation,
  );
  const [searchTerm, setSearchTerm] = useState('');

  // Mock location data
  const mockLocations = [
    'New York, NY',
    'Los Angeles, CA',
    'Chicago, IL',
    'Houston, TX',
    'Phoenix, AZ',
    'London, UK',
    'Paris, France',
    'Tokyo, Japan',
    'Sydney, Australia',
    'Berlin, Germany',
    'Mumbai, India',
    'Dubai, UAE',
    'Rio de Janeiro, Brazil',
    'Toronto, Canada',
    'Raipur, Chhattisgarh, India',
  ];

  // Filter locations based on search term
  const filteredLocations = mockLocations.filter(location =>
    location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelectLocation = (location: string) => {
    dispatch(setSelectedLocation(location));
    console.log('Location selected in Redux:', location);
    navigation.goBack(); // Go back to ShareScreen
  };

  /**
   * Renders a single location item in the FlatList.
   */
  const renderLocationItem = ({ item: location }: { item: string }) => (
    <TouchableOpacity
      style={appStyles.locationItem}
      onPress={() => handleSelectLocation(location)}
    >
      <Text style={appStyles.iconPlaceholder}>📍</Text>
      <Text style={appStyles.locationName}>{location}</Text>
      {selectedLocation === location && (
        <Text style={appStyles.tagSelectedIcon}>✅</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={appStyles.locationScreenContainer}>
      {/* Top Navigation for Add Location Screen */}
      <View style={appStyles.topNavContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={appStyles.backButton}
        >
          <Text style={appStyles.backButtonText}>&larr;</Text>
        </TouchableOpacity>
        <Text style={appStyles.topNavTitle}>Add location</Text>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={appStyles.nextButton}
        >
          <Text style={appStyles.nextButtonText}>Done</Text>
        </TouchableOpacity>
      </View>

      <View style={appStyles.locationSearchContainer}>
        <TextInput
          placeholder="Search for a location"
          placeholderTextColor="#9ca3af"
          style={appStyles.locationSearchInput}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>
      <FlatList
        data={filteredLocations}
        renderItem={renderLocationItem}
        keyExtractor={item => item}
        style={appStyles.locationList}
        ListEmptyComponent={() => (
          <Text style={appStyles.noReelsText}>
            No locations found or matching search.
          </Text>
        )}
      />
    </View>
  );
};

export default AddLocationScreen;
