import { SafeAreaView } from "react-native-safe-area-context";
import FaqScreen from "./screens/FaqScreen";

const Faq = () => {
    return (
        <SafeAreaView className="bg-gray-50 w-full h-full">
           <FaqScreen />
        </SafeAreaView>
    );
};

export default Faq;