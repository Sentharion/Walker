import { getDefaultConfig } from "expo/metro-config";
import { withNativeWind } from 'nativewind/metro';
 
const config = getDefaultConfig(__dirname)
 
// @ts-ignore - NativeWind types are currently incompatible with Expo 54/Metro internal types
export default withNativeWind(config, { input: './global.css' })