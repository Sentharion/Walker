import { TouchableOpacity,View,Text } from "react-native";
import { useRouter } from "expo-router";
import { saveWalk } from "@/utils/walksStorage";
import { Point } from "@/store/walkStore";

interface SaveWalkProps{
    distance: number;
    points: Point[];
}

const SaveWalk = ({distance,points}:SaveWalkProps) => {
    const router = useRouter();
    const handleSaveWalk = async () => {
        const newWalk = {
            id: Date.now().toString(),
            name: "Nowy spacer",
            distance,
            points,
            time:"0 min",
            steps:"0",
            calories:"0",
            finished:false,
            createdAt: new Date().toISOString(),
        };
        await saveWalk(newWalk);

        router.replace("/");
    };
    return (
        <View className="bg-white justify-end w-full pb-8 pt-4 gap-3 border-t border-gray-200 shadow-sm">
            <TouchableOpacity className="my-2 mx-8 bg-green-500 rounded-3xl py-4" activeOpacity={0.8} onPress={handleSaveWalk}>
                <Text className="text-white text-center text-lg font-bold">Zapisz spacer</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SaveWalk;