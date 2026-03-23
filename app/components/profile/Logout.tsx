import { LogOut } from "lucide-react-native";
import { Text, TouchableOpacity, Alert } from "react-native";
import { signOut } from "../../../lib/auth";

const Logout = () => {
    const handleLogout = async () => {
        try {
            await signOut();
        } catch (error: any) {
            Alert.alert("Błąd", "Nie udało się wylogować: " + error.message);
        }
    };

    return (
        <TouchableOpacity 
            className="bg-red-100 rounded-2xl p-4 flex-row items-center justify-center gap-2" 
            activeOpacity={0.8}
            onPress={handleLogout}
        >
            <LogOut size={22} color="#ef4444" />
            <Text className="text-red-500 text-center font-semibold text-lg">Wyloguj</Text>
        </TouchableOpacity>
    );
};

export default Logout;