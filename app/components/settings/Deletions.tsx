import { Text, View, TouchableOpacity, Modal, Alert } from "react-native";
import { Trash2, UserX } from "lucide-react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSavedWalkStore } from "@/store/savedStore";
import { useGoalStore } from "@/store/goalStore";
import { clearAllWalksOnline } from "../../../lib/walks";
import { clearAllGoalsOnline } from "../../../lib/goals";
import { deleteAccount } from "../../../lib/auth";

const Deletions = () => {
    const [isDataDeletionModalVisible, setIsDataDeletionModalVisible] = useState(false);
    const [isAccountDeletionModalVisible, setIsAccountDeletionModalVisible] = useState(false);
    
    // Stores
    const loadWalks = useSavedWalkStore((state) => state.loadSavedWalks);
    const loadGoals = useGoalStore((state) => state.loadGoals);

    const handleClearData = async () => {
        try {
            // 1. Clear Online Data
            await clearAllWalksOnline();
            await clearAllGoalsOnline();
            
            // 2. Clear Local Data
            await AsyncStorage.multiRemove(['saved_walks', 'GOALS_STORAGE']);
            
            // 3. Refresh Stores
            await loadWalks();
            await loadGoals();
            
            setIsDataDeletionModalVisible(false);
            Alert.alert("Sukces", "Wszystkie dane zostały pomyślnie usunięte.");
        } catch (error: any) {
            Alert.alert("Błąd", "Nie udało się usunąć danych: " + error.message);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteAccount();
            setIsAccountDeletionModalVisible(false);
            // Auto-login hook will handle the redirect to Login screen
        } catch (error: any) {
            Alert.alert("Błąd", "Nie udało się usunąć konta: " + error.message);
        }
    };

    return (
        <>
        <View className="flex-col gap-5">
            <TouchableOpacity className="bg-red-50 rounded-2xl shadow-xl shadow-black/50 elevation-12 mb-1 z-10 p-5" activeOpacity={0.8} onPress={() => setIsDataDeletionModalVisible(true)}>
                <View className="flex-row items-center justify-center">
                    <View className="flex-row items-center gap-4">
                        <View className="bg-red-100 rounded-full p-3">
                            <Trash2 size={20} color="red" />
                        </View>
                        <View>
                            <Text className="text-lg font-semibold text-red-500">Usuwanie danych</Text>
                            <Text className="text-sm text-gray-500 font-bold">Usuń wszystkie dane z aplikacji</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity className="rounded-2xl shadow-xl shadow-black/50 elevation-12 mb-1 z-10" activeOpacity={0.8} onPress={() => setIsAccountDeletionModalVisible(true)}>
                <LinearGradient colors={["#dc2626", "#b91c1c"]} className="rounded-2xl overflow-hidden p-5 w-full">
                <View className="flex-row items-center justify-center">
                    <View className="flex-row items-center gap-4">
                        <View className="bg-red-800 rounded-full p-3">
                            <UserX size={20} color="white" />
                        </View>
                        <View className="flex-col">
                            <Text className="text-lg font-semibold text-white">Usuń konto</Text>
                            <Text className="text-sm text-red-100 font-bold">Permanentnie usuń swoje konto</Text>
                        </View>
                    </View>
                </View>
                </LinearGradient>
            </TouchableOpacity>
        </View>
            <Modal visible={isDataDeletionModalVisible} animationType="slide" transparent={true} onRequestClose={() => setIsDataDeletionModalVisible(false)}>
                <View className="flex-1 items-center justify-center bg-black/40">
                    <View className="bg-white rounded-2xl shadow-xl shadow-black/50 elevation-12 p-5 w-11/12 flex-col gap-4 items-center">
                        <View className="bg-red-100 rounded-full p-4">
                            <Trash2 size={30} color="red" />
                        </View>
                        <View className="flex-col gap-2 items-center p-4 justify-center">
                            <Text className="text-xl font-semibold text-black leading-tight text-center">Na pewno chcesz usunąć wszystkie dane?</Text>
                            <Text className="text-sm text-gray-500 leading-tight text-center">Ta akcja permanentnie usunie wszystkie Twoje spacery, cele, statystyki i ustawienia z aplikacji. Nie będzie można cofnąć tej akcji.</Text>
                        </View>
                        <View className="flex-col items-center justify-center gap-3 w-full px-5">
                            <TouchableOpacity className="bg-red-600 rounded-xl p-4 w-full" activeOpacity={0.8} onPress={handleClearData}>
                                <Text className="text-md font-semibold text-white text-center">Tak, usuń wszystkie dane</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-gray-200 rounded-xl p-4 w-full" activeOpacity={0.8} onPress={() => setIsDataDeletionModalVisible(false)}>
                                <Text className="text-md font-semibold text-black text-center">Anuluj</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal visible={isAccountDeletionModalVisible} animationType="slide" transparent={true} onRequestClose={() => setIsAccountDeletionModalVisible(false)}>
                <View className="flex-1 items-center justify-center bg-black/40">
                    <View className="bg-white rounded-2xl shadow-xl shadow-black/50 elevation-12 p-5 w-11/12 flex-col gap-4 items-center">
                        <View className="bg-red-600 rounded-full p-4">
                            <UserX size={30} color="white" />
                        </View>
                        <View className="flex-col gap-2 items-center p-4 justify-center">
                            <Text className="text-xl font-semibold text-black leading-tight text-center">Na pewno chcesz usunąć swoje konto?</Text>
                            <Text className="text-sm text-gray-500 leading-tight text-center">Ta akcja permanentnie usunie Twoje konto (spacery, cele i profil). Nie będzie można cofnąć tej akcji.</Text>
                        </View>
                        <View className="flex-col items-center justify-center gap-3 w-full px-5">
                            <TouchableOpacity className="rounded-xl w-full" activeOpacity={0.8} onPress={handleDeleteAccount}>
                                <LinearGradient colors={["#dc2626", "#b91c1c"]} className="rounded-xl overflow-hidden p-4 w-full">
                                <Text className="text-md font-semibold text-white text-center">Tak, usuń konto</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-gray-200 rounded-xl p-4 w-full" activeOpacity={0.8} onPress={() => setIsAccountDeletionModalVisible(false)}>
                                <Text className="text-md font-semibold text-black text-center">Anuluj</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default Deletions;