import { LogOut } from "lucide-react-native";
import { Text, TouchableOpacity } from "react-native";

const Logout = () => {
    return (
        <TouchableOpacity className="bg-red-100 rounded-2xl p-4 flex-row items-center justify-center gap-2" activeOpacity={0.8}>
            <LogOut size={22} color="#ef4444" />
            <Text className="text-red-500 text-center font-semibold text-lg">Wyloguj</Text>
        </TouchableOpacity>
    );
};

export default Logout;