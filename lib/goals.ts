import { supabase } from "./supabase";

export interface Goal {
    id: string;
    name: string;
    type: string;
    value: number;
    unit: string;
    finished: boolean;
    deadline: string | null;
    createdAt: string;
    current: number;
    target: number;
}

export async function saveGoalOnline(goal: Goal) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return;

    const { error } = await supabase
        .from('goals')
        .upsert({
            id: goal.id, // Using existing ID to allow updates
            name: goal.name,
            type: goal.type,
            value: goal.value,
            unit: goal.unit,
            finished: goal.finished,
            deadline: goal.deadline,
            created_at: goal.createdAt,
            current: goal.current,
            target: goal.target,
            user_id: user.id
        })
    
    if (error) {
        console.error("Error saving goal:", error);
        throw error;
    }
}

export async function deleteGoalOnline(goalId: string) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return;

    const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', goalId)
        .eq('user_id', user.id)

    if (error) {
        console.error("Error deleting goal:", error);
        throw error;
    }
}

export async function loadGoalsOnline() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return [];

    const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.error("Error loading goals:", error);
        return [];
    }
    
    return data.map(goal => ({
        ...goal,
        createdAt: goal.created_at,
    }))
}

export async function clearAllGoalsOnline() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return;

    const { error } = await supabase
        .from('goals')
        .delete()
        .eq('user_id', user.id);

    if (error) {
        console.error("Error clearing all goals online:", error);
        throw error;
    }
}