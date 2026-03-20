import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { View } from "react-native";
import ProfileInfo from "../components/profile/ProfileInfo";
import { useGradientStore } from "@/store/gradientStore";

const ProfileScreen = () => {
    const gradient = useGradientStore((state) => state.gradient);
    const draftGradient = useGradientStore((state) => state.draftGradient);
    const [isEditing, setIsEditing] = useState(false);
    return (
        <View>
            <View className="py-20 px-1">
                <LinearGradient
                    colors={isEditing ? draftGradient : gradient}
                    className='absolute inset-0'
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                />
            </View>
            <View className="px-7 -mt-20">
                <ProfileInfo isEditing={isEditing} setIsEditing={setIsEditing} />
            </View>
        </View>
    );
};

export default ProfileScreen;