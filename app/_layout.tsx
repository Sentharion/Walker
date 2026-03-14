import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { View, Text } from 'react-native';
import { useWalkStore } from '@/store/walkStore';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const name = useWalkStore((state) => state.name);
  const difficulty = useWalkStore((state) => state.difficulty);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="walks"
          options={{
            headerTitle: () => (
              <View className="items-center py-3">
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>Moje spacery</Text>
                <Text style={{ color: "white", fontSize: 14, opacity: 0.8 }}>Zapisane spacery: 1000</Text>
              </View>
            ),
            headerTitleAlign: "center",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#10b981",
            },
          }}
        />
        <Stack.Screen
          name="map"
          options={{
            headerTitle: () => (
              <View className="items-center py-3">
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>Zaplanuj swój spacer</Text>
              </View>
            ),
            headerTitleAlign: "center",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#10b981",
            },
          }}
        />
        <Stack.Screen
          name="mapDetails"
          options={{
            headerTitle: () => (
              <View className="items-center py-3">
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>Szczegóły spaceru</Text>
                <Text style={{ color: "white", fontSize: 14, opacity: 0.8 }}>Ustaw nazwę i trudność spaceru</Text>
              </View>
            ),
            headerTitleAlign: "center",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#10b981",
            },
          }}
        />
        <Stack.Screen
          name="savedWalk"
          options={{
            headerTitle: () => (
              <View className="items-center py-3">
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>{name}</Text>
                <Text style={{ color: "white", fontSize: 14, opacity: 0.8 }}>{difficulty}</Text>
              </View>
            ),
            headerTitleAlign: "center",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#10b981",
            },
          }}
        />
      </Stack>
      <StatusBar style="auto" />

    </ThemeProvider>
  );
}
