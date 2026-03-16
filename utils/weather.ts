import * as Location from 'expo-location';
import { OPENWEATHER_API_KEY } from '@env';

export const getWeather = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        throw new Error('Brak uprawnień do lokalizacji');
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=pl`);
    const data = await response.json();

    return data;
};