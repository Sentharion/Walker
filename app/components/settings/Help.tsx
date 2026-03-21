import { Text, View, TouchableOpacity,Modal } from "react-native";
import { CircleQuestionMark, ChevronRight, X, Book, AtSign } from "lucide-react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

const Help = () => {
    const [isHelpModalVisible,setIsHelpModalVisible] = useState(false);
    const router = useRouter();
    const handlePress = () => {
        setIsHelpModalVisible(true);
    };

    const handleFaqPress = () => {
        router.push("/faq");
    };
    return (
        <>
        <TouchableOpacity className="bg-white rounded-2xl shadow-xl shadow-black/50 elevation-12 mb-1 z-10 p-5" activeOpacity={0.8} onPress={handlePress}>
           <View className="flex-row items-center justify-between">
             <View className="flex-row items-center gap-2">
                <View className="bg-pink-100 rounded-full p-2">
                    <CircleQuestionMark size={18} color="#db2777" />
                </View>
                <View>
                    <Text className="text-md font-semibold text-black">Pomoc</Text>
                    <Text className="text-sm text-gray-500">Centrum pomocy i wsparcia</Text>
                </View>
             </View>
            <ChevronRight size={24} color="gray" />
           </View>
        </TouchableOpacity>
        <Modal visible={isHelpModalVisible} animationType="slide" transparent={true} onRequestClose={() => setIsHelpModalVisible(false)}>
            <View className="flex-1 items-center justify-center">
                <View className="flex-row justify-center items-center bg-black/40 w-full h-full">
                    <View className="bg-white rounded-2xl shadow-xl shadow-black/50 elevation-12 p-5 w-11/12">
                        <View className="flex-row items-center justify-between border-b border-gray-200 pb-4">
                            <Text className="text-xl font-bold text-black">Centrum pomocy</Text>
                            <TouchableOpacity onPress={() => setIsHelpModalVisible(false)}>
                                <X size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View className="flex-col gap-4 mt-4">
                            <TouchableOpacity className="flex-row items-center gap-2 bg-teal-50 rounded-xl p-4" activeOpacity={0.8} onPress={handleFaqPress}>
                                <View className="bg-teal-100 rounded-full p-2">
                                    <Book size={18} color="#0d9488" />
                                </View>
                                <View className="flex-col">
                                    <View className="flex-row items-center justify-between w-11/12">
                                        <View>
                                            <Text className="text-md font-semibold text-black">FAQ</Text>
                                            <Text className="text-sm text-gray-500">Najczęściej zadawane pytania</Text>
                                        </View>
                                        <ChevronRight size={24} color="gray" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View className="flex-row items-center gap-2 bg-blue-50 rounded-xl p-4">
                                <View className="bg-blue-100 rounded-full p-2">
                                    <AtSign size={18} color="#1d4ed8" />
                                </View>
                                <View className="flex-col">
                                    <Text className="text-md font-semibold text-black">Kontakt</Text>
                                    <Text className="text-sm text-gray-500">[EMAIL_ADDRESS]</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
        </>
    );
};

export default Help;