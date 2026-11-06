import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/utils/supabase/server";
import { createNotification } from "@/lib/notification/sendNotification";



export async function POST(request: NextRequest) {

    try {
        const supabase = await createClient();
        const { user, userData } = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            )
        }

        const body = await request.json();
        const { requestedId } = body;

        if (!requestedId) {
            return NextResponse.json(
                { message: "Bad Request" },
                { status: 400 }
            );
        }

        if (user.id === requestedId) {
            return NextResponse.json(
                { message: "Bad Request: Users are not allowed to send request to yourself" },
                { status: 400 }
            );
        }

        const { data: existingCouple, error: existingCoupleError } =
            await supabase.rpc("check_users_are_coupled", {
                p_user_id: user.id,
                p_requested_id: requestedId,
            });

        if (existingCoupleError) {
            console.error(existingCoupleError);
            return NextResponse.json(
                { message: "Error while processing the request!" },
                { status: 500 }
            );
        };

        if (existingCouple) {
            return NextResponse.json(
                { message: "One of the users is already in a couple." },
                { status: 409 }
            );
        }

        // User is having a pending request by someone
        const { data: senderPending, error: senderPendingError } = await supabase
            .from("coupling_requests")
            .select("id")
            .eq("status", "pending")
            .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
            .limit(1)
            .maybeSingle();

        if (senderPendingError) {
            return NextResponse.json(
                { message: "Error while processing the request!" },
                { status: 500 }
            );
        };

        if (senderPending) {
            return NextResponse.json(
                { message: "You already have an active couple request." },
                { status: 409 }
            );
        }

        // User to whome request send is having a pending request
        const { data: receiverPending, error: receiverPendingError } = await supabase
            .from("coupling_requests")
            .select("id")
            .eq("status", "pending")
            .or(`sender_id.eq.${requestedId},receiver_id.eq.${requestedId}`)
            .limit(1)
            .maybeSingle();

        if (receiverPendingError) {
            return NextResponse.json(
                { message: "Error while processing the request!" },
                { status: 500 }
            );
        };

        if (receiverPending) {
            return NextResponse.json(
                { message: "This user already has an active couple request." },
                { status: 409 }
            );
        }

        const { data: sendRequest, error: sendRequestError } = await supabase
            .from("coupling_requests")
            .insert({
                sender_id: user.id,
                receiver_id: requestedId,
                status: "pending"
            }).select().single();

        if (sendRequestError) {
            return NextResponse.json(
                { message: "Error while processing the request!" },
                { status: 500 }
            );
        };


        await createNotification({ 
            senderId: user.id, 
            recipientId: requestedId, 
            image: userData.profile_image ?? null, 
            type: "request_send", 
            title: `${userData.username} has send you a couple request.`,
            message: `You got an invitation from ${userData.username}, to make a couple profile together.`
        });


        return NextResponse.json({
            message: "Request send successfully!",
            sendRequest
        }, {
            status: 201
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({
            message: "Internal Server Error"
        }, {
            status: 500
        })
    }
} 