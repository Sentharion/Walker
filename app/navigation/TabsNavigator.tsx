import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Tabbar from '../components/BottomNavigation';

import HomeScreen from '../screens/HomeScreen';
import GoalsScreen from '../screens/GoalsScreen';
import StatsScreen from '../screens/StatsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();
export default function TabsNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
            tabBar={(props) => <Tabbar {...props} />}
        >
            <Tab.Screen name="index" component={HomeScreen} />
            <Tab.Screen name="goals" component={GoalsScreen} />
            <Tab.Screen name="stats" component={StatsScreen} />
            <Tab.Screen name="profile" component={ProfileScreen} />
            <Tab.Screen name="settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}