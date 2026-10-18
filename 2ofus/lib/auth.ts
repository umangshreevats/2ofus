import { createClient } from "@/utils/supabase/server";

export async function getCurrentUser() {
    const supabase = await createClient();

    // user authenticated to the supabase
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        return { user: null, userData: null, coupleData : null };
    }

    // user data saved in the database
    const { data: userData, error: userDataError } = await supabase.from("users").select("*").eq("id", user.id).single();

    if(userDataError || !userData) {
        return { user, userData: null, coupleData: null };
    }

    //user joint profile created with the loved ones
    const { data: coupleData, error: coupleDataError } = await supabase.from("couples")
    .select("*")
    .or(`partner_1.eq.${user.id}, partner_2.eq.${user.id}`)
    .single();

    if(coupleDataError || !coupleData) {
        return { user, userData, coupleData: null };
    }

    return { user, userData, coupleData };
}