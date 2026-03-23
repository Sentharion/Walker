import { supabase } from "./supabase"

export interface Point {
    latitude: number;
    longitude: number;
}

export interface WalkData {
    name: string;
    difficulty: string;
    distance: number;
    duration: number;
    steps: number;
    calories: number;
    note: string;
    finished: boolean;
    createdAt: string;
}

export async function saveWalkOnline(walk: WalkData, points: Point[]) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return; // Silent skip if not logged in, or throw error

    // Create a copy of walk data without the points array if it exists

    const { data, error } = await supabase
        .from('walks')
        .insert({
            name: walk.name,
            difficulty: walk.difficulty,
            distance: walk.distance,
            duration: walk.duration,
            steps: walk.steps,
            calories: walk.calories,
            note: walk.note,
            finished: walk.finished,
            created_at: walk.createdAt, // Assumes column name is created_at
            user_id: user.id
        })
        .select()
        .single()

    if (error) {
        console.error("Error saving walk:", error);
        throw error;
    }

    const walkId = data.id
    
    if (points.length > 0) {
        const pointsData = points.map((p, i) => ({
            walk_id: walkId,
            latitude: p.latitude,
            longitude: p.longitude,
            order: i
        }))

        const { error: pointsError } = await supabase.from('walk_points').insert(pointsData)
        if (pointsError) {
            console.error("Error saving walk points:", pointsError);
            throw pointsError;
        }
    }

    return data;
}

export async function loadWalksOnline() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return [];

    const { data, error } = await supabase
        .from('walks')
        .select('*, walk_points(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.error("Error loading walks:", error);
        return [];
    }
    
    // Map data back to our app's structure if necessary
    return data.map(walk => ({
        ...walk,
        createdAt: walk.created_at,
        points: walk.walk_points ? walk.walk_points.sort((a: any, b: any) => a.order - b.order) : []
    }))
}