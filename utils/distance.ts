import { getDistance } from "geolib";

export const calculateTotalDistance = (points: {latitude: number, longitude: number}[]) => {
    if(points.length < 2) return 0;
    const totalDistance = points.reduce((acc, point, index) => {
        if (index === 0) return acc;
        const prevPoint = points[index - 1];
        const distance = getDistance(prevPoint, point);
        return acc + distance;
    }, 0);
    return totalDistance;
}; 