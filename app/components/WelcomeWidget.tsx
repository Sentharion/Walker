import { Text, View,} from "react-native";
import { User }from "lucide-react-native";

const userName = "Michał";

const WelcomeWidget = () => {
    return (
        <View className="flex-row gap-2 items-center justify-start mt-3 px-7">
            <View className="bg-white rounded-full w-16 h-16 flex items-center justify-center border shadow-md border-emerald-400">
                <User size={32} color="black"/>
            </View>
            <View className="flex flex-col">
                <Text className='text-3xl font-bold text-white'>Witaj ponownie, {userName}!</Text>
                <Text className='text-md text-white'>Gotowy na kolejny spacer?</Text>
            </View>
        </View>
    );
};

export default WelcomeWidget;