import React from "react";
import {useSavedWalkStore} from "@/store/savedStore";
import WalkCard from "../components/WalkCard";
import { ScrollView } from "react-native";

const MyWalksScreen = () => {
    const savedWalks = useSavedWalkStore((state: any) => state.savedWalks);
    return (
        <ScrollView className="flex flex-col bg-gray-50 px-3 py-2 mt-3">
            {savedWalks.map((walk: any) => (
                <WalkCard key={walk.id} walk={walk} />
            ))}
        </ScrollView>
    );
};

export default MyWalksScreen;