import { Text, View } from "react-native";
import { Bell, MapPin } from "lucide-react-native";
import { useState } from "react";
import { Switch } from "react-native-switch";

const LocationAndNotifications = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [isLocationEnabled, setIsLocationEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const toggleLocationSwitch = () => setIsLocationEnabled(previousState => !previousState);
    return (
        <View className="bg-white rounded-2xl shadow-xl shadow-black/50 elevation-12 mb-1 z-10 p-5 flex-col gap-2">
           <View className="flex-col border-b border-gray-200 pb-4">
             <View className="flex-row items-center gap-2">
                <View className="bg-amber-100 rounded-full p-2">
                    <Bell size={18} color="#f59e0b" />
                </View>
                <View className="flex-row items-center justify-between w-10/12">
                    <View className="flex-col">
                        <Text className="text-md font-semibold text-black">Powiadomienia</Text>
                        <Text className="text-sm text-gray-500">Przypomnienia o spacerach</Text>
                    </View>
                    <Switch
                        value={isEnabled}
                        onValueChange={toggleSwitch}
                        circleSize={22}
                        barHeight={26}
                        backgroundActive="#22c55e"
                        backgroundInactive="#e5e7eb"
                        circleActiveColor="#ffffff"
                        circleInActiveColor="#ffffff"
                        renderActiveText={false}
                        renderInActiveText={false}
                    />
                </View>
             </View>
           </View>
           <View className="flex-col">
             <View className="flex-row items-center gap-2">
                <View className="bg-green-100 rounded-full p-2">
                    <MapPin size={18} color="#22c55e" />
                </View>
                <View className="flex-row items-center justify-between w-10/12">
                    <View className="flex-col">
                        <Text className="text-md font-semibold text-black">Lokalizacja</Text>
                        <Text className="text-sm text-gray-500">Zezwól na dostęp do lokalizacji</Text>
                    </View>
                    <Switch
                        value={isLocationEnabled}
                        onValueChange={toggleLocationSwitch}
                        circleSize={22}
                        barHeight={26}
                        backgroundActive="#22c55e"
                        backgroundInactive="#e5e7eb"
                        circleActiveColor="#ffffff"
                        circleInActiveColor="#ffffff"
                        renderActiveText={false}
                        renderInActiveText={false}
                    />
                </View>
             </View>
           </View>
        </View>
    );
};

export default LocationAndNotifications;