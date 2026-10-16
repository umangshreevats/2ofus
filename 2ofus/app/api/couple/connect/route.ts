import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {

    try {
        const supabase = await createClient();
        const { user } = await getCurrentUser();

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

        const { data: senderPending, error: senderPendingError } = await supabase
            .from("couples_requests")
            .select("id")
            .eq("status", "pending")
            .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
            .limit(1)
            .maybeSingle();

        if (senderPendingError) throw senderPendingError;

        if (senderPending) {
            return NextResponse.json(
                { message: "You already have an active couple request." },
                { status: 409 }
            );
        }

        const { data: receiverPending, error: receiverPendingError } = await supabase
            .from("couples_requests")
            .select("id")
            .eq("status", "pending")
            .or(`sender_id.eq.${requestedId},receiver_id.eq.${requestedId}`)
            .limit(1)
            .maybeSingle();

        if (receiverPendingError) throw receiverPendingError;

        if (receiverPending) {
            return NextResponse.json(
                { message: "This user already has an active couple request." },
                { status: 409 }
            );
        }
    } catch (err) {

    }
} 