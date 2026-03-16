import { View, ScrollView } from "react-native";
import EstDistance from "../components/walkDetails/EstDistance";
import WalkName from "../components/walkDetails/WalkName";
import WalkDifficulty from "../components/walkDetails/WalkDifficulty";
import SaveWalkText from "../components/walkDetails/SaveWalkText";
import SaveWalk from "../components/walkDetails/SaveWalk";
import { useWalkStore } from "@/store/walkStore";
import WalkNote from "../components/walkDetails/WalkNote";

const MapDetailsScreen = () => {

    const { points, distance} = useWalkStore();
    
    return (
        <ScrollView className="flex-1 bg-gray-50">
            <View className="flex-1">
                <EstDistance distance={distance}/>
                <WalkName/>
                <WalkDifficulty/>
                <WalkNote/>
                <SaveWalkText />
            </View>
            <SaveWalk distance={distance} points={points}/>
        </ScrollView>
    );
};

export default MapDetailsScreen;