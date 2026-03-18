import { Text, View, Platform, TouchableOpacity } from "react-native";
import { Calendar } from "lucide-react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { useGoalStore } from "@/store/goalStore";

const GoalDeadline = () => {
    const draft = useGoalStore((state) => state.draft);
    const setDraftDeadline = useGoalStore((state) => state.setDraftDeadline);
    const [show,setShow] = useState(false);

    const onChange = (event:any, selectedDate?: Date) => {
        setShow(false) ;
        if(selectedDate) setDraftDeadline(selectedDate.toISOString());
    };
    return (
        <View className="bg-white rounded-xl p-6 shadow-lg">
            <View className="flex-row items-center gap-2 mb-2">
                <Calendar size={24} color="#f97316" />
                <Text className="text-2xl text-gray-800 font-semibold opacity-90">Termin</Text>
            </View>
            <TouchableOpacity onPress={() => setShow(true)}>
                <Text className="text-lg text-gray-800 border-2 border-orange-200 rounded-2xl p-4 font-medium">{draft.deadline ? new Date(draft.deadline).toLocaleDateString() : "Wybierz termin"}</Text>
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                    value={draft.deadline ? new Date(draft.deadline) : new Date()}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={onChange}
                />
            )}
        </View>
    );
};

export default GoalDeadline;