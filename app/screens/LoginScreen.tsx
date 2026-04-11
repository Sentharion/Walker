import React, { useState } from "react";
import {View,Text,TextInput,TouchableOpacity,ImageBackground,ScrollView,KeyboardAvoidingView,Platform,Alert} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Compass, User, Lock, LogIn, Mail } from "lucide-react-native";
import { useRouter } from "expo-router";
import {signUp, signInWithUsername} from "../../lib/auth"

export default function LoginScreen() {
    const router = useRouter();
    const [isRegistering, setIsRegistering] = useState(false);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const toggleMode = () => {
        setIsRegistering(!isRegistering);
    };

    const validateFields = () => {
        if (!username || !password) {
            Alert.alert("Błąd", "Skorzystaj z wszystkich danych logowania");
            return false;
        }
        if (isRegistering && !email) {
            Alert.alert("Błąd", "Email jest wymagany do rejestracji");
            return false;
        }
        return true;
    };

    const handleRegister = async () => {
        if (!validateFields()) return;
        setLoading(true);
        try {
            await signUp(email, password, username);
            Alert.alert("Sukces", "Konto zostało utworzone");
            router.replace("/(tabs)");
        } catch (error: any) {
            Alert.alert("Błąd", error.message || "Wystąpił błąd podczas tworzenia konta");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async () => {
        if (!validateFields()) return;
        setLoading(true);
        try {
            await signInWithUsername(username, password);
            Alert.alert("Sukces", "Zalogowano");
            router.replace("/(tabs)");
        } catch (error: any) {
            Alert.alert("Błąd", error.message || "Wystąpił błąd podczas logowania");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
  return (
    <View className="flex-1">
      <StatusBar style="light" />

      <ImageBackground
        source={require("../../assets/images/splash.png")}
        className="flex-1 "
      >
        <SafeAreaView className="flex-1 bg-black/40">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
              className="px-8 py-10"
            >
              <View className="flex-1 items-center justify-center">
                {/* Logo / Header */}
                <View className="items-center mb-10 w-full">
                  <View className="w-20 h-20 bg-emerald-500 rounded-3xl items-center justify-center mb-4 rotate-12 shadow-lg">
                    <Compass size={40} color="white" strokeWidth={2.5} />
                  </View>

                  <Text className="text-white text-4xl font-black tracking-[4px] uppercase">
                    Walker
                  </Text>

                  <Text className="text-emerald-400 text-sm font-medium -mt-1 tracking-tight">
                    Odkrywaj świat krok po kroku
                  </Text>
                </View>

                {/* Login Card */}
                {
                    !isRegistering ? (
                        <View className="w-full p-8 rounded-[40px] border-2 border-white/20 bg-white shadow-lg">
                  <View className="gap-4">
                    {/* Username */}
                    <View className="relative">
                      <View className="absolute left-4 top-1/2 -mt-[10px] z-10">
                        <User size={20} color="#10b981" />
                      </View>

                      <TextInput
                        placeholder="Nazwa użytkownika"
                        placeholderTextColor="#9ca3af"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                        className="bg-white/10 text-black rounded-2xl py-3.5 pl-12 pr-4 border border-emerald-500 font-medium"
                      />
                    </View>

                    {/* Password */}
                    <View className="relative">
                      <View className="absolute left-4 top-1/2 -mt-[10px] z-10">
                        <Lock size={20} color="#10b981" />
                      </View>

                      <TextInput
                        placeholder="Hasło"
                        placeholderTextColor="#9ca3af"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        autoCapitalize="none"
                        className="bg-white/10 text-black rounded-2xl py-3.5 pl-12 pr-4 border border-emerald-500 font-medium"
                      />
                    </View>

                    {/* Login Button */}
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={handleLogin}
                      disabled={loading}
                      className="mt-2 rounded-2xl overflow-hidden"
                    >
                      <LinearGradient
                        colors={["#10b981", "#059669"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        className="py-4 items-center flex-row justify-center gap-2"
                      >
                        <Text className="text-white font-bold text-lg">
                          {loading ? "Logowanie..." : "Zaloguj się"}
                        </Text>
                        <LogIn size={20} color="white" />
                      </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row justify-center gap-2 items-center mt-2" onPress={toggleMode}>
                        <Text className="text-gray-400 text-[11px]">
                            Nie masz konta?
                        </Text>
                      <Text className="text-emerald-400 text-[11px] font-bold uppercase">
                        Zarejestruj się
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                    ): (
                        <View className="w-full p-8 rounded-[40px] border-2 border-white/20 bg-white shadow-lg">
                  <View className="gap-4">
                    {/* Username */}
                    <View className="relative">
                      <View className="absolute left-4 top-1/2 -mt-[10px] z-10">
                        <User size={20} color="#10b981" />
                      </View>

                      <TextInput
                        placeholder="Nazwa użytkownika"
                        placeholderTextColor="#9ca3af"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                        className="bg-white/10 text-black rounded-2xl py-3.5 pl-12 pr-4 border border-emerald-500 font-medium"
                      />
                    </View>

                    <View className="relative">
                      <View className="absolute left-4 top-1/2 -mt-[10px] z-10">
                        <Mail size={20} color="#10b981" />
                      </View>

                      <TextInput
                        placeholder="Adres e-mail"
                        placeholderTextColor="#9ca3af"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        className="bg-white/10 text-black rounded-2xl py-3.5 pl-12 pr-4 border border-emerald-500 font-medium"
                      />
                    </View>


                    {/* Password */}
                    <View className="relative">
                      <View className="absolute left-4 top-1/2 -mt-[10px] z-10">
                        <Lock size={20} color="#10b981" />
                      </View>

                      <TextInput
                        placeholder="Hasło"
                        placeholderTextColor="#9ca3af"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        autoCapitalize="none"
                        className="bg-white/10 text-black rounded-2xl py-3.5 pl-12 pr-4 border border-emerald-500 font-medium"
                      />
                    </View>

                    {/* Register Button */}
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={handleRegister}
                      disabled={loading}
                      className="mt-2 rounded-2xl overflow-hidden"
                    >
                      <LinearGradient
                        colors={["#10b981", "#059669"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        className="py-4 items-center flex-row justify-center gap-2"
                      >
                        <Text className="text-white font-bold text-lg">
                          {loading ? "Tworzenie konta..." : "Zarejestruj się"}
                        </Text>
                        <LogIn size={20} color="white" />
                      </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row justify-center gap-2 items-center mt-2" onPress={toggleMode}>
                      <Text className="text-gray-400 text-[11px]">
                        Masz już konto?
                      </Text>
                      <Text className="text-emerald-400 text-[11px] font-bold uppercase">
                        Zaloguj się
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                    )}
                <Text className="text-white text-[10px] mt-12 font-semibold tracking-[3px] uppercase">
                  Sentharion Dev • v1.0.0
                </Text>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}