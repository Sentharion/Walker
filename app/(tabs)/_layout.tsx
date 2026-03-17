import { Tabs } from 'expo-router';
import CustomTabBar from '../components/BottomNav';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,                        // jeśli nie chcesz nagłówka w tabach
      }}
      tabBar={(props: any) => <CustomTabBar {...props} />}
    >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="stats" />
        <Tabs.Screen name="goals" />
        <Tabs.Screen name="profile" />
        <Tabs.Screen name="settings" />
    </Tabs>
  );
}