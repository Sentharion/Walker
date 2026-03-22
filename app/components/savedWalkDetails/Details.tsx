import { Text, View } from "react-native";
import { Footprints, MapPin, Clock, Flame } from "lucide-react-native";
import { useSavedWalkStore } from "@/store/savedStore";

const Details = () => {
    const selectedWalk = useSavedWalkStore((state) => state.selectedWalk);

    const formatKm = (distance: number) => {
        if (distance >= 1000) {
            return `${(distance / 1000).toFixed(1)}`;
        }
        return `${Math.round(distance)}`;
    }

    const unitKm = (distance: number) => {
        if (distance >= 1000) {
            return `km`;
        }
        return `m`;
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        return `${minutes}`;
    }

    const details = [
        {
            icon: <MapPin size={24} color="#059669"/>, // green-600
            Number: formatKm(selectedWalk?.distance || 0),
            text: unitKm(selectedWalk?.distance || 0),
            color: "bg-emerald-50",
        },
        {
            icon: <Clock size={24} color="#2563eb"/>, // blue-600
            Number: formatTime(selectedWalk?.duration || 0),
            text: "min",
            color: "bg-blue-50",
        },
        {
            icon: <Footprints size={24} color="#ea580c"/>, // orange-600
            Number: selectedWalk?.steps || 0,
            text: "kroków",
            color: "bg-orange-50",
        },
        {
            icon: <Flame size={24} color="#dc2626"/>, // red-600
            Number: (selectedWalk?.calories || 0).toFixed(0),
            text: "kcal",
            color: "bg-red-50",
        },
    ];

    return (
        <View className="bg-white shadow-xl shadow-black/10 elevation-10 rounded-3xl my-6 mx-8 overflow-hidden">
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

