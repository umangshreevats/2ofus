import CoupleHome from "@/features/couple-page/CoupleHome";
import { getCurrentUser } from "@/lib/auth";
import { decrypt } from "@/lib/encryption";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export default async function CouplePage() {

    const { coupleData } = await getCurrentUser();

    if (!coupleData) {
        redirect("/home");
    }

    const supabase = await createClient();

    const { data: memorablePhotos, error: memorablePhotosError } = await supabase
        .from("memory")
        .select("*")
        .eq('couple_id', coupleData.id)
        .eq("content_type", "image")
        .limit(5)

    if (memorablePhotosError) {
        throw memorablePhotosError;
    }

    const updatedMemorablePhotos = await Promise.all(
        (memorablePhotos ?? []).map(async (photo) => {
            const decryptedTitle = decrypt(photo.title);

            const { data, error } = await supabase.storage
                .from("couple-memories")
                .createSignedUrl(photo.media_id, 3600);

            if (error) {
                console.error("Signed URL error:" + error.message);

                return {
                    ...photo,
                    title: decryptedTitle,
                    media_id: "",
                };
            }

            return {
                ...photo,
                title: decryptedTitle,
                media_id: data.signedUrl,
            };
        })
    );

    return <>
        <CoupleHome memorablePhotos={updatedMemorablePhotos} />
    </>
}