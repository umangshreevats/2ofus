// Individual user profiles
export interface Users {
    id?: string;
    username?: string;
    email?: string;
    profile_image?: string | null;
    firstname?: string | null;
    lastname?: string | null;
    dob?: string | null;
    gender?: string | null;
    is_profile_completed?: boolean;
    interests?: {
        food?: string[];
        music?: string[];
        places?: string[];
        sports?: string[];
        lifestyle?: string[];
        hobbies?: string[];
        entertainment?: string[];
    } | null;
    created_at?: string;
    updated_at?: string;
}



// Couple Shared profiles

export interface Couples {
    id: string;
    couple_name: string;
    partner_1: string | {
        id: string;
        firstname: string;
        lastname: string;
        email?: string;
        username: string;
        profile_image: string;
        interests: unknown;
    };
    partner_2: string | {
        id: string;
        firstname: string;
        lastname: string;
        email?: string;
        username: string;
        profile_image: string;
        interests: unknown;
    };
    cover_image: string;
    relationship_status: string;
    anniversary_date: string;
    first_meet_date: string;
    first_meet_location: string;
    bio: string;
    created_at: string;
    updated_at: string;
    is_profile_completed: boolean;
}