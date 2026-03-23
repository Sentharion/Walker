import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import { View, Text } from 'react-native';
import { useSavedWalkStore } from '@/store/savedStore';
import { cssInterop } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';
import MapView from 'react-native-maps';

cssInterop(LinearGradient, {
  className: 'style',
});

cssInterop(MapView, {
  className: 'style',
});

export default function RootLayout() {
  const name = useSavedWalkStore((state: any) => state.selectedWalk?.name);
  const difficulty = useSavedWalkStore((state: any) => state.selectedWalk?.difficulty);

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="screens/LoginScreen"
          options={{
            headerTitle: () => (
              <View className="items-center py-3">
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>Zaloguj się</Text>
              </View>
            ),
            headerTitleAlign: "center",
            headerTintColor: "white",
            headerShown: false,
            headerStyle: {
              backgroundColor: "#10b981",
            },
          }}
        />
        <Stack.Screen
          name="walks"
          options={{
            headerTitle: () => (
              <View className="items-center py-3">
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>Moje spacery</Text>
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
              <View className="flex-col items-start justify-start py-3 gap-1">
                <Text className="text-white font-bold text-4xl">{name}</Text>
                <View className="flex-row items-center justify-start gap-2 py-1">
                  <Text className={`text-md text-white font-semibold ${difficulty === "Łatwy" ? "bg-green-500" : difficulty === "Średni" ? "bg-yellow-500" : "bg-red-500"} rounded-full px-2 py-1`}>{difficulty}</Text>
                </View>
              </View>
            ),
            headerTitleAlign: "left",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#10b981",
            },
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="months"
          options={{
            headerTitle: () => (
              <View className="items-center py-5">
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>Miesięczna aktywność</Text>
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
          name="goal"
          options={{
            headerTitle: () => (
              <View className="items-center py-5">
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>Utwórz nowy cel</Text>
                <Text style={{ color: "white", fontSize: 14, opacity: 0.8 }}>Wyznacz. Skup się. Osiągnij.</Text>
              </View>
            ),
            headerTitleAlign: "center",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#f59e0b",
            },
          }}
        />
        <Stack.Screen
          name="faq"
          options={{
            headerTitle: () => (
              <View className="items-center py-5">
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>FAQ</Text>
                <Text style={{ color: "white", fontSize: 14, opacity: 0.8, paddingTop: 5 }}>Najczęściej zadawane pytania</Text>
              </View>
            ),
            headerTitleAlign: "center",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#14b8a6",
            },
          }}
        />
        <Stack.Screen
          name="livewalk"
          options={{
            headerTitle: () => (
              <View className="items-center py-5">
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>Aktywny spacer</Text>
                <Text style={{ color: "white", fontSize: 14, opacity: 0.8, paddingTop: 5 }}>Śledź swój spacer w czasie rzeczywistym</Text>
              </View>
            ),
            headerTitleAlign: "center",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#14b8a6",
            },
          }}
        />
      </Stack>
      <StatusBar style="auto" />

    </>
  );
}
