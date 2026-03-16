import { Text, View } from "react-native";
import { Footprints, MapPin, Clock, Flame } from "lucide-react-native";
const details = [
    {
        icon: <MapPin size={24} color="green"/>,
        Number: "5",
        text: "km",
        color: "bg-green-100",
    },
    {
        icon: <Clock size={24} color="blue"/>,
        Number: "10",
        text: "minut",
        color: "bg-blue-100",
    },
    {
        icon: <Footprints size={24} color="orange"/>,
        Number: "15",
        text: "kroków",
        color: "bg-orange-100",
    },
    {
        icon: <Flame size={24} color="red"/>,
        Number: "15",
        text: "kcal",
        color: "bg-red-100",
    },
];
const Details = () => {
    return (
        <View className="bg-white shadow-xl shadow-black/40 elevation-10 rounded-3xl my-6 mx-8 overflow-hidden">
            <View className="p-5 gap-4 flex-row">        
                {details.map((detail, index) => (
                    <View key={index} className="flex-1 flex-col flex-grow gap-1 items-center">
                        <View className={`w-14 h-14 rounded-full ${detail.color} flex items-center justify-center`}>
                            {detail.icon}
                        </View>
                        <Text className="text-xl font-bold">{detail.Number}</Text>
                        <Text className="text-sm text-gray-600">{detail.text}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default Details;

