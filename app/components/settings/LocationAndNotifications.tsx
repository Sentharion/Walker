import { Text, View, Platform, TouchableOpacity, Alert } from "react-native";
import { Bell, MapPin, ExternalLink, Settings as SettingsIcon } from "lucide-react-native";
import { useState, useEffect, useCallback } from "react";
import { Switch } from "react-native-switch";
import { check, request, PERMISSIONS, RESULTS, openSettings, checkNotifications, requestNotifications, PermissionStatus } from "react-native-permissions";

const LocationAndNotifications = () => {
    const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
    const [isLocationEnabled, setIsLocationEnabled] = useState(false);
    const [locationStatus, setLocationStatus] = useState<string>("");
    const [notificationStatus, setNotificationStatus] = useState<PermissionStatus | string>("");

    const locationPermission = Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const checkPermissions = useCallback(async () => {
        const locStatus = await check(locationPermission);
        let notifStatus: PermissionStatus | string;

        if (Platform.OS === 'ios') {
            const { status } = await checkNotifications();
            notifStatus = status;
        } else if (Platform.OS === 'android') {
            // Android 13+ requires POST_NOTIFICATIONS. Using string literal to avoid TS error in some versions.
            const POST_NOTIFICATIONS = "android.permission.POST_NOTIFICATIONS" as any;
            notifStatus = await check(POST_NOTIFICATIONS);
        } else {
            notifStatus = RESULTS.GRANTED;
        }

        setLocationStatus(locStatus);
        setNotificationStatus(notifStatus);

        setIsLocationEnabled(locStatus === RESULTS.GRANTED);
        setIsNotificationEnabled(notifStatus === RESULTS.GRANTED);
    }, [locationPermission]);

    useEffect(() => {
        checkPermissions();
    }, [checkPermissions]);

    const handleToggleLocation = async () => {
        if (locationStatus === RESULTS.BLOCKED) {
            Alert.alert(
                "Uprawnienia lokalizacji",
                "Dostęp do lokalizacji jest zablokowany. Otwórz ustawienia systemowe, aby go włączyć.",
                [
                    { text: "Anuluj", style: "cancel" },
                    { text: "Ustawienia", onPress: () => openSettings() }
                ]
            );
            return;
        }

        if (isLocationEnabled) {
            setIsLocationEnabled(false);
        } else {
            const result = await request(locationPermission);
            setLocationStatus(result);
            setIsLocationEnabled(result === RESULTS.GRANTED);
        }
    };

    const handleToggleNotifications = async () => {
        if (notificationStatus === RESULTS.BLOCKED) {
            Alert.alert(
                "Uprawnienia powiadomień",
                "Powiadomienia są zablokowane. Otwórz ustawienia systemowe, aby je włączyć.",
                [
                    { text: "Anuluj", style: "cancel" },
                    { text: "Ustawienia", onPress: () => openSettings() }
                ]
            );
            return;
        }

        if (isNotificationEnabled) {
            setIsNotificationEnabled(false);
        } else {
            let result: PermissionStatus | string;
            if (Platform.OS === 'ios') {
                const { status } = await requestNotifications(['alert', 'badge', 'sound']);
                result = status;
            } else if (Platform.OS === 'android') {
                const POST_NOTIFICATIONS = "android.permission.POST_NOTIFICATIONS" as any;
                result = await request(POST_NOTIFICATIONS);
            } else {
                result = RESULTS.GRANTED;
            }
            
            setNotificationStatus(result);
            setIsNotificationEnabled(result === RESULTS.GRANTED);
        }
    };

    return (
        <View className="bg-white rounded-3xl shadow-2xl shadow-black/20 elevation-8 mb-3 z-10 p-6 flex-col gap-5 border border-gray-100">
            {/* Header / Description */}
            <View className="flex-row items-center gap-3 mb-1">
                <View className="bg-blue-50 p-2.5 rounded-2xl">
                    <SettingsIcon size={20} color="#3b82f6" />
                </View>
                <View>
                    <Text className="text-lg font-bold text-gray-900 leading-tight">System i Dane</Text>
                    <Text className="text-[12px] text-gray-500 font-medium">Zarządzaj dostępem aplikacji</Text>
                </View>
            </View>

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
                {notificationStatus === RESULTS.BLOCKED && (
                    <TouchableOpacity 
                        onPress={() => openSettings()}
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
                {locationStatus === RESULTS.BLOCKED && (
                    <TouchableOpacity 
                        onPress={() => openSettings()}
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