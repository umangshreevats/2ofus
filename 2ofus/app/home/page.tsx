import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import SearchPartner from "@/features/profile-page/SearchPartner";
import { createClient } from "@/utils/supabase/server";

export default async function HomePage() {
    const { user, userData, coupleData } = await getCurrentUser();

    if (!user) {
        redirect("/");
    }

    if (!userData) {
        throw new Error("User profile not found");
    }

    if(coupleData) {
        redirect("/home/my-couple");
    }

    const supabase = await createClient();

    const [sentResult, receivedResult] = await Promise.all([
        supabase
            .from("coupling_requests")
            .select(`
                *,
                receiver:users!coupling_requests_receiver_id_fkey (
                    id,
                    username,
                    firstname,
                    lastname,
                    profile_image
                )
            `)
            .eq("sender_id", userData.id)
            .order("created_at", { ascending: false })
            .limit(3),

        supabase
            .from("coupling_requests")
            .select(`
                *,
                sender:users!coupling_requests_sender_id_fkey (
                    id,
                    username,
                    firstname,
                    lastname,
                    profile_image
                )
            `)
            .eq("receiver_id", userData.id)
            .order("created_at", { ascending: false })
            .limit(3)
    ]);

    if (sentResult.error) {
        console.error("Sent requests error:", sentResult.error);
    }

    if (receivedResult.error) {
        console.error("Received requests error:", receivedResult.error);
    }

    return (
        <div>
            <SearchPartner
                requestsSend={sentResult.data ?? []}
                requestsReceived={receivedResult.data ?? []}
            />
        </div>
    );
}