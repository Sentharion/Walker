import { Footprints, Trash2 } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { distance, steps, time } from "../components/MyWalks";


const MyWalksScreen = () => {
    const [walkFinished, setWalkFinished] = useState(false);

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="flex-col items-center gap-2 px-6 w-full">
                <View className="flex-row items-center gap-2">
                    <View className="flex-col items-center justify-center gap-1 bg-lime-500 rounded-3xl p-5 mt-3 shadow-xl shadow-black/40 elevation-5">
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
                      <View className="flex-row items-center gap-2 w-full">
                         <TouchableOpacity className="flex-1 flex-shrink flex-row items-center gap-2 bg-white/20 rounded-2xl px-2 py-1 h-12 justify-center" activeOpacity={0.8}>
                            <Text className="text-md text-white font-semibold"> {walkFinished ? " ✓ Ukończono " : " Rozpocznij spacer "} </Text>
                       </TouchableOpacity>
                       <TouchableOpacity className="flex-row items-center gap-2 bg-red-200 rounded-2xl px-2 py-1 h-12 w-14 justify-center" activeOpacity={0.8}>
                            <View className="flex-row items-center gap-1">
                                <Trash2 size={18} color="red" />
                            </View>
                       </TouchableOpacity>
                      </View>
                    </View>
                </View>
            </View>
            
        </SafeAreaView>
    );
};

export default MyWalksScreen;