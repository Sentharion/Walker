import { View, TouchableOpacity, Text, ImageBackground, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import walkIMG from "../../assets/images/walk.png";
import { Navigation } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { height} = Dimensions.get('window');

const WalkStartButton = () => {
    const router = useRouter();
    return (
        <View className='w-full absolute' style={{ top: height * 0.308, paddingHorizontal: 28 }}>
            <TouchableOpacity className='w-full overflow-hidden rounded-3xl shadow-lg' style={{ height: height * 0.23 }} activeOpacity={0.8} onPress={() => router.push('/map')}>
                <LinearGradient
                    colors={['#a7f3d0', '#5eead4']}
                    className='absolute inset-0'
                />
                <ImageBackground
                    source={walkIMG}
                    className='absolute inset-0 opacity-40'
                    resizeMode="cover"
                />
                <LinearGradient
                    colors={['transparent', 'rgba(167, 243, 208, 0.7)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0.7, y: 0 }}
                    className='absolute inset-0'
                />
                <View className='flex-1 justify-end p-6'>
                    <View className='flex-row items-center gap-3'>
                        <View className='bg-white/20 backdrop-blur rounded-full p-3'>
                            <Navigation color="white" size={24} />
                        </View>
                        <View className='flex flex-col items-start justify-center'>
                            <Text className='text-white text-2xl font-bold'>Rozpocznij Nowy Spacer</Text>
                            <Text className='text-white text-md font-medium'>Zacznij planować swoją trasę</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default WalkStartButton;