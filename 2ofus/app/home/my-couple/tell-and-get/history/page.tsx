import { getCurrentUser } from "@/lib/auth";
import History from "@/features/tell-and-get/History";
import { createClient } from "@/utils/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { decrypt } from "@/lib/encryption";

export default async function TellAndGetHistoryPage({
    searchParams
}: {
    searchParams: Promise<{ page?: number, category?: "liking" | "unliking" }>
}) {
    const { coupleData } = await getCurrentUser();

    const supabase = await createClient();

    const { category, page } = await searchParams;

    const currentPage = Math.max(1, Number(page) || 1);

    const limit = 10;
    const from = (currentPage - 1) * limit;
    const to = from + limit - 1;
    let totalPages = 0;


    // Supabase query to fetch the likings and unlikings
    let query = supabase.from('tell_and_get')
        .select(`*,
        user:users!tell_and_get_user_id_fkey (
            id,
            firstname,
            lastname,
            profile_image,
            username,
            email
        )`)
        .eq("couple_id", coupleData.id);
    let queryCount = 
    supabase.from('tell_and_get')
        .select(`*`, { count: "exact", head: true })
        .eq("couple_id", coupleData.id);


    if (category) {
        query = query.eq("category", category);
        queryCount = queryCount.eq("category", category);
    }

    const { data: historyData, error: historyError } = await query.range(from, to);

    const { count } = await queryCount;


    if (count) {
        totalPages = Math.ceil((count ?? 0) / 10);
    }


    if (historyError || !historyData) {
        console.error("History failed to retrieve");
    }


    // Fetching the image url, and decrypting the messages
    const updatedHistoryData = await Promise.all(
        (historyData ?? [])?.map(async (history) => {

            let historyImage = null;
            let decryptedPredefinedMessages = null;
            let userMessage = null;
            if (history.image_id) {
                const { data: imageUrl, error: imageUrlError } = await supabaseAdmin.storage
                    .from("liking-unliking")
                    .createSignedUrl(history.image_id, 3600);

                if (imageUrlError || !imageUrl) {
                    console.error("Error getting the signed url: ", imageUrlError);
                } else {
                    historyImage = imageUrl?.signedUrl;
                }
            }

            if (history.predefined_messages) {
                const decryptedPredefinedMessagesString = decrypt(history.predefined_messages);
                decryptedPredefinedMessages = JSON.parse(decryptedPredefinedMessagesString);
            }

            if(history.user_message) {
                const decryptedUserMessage = decrypt(history.user_message);
                userMessage = decryptedUserMessage;
            }
            return {
                ...history,
                image_id: historyImage,
                predefined_messages: decryptedPredefinedMessages,
                user_message: userMessage
            }
        })
    );


    return <section className="w-full">
        <History historyData={updatedHistoryData ?? []} 
        totalPages={totalPages} 
        currentPage={currentPage} 
        category={category ?? null} />
    </section>
}