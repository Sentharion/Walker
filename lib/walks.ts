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

export async function saveWalkOnline(walk: WalkData, points: Point[], localId?: string) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return; // Silent skip if not logged in, or throw error

    // Create a copy of walk data without the points array if it exists

    const { data, error } = await supabase
        .from('walks')
        .upsert({
            id: localId, // Match the app's local ID
            name: walk.name,
            difficulty: walk.difficulty,
            distance: walk.distance,
            duration: walk.duration,
            steps: walk.steps,
            calories: walk.calories,
            note: walk.note,
            finished: walk.finished,
            created_at: walk.createdAt,
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
            order_index: i
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
        points: walk.walk_points ? walk.walk_points.sort((a: any, b: any) => a.order_index - b.order_index) : []
    }))
}

export async function deleteWalkOnline(walkId: string | number) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return;

    // Supabase will automatically delete walk_points if 'on delete cascade' is set.
    // If not, we should delete them manually or ensure the schema is correct.
    const { error } = await supabase
        .from('walks')
        .delete()
        .eq('id', walkId)
        .eq('user_id', user.id)

    if (error) {
        console.error("Error deleting walk online:", error);
        throw error;
    }
}

export async function clearAllWalksOnline() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return;

    const { error } = await supabase
        .from('walks')
        .delete()
        .eq('user_id', user.id);

    if (error) {
        console.error("Error clearing all walks online:", error);
        throw error;
    }
}