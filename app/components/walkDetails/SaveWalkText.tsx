import { Text, View } from "react-native";

const SaveWalk = () => {
    return (
        <View className="bg-blue-50 border border-blue-200 rounded-3xl my-2 mx-8 overflow-hidden mb-5">
            <View className="flex-row py-5 px-5 gap-4">
                <View className="items-center justify-center">
                    <Text className="text-3xl">💾</Text>
                </View>
                <View className="flex-1 flex-col gap-1">
                    <Text className="text-lg text-blue-900 font-bold">Zapisz spacer</Text>
                    <Text className="text-sm text-blue-700/80 leading-5">
                        Ta trasa zostanie zapisana w twojej kolekcji. Możesz ją zacząć w dowolnym momencie w sekcji &quot;Moje spacery&quot;.
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default SaveWalk;