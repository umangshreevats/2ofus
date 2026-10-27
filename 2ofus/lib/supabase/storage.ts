import type { SupabaseClient } from "@supabase/supabase-js";


// User profile image storage: public
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


// Couple Bio image storage: public
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

// Couple library image storage: private
export async function uploadMemoryImage(
    supabase: SupabaseClient,
    file: File,
    coupleId: string
) {
    const fileExtension = file.type.split("/")[1];

    const filePath = `${coupleId}/${crypto.randomUUID()}.${fileExtension}`;

    const { data, error } = await supabase.storage
        .from("couple-memories")
        .upload(filePath, file, {
            contentType: file.type,
            upsert: false
        });

    if (error) {
        throw new Error(error.message);
    }

    return { path: data.path };
}


// path finder
export function getStoragePath(url: string, bucket: string) {
    const marker = `/${bucket}/`;
    const index = url.indexOf(marker);

    if (index === -1) {
        throw new Error("Invalid storage URL");
    }

    return decodeURIComponent(
        url.slice(index + marker.length).split("?")[0]
    );
}