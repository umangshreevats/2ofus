export interface TellAndGet {
    id?: string;
    user_id?: string;
    couple_id?: string;
    predefined_messages?: string[] | { iv: string, authTag: string , encryptedData: string };
    user_message?: string | { iv: string, authTag: string , encryptedData: string };
    image_id?: string;
    is_pinned?: boolean;
    created_at?: string;
    updated_at?: string;
    category?: "liking" | "unliking";
}


