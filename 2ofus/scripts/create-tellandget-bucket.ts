import { supabaseAdmin } from "@/lib/supabase/admin";

async function createTellandGetBucket() {
    const { data, error } =
        await supabaseAdmin.storage.createBucket("liking-unliking", {
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

    console.log("Bucket created successfully:", data);
}

createTellandGetBucket();