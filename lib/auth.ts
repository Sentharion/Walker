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

    await supabase.from("profiles").insert({
        id: userId,
        username,
        avatar_url: "",
    });

    return data;
}

export async function signInWithUsername(
    username: string,
    password: string,
) {
    const { data:profile, error:profileError } = await supabase.from("profiles").select("id").eq("username",username).single()
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