import { Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker , Polyline, PROVIDER_DEFAULT} from "react-native-maps";
import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import { calculateTotalDistance } from "@/utils/distance";
import { useWalkStore } from "@/store/walkStore";

const MapScreen = () => {
    const router = useRouter();
    const points = useWalkStore((state) => state.points);
    const setPoints = useWalkStore((state) => state.setPoints);
    const setDistance = useWalkStore((state) => state.setDistance);

    const handleMapPress = (e: any) => {
        const newPoints = [...points, e.nativeEvent.coordinate];
        setPoints(newPoints);
        setDistance(calculateTotalDistance(newPoints));
    };
    
    const clearPoints = () => {
        if(points.length > 0) {
            setPoints([]);
            setDistance(0);
        }
    };

    const saveRoute = () => {
        if (points.length >= 2) {
            router.push('/mapDetails');
        }
    };

    const removePoint = (index: number) => {
    const newPoint = points.filter((_, i) => i !== index);
    setPoints(newPoint);
    setDistance(calculateTotalDistance(newPoint));
};

    return (
        <View className="flex-1">

            {points.length > 0 && (
                <View className="bg-white absolute top-10 left-10 right-10 z-50 shadow-md rounded-xl px-4 py-2 flex-row justify-between items-center">
                    <View className="flex-col items-center">
                        <Text className="text-md">Punkty</Text>
                        <Text className="text-xl font-bold text-black">{points.length}</Text>
                    </View>
                    <View className="flex-col items-center">
                        <Text className="text-md">Dystans trasy</Text>
                        <Text className="text-xl font-bold text-emerald-600">
                            {(calculateTotalDistance(points) / 1000).toFixed(2)} km
                        </Text>
                    </View>
                    <TouchableOpacity onPress={clearPoints}>
                        <Text className="bg-red-100 text-red-500 p-2 rounded-xl">Wyczyść</Text>
                    </TouchableOpacity>
                </View>
            )}
            <MapView 
                style={{flex: 1}} 
                provider={PROVIDER_DEFAULT} 
                onPress={handleMapPress}
                initialRegion={{
                    latitude: 52.0693,
                    longitude: 19.4803,
                    latitudeDelta: 5.0,
                    longitudeDelta: 5.0,
                }}
            >
                {points.map((point, index) => (
                    <Marker key={index} coordinate={point} onCalloutPress={() => removePoint(index)} title={`Punkt ${index + 1}`} description="Dotknij aby usunąć" pinColor="darkgreen" />
                ))}
                {points.length > 1 ? <Polyline coordinates={points} strokeColor="green" strokeWidth={4} /> : null}
            </MapView>
            <View className="flex-col w-full h-60 justify-center gap-5 bottom-10 bg-white rounded-t-3xl p-5">
                <View className="flex-row justify-start items-center gap-2">
                    <Plus size={24} color="lightgreen" />
                    <View className="flex-col">
                        <Text className="text-left font-semibold text-black">Kliknij na mapę aby dodać punkty</Text>
                        <Text className="text-left text-black text-sm">Punkty połączą się automatycznie, tworząc trasę</Text>
                    </View>
                </View>
                <TouchableOpacity className={`${points.length < 2 ? 'bg-gray-300' : 'bg-green-500'} rounded-xl p-5 shadow-lg shadow-black/50 elevation-10`} disabled={points.length < 2} onPress={saveRoute}>
                    <Text className={`${points.length < 2 ? 'text-gray-500' : 'text-white'} font-semibold text-center`}>Dalej: szczegóły spaceru</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MapScreen;