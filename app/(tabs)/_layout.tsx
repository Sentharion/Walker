import { Tabs } from 'expo-router';
import { Home, TrendingUp, Target, User, Settings} from 'lucide-react-native';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
      <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#d1fae5",
        tabBarStyle: {
          borderTopWidth: 0,
          paddingTop: 8,
          paddingBottom: insets.bottom > 0 ? insets.bottom + 10 : 18,
          height: 75 + (insets.bottom > 0 ? insets.bottom : 0),
          paddingHorizontal:15,
          elevation: 0,
          position: "absolute",
          backgroundColor: "transparent",
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={["#10b981", "#14b8a6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        ),

        tabBarLabel: ({ focused, color, children }) => (
          <View className={`items-center justify-center`}>
            <Text style={{ color, fontSize: 12, fontWeight: focused ? "bold" : "medium" , marginTop: children === "Główna" ? 12 : focused ? 0 : 4}}>
              {children}
            </Text>

            {focused && children !== "Główna" && <View className="w-1 h-1 bg-white rounded-full mt-1" />}
          </View>
        ),
      }}

    >
        
        <Tabs.Screen name="stats" options={{title: 'Statystyki', tabBarIcon: ({color}) => (<TrendingUp size={24} color={color} />)}}/>
        <Tabs.Screen name="goals" options={{title: 'Cele', tabBarIcon: ({color}) => (<Target size={24} color={color} />)}}/>
        <Tabs.Screen name="index" options={{title: 'Główna', tabBarIcon: ({focused}) =>(
          <View className="flex-1 items-center justify-center -mt-9">
            <View
                  className={`w-[68px] h-[68px] rounded-full items-center justify-center shadow-lg mt-3 ${
                    focused ? "bg-white" : "bg-emerald-600"
                  }`}
                >
                  <Home size={32} color={focused ? "#059669" : "white"} />
                </View>
          </View>
        ) }}/>


        <Tabs.Screen name="profile" options={{title: 'Profil', tabBarIcon: ({color}) => (<User size={24} color={color} />)}}/>
        <Tabs.Screen name="settings" options={{title: 'Ustawienia', tabBarIcon: ({color}) => (<Settings size={24} color={color} />)}}/>
    </Tabs>
  );
}