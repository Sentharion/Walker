import { Text, View, TouchableOpacity, Modal } from "react-native";
import { Trash2, UserX } from "lucide-react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
const Deletions = () => {
    const [isDataDeletionModalVisible, setIsDataDeletionModalVisible] = useState(false);
    const [isAccountDeletionModalVisible, setIsAccountDeletionModalVisible] = useState(false);
    const handleAccountPress = () =>{
        setIsAccountDeletionModalVisible(true);
    }
    const handleDataPress = () =>{
        setIsDataDeletionModalVisible(true);
    }
    return (
        <>
        <View className="flex-col gap-5">
            <TouchableOpacity className="bg-red-50 rounded-2xl shadow-xl shadow-black/50 elevation-12 mb-1 z-10 p-5" activeOpacity={0.8} onPress={handleDataPress}>
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
            <TouchableOpacity className="rounded-2xl shadow-xl shadow-black/50 elevation-12 mb-1 z-10" activeOpacity={0.8} onPress={handleAccountPress}>
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
                            <TouchableOpacity className="bg-red-600 rounded-xl p-4 w-full" activeOpacity={0.8}>
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
                            <Text className="text-sm text-gray-500 leading-tight text-center">Ta akcja permanentnie usunie Twoje konto. Nie będzie można cofnąć tej akcji.</Text>
                        </View>
                        <View className="flex-col items-center justify-center gap-3 w-full px-5">
                            <TouchableOpacity className="rounded-xl w-full" activeOpacity={0.8}>
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