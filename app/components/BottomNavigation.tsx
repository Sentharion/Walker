import { View, Text, TouchableOpacity, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Home, TrendingUp, Target, User, Settings } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const tabs = [
  { name: "stats", label: "Stats", Icon: TrendingUp },
  { name: "goals", label: "Goals", Icon: Target },
  { name: "index", label: "Home", Icon: Home, center: true },
  { name: "profile", label: "Profile", Icon: User },
  { name: "settings", label: "Settings", Icon: Settings },
];

export default function CustomTabBar({ state, navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={["#10b981", "#14b8a6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        paddingBottom: Platform.OS === 'ios' ? insets.bottom : 12,
        paddingTop: 12,
        elevation: 0,
        borderTopWidth: 0,
      }}
    >
      <View className="flex-row items-end px-6 pb-2">
        {tabs.map((tab) => {
          const routeIndex = state.routes.findIndex((r: any) => r.name === tab.name);
          const route = state.routes[routeIndex];
          const isFocused = state.index === routeIndex;

          const onPress = () => {
            if (!route) return;
            
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(tab.name);
            }
          };

          if (!route) return null;

          if (tab.center) {
            return (
              <TouchableOpacity
                key={tab.name}
                onPress={onPress}
                activeOpacity={0.8}
                className="flex-1 items-center justify-center -mt-9"
                disabled={isFocused}
              >
                <View
                  className={`w-[68px] h-[68px] rounded-full items-center justify-center shadow-lg mb-1 ${
                    isFocused ? "bg-white" : "bg-emerald-600"
                  }`}
                >
                  <tab.Icon
                    size={32}
                    color={isFocused ? "#059669" : "white"}
                  />
                </View>
                <Text
                  className={`text-xs font-medium ${
                    isFocused ? "text-white" : "text-emerald-100"
                  }`}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={tab.name}
              onPress={onPress}
              activeOpacity={0.7}
              className="flex-1 items-center justify-center py-2"
              disabled={isFocused}
            >
              <View className={`items-center ${isFocused ? "scale-110" : ""}`}>
                <tab.Icon
                  size={24}
                  color={isFocused ? "white" : "#d1fae5"}
                  className="mb-1"
                />
                <Text
                  className={`text-xs font-medium ${
                    isFocused ? "text-white" : "text-emerald-100"
                  }`}
                >
                  {tab.label}
                </Text>
                {isFocused && (
                  <View className="w-1 h-1 bg-white rounded-full mt-1" />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </LinearGradient>
  );
}
