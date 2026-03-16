import { ChevronRight, Footprints } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

export const distance = "12 km";
export const time = "45 min";
export const steps = "10 000";

const MyWalks = () => {
    const router = useRouter();
    const [walkFinished,setWalkFinished] = useState(false);

    return (
        <View className="bg-white shadow-md rounded-xl p-5">
            <View className='flex-row items-center justify-between'>
                <Text className='text-2xl font-extrabold text-black'>Moje spacery</Text>
                <TouchableOpacity className="flex-row items-center gap-1" onPress={() => router.push('/walks')}>
                    <Text className='text-md text-emerald-700 font-semibold'> Zobacz wszystkie</Text>
                    <ChevronRight size={18} color="#10b981" />
                </TouchableOpacity>
            </View>
            <View className="flex-col items-center gap-2">
                <View className="flex-row items-center gap-2">
                    <View className="flex-col items-center justify-center gap-1  bg-lime-500 rounded-3xl p-5 mt-3">
                       <View className="flex-row w-full items-center px-2 gap-2 justify-between">
                            <Text className="text-xl text-white font-semibold">Poranny Spacer</Text>
                            <View className="flex-row items-center gap-1">
                                <Text className="text-md text-white font-semibold bg-green-500 rounded-full px-2 py-1">Łatwy</Text>
                            </View>
                       </View>
                       <View className="flex-row w-full items-center px-2 mb-2 gap-2 justify-start">
                        <Text className="text-md text-white">{distance} • {time}</Text>
                        <View className="flex-row items-center gap-1">
                            <Footprints size={18} color="white" />
                            <Text className="text-md text-white">{steps}</Text>
                        </View>
                       </View>
                       <TouchableOpacity className="flex-row items-center gap-2 bg-white/20 rounded-2xl px-2 py-1 w-full h-12 justify-center" activeOpacity={0.8}>
                            <Text className="text-md text-white font-semibold"> {walkFinished ? " ✓ Ukończono " : " Rozpocznij spacer "} </Text>
                       </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default MyWalks;