export interface TellAndGet {
    id?: string;
    user_id?: string;
    couple_id?: string;
    predefined_messages?: string[];
    user_message?: string;
    image_id?: string;
    is_pinned?: boolean;
    created_at?: string;
    updated_at?: string;
    category?: "liking" | "unliking";
}


