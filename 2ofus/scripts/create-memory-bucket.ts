import { supabaseAdmin } from "@/lib/supabase/admin";

async function createMemoryBucket() {
    const { data, error } =
        await supabaseAdmin.storage.createBucket("couple-memories", {
            public: false,
            fileSizeLimit: 10 * 1024 * 1024,
            allowedMimeTypes: [
                "image/jpeg",
                "image/png",
                "image/webp"
            ]
        });

    if (error) {
        console.error("Bucket creation failed:", error.message);
        return;
    }

    console.log("Private memory bucket created successfully:", data);
}

createMemoryBucket();