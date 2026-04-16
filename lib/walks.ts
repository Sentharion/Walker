import { supabase } from "./supabase";

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
    if (!user) return; 

    const { data, error } = await supabase
        .from('walks')
        .upsert({
            id: localId,
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
    
    return data.map(walk => ({
        ...walk,
        createdAt: walk.created_at,
        points: walk.walk_points ? walk.walk_points.sort((a: any, b: any) => a.order_index - b.order_index) : []
    }))
}

export async function deleteWalkOnline(walkId: string | number, createdAt?: string) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return;

    await supabase.from('walk_points').delete().eq('walk_id', walkId);

    let { data, error } = await supabase
        .from('walks')
        .delete()
        .eq('id', walkId)
        .eq('user_id', user.id)
        .select()

    let deletedCount = data && data.length ? data.length : 0;

    if (createdAt && deletedCount === 0) {
        const { data: walksToDelete } = await supabase
            .from('walks')
            .select('id')
            .eq('created_at', createdAt)
            .eq('user_id', user.id)
            
        if (walksToDelete && walksToDelete.length > 0) {
            for (const walk of walksToDelete) {
                await supabase.from('walk_points').delete().eq('walk_id', walk.id);
            }
        }

        const { data: data2, error: error2 } = await supabase
            .from('walks')
            .delete()
            .eq('created_at', createdAt)
            .eq('user_id', user.id)
            .select()
            
        if (data2 && data2.length > 0) {
            deletedCount += data2.length;
        }
        if (error2) error = error2;
    }

    if (error) {
        console.error("Error deleting walk online:", error);
        throw error;
    }
    
    if (deletedCount === 0) {
        throw new Error(`Nie usunięto w bazie. (Możliwy brak RLS lub konflikt ID - próbowałem usunąć id: ${walkId}, createdAt: ${createdAt})`);
    }
}

export async function clearAllWalksOnline() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return;

    const { data: userWalks } = await supabase
        .from('walks')
        .select('id')
        .eq('user_id', user.id);
        
    if (userWalks && userWalks.length > 0) {
        const walkIds = userWalks.map(w => w.id);
        await supabase.from('walk_points').delete().in('walk_id', walkIds);
    }

    const { error } = await supabase
        .from('walks')
        .delete()
        .eq('user_id', user.id);

    if (error) {
        console.error("Error clearing all walks online:", error);
        throw error;
    }
}