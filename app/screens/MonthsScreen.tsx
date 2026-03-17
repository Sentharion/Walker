import { SafeAreaView } from "react-native-safe-area-context";
import MonthCard from "../components/stats/MonthCard";
import { ScrollView } from "react-native";

const months = [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
];

const MonthsScreen = () => {
    return (
            <ScrollView className="flex-1 flex-col gap-5 px-6 py-6">
                {months.map((month) => (
                    <MonthCard key={month} month={month} walks={10} distance={10} time={10} calories={10} steps={10} />
                ))}
            </ScrollView>
    );
};

export default MonthsScreen; 