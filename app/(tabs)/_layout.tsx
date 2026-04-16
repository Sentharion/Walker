import { Tabs } from 'expo-router';
import { Home, TrendingUp, Target, User, Settings} from 'lucide-react-native';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGradientStore } from '@/store/gradientStore';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const gradient = useGradientStore((state) => state.gradient);
  const draftGradient = useGradientStore((state) => state.draftGradient);
  const isEditing = useGradientStore((state) => state.isEditing);
  const currentGradientId = isEditing ? draftGradient?.id : gradient?.id;
  const getInactiveColors = (id: number) => {
    switch (id) {
      case 0:
        return "#a21caf";
      case 1:
        return "#a21caf";
      case 2:
        return "#fb923c";
      case 3:
        return "#C19A6B";
      case 4:
        return "#f472b6";
      case 5:
        return "#2563eb";
      case 6:
        return "#16a34a";
      case 7:
        return "#d97706";
      case 8:
        return "#7e22ce";
      case 9:
        return "#1e293b";
      case 10:
        return "#10b981";
      case 11:
        return "#6d28d9";
      case 12:
        return "#059669";
      case 13:
        return "#b91c1c";
      case 14:
        return "#38bdf8";
      case 15:
        return "#22c55e";
      default:
        return "#059669";
    }
  }

  const getActiveColor = (id: number) => {
    if(isEditing) {
      if(id === 3) {
        return "#C19A6B";
      } else if(id === 4) {
        return "#ec4899";
      }
      return "#ffffff";
    }
    if(id === 3) {
      return "#4b1d2a";
    } else if(id === 4) {
      return "#ec4899";
    }
    return "#ffffff"
  }

  const getInactiveColor = (id: number) => {
    if(isEditing) {
      if(id === 3) {
        return "#C19A6B";
      } else if(id === 4) {
        return "#f472b6";
      }
      return "#ffffff";
    }
    if(id === 3) {
      return "#4b1d2a";
    } else if(id === 4) {
      return "#f472b6";
    }
    return "#ffffff"
  }

  return (
      <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: getActiveColor(currentGradientId || 0),
        tabBarInactiveTintColor: getInactiveColor(currentGradientId || 0),
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
            colors={(isEditing ? draftGradient?.colors : gradient?.colors) || ['#a855f7', '#db2777']}
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

            {focused && children !== "Główna" && <View className={`w-1 h-1 ${currentGradientId === 3 ? "bg-[#C19A6B]" : currentGradientId === 4 ? "bg-[#ec4899]" : "bg-white"} rounded-full mt-1`} />}
          </View>
        ),
      }}

    >
        
        <Tabs.Screen name="stats" options={{title: 'Statystyki', tabBarIcon: ({color}) => (<TrendingUp size={24} color={color} />)}}/>
        <Tabs.Screen name="goals" options={{title: 'Cele', tabBarIcon: ({color}) => (<Target size={24} color={color} />)}}/>
        <Tabs.Screen name="index" options={{title: 'Główna', tabBarIcon: ({focused}) =>(
          <View className="flex-1 items-center justify-center -mt-9">
                <View
                  className={`w-[68px] h-[68px] rounded-full items-center justify-center shadow-lg mt-3 ${focused ? "bg-white" : ""}`}
                  style={!focused ? { backgroundColor: getInactiveColors(currentGradientId || 0) } : {}}
                >
                  <Home size={32} color={focused ? getInactiveColors(currentGradientId || 0) : "white"} />
                </View>
          </View>
        ) }}/>


        <Tabs.Screen name="profile" options={{title: 'Profil', tabBarIcon: ({color}) => (<User size={24} color={color} />)}}/>
        <Tabs.Screen name="settings" options={{title: 'Ustawienia', tabBarIcon: ({color}) => (<Settings size={24} color={color} />)}}/>
    </Tabs>
  );
}