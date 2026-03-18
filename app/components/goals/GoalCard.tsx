import { Text, TouchableOpacity, View,Alert } from "react-native";
import { Circle, CircleCheck, Trash2 } from "lucide-react-native";
import GradientProgressBar from "./GoalGradient";
import { useGoalStore, Goal } from "@/store/goalStore";

interface GoalCardProps {
    goal: Goal;
}


const GoalCard = ({ goal }: GoalCardProps) => {
    const deleteGoal = useGoalStore((state) => state.deleteGoal);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };
    
    const handleDelete = () => {
        Alert.alert("Usuń cel", "Czy na pewno chcesz usunąć ten cel?", [
            { text: "Nie", style: "cancel" },
            { text: "Tak", onPress: () => deleteGoal(goal.id) }
        ]);
    };
    const progress = Math.min(1, goal.current / goal.target,1);
    const percentage = Math.round(progress * 100);
    return (
        <View className={`bg-white rounded-xl p-6 shadow-lg ${goal.finished && "border-1 border-green-500"}`}>
            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center justify-start gap-2">
                    {goal.finished ? <CircleCheck size={24} color="#22c55e" /> : <Circle size={24} color="lightgray" />}
                    <Text className={`text-xl font-bold ${goal.finished ? "text-gray-500 line-through" : "text-gray-800"}`}>{goal.name}</Text>
                </View>
                <TouchableOpacity onPress={handleDelete}>
                    <Trash2 size={24} color="red" />
                </TouchableOpacity>
            </View>
            <Text className="text-gray-500 ml-9">Do: {formatDate(goal.deadline)}</Text>
            <View className="flex-row items-center justify-between mx-3 mt-5">
                <Text className="text-gray-500">{goal.current}/{goal.target} {goal.unit}</Text>
                <Text className={`${goal.finished ? "text-green-500" : "text-orange-500"} font-bold`}>{percentage}%</Text>
            </View>
            <View className="items-center px-2 mt-2">
                <GradientProgressBar progress={progress} finished={goal.finished} />
            </View>
        </View>
    );
};

export default GoalCard;