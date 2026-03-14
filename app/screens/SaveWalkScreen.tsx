import { ScrollView } from "react-native";
import Details from "../components/savedWalkDetails/Details";

const SaveWalkScreen = () => {
    return (
        <ScrollView className="flex-1 bg-gray-50">
            <Details/>
        </ScrollView>
    );
};

export default SaveWalkScreen;