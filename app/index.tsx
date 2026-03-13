import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <HomeScreen />
    </SafeAreaView>
  );
}
