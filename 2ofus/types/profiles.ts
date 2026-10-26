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