import type { SupabaseClient } from "@supabase/supabase-js";

export async function uploadProfileImage(
    supabase: SupabaseClient,
    file: File,
    userId: string
) {
    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ];

    if (!allowedTypes.includes(file.type)) {
        throw new Error("Only JPEG, PNG and WebP images are allowed.");
    }

    if (file.size > 5 * 1024 * 1024) {
        throw new Error("Image size must be less than 5MB.");
    }

    const fileExtension = file.type.split("/")[1];

    const filePath = `${userId}/${crypto.randomUUID()}.${fileExtension}`;

    const { data, error } = await supabase.storage
        .from("profile-images")
        .upload(filePath, file, {
            contentType: file.type,
            cacheControl: "3600",
            upsert: false
        });

    if (error) {
        throw new Error(error.message);
    }

    const { data: publicUrlData } = supabase.storage
        .from("profile-images")
        .getPublicUrl(data.path);

    return {
        path: data.path,
        publicUrl: publicUrlData.publicUrl
    };
}



export async function uploadBioImage(
    supabase: SupabaseClient,
    file: File,
    profileId: string
) {
    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ];

    if (!allowedTypes.includes(file.type)) {
        throw new Error("Only JPEG, PNG and WebP images are allowed.");
    }

    if (file.size > 10 * 1024 * 1024) {
        throw new Error("Image size must be less than 5MB.");
    }

    const fileExtension = file.type.split("/")[1];

    const filePath = `${profileId}/${crypto.randomUUID()}.${fileExtension}`;

    const { data, error } = await supabase.storage
        .from("couple-bio-images")
        .upload(filePath, file, {
            contentType: file.type,
            cacheControl: "3600",
            upsert: false
        });

    if (error) {
        throw new Error(error.message);
    }

    const { data: publicUrlData } = supabase.storage
        .from("couple-bio-images")
        .getPublicUrl(data.path);

    return {
        path: data.path,
        publicUrl: publicUrlData.publicUrl
    };
}