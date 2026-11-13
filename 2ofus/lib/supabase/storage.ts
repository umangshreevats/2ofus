import type { SupabaseClient } from "@supabase/supabase-js";
import { supabaseAdmin } from "@/lib/supabase/admin";

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

type TellAndGetCategory = "liking" | "unliking";

export async function uploadTellAndGetImage(
    supabase: SupabaseClient,
    file: File,
    coupleId: string,
    category: TellAndGetCategory
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
        throw new Error("Image size must be less than 10MB.");
    }

    const fileExtension = file.type.split("/")[1];

    const filePath = `${category}/${coupleId}/${crypto.randomUUID()}.${fileExtension}`;

    const { data, error } = await supabase.storage
        .from("liking-unliking")
        .upload(filePath, file, {
            contentType: file.type,
            upsert: false
        });

    if (error) {
        throw new Error(error.message);
    }

    return {
        path: data.path
    };
}


// path finder
export function getStoragePath(url: string, bucket: string): string {
    try {
        const parsedUrl = new URL(url);

        const storageMarker = "/storage/v1/object/";
        const storageIndex = parsedUrl.pathname.indexOf(storageMarker);

        if (storageIndex === -1) {
            throw new Error("Invalid Supabase storage URL");
        }

        const storagePath = parsedUrl.pathname.slice(
            storageIndex + storageMarker.length
        );

        const parts = storagePath.split("/");

        // Supports public, sign and authenticated object URLs
        if (["public", "sign", "authenticated"].includes(parts[0])) {
            parts.shift();
        }

        const urlBucket = parts.shift();

        if (urlBucket !== bucket || !parts.length) {
            throw new Error("Invalid bucket or storage path");
        }

        return decodeURIComponent(parts.join("/"));
    } catch (error) {
        throw new Error(
            error instanceof Error
                ? error.message
                : "Unable to extract storage path"
        );
    }
}