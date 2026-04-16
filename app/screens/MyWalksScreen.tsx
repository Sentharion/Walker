import { useSavedWalkStore } from "@/store/savedStore";
import React from "react";
import { ScrollView, View } from "react-native";
import WalkCard from "../components/WalkCard";

const MyWalksScreen = () => {
    const savedWalks = useSavedWalkStore((state: any) => state.savedWalks);
    return (
        <ScrollView className="flex flex-col px-3 py-4">
            <View className="mb-20">
                {savedWalks.map((walk: any) => (
                    <WalkCard key={walk.id} walk={walk} />
                ))}
            </View>
        </ScrollView>
    );
};

export default MyWalksScreen;