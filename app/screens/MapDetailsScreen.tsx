import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EstDistance from "../components/walkDetails/EstDistance";
import WalkName from "../components/walkDetails/WalkName";
import WalkDifficulty from "../components/walkDetails/WalkDifficulty";
import SaveWalkText from "../components/walkDetails/SaveWalkText";
import SaveWalk from "../components/walkDetails/SaveWalk";
import { useWalkStore } from "@/store/walkStore";

const MapDetailsScreen = () => {

    const { points, distance} = useWalkStore();
    
    return (
        <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
            <View className="flex-1">
                <EstDistance distance={distance}/>
                <WalkName/>
                <WalkDifficulty/>
                <SaveWalkText />
            </View>
            <SaveWalk distance={distance} points={points}/>
        </SafeAreaView>
    );
};

export default MapDetailsScreen;