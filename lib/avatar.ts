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
    const response = await fetch(image.uri);
    const blob = await response.blob();
    
    // 3. Using user.id instead of undefined userId
    const filePath = `${user.id}.jpg`;

    // 4. Fixed Syntax Error
    const { error } = await supabase.storage
        .from('avatars')
        .upload(filePath, blob, { upsert: true });

    if (error) throw error;

    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
    return `${data.publicUrl}?t=${new Date().getTime()}`;
}

export const updateAvatar = async (avatarUrl: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No user logged in");

    // 5. Using user.id to update profile
    const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: avatarUrl })
        .eq('id', user.id);
        
    if (error) throw error;
}