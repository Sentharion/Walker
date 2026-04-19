import { useGradientStore } from "@/store/gradientStore";
import { useUserStore } from "@/store/userStore";
import { LinearGradient } from "expo-linear-gradient";
import { Camera, Pencil } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { pickImage } from "../../../lib/avatar";

const ProfileInfo = () => {
    const storeAvatar = useUserStore((state) => state.avatar);
    const storeUsername = useUserStore((state) => state.username);
    const storeMotto = useUserStore((state) => state.motto);
    const setProfile = useUserStore((state) => state.setProfile);
    const loadProfileStore = useUserStore((state) => state.loadProfile);
    const isEditing = useGradientStore((state) => state.isEditing);
    const setIsEditing = useGradientStore((state) => state.setIsEditing);

    const [draftAvatar, setDraftAvatar] = useState<string | null>(storeAvatar);
    const [draftName, setDraftName] = useState(storeUsername);
    const [draftMotto, setDraftMotto] = useState(storeMotto);

    const setDraftGradient = useGradientStore((state) => state.setDraftGradient);
    const saveDraftGradient = useGradientStore((state) => state.saveDraftGradient);
    const resetDraftGradient = useGradientStore((state) => state.resetDraftGradient);
    const gradients: { id: number; colors: [string, string] }[] = [
        { id: 1, colors: ["#a855f7", "#db2777"] },
        { id: 2, colors: ["#f97316", "#ef4444"] },
        { id: 3, colors: ["#f5f5dc", "#ede8d0"] },
        { id: 4, colors: ["#fff1f2", "#fecdd3"] },
        { id: 5, colors: ["#0061ff", "#60efff"] },
        { id: 7, colors: ["#ff930f", "#fff95b"] },
        { id: 8, colors: ["#8711c1", "#2472fc"] },
        { id: 9, colors: ["#243748", "#4b749f"] },
        { id: 10, colors: ["#00ff87", "#60efff"] },
        { id: 11, colors: ["#d397fa", "#8364e8"] },
        { id: 12, colors: ["#42047e", "#07f49e"] },
        { id: 13, colors: ["#66023c", "#cd1c18"] },
        { id: 14, colors: ["#ff1b6b", "#45caff"] },
        { id: 15, colors: ["#0c0c0c", "#0f971c"] },
    ];

    const handleSave = async () => {
        try {
            await setProfile({
                username: draftName,
                motto: draftMotto,
                avatar_url: draftAvatar || undefined
            });
            
            setIsEditing(false);
            saveDraftGradient();
        } catch (error: any) {
            alert("Błąd podczas zapisywania profilu: " + error.message);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setDraftAvatar(storeAvatar);
        setDraftName(storeUsername);
        setDraftMotto(storeMotto);
        resetDraftGradient();
    };

    const handleCamera = async () => {
        try {
            const publicUrl = await pickImage();
            if (publicUrl) {
                setDraftAvatar(publicUrl);
            }
        } catch (error: any) {
            alert("Błąd podczas wgrywania zdjęcia: " + error.message);
        }
    }

    useEffect(() => {
        loadProfileStore();
    }, [loadProfileStore]);

    useEffect(() => {
        setDraftAvatar(storeAvatar);
        setDraftName(storeUsername);
        setDraftMotto(storeMotto);
    }, [storeAvatar, storeUsername, storeMotto]);

    return isEditing ? (
        <View className="bg-white shadow-md rounded-xl p-5 gap-3">
            <View className="flex-col items-center gap-2">
                <View className="w-20 h-20 rounded-full bg-gray-200 flex-row items-center justify-center mb-3">
                    {draftAvatar ? (
                        <Image source={{ uri: draftAvatar }} className="w-full h-full rounded-full" />
                    ) : (
                        <Text className="text-4xl">👤</Text>
                    )}
                    <TouchableOpacity className="absolute bottom-0 right-0 bg-emerald-500 rounded-full p-1.5" onPress={handleCamera} activeOpacity={0.8}>
                        <Camera size={16} color="white" />
                    </TouchableOpacity>
                </View>
                <Text className="text-gray-500 text-xs mb-2">Aby zmienić zdjęcie profilowe, kliknij ikonę aparatu</Text>
                <View className="w-full">
                    <Text className="text-md mb-2 font-semibold text-gray-700">Nazwa użytkownika</Text>
                    <TextInput 
                        className="text-2xl font-bold text-gray-800 border bg-gray-50 border-gray-300 rounded-xl p-3 w-full text-center focus:border-green-700 focus:border-2" 
                        value={draftName}
                        onChangeText={setDraftName}
                        placeholder="Nazwa użytkownika" 
                    />
                </View>
                <View className="w-full mt-2">
                    <Text className="text-md mb-2 font-semibold text-gray-700">Twoje motto</Text>
                    <TextInput 
                        className="text-green-700 text-sm border border-gray-300 bg-gray-50 rounded-xl p-5 w-full text-center focus:border-green-700 focus:border-2" 
                        value={draftMotto}
                        onChangeText={setDraftMotto}
                        placeholder="Wpisz swoje motto" 
                    />
                </View>
            </View>
            <View className="w-full mt-2">
                <Text className="text-md mb-4 text-start font-semibold text-gray-700">Zmień kolor profilu</Text>
                <View className="flex-row items-center justify-center gap-2 flex-wrap">
                    {gradients.map((gradient) => (
                        <TouchableOpacity 
                            key={gradient.id} 
                            className="w-10 h-10 rounded-full bg-gray-200 flex-row items-center justify-center overflow-hidden"
                            onPress={() => setDraftGradient(gradient)}
                        >
                            <LinearGradient
                                colors={gradient.colors}
                                className="absolute inset-0 rounded-full"
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View className="flex-row items-center justify-center gap-2">
                <TouchableOpacity 
                    className="bg-gray-200 mt-3 flex-1 rounded-2xl p-5 flex-row items-center justify-center gap-2" 
                    activeOpacity={0.8} 
                    onPress={handleCancel}
                >
                    <Text className="text-gray-700 font-semibold text-center">Anuluj</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    className="bg-emerald-500 mt-3 flex-1 rounded-2xl p-5 shadow-lg shadow-black/50 flex-row items-center justify-center gap-2" 
                    activeOpacity={0.8} 
                    onPress={handleSave}
                >
                    <Text className="text-white font-semibold text-center">Zapisz zmiany</Text>
                </TouchableOpacity>  
            </View>
        </View>
    ) : (
        <View className="bg-white shadow-md rounded-xl p-5 gap-2">
            <View className="flex-col items-center gap-2">
                <View className="w-20 h-20 rounded-full bg-gray-200 flex-row items-center justify-center">
                    {storeAvatar ? (
                        <Image source={{ uri: storeAvatar }} className="w-full h-full rounded-full" />
                    ) : (
                        <Text className="text-4xl">👤</Text>
                    )}
                </View>
                <View className="flex-col items-center">
                    <Text className="text-2xl font-bold text-black">{storeUsername}</Text>
                </View>
                <View className="flex-row items-center gap-2 p-5 mt-2 bg-green-50 rounded-xl border border-green-100">
                    <Text className="text-green-700 text-sm italic">
                        {storeMotto.length > 0 ? `"${storeMotto}"` : "Dodaj swoje motto"}
                    </Text>
                </View>
            </View>
            <TouchableOpacity className="bg-emerald-500 mt-3 rounded-2xl p-5 shadow-lg shadow-black/50 flex-row items-center justify-center gap-2" activeOpacity={0.8} onPress={() => setIsEditing(true)}>
                <Pencil size={24} color="white" />
                <Text className="text-white font-semibold text-center">Edytuj profil</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProfileInfo;