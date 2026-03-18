import { Text, TextInput, View } from "react-native";
import { useWalkStore } from "@/store/walkStore";
import { NotebookPen } from "lucide-react-native";

const WalkNote = () => {
    const {note, setNote} = useWalkStore();
    return (
        <View className="bg-white shadow-xl shadow-black/20 elevation-10 rounded-3xl my-2 mx-8 p-6 gap-3">
            <View className="flex-row items-center gap-2">
                <NotebookPen size={24} color="gray" />
                <Text className="text-md text-gray-700 font-bold opacity-90">Notatka</Text>
            </View>
            <TextInput 
                className="text-md text-gray-800 border-2 border-gray-200 rounded-2xl p-4 font-medium focus:border-green-500" 
                placeholder="Kocham spacery"
                placeholderTextColor="#9ca3af"
                value={note}
                onChangeText={setNote}
            />
        </View>
    );
};

export default WalkNote;