import { Text, View,} from "react-native";
import MapView, {Polyline,Marker, PROVIDER_DEFAULT} from "react-native-maps";
import { Point } from "../../../store/walkStore"
import { useEffect,useRef, useState  } from "react";

interface RoutePreviewProps{
    points: Point[];
    templatePoints?: Point[];
}

const RoutePreview = ({points, templatePoints = []}: RoutePreviewProps) => {
    const mapRef = useRef<MapView>(null);
    const [mapReady, setMapReady] = useState(false);
    
    const allPoints = [...templatePoints, ...points];

    useEffect(() => {
        if (allPoints.length > 0 && mapRef.current && mapReady) {
            setTimeout(() => {
                mapRef.current?.fitToCoordinates(allPoints, {
                    edgePadding: { top: 50, bottom: 50, left: 50, right: 50 },
                    animated: true,
                });
            }, 500);
        }
    }, [allPoints.length, mapReady]);

    if(allPoints.length === 0){
        return null;
    }
    return (
        <View className="bg-white shadow-xl shadow-black/40 elevation-10 rounded-3xl mx-8 overflow-hidden">
            <Text className="p-5 text-xl font-semibold">Podgląd trasy</Text>
            <MapView style={{width: "100%", height: 200, padding: 10}} provider={PROVIDER_DEFAULT} ref={mapRef} scrollEnabled={true} zoomEnabled={true} pitchEnabled={false} rotateEnabled={false} onMapReady={() => setMapReady(true)}>
                {templatePoints.length > 1 && (
                    <Polyline coordinates={templatePoints} strokeColor="rgba(0,0,0,0.2)" strokeWidth={3} lineDashPattern={[5, 5]}/>
                )}
                {points.length > 1 && (
                    <Polyline coordinates={points} strokeColor="#10b981" strokeWidth={5}/>
                )}
                
                {allPoints.length > 0 && (
                    <>
                        <Marker coordinate={allPoints[0]} title="Początek" pinColor="#10b981"></Marker>
                        <Marker coordinate={allPoints[allPoints.length - 1]} title="Koniec" pinColor="#ef4444"></Marker>
                    </>
                )}
            </MapView>
        </View>
    );
};

export default RoutePreview;