import { View } from "react-native";
import MapView, {Polyline, Marker} from "react-native-maps";

import { useRef, useEffect } from "react";
import { useWalkStore } from "../../../store/walkStore";
import * as Location from "expo-location";

const LiveMap = () => {
    const mapRef = useRef<MapView>(null);
    const points = useWalkStore((state) => state.points);
    const templatePoints = useWalkStore((state) => state.templatePoints);
    const addPoint = useWalkStore((state) => state.addPoint);
    const isWalking = useWalkStore((state) => state.isWalking);

    useEffect(() => {
        let subscription: Location.LocationSubscription;
        const startTracking  = async () =>{
            const {status} = await Location.requestForegroundPermissionsAsync();
            if(status !== 'granted'){
                console.log('Zezwolenie na dostęp do lokalizacji zostało odrzucone');
                return;
            }
            subscription = await Location.watchPositionAsync({
                accuracy: Location.Accuracy.BestForNavigation,
                distanceInterval: 5,
                timeInterval: 3000,
            }, (location) => {
                if(!isWalking) return;
                addPoint({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
            });
        }
        startTracking();
        return () => {
            subscription?.remove();
        };
    }, [isWalking, addPoint]); // Added addPoint to deps to fix lint
    useEffect(() => {
        const last = points[points.length - 1] || templatePoints[0]; // fallback to template start
        if((points.length > 0 || templatePoints.length > 0) && mapRef.current && last){
            mapRef.current.animateToRegion({
                latitude: last.latitude,
                longitude: last.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }, 800);
        }
    }, [points, templatePoints]);


    return (
        <View className="h-64">
            <MapView
                ref={mapRef}
                className="w-full h-full"
                showsUserLocation={true}
                followsUserLocation={true}
                showsMyLocationButton={true}
                initialRegion={{
                    latitude: 52.2297,
                    longitude: 21.0122,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                  {templatePoints.length > 1 && (
                     <Polyline coordinates={templatePoints} strokeColor="rgba(0,0,0,0.2)" strokeWidth={4} lineDashPattern={[10, 10]}/>
                  )}
                  {templatePoints.length > 0 && (
                     <Marker coordinate={templatePoints[0]} title="Start trasy" pinColor="#10b981"/>
                  )}
                  {templatePoints.length > 0 && (
                     <Marker coordinate={templatePoints[templatePoints.length - 1]} title="Koniec trasy" pinColor="#ef4444"/>
                  )}
                  {points.length > 1 && (
                     <Polyline coordinates={points} strokeColor="#10b981" strokeWidth={6}/>
                  )}

            </MapView>
        </View>
    );
};

export default LiveMap;