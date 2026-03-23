import * as ImagePicker from 'expo-image-picker';
import { supabase } from './supabase';

export const pickImage = async () => {
    // 1. Get the current user session
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No user logged in");

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5, // Lower quality slightly for faster upload/storage efficiency
    });

    // 2. Fixed Logic: stop if user canceled
    if (result.canceled || !result.assets[0]) {
        return null;
    }

    const image = result.assets[0];
    
    // Create FormData for the upload
    const formData = new FormData();
    const fileName = `${user.id}.jpg`;
    
    // Explicitly delete previous avatar from storage before uploading new one
    try {
        await supabase.storage.from('Avatars').remove([fileName]);
    } catch (e) {
        // Ignore errors if file doesn't exist
    }

    // cast to any to avoid TypeScript errors with FormData 'uri' prop in React Native
    formData.append('file', {
        uri: image.uri,
        name: fileName,
        type: 'image/jpeg',
    } as any);

    // 4. Upload using standard Supabase storage method (FormData works best in RN)
    const { error } = await supabase.storage
        .from('Avatars')
        .upload(fileName, formData, { 
            upsert: true,
            contentType: 'image/jpeg' 
        });

    if (error) {
        console.error("Storage upload error:", error);
        throw error;
    }

    const { data: urlData, error: signedError } = await supabase.storage
        .from('Avatars')
        .createSignedUrl(fileName, 31536000); // 1 year expiry

    if (signedError) throw signedError;
    return urlData.signedUrl;
}

export const loadProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    let { data, error } = await supabase
        .from('profiles')
        .select('username, motto, avatar_url')
        .eq('id', user.id)
        .single();

    // If profile doesn't exist (PGRST116), create it!
    if (error && error.code === 'PGRST116') {
        const { data: newData, error: createError } = await supabase
            .from('profiles')
            .upsert({
                id: user.id,
                username: user.email?.split('@')[0] || "Użytkownik",
                avatar_url: ""
            })
            .select()
            .single();
        
        if (createError) {
            console.error("Critical: Could not auto-create profile", createError);
            return null;
        }
        data = newData;
    } else if (error) {
        console.error("Load profile error:", error);
        return null;
    }
    
    // If the bucket is PRIVATE, we must generate a signed URL to show it
    if (data.avatar_url && !data.avatar_url.includes('token=')) {
        try {
            // Get the filename (e.g., user_id.jpg) from the URL or profile
            const fileName = `${user.id}.jpg`;
            const { data: signedData } = await supabase.storage
                .from('Avatars')
                .createSignedUrl(fileName, 31536000); // 1 year
            
            if (signedData) {
                data.avatar_url = signedData.signedUrl;
            }
        } catch (e) {
            console.error("Error creating signed URL:", e);
        }
    }
    
    return data;
}

export const updateProfile = async (updates: { username?: string, motto?: string, avatar_url?: string }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No user logged in");

    const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);
        
    if (error) throw error;
}