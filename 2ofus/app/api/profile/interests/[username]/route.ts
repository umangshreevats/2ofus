import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";




// POST: /api/profile/interests/:username
export async function POST(request: NextRequest, { params }: { params: Promise<{ username: string }> }) {



    try {

        const { username } = await params;

        const supabase = await createClient();


        const { data, error } = await supabase.auth.getUser();

        if(error || !data) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            )
        }

        const user = data.user;

        const { data: profile, error: profileError } = await supabase
            .from("users")
            .select("username")
            .eq("id", user.id)
            .maybeSingle();

        if (profileError) {
            console.error(profileError);
            return NextResponse.json(
                { message: "Error processing the request" },
                { status: 500 }
            );
        }

        if (!profile || profile.username !== username) {
            return NextResponse.json(
                { message: "Forbidden: You cannot modify another user's profile" },
                { status: 403 }
            );
        }

        const body = await request.json();

        const { interests } = body;

        const { error: pIError } = await supabase.from("users").update({
            interests
        }).eq("id", user.id).single();

        if (pIError) {
            console.error("Profile update error:", pIError);

            return NextResponse.json(
                { message: "Failed to update profile" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                message: "Profile created successfully",
                profile: data,
            },
            { status: 200 }
        );
    } catch (err) {

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}