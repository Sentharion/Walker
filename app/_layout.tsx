import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import { View, Text, ImageBackground, Animated } from 'react-native';
import { cssInterop } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';
import MapView from 'react-native-maps';
import { useSession } from '../hooks/auto-login';
import { useEffect, useState } from 'react';
import { useSavedWalkStore } from '@/store/savedStore';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { useWalkStore } from '@/store/walkStore';
import { getDistance } from 'geolib';

SplashScreen.preventAutoHideAsync();

cssInterop(LinearGradient, {
  className: 'style',
});

cssInterop(MapView, {
  className: 'style',
});


const LOCATION_TASK_NAME = 'background-location-task';



let lastNotifyTime = 0;

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error('Background Location Error:', error);
    return;
  }

  if (data) {
    const { locations } = data as { locations: Location.LocationObject[] };
    if (!locations || locations.length === 0) return;

    await useWalkStore.persist.rehydrate();
    const currentState = useWalkStore.getState();
    
    if (!currentState.isWalking) return;

    const newPoint = {
      latitude: locations[0].coords.latitude,
      longitude: locations[0].coords.longitude,
    };

    let updatedDistance = currentState.distance;
    let updatedSteps = currentState.steps;
    let updatedCalories = currentState.calories;
    const prevPoints = [...currentState.points];
    
    if (prevPoints.length >= 1) {
      const prevPoint = prevPoints[prevPoints.length - 1];
      const segmentDistance = getDistance(prevPoint, newPoint);

      if (segmentDistance >= 1) {
        if (!currentState.templatePoints || currentState.templatePoints.length === 0) {
            updatedDistance += segmentDistance;
        }
        
        const newSteps = Math.round(segmentDistance / 0.75);
        updatedSteps += (newSteps > 0 ? newSteps : 1);
        updatedCalories += segmentDistance * 0.05;
      }
    }

    const now = Date.now();
    const elapsedSec = currentState.startTime
      ? Math.floor((now - currentState.startTime) / 1000)
      : currentState.duration;

    useWalkStore.setState({
      points: [...prevPoints, newPoint],
      distance: updatedDistance,
      steps: updatedSteps,
      calories: updatedCalories,
      duration: elapsedSec
    });

    if (now - lastNotifyTime > 5000) {
      lastNotifyTime = now;
      
      try {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.Balanced,
          distanceInterval: 5,
          timeInterval: 5000,
          showsBackgroundLocationIndicator: true,
          foregroundService: {
            notificationTitle: 'Walker – spacer trwa 🚶',
            notificationBody: `Kroki: ${updatedSteps} | ${Math.floor(updatedCalories)} kcal`,
            notificationColor: '#10b981',
          },
        });
      } catch (err) {
        console.error("Notification update failed:", err);
      }
    }
  }
});



export default function RootLayout() {
  const name = useSavedWalkStore((state: any) => state.selectedWalk?.name);
  const difficulty = useSavedWalkStore((state: any) => state.selectedWalk?.difficulty);
  const loadSavedWalks = useSavedWalkStore((state) => state.loadSavedWalks);
  
  const { session, loading } = useSession();
  const segments = useSegments();
  const router = useRouter();

  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [fadeAnim] = useState(() => new Animated.Value(1));

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    if (session) {
      loadSavedWalks();
    }
  }, [session]);

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === 'screens' && segments[1] === 'LoginScreen';

    if (!session && !inAuthGroup) {
      router.replace('/screens/LoginScreen');
    } else if (session && inAuthGroup) {
      router.replace('/(tabs)');
    }

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start(() => setIsSplashVisible(false));

  }, [session, loading, segments, router, fadeAnim]);

  return (

    <SafeAreaProvider>
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
      {isSplashVisible && (
        <Animated.View style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }, { opacity: fadeAnim }]}>
          <ImageBackground 
            source={require('../assets/images/splash.png')}
            resizeMode="cover"
            style={{ flex: 1, backgroundColor: '#ffffff' }}
          />
        </Animated.View>
      )}
      </SafeAreaProvider>
  );
}
