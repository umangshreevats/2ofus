import { createClient } from "@/utils/supabase/server";

export async function getCurrentUser() {
    const supabase = await createClient();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        return { user: null, userData: null };
    }


    const { data: userData, error: userDataError } = await supabase.from("users").select("*").eq("id", user.id).single();

    if(userDataError || !userData) {
        return { user, userData: null };
    }

    return { user, userData };
}