import { TrendingUp, Trophy, MapPin, Clock, Footprints } from "lucide-react-native";
import { Text, View } from "react-native";

const records = [
    {
        id: "walk",
        name: "Najdłuższy dystans",
        value: "10 km",
        date: "2022-01-01",
        icon: <MapPin size={14} color="#22c55e" />,
        bgColor: "bg-green-50",
    },
    {
        id: "time",
        name: "Najdłuższy czas",
        value: "2 godziny",
        date: "2022-01-01",
        icon: <Clock size={14} color="#3b82f6" />,
        bgColor: "bg-blue-50",
    },
    {
        id: "steps",
        name: "Najwięcej kroków",
        value: "10.000",
        date: "2024-01-01",
        icon: <Footprints size={14} color="#f97316" />,
        bgColor: "bg-orange-50",
    },
    {
        id:"streak",
        name:"Najdłuższa seria",
        value:"10 dni",
        date: "",
        icon: <TrendingUp size={14} color="#f59e0b" />,
        bgColor: "bg-amber-50",
    }
]

const MyRecords = () => {
    return (
        <View className="bg-white shadow-md rounded-xl p-5 gap-3">
            <View className="flex-row items-start justify-start gap-2">
                <Trophy size={24} color="#f59e0b" />
                <Text className="text-xl mb-4 text-start font-semibold text-gray-700">Moje rekordy</Text>
            </View>
            <View className="flex-row items-center justify-between gap-2 flex-wrap">
                {records.map((record) => (
                    <View key={record.id} className={`flex-1 flex-col items-center py-3 justify-center gap-1 min-w-[45%] rounded-xl ${record.bgColor}`}>
                        <View className={`rounded-2xl p-2 flex-row items-center justify-between gap-1`}>
                            {record.icon}
                            <Text className=" text-gray-700 text-xs">{record.name}</Text>
                        </View>
                        <View className="flex-col justify-center items-center gap-2 mb-2">
                            <Text className="text-gray-900 text-2xl font-bold">{record.value}</Text>
                            <Text className="text-gray-700 text-xs">{record.date || "Oby tak dalej!"}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default MyRecords;