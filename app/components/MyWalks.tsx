import { ChevronRight } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import WalkCard from "./WalkCard";

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
            <WalkCard name="Spacer 1" difficulty="Łatwy" distance={distance} time={time} steps={steps} walkFinished={walkFinished} />
        </View>
    );
};

export default MyWalks;