import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const GradientProgressBar = ({ progress,finished }: { progress: number,finished:boolean }) => {
  return (
    <View className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
      <LinearGradient
        colors={finished ? ["#10b981", "#22c55e"] : ['#eab308', '#f97316']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          height: "100%",
          width: `${progress * 100}%`,
        }}
      />
    </View>
  );
};

export default GradientProgressBar;