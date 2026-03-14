import React from "react";
import { ScrollView } from "react-native";
import WalkCard from "../components/WalkCard";

const walks = [
    {
        name: "Spacer 1",
        difficulty: "Łatwy",
        distance: "5 km",
        time: "1h",
        steps: "10000",
        walkFinished: false,
    },
    {
        name: "Spacer 2",
        difficulty: "Średni",
        distance: "10 km",
        time: "2h",
        steps: "20000",
        walkFinished: true,
    },
    {
        name: "Spacer 3",
        difficulty: "Trudny",
        distance: "15 km",
        time: "3h",
        steps: "30000",
        walkFinished: false,
    },
];

const MyWalksScreen = () => {
    return (
        <ScrollView className="flex-1 bg-gray-50 px-7">
            {walks.map((walk, index) => (
                <WalkCard key={index} {...walk} />
            ))}
        </ScrollView>
    );
};

export default MyWalksScreen;