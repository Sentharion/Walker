import {SavedWalk} from "@/store/savedStore";

export const getAllTimeStats = (walks: SavedWalk[]) => {
    return walks.reduce((acc, walk) => {
       if(!walk.finished) return acc;
       acc.distance += walk.distance;
       acc.duration += walk.duration;
       acc.steps += walk.steps;
       acc.calories += walk.calories;
       acc.walks += 1;
       return acc;
    }, {
        distance: 0,
        duration: 0,
        steps: 0,
        calories: 0,
        walks: 0,
    });
    
}

export const getThisWeekStats = (walks: SavedWalk[]) => {
    const now = new Date();

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1);
    startOfWeek.setHours(0, 0, 0, 0);
    
    return walks.reduce((acc, walk) => {
       const walkDate = new Date(walk.createdAt);
       if(walkDate >= startOfWeek && walk.finished){
        acc.distance += walk.distance;
        acc.duration += walk.duration;
        acc.steps += walk.steps;
        acc.calories += walk.calories;
        acc.walks+=1;
       }
       return acc;
    }, {
        distance: 0,
        duration: 0,
        steps: 0,
        calories: 0,
        walks: 0,
    });
}

export const getDailyStats = (walks: SavedWalk[]) => {
    const days = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Niedz"];
    const today = new Date()

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7));
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);
    
    const result = days.map((day) => ({
        day,
        distance: 0,
        duration: 0,
        steps: 0,
        calories: 0,
        walks: 0,
        finished: false,
    }));

    walks.forEach(walk => {
        if(!walk.finished) return;
        const walkDate = new Date(walk.createdAt);
        const dayIndex = (walkDate.getDay() + 6) % 7;

        if(walkDate >= startOfWeek && walkDate <= endOfWeek){
            result[dayIndex].distance += walk.distance;
            result[dayIndex].duration += walk.duration;
            result[dayIndex].steps += walk.steps;
            result[dayIndex].calories += walk.calories;
            result[dayIndex].walks+=1;
        }
    });
    
    return result;
}

export const getMonthStats = (walks: SavedWalk[]) => {
    const months = [
        "Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec",
        "Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"
    ];

    const result = months.map((month) => ({
        month,
        distance: 0,
        duration: 0,
        steps: 0,
        calories: 0,
        walks: 0,
    }));

    walks.forEach(walk => {
        if(!walk.finished) return;
        const walkDate = new Date(walk.createdAt);
        const monthIndex = walkDate.getMonth(); // 0-11

        result[monthIndex].distance += walk.distance;
        result[monthIndex].duration += walk.duration;
        result[monthIndex].steps += walk.steps;
        result[monthIndex].calories += walk.calories;
        result[monthIndex].walks += 1;
    });

    return result;
}