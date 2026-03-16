import { Text, TextInput, View } from "react-native";
import { useWalkStore } from "@/store/walkStore";

const WalkName = () => {
    const {name, setName} = useWalkStore();
    return (
        <View className="bg-white shadow-xl shadow-black/20 elevation-10 rounded-4xl my-2 mx-8 p-5 gap-3">
            <Text className="text-md text-gray-700 font-bold opacity-90">Nazwa</Text>
            <TextInput 
                className="text-md text-gray-800 border-2 border-gray-200 rounded-2xl p-4 font-medium" 
                placeholder="np. Spacer po parku"
                placeholderTextColor="#9ca3af"
                value={name}
                onChangeText={setName}
            />
        </View>
    );
};

export default WalkName;