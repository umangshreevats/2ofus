import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { createNotification } from "@/lib/notification/sendNotification";


// DELETE: /api/couple/coupling-request/:requestId/reject
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ requestId: string }> }) {


    try {

        const supabase = await createClient();

        const { user, userData } = await getCurrentUser();

        if (!user || !userData) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }


        const { requestId } = await params;

        const { data: requestInfo, error: requestInfoError } = await supabase
            .from("coupling_requests")
            .select("sender_id, receiver_id, id")
            .eq("id", requestId)
            .single();

        if (requestInfoError || !requestInfo) {

            return NextResponse.json(
                { message: "Error reading the request informations" },
                { status: 500 }
            );
        }

        const { data: couplingRequest, error: crError } = await supabase
            .from("coupling_requests")
            .update({ status: "rejected" })
            .eq("id", requestId)
            .select()
            .maybeSingle();


        if (crError) {
            return NextResponse.json(
                { error: crError.message },
                { status: 500 }
            );
        }

        const { data: couplingRequestDelete, error: crDeleteError } = await supabase
            .from("coupling_requests")
            .delete()
            .eq("id", requestId)
            .select("id")
            .maybeSingle();


        if (crDeleteError) {
            return NextResponse.json(
                { message: "Error deleting the coupling request" },
                { status: 500 }
            );
        }

        await createNotification({
            senderId: user.id,
            recipientId: requestInfo?.sender_id,
            image: userData.profile_image ?? null,
            type: "request_accepted",
            title: `${userData.username} has rejected your couple request.`,
            message: `Sorry, it seems like ${userData.username},
                    wasn't the one you were looking for, try another one, or invite your soulmate.`
        });

        return NextResponse.json(
            {
                message: "Request updated successfully",
                couplingRequest,
                couplingRequestDelete
            },
            { status: 200 }
        );

    } catch (err) {

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}