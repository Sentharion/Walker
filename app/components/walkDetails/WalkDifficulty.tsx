import { TrendingUp } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { useWalkStore } from "@/store/walkStore";

const difficultyOptions = [
    { label: "Łatwy", value: "Łatwy", activeClass: "bg-green-500" },
    { label: "Średni", value: "Średni", activeClass: "bg-yellow-500" },
    { label: "Trudny", value: "Trudny", activeClass: "bg-red-500" },
];

const WalkDifficulty = () => {
    const {difficulty,setDifficulty} = useWalkStore();

    return (
        <View className="bg-white shadow-xl shadow-black/20 elevation-10 rounded-4xl my-6 mx-8 p-5 gap-4">
            <View className="flex-row items-center gap-2">
                <TrendingUp size={24} color="gray" />
                <Text className="text-md text-gray-700 font-bold opacity-90">Poziom trudności</Text>
            </View>
            <View className="flex-row items-center gap-2">
                {difficultyOptions.map((d) => {
                    const isSelected = difficulty === d.value;
                    return (
                        <TouchableOpacity
                            key={d.value}
                            className={`flex-1 items-center justify-center rounded-2xl h-12 ${
                                isSelected ? d.activeClass : "bg-gray-200"
                            }`}
                            activeOpacity={0.8}
                            onPress={() => setDifficulty(d.value as "" | "Łatwy" | "Średni" | "Trudny")}
                        >
                            <Text className={`text-sm font-bold ${isSelected ? "text-white" : "text-gray-700"}`}>
                                {d.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

export default WalkDifficulty;