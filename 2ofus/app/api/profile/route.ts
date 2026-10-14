import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { UsersIcon } from "lucide-react";


export const POST = async (request: NextRequest) => {

    try {

        const supabase = await createClient();

        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if(authError || !user) {

            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();

        const { firstname, lastname, dob, gender } = body;

        const { data, error } = await supabase.from("users").update({
            firstname,
            lastname,
            dob,
            gender
        }).eq("id", user.id).select().maybeSingle();

        if (error) {
            console.error("Profile update error:", error);

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
        console.error("Profile API error:", err);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );

    }
}