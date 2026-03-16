import { Text, View,} from "react-native";
import MapView, {Polyline,Marker} from "react-native-maps";
import { Point } from "../../../store/walkStore"
import { useEffect,useRef, useState  } from "react";

interface RoutePreviewProps{
    points: Point[];
}

const RoutePreview = ({points}: RoutePreviewProps) => {
    const mapRef = useRef<MapView>(null);
    const [mapReady, setMapReady] = useState(false);
    useEffect(() => {
        if (points.length > 0 && mapRef.current && mapReady) {
            setTimeout(() => {
                mapRef.current?.fitToCoordinates(points, {
                    edgePadding: { top: 50, bottom: 50, left: 50, right: 50 },
                    animated: true,
                });
            }, 500);
        }
    }, [points, mapReady]);

    if(!points || points.length === 0){
        return null;
    }
    return (
        <View className="bg-white shadow-xl shadow-black/40 elevation-10 rounded-3xl mx-8 overflow-hidden">
            <Text className="p-5 text-xl font-semibold">Podgląd trasy</Text>
            <MapView style={{width: "100%", height: 200, padding: 10}} ref={mapRef} scrollEnabled={true} zoomEnabled={true} pitchEnabled={false} rotateEnabled={false} onMapReady={() => setMapReady(true)}>
                <Polyline coordinates={points} strokeColor="green" strokeWidth={2}/>
                <Marker coordinate={points[0]} title="Początek" pinColor="green"></Marker>
                <Marker coordinate={points[points.length - 1]} title="Koniec"></Marker>
            </MapView>
        </View>
    );
};

export default RoutePreview;