import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";


// PATCH: /api/couple/coupling-request/:requestId/reject
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ requestId: string }> }) {


    try {

        const supabase = await createClient();

        const { data: { user }, error } = await supabase.auth.getUser();

        if(error || !user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { requestId } = await params;

        const { data: couplingRequest, error: crError } = await supabase
        .from("coupling_requests")
        .update({ status: "rejected" })
        .eq("id", requestId)
        .select()
        .single();

        if (crError) {
            return NextResponse.json(
                { error: crError.message },
                { status: 500 }
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