import {supabase} from "./supabase";

export async function signUp(
    email: string,
    password: string,
    username: string,
) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) throw error;

    const userId = data.user?.id;
    if (!userId) throw new Error("Nie udało się utworzyć użytkownika");

    const { error: profileError } = await supabase
        .from("profiles")
        .insert({
            id: userId,
            username,
            avatar_url: "",
        });

    if (profileError) {
        console.error("Profile creation error:", profileError);
        throw new Error("Konto utworzone, ale nie udało się stworzyć profilu: " + profileError.message);
    }

    return data;
}

export async function signInWithUsername(
    username: string,
    password: string,
) {
    const clearUserName = username.trim().toLowerCase()
    const { data:profile, error:profileError } = await supabase.from("profiles").select("id").eq("username",clearUserName).maybeSingle()
    if(profileError) throw profileError
    if(!profile) throw new Error("Nie udało się znaleźć użytkownika")

    const { data:userData, error:userError } = await supabase.rpc("get_user_email", { user_id: profile.id})
    
    if (userError || !userData) throw new Error("Nie udało się zalogować");

    const { data:signInData, error:signInError } = await supabase.auth.signInWithPassword({
        email: userData,
        password,
    });
    if(signInError) throw signInError;
    return signInData;
}

export async function signOut() {
    await supabase.auth.signOut();
}

export async function deleteAccount() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return;

    // Delete all user related data
    await supabase.from('walks').delete().eq('user_id', user.id);
    await supabase.from('goals').delete().eq('user_id', user.id);
    await supabase.from('profiles').delete().eq('id', user.id);

    // Sign out (Final step)
    await supabase.auth.signOut();
}