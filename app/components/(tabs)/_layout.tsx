import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#10b981',         // kolor aktywnej ikony
        tabBarInactiveTintColor: '#d1fae5',       // kolor nieaktywnej ikony
        tabBarStyle: {
          backgroundColor: '#065f46',             // kolor tła paska
          height: 70,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,                        // jeśli nie chcesz nagłówka w tabach
      }}
    >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="stats" />
        <Tabs.Screen name="goals" />
        <Tabs.Screen name="profile" />
        <Tabs.Screen name="settings" />
    </Tabs>
  );
}