import { ScrollView,View } from "react-native";
import GoalSelection from "../components/goals/GoalSelection";
import GoalTarget from "../components/goals/GoalTarget";
import GoalDeadline from "../components/goals/GoalDeadline";
import GoalTitle from "../components/goals/GoalTitle";
import GoalSave from "../components/goals/GoalSave";

const AddGoalScreen = () => {
    return (
        <ScrollView className="bg-gray-50 h-full">
            <View className="px-7 mt-5 flex-col gap-7 mb-20">
                <GoalSelection />
                <GoalTarget />
                <GoalDeadline />
                <GoalTitle />
                <GoalSave />
            </View>
        </ScrollView>
    );
};

export default AddGoalScreen;