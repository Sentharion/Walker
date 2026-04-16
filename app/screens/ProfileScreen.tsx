import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, View } from "react-native";
import ProfileInfo from "../components/profile/ProfileInfo";
import { useGradientStore } from "@/store/gradientStore";
import MyRecords from "../components/profile/MyRecords";
import RecentActivity from "../components/profile/RecentActivity";
import Logout from "../components/profile/Logout";

const ProfileScreen = () => {
    const gradient = useGradientStore((state) => state.gradient);
    const draftGradient = useGradientStore((state) => state.draftGradient);
    const isEditing = useGradientStore((state) => state.isEditing);
    return (
        <ScrollView className="bg-gray-50">
            <View className="py-20 px-1 ">
                <LinearGradient
                    colors={(isEditing ? draftGradient?.colors : gradient?.colors) || ['#a855f7', '#db2777']}
                    className='absolute inset-0'
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                />
            </View>
            <View className="px-7 -mt-20 flex-col gap-5 mb-32">
                <ProfileInfo />
                <MyRecords />
                <RecentActivity />
                <Logout />
            </View>
        </ScrollView>
    );
};

export default ProfileScreen;