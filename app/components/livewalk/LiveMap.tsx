import { View } from "react-native";
import MapView, {Polyline, Marker, PROVIDER_DEFAULT} from "react-native-maps";

import { useRef, useEffect } from "react";
import { useWalkStore } from "../../../store/walkStore";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";

const LiveMap = () => {
    const mapRef = useRef<MapView>(null);
    const points = useWalkStore((state) => state.points);
    const templatePoints = useWalkStore((state) => state.templatePoints);;
    const isWalking = useWalkStore((state) => state.isWalking);
    const LOCATION_TASK_NAME = 'background-location-task';

    useEffect(() => {
        const manageTracking = async () => {
            if (isWalking) {
                const { status: fgStatus } = await Location.requestForegroundPermissionsAsync();
                const { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();
                const { status: notifStatus } = await Notifications.requestPermissionsAsync();

                if (fgStatus !== 'granted') {
                    console.log("Brak zgody na lokalizację (foreground)");
                    return;
                }

                if (bgStatus !== 'granted') {
                    console.log("Brak zgody na lokalizację w tle");
                }

                if (notifStatus !== 'granted') {
                    console.log("Brak zgody na powiadomienia");
                }

                await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
                    accuracy: Location.Accuracy.Highest,
                    distanceInterval: 5,
                    timeInterval: 5000,
                    showsBackgroundLocationIndicator: true,
                    foregroundService: {
                        notificationTitle: 'Walker – trwa spacer 🚶',
                        notificationBody: 'Śledzenie Twojej aktywności...',
                        notificationColor: '#10b981',
                    },
                });
            } else {
                const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
                if (hasStarted) {
                    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
                }
            }
        }
        manageTracking();
    }, [isWalking]);
    useEffect(() => {
        const last = points[points.length - 1] || templatePoints[0];
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
                provider={PROVIDER_DEFAULT}
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