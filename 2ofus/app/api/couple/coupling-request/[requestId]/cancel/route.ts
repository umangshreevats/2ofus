import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";


// DELETE: /api/couple/coupling-request/:requestId/cancel
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ requestId: string }> }) {


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

        const { data: couplingRequest, error: crError } = await supabase
            .from("coupling_requests")
            .delete()
            .eq("id", requestId)
            .select()
            .maybeSingle();

        if (crError) {
            return NextResponse.json(
                { error: crError.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                message: "Coupling request deleted successfully",
                couplingRequest
            },
            { status: 200 }
        );

    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}