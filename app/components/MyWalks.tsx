import { ChevronRight } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useSavedWalkStore } from "@/store/savedStore";
import WalkCard from "./WalkCard";

const MyWalks = () => {
    const router = useRouter();
    const savedWalks = useSavedWalkStore((state: any) => state.savedWalks);
    return (
        <View className="bg-white shadow-md rounded-xl p-5 gap-2 mb-20">
            <View className='flex-row items-center justify-between mb-1'>
                <Text className='text-2xl font-extrabold text-black'>Moje spacery</Text>
               {savedWalks.length > 3 && (
                <TouchableOpacity className="flex-row items-center gap-1" onPress={() => router.push('/walks')}>
                    <Text className='text-md text-emerald-700 font-semibold'> Zobacz wszystkie</Text>
                    <ChevronRight size={18} color="#10b981" />
                </TouchableOpacity>
               )}
            </View>
            {savedWalks.slice(0, 3).map((walk: any) => (
                <WalkCard key={walk.id} walk={walk} />
            ))}
        </View>
    );
};

export default MyWalks;