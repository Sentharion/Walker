import { TouchableOpacity, View, Text } from "react-native";
import { useRouter } from "expo-router";
import { saveWalk } from "@/utils/walksStorage";
import { useWalkStore, type Point } from "@/store/walkStore";
import { useSavedWalkStore, type SavedWalk } from "@/store/savedStore";
import { saveWalkOnline } from "../../../lib/walks";

interface SaveWalkProps {
    distance: number;
    points: Point[];
}

const SaveWalk = ({distance,points}:SaveWalkProps) => {
    const router = useRouter();
    const addSavedWalk = useSavedWalkStore((state) => state.addSavedWalk);
    const name = useWalkStore((state) => state.name);
    const difficulty = useWalkStore((state) => state.difficulty);
    const note = useWalkStore((state) => state.note);
    const duration = useWalkStore((state) => state.duration);
    const steps = useWalkStore((state) => state.steps);
    const calories = useWalkStore((state) => state.calories);
    const resetWalk = useWalkStore((state) => state.resetWalk);

    const handleSaveWalk = async () => {
        const newWalk: SavedWalk = {
            id: Date.now().toString(),
            name: name || "Nowy spacer",
            difficulty: (difficulty as any) || "Średni",
            distance,
            note: note || "",
            points,
            duration: duration || 0,
            steps: steps || 0,
            calories: calories || 0,
            finished: false,
            createdAt: new Date().toISOString(),
        };

        try {
            // 1. Zapisz lokalnie
            await saveWalk(newWalk);
            addSavedWalk(newWalk);

            // 2. Zapisz online (jeśli zalogowany)
            await saveWalkOnline({
                name: newWalk.name,
                difficulty: newWalk.difficulty,
                distance: newWalk.distance,
                duration: newWalk.duration,
                steps: newWalk.steps,
                calories: newWalk.calories,
                note: newWalk.note,
                finished: newWalk.finished,
                createdAt: newWalk.createdAt,
            }, points);

            resetWalk();
            router.replace("/");
        } catch (error: any) {
            console.error("Error saving walk:", error);
            // Even if online failes, we have it local, but we might want to warn
            // alert("Zapisano lokalnie, ale wystąpił błąd przy synchronizacji online.");
            resetWalk();
            router.replace("/");
        }
    };
    return (
        <View className="bg-white justify-end w-full pb-8 pt-4 mt- gap-3 border-t border-gray-200 shadow-sm">
            <TouchableOpacity className="my-2 mx-8 bg-green-500 rounded-3xl py-4" activeOpacity={0.8} onPress={handleSaveWalk}>
                <Text className="text-white text-center text-lg font-bold">Zapisz spacer</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SaveWalk;