import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import SearchPartner from "@/features/profile-page/SearchPartner";
import { createClient } from "@/utils/supabase/server";


/*The home page displays a search bar along with the users
that the current user wants to couple, and the users that wants to couple
with the current user.*/
export default async function HomePage() {
    const { userData, coupleData } = await getCurrentUser();

    /*Couple Id is already created*/
    if(coupleData) {
        redirect("/home/my-couple");
    }

    const supabase = await createClient();

    /*Fetching all the users, the current user
    has send the request for coupling to, and the users that has send
    the request to couple to the current user.*/
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
            .eq("status", "pending")
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
            .eq("status", "pending")
            .order("created_at", { ascending: false })
            .limit(3)
    ]);

    /*Sender user fetching error*/
    if (sentResult.error) {
        throw new Error("Sent requests error:" + sentResult.error);
    }

    /*Receiver user fetching error*/
    if (receivedResult.error) {
        throw new Error("Received requests error:" + receivedResult.error);
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