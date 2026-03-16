import { TouchableOpacity,View,Text } from "react-native";
import { useRouter } from "expo-router";
import { saveWalk } from "@/utils/walksStorage";
import { useWalkStore, type Point } from "@/store/walkStore";
import { useSavedWalkStore,type SavedWalk } from "@/store/savedStore";
interface SaveWalkProps{
    distance: number;
    points: Point[];
}

const SaveWalk = ({distance,points}:SaveWalkProps) => {
    const router = useRouter();
    const addSavedWalk = useSavedWalkStore((state) => state.addSavedWalk);
    const name = useWalkStore((state) => state.name);
    const difficulty = useWalkStore((state) => state.difficulty);
    const note = useWalkStore((state) => state.note);
    const resetWalk = useWalkStore((state) => state.resetWalk);
    const handleSaveWalk = async () => {
        const newWalk:SavedWalk = {
            id: Date.now().toString(),
            name: name ||"Nowy spacer",
            difficulty: difficulty || "Średni",
            distance,
            note:note || "",
            points,
            duration:0,
            steps:0,
            calories:0,
            finished:false,
            createdAt: new Date().toISOString(),
        };
        await saveWalk(newWalk);

        addSavedWalk(newWalk);
        resetWalk();
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