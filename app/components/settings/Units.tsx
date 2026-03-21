import { Text, View, TouchableOpacity,Modal } from "react-native";
import { Ruler, ChevronRight, X, Check } from "lucide-react-native";
import { useState } from "react";


const Units = () => {
    
    const [showModal,setShowModal] = useState(false);
    const [selectedUnit,setSelectedUnit] = useState("");

    const handlePress = () => {
        setShowModal(true);
    };

    return (
        <>
        <TouchableOpacity className="bg-white rounded-2xl shadow-xl shadow-black/50 elevation-12 mb-1 z-10 p-5" activeOpacity={0.8} onPress={handlePress}>
           <View className="flex-row items-center justify-between">
             <View className="flex-row items-center gap-2">
                <View className="bg-indigo-100 rounded-full p-2">
                    <Ruler size={18} color="#4f46e5" />
                </View>
                <View>
                    <Text className="text-md font-semibold text-black">Jednostki</Text>
                    <Text className="text-sm text-gray-500">Metryczne (km,m)</Text>
                </View>
             </View>
             <View>
                <ChevronRight size={24} color="gray" />
             </View>
           </View>
        </TouchableOpacity>

        <Modal
            visible={showModal}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowModal(false)}
        >
            <View className="flex-1 justify-center items-center bg-black/40">
                <View className="bg-white rounded-2xl p-5 w-11/12">
                    <View className="flex-row items-center justify-between border-b border-gray-200 pb-4">
                        <Text className="text-lg font-bold text-black">Wybierz jednostki</Text>
                        <TouchableOpacity onPress={() => setShowModal(false)}>
                            <X size={22} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View className="flex-col gap-2 mt-4">
                        <TouchableOpacity onPress={() => setSelectedUnit("metryczne")} className="flex-row justify-between items-center gap-2">
                            <View>
                                <Text className="text-md font-semibold text-black">Metryczne (km,m)</Text>
                                <Text className="text-sm text-gray-500">km, m, min</Text>
                            </View>
                            {
                                selectedUnit === "metryczne" ? (
                                    <View className="items-end bg-green-100 rounded-full p-1">
                                        <Check size={20} color="green" />
                                    </View>
                                ) : null
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelectedUnit("imperialne")} className="flex-row justify-between items-center gap-2">
                            <View>
                                <Text className="text-md font-semibold text-black">Imperialne (mile, stopy)</Text>
                                <Text className="text-sm text-gray-500">mile, stopy, min</Text>
                            </View>
                            {
                                selectedUnit === "imperialne" ? (
                                    <View className="items-end bg-green-100 rounded-full p-1">
                                        <Check size={20} color="green" />
                                    </View>
                                ) : null
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
        </>
    );
};

export default Units;