import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";


// PATCH: /api/couple/coupling-request/:requestId/accept
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ requestId: string }> }) {


    try {

        const supabase = await createClient();

        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { requestId } = await params;

        const { data: couplingRequest, error: crError } = await supabase.rpc(
            "process_coupling_request",
            {
                p_request_id: requestId,
            }
        );

        if (crError) {
            console.error("Coupling request error:", error);

            return NextResponse.json(
                { error: crError.message },
                { status: 400 }
            );
        }


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