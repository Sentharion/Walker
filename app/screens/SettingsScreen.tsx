import { ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SettingsHeader from "../components/settings/SettingsHeader";
import Units from "../components/settings/Units";
import LocationAndNotifications from "../components/settings/LocationAndNotifications";
import PrivacyPolicy from "../components/settings/PrivacyPolicy";
import Help from "../components/settings/Help";
import AppInfo from "../components/settings/AppInfo";
import Deletions from "../components/settings/Deletions";

const SettingsScreen = () => {
    return (
        <ScrollView className="bg-gray-50">
            <View className="py-10 px-1">
                <LinearGradient
                    colors={['#3b82f6', '#06b6d4']}
                    className='absolute inset-0'
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                />
                <SettingsHeader />
            </View>
            <View className="px-7 -mt-7 flex-col gap-5 mb-20">
                <LocationAndNotifications />
                <PrivacyPolicy />
                <Help />
                <AppInfo />
                <Deletions />
            </View>
        </ScrollView>
    );
};

export default SettingsScreen;
