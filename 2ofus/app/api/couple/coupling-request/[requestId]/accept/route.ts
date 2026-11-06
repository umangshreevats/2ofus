import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { createNotification } from "@/lib/notification/sendNotification";

// PATCH: /api/couple/coupling-request/:requestId/accept
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ requestId: string }> }) {


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

        if(requestInfoError || !requestInfo) {

            return NextResponse.json(
                { message: "Error reading the request informations" },
                { status: 500 }
            );
        }


        const { data: couplingRequest, error: crError } = await supabase.rpc(
            "process_coupling_request",
            {
                p_request_id: requestId,
            }
        );

        if (crError) {
            console.error("Coupling request error:", crError);

            return NextResponse.json(
                { error: crError.message },
                { status: 400 }
            );
        }

        await createNotification({
            senderId: user.id,
            recipientId: requestInfo?.sender_id,
            image: userData.profile_image ?? null,
            type: "request_accepted",
            title: `${userData.username} has accepted your couple request.`,
            message: `Congrats, your couple request has been accepted by ${userData.username},
            go ahead and check and change your couple profile now!`
        });


        return NextResponse.json(
            {
                message: "Request updated successfully",
                couplingRequest
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