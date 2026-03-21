import { ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import GoalsHeader from "../components/goals/GoalsHeader";
import GoalCard from "../components/goals/GoalCard";
import { useGoalStore, Goal } from "@/store/goalStore";
import { useEffect } from "react";



const GoalsScreen = () => {
    const loadGoals = useGoalStore((state) => state.loadGoals);
    const goals = useGoalStore((state) => state.goals)

    useEffect(() => {
        loadGoals();
    }, []);
    return (
        <ScrollView className="bg-gray-50 h-full">
            <View className="py-10 px-1">
                <LinearGradient
                    colors={['#eab308', '#f97316']}
                    className='absolute inset-0'
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                />
                <GoalsHeader />
            </View>
            {goals.length === 0 ? (
                <View className="flex-1 items-center justify-center mt-10">
                    <View className="bg-gray-200 border-gray-300 w-8/12 border-dashed border-2 rounded-xl p-12 gap-3">
                        <Text className="text-gray-500 text-center">Brak celów</Text>
                        <Text className="text-gray-500 text-center">Postaw sobie nowy cel i ruszaj w jego stronę!</Text>
                    </View>
                </View>
            ) : (
                <View className="px-7 gap-8 -mt-9">
                    {goals.map((goal:Goal) => (
                        <GoalCard key={goal.id} goal={goal} />
                    ))}
                </View>
            )}
        </ScrollView>
    );
};

export default GoalsScreen;