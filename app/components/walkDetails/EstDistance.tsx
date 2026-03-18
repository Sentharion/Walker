import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

interface EstDistanceProps {
    distance: number;
}

const EstDistance = ({ distance }: EstDistanceProps) => {
    return (
        <View className="bg-white shadow-lg rounded-3xl my-6 mx-8 overflow-hidden">
            <LinearGradient
                colors={['#10b981', '#14b8a6']}
                className='absolute inset-0 rounded-3xl'
            />
            <View className="p-5 gap-2">
                <Text className="text-md text-white opacity-90">Przybliżony dystans</Text>
                <Text className="text-4xl font-bold text-white">{(distance / 1000).toFixed(2)} km</Text>
                <Text className="text-md text-white opacity-80 font-medium">Trasa gotowa do przejścia</Text>
            </View>
        </View>
    );
};

export default EstDistance;