import { View, Text } from 'react-native';
import { Cloud } from 'lucide-react-native';

const WeatherWidget = () => {
    return (
        <View className='bg-white shadow-md rounded-xl p-5'>
            <View className='flex-row items-center justify-between gap-3'>
                <Text className='text-xl font-extrabold text-black'>Dzisiejsza Pogoda</Text>
                <Cloud size={18} color="gray" />
            </View>
            <View className='flex-row items-center gap-5 pt-3'>
                <Text className='text-5xl'>⛅</Text>
                <View className='flex-col items-start justify-center'>
                    <Text className='text-3xl font-bold'>12°C</Text>
                    <Text className='text-md text-gray-500'>Zachmurzenie umiarkowane</Text>
                </View>
            </View>
        </View>
    );
};

export default WeatherWidget;