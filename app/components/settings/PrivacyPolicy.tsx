import { Text, View, TouchableOpacity, Modal } from "react-native";
import { Shield, ChevronRight, X } from "lucide-react-native";
import { useState } from "react";

const PrivacyPolicy = () => {
    const [showModal,setShowModal] = useState(false);
    const handlePress = () => {
        setShowModal(true);
    };
    return (
        <>
        <TouchableOpacity className="bg-white rounded-2xl shadow-xl shadow-black/50 elevation-12 mb-1 z-10 p-5" activeOpacity={0.8} onPress={handlePress}>
           <View className="flex-row items-center justify-between">
             <View className="flex-row items-center gap-2">
                <View className="bg-red-100 rounded-full p-2">
                    <Shield size={18} color="#dc2626" />
                </View>
                <View>
                    <Text className="text-md font-semibold text-black">Polityka prywatności</Text>
                    <Text className="text-sm text-gray-500">Jak chronimy Twoje dane</Text>
                </View>
             </View>
             <View>
                <ChevronRight size={24} color="gray" />
             </View>
           </View>
        </TouchableOpacity>

        <Modal visible={showModal} animationType="slide" transparent={true} onRequestClose={() => setShowModal(false)}>
            <View className="flex-1 items-center justify-center">
                <View className="flex-row justify-center items-center bg-black/40 w-full h-full">
                    <View className="bg-white rounded-2xl shadow-xl shadow-black/50 elevation-12 p-5 w-11/12">
                        <View className="flex-row items-center justify-between border-b border-gray-200 pb-4">
                            <Text className="text-xl font-bold text-black">Polityka prywatności</Text>
                            <TouchableOpacity onPress={() => setShowModal(false)}>
                                <X size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View className="flex-col gap-2 mt-4">
                            <View className="flex-col gap-1">
                                <Text className="text-lg font-bold text-black">Gromadzenie danych</Text>
                                <Text className="text-sm text-gray-500">Zbieramy dane lokalizacyjne, dane dotyczące aktywności oraz informacje osobowe, które dobrowolnie nam przekazujesz, aby świadczyć usługi śledzenia spacerów. Wszystkie dane są szyfrowane i bezpiecznie przechowywane w naszej bazie danych.</Text>
                            </View>
                            <View className="flex-col gap-1">
                                <Text className="text-lg font-bold text-black">W jaki sposób wykorzystujemy Twoje dane</Text>
                                <Text className="text-sm text-gray-500">Twoje dane są wykorzystywane do rejestrowania spacerów, obliczania statystyk, dostarczania spersonalizowanych analiz oraz synchronizacji między Twoimi urządzeniami. Nigdy nie sprzedajemy Twoich danych osobowych podmiotom trzecim.</Text>
                            </View>
                            <View className="flex-col gap-1">
                                <Text className="text-lg font-bold text-black">Przechowywanie danych</Text>
                                <Text className="text-sm text-gray-500">Wszystkie dane dotyczące spacerów, celów oraz preferencji są bezpiecznie przechowywane w naszej chmurowej bazie danych. Możesz uzyskać dostęp do swoich danych w dowolnym momencie oraz trwale je usunąć w ustawieniach.</Text>
                            </View>
                            <View className="flex-col gap-1">
                                <Text className="text-lg font-bold text-black">Twoje prawa</Text>
                                <Text className="text-sm text-gray-500">Masz prawo dostępu do swoich danych, ich modyfikacji oraz usunięcia w dowolnym momencie. Skorzystaj z opcji „Usuń wszystkie dane”, aby trwale usunąć wszystkie informacje z naszej bazy danych.</Text>
                            </View>
                            <View className="flex-col gap-1">
                                <Text className="text-lg font-bold text-black">Kontakt</Text>
                                <Text className="text-sm text-gray-500">Jeśli masz pytania dotyczące polityki prywatności, skontaktuj się z nami pod adresem: [EMAIL_ADDRESS]</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
        </>
    );
};

export default PrivacyPolicy;