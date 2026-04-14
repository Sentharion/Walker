import {SavedWalk} from "../store/savedStore";

export const getRecords = (walks: SavedWalk[]) => {
    const finishedWalks = walks.filter(w => w.finished);

    if(finishedWalks.length === 0) {
        return {
            distance: {distance: 0, createdAt: "", finishedAt: ""},
            time: {duration: 0, createdAt: "", finishedAt: ""},
            steps: {steps: 0, createdAt: "", finishedAt: ""},
        }
    }

    const longestDistance = finishedWalks.reduce((max, walk) => walk.distance > max.distance ? walk : max);
    const fastestWalk = finishedWalks.reduce((max, walk) => walk.duration > max.duration ? walk : max);
    const mostSteps = finishedWalks.reduce((max, walk) => walk.steps > max.steps ? walk : max);

    return {
        distance: longestDistance,
        time: fastestWalk,
        steps: mostSteps,
    }
    
}

export const getRecentWalks = (walks: SavedWalk[],limit:number = 3) => {
    return walks.filter(w => w.finished).sort((a, b) => new Date(b.finishedAt || b.createdAt).getTime() - new Date(a.finishedAt || a.createdAt).getTime()).slice(0, limit);
}

export const getStreak = (walks: SavedWalk[]) => {
    const finishedWalks = walks.filter(w => w.finished);

    const walkedDays = new Set(
        finishedWalks.map(w => new Date(w.finishedAt || w.createdAt).toDateString())
    );

    let streak = 0;
    let currentDate = new Date();

    if (!walkedDays.has(currentDate.toDateString())) {
        currentDate.setDate(currentDate.getDate() - 1);
    }

    while (walkedDays.has(currentDate.toDateString())) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
};

export const formatDate = (dateString: string) => {
    if(!dateString) return "Brak danych";
    const date = new Date(dateString);

    return date.toLocaleDateString("pl-PL", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};