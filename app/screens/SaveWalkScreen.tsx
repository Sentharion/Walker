import { ScrollView } from "react-native";
import Details from "../components/savedWalkDetails/Details";
import RoutePreview from "../components/savedWalkDetails/RoutePreview";
import { useSavedWalkStore } from "../../store/savedStore";
import SavedNote from "../components/savedWalkDetails/SavedNote";
import StartWalks from "../components/savedWalkDetails/StartWalks";
import DeleteWalk from "../components/savedWalkDetails/DeleteWalk";


const SaveWalkScreen = () => {
    const selectedWalk = useSavedWalkStore((state) => state.selectedWalk);
    return (
        <ScrollView className="flex-1 bg-gray-50">
            <Details/>
            <RoutePreview 
                points={selectedWalk?.points || []} 
                templatePoints={selectedWalk?.templatePoints || []}
            />
            <SavedNote/>
            <StartWalks/>
            <DeleteWalk/>
        </ScrollView>
    );
};

export default SaveWalkScreen;