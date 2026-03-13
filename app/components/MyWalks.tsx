import { View, Text } from "react-native";
import { ChevronRight, Footprints, Clock, Heart } from "lucide-react-native";

const distance = "12 km";
const time = "12:00";
const calories = "1200 kcal";

const MyWalks = () => {
    return (
        <View className="bg-white shadow-md rounded-xl p-5">
            <View className='flex-row items-center justify-between'>
                <Text className='text-2xl font-extrabold text-black'>Moje spacery</Text>
                <View className="flex-row items-center gap-1">
                    <Text className='text-md text-emerald-700 font-semibold'>Zobacz wszystkie</Text>
                    <ChevronRight size={18} color="#10b981" />
                </View>
            </View>
            <View className="flex-col items-center gap-2">
                <View className="flex-row items-center gap-2">
                    <View className="flex-col items-center justify-center gap-1  bg-blue-400 rounded-3xl p-5 mt-3">
                       <View className="flex-row w-full items-center px-2 gap-2 justify-between">
                            <Text className="text-xl text-white font-semibold">Poranny Spacer</Text>
                            <View className="flex-row items-center gap-1">
                                <Text className="text-md text-white font-semibold bg-green-500 rounded-full px-2 py-1">Łatwy</Text>
                            </View>
                       </View>
                       <View className="flex-row w-full items-center px-2 gap-2 justify-start">
                        <Text className="text-md text-white">{distance} • {time}</Text>
                       </View>
                       <View className="flex-row items-center gap-2 bg-white/20 rounded-2xl px-2 py-1 w-full h-12 justify-center">
                        <Text className="text-md text-white font-semibold"> ✓ Ukończono </Text>
                       </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default MyWalks;