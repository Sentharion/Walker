import { Text, View, TouchableOpacity, Alert, Linking } from "react-native";
import { Bell, MapPin, ExternalLink, Settings as SettingsIcon } from "lucide-react-native";
import { useState, useEffect, useCallback } from "react";
import { Switch } from "react-native-switch";
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';

const LocationAndNotifications = () => {
    const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
    const [isLocationEnabled, setIsLocationEnabled] = useState(false);
    const [locationBlocked, setLocationBlocked] = useState(false);
    const [notificationBlocked, setNotificationBlocked] = useState(false);

    const checkPermissions = useCallback(async () => {
        const { status: locStatus, canAskAgain: locCanAsk } = await Location.getForegroundPermissionsAsync();
        const { status: notifStatus, canAskAgain: notifCanAsk } = await Notifications.getPermissionsAsync();

        setIsLocationEnabled(locStatus === Location.PermissionStatus.GRANTED);
        setIsNotificationEnabled(notifStatus === Notifications.PermissionStatus.GRANTED);

        setLocationBlocked(locStatus === Location.PermissionStatus.DENIED && !locCanAsk);
        setNotificationBlocked(notifStatus === Notifications.PermissionStatus.DENIED && !notifCanAsk);
    }, []);

    useEffect(() => {
        checkPermissions();
    }, [checkPermissions]);

    const handleToggleLocation = async () => {
        if (locationBlocked) {
            Alert.alert(
                "Uprawnienia lokalizacji",
                "Dostęp do lokalizacji jest zablokowany. Otwórz ustawienia systemowe, aby go włączyć.",
                [
                    { text: "Anuluj", style: "cancel" },
                    { text: "Ustawienia", onPress: () => Linking.openSettings() }
                ]
            );
            return;
        }

        if (isLocationEnabled) {
            Alert.alert("Lokalizacja", "Aby całkowicie wyłączyć dostęp do lokalizacji, przejdź do ustawień telefonu.", [
                { text: "Anuluj", style: "cancel" },
                { text: "Ustawienia", onPress: () => Linking.openSettings() }
            ]);
        } else {
            const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();
            setIsLocationEnabled(status === Location.PermissionStatus.GRANTED);
            setLocationBlocked(status === Location.PermissionStatus.DENIED && !canAskAgain);
        }
    };

    const handleToggleNotifications = async () => {
        if (notificationBlocked) {
            Alert.alert(
                "Uprawnienia powiadomień",
                "Powiadomienia są zablokowane. Otwórz ustawienia systemowe, aby je włączyć.",
                [
                    { text: "Anuluj", style: "cancel" },
                    { text: "Ustawienia", onPress: () => Linking.openSettings() }
                ]
            );
            return;
        }

        if (isNotificationEnabled) {
            Alert.alert("Powiadomienia", "Aby całkowicie wyłączyć powiadomienia, przejdź do ustawień telefonu.", [
                { text: "Anuluj", style: "cancel" },
                { text: "Ustawienia", onPress: () => Linking.openSettings() }
            ]);
        } else {
            const { status, canAskAgain } = await Notifications.requestPermissionsAsync();
            setIsNotificationEnabled(status === Notifications.PermissionStatus.GRANTED);
            setNotificationBlocked(status === Notifications.PermissionStatus.DENIED && !canAskAgain);
        }
    };

    return (
        <View className="bg-white rounded-3xl shadow-2xl shadow-black/20 elevation-8 mb-3 z-10 p-6 flex-col gap-5 border border-gray-100">
            {/* Header / Description */}

            {/* Notifications Section */}
            <View className="flex-col pb-5 border-b border-gray-100">
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-3 flex-1">
                        <View className={`p-3 rounded-2xl ${isNotificationEnabled ? 'bg-amber-100' : 'bg-gray-50 border border-gray-100'}`}>
                            <Bell size={20} color={isNotificationEnabled ? "#f59e0b" : "#94a3b8"} />
                        </View>
                        <View className="flex-1">
                            <Text className="text-[16px] font-semibold text-gray-900">Powiadomienia</Text>
                            <Text className="text-[13px] text-gray-500 mt-0.5">Przypomnienia o spacerach</Text>
                        </View>
                    </View>
                    <Switch
                        value={isNotificationEnabled}
                        onValueChange={handleToggleNotifications}
                        circleSize={24}
                        barHeight={28}
                        backgroundActive="#22c55e"
                        backgroundInactive="#e2e8f0"
                        circleActiveColor="#ffffff"
                        circleInActiveColor="#ffffff"
                        renderActiveText={false}
                        renderInActiveText={false}
                        changeValueImmediately={true}
                        innerCircleStyle={{ elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1 }}
                    />
                </View>
                {notificationBlocked && (
                    <TouchableOpacity 
                        onPress={() => Linking.openSettings()}
                        className="flex-row items-center gap-1.5 mt-2.5 ml-14"
                    >
                        <Text className="text-[12px] text-red-500 font-semibold tracking-tight">Wymagane uprawnienia. Zmień w ustawieniach</Text>
                        <ExternalLink size={12} color="#ef4444" strokeWidth={3} />
                    </TouchableOpacity>
                )}
            </View>

            {/* Location Section */}
            <View className="flex-col pb-2">
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-3 flex-1">
                        <View className={`p-3 rounded-2xl ${isLocationEnabled ? 'bg-emerald-100' : 'bg-gray-50 border border-gray-100'}`}>
                            <MapPin size={20} color={isLocationEnabled ? "#10b981" : "#94a3b8"} />
                        </View>
                        <View className="flex-1">
                            <Text className="text-[16px] font-semibold text-gray-900">Lokalizacja</Text>
                            <Text className="text-[13px] text-gray-500 mt-0.5">Dokładne śledzenie trasy</Text>
                        </View>
                    </View>
                    <Switch
                        value={isLocationEnabled}
                        onValueChange={handleToggleLocation}
                        circleSize={24}
                        barHeight={28}
                        backgroundActive="#22c55e"
                        backgroundInactive="#e2e8f0"
                        circleActiveColor="#ffffff"
                        circleInActiveColor="#ffffff"
                        renderActiveText={false}
                        renderInActiveText={false}
                        changeValueImmediately={true}
                        innerCircleStyle={{ elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1 }}
                    />
                </View>
                {locationBlocked && (
                    <TouchableOpacity 
                        onPress={() => Linking.openSettings()}
                        className="flex-row items-center gap-1.5 mt-2.5 ml-14"
                    >
                        <Text className="text-[12px] text-red-500 font-semibold tracking-tight">Lokalizacja zablokowana. Kliknij by zmienić</Text>
                        <ExternalLink size={12} color="#ef4444" strokeWidth={3} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default LocationAndNotifications;