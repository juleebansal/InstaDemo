import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type HomeScreenProps = {
  navigation: NativeStackNavigationProp<any, 'Home'>;
};

export const navigation = useNavigation<any>();
