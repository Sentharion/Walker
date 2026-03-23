import { Redirect } from "expo-router";
import { useSession } from "../hooks/auto-login";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
    const { session, loading } = useSession();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#10b981" />
            </View>
        );
    }

    if (session) {
        return <Redirect href="/(tabs)" />;
    }

    return <Redirect href="/screens/LoginScreen" />;
}