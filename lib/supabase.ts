import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kpqokawgmcughoajfacf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwcW9rYXdnbWN1Z2hvYWpmYWNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNjA2ODksImV4cCI6MjA4OTgzNjY4OX0.GKmaXmaRi6mIniaSgH2mZROie1Yx4sFqPSJEHKYvavk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
    },
})