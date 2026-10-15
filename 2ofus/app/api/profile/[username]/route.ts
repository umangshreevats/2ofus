import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { uploadProfileImage } from "@/lib/supabase/storage";

// POST: /api/profile/:username
export const POST = async (request: NextRequest, { params }: { params: Promise<{ username: string }> }) => {

    try {

        const { username } = await params;
        const supabase = await createClient();

        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {

            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { data: profile, error: profileError } = await supabase
            .from("users")
            .select("username")
            .eq("id", user.id)
            .single();

        if (profileError) {
            throw profileError;
        }

        if (!profile || profile.username !== username) {
            return NextResponse.json(
                { message: "Forbidden: You cannot modify another user's profile" },
                { status: 403 }
            );
        }

        const formData = await request.formData();

        const firstname = formData.get("firstname");
        const lastname = formData.get("lastname");
        const dob = formData.get("dob");
        const gender = formData.get("gender");
        const profileImg = formData.get("profileImg");

         let uploadedImage: {
            path: string;
            publicUrl: string;
        } | null = null;

        if (profileImg instanceof File && profileImg.size > 0) {
            uploadedImage = await uploadProfileImage(
                supabase,
                profileImg,
                user.id
            );
        }

        const updateData: Record<string, unknown> = {
            firstname,
            lastname,
            dob: dob ? String(dob) : null,
            gender
        };

        if (uploadedImage) {
            updateData.profile_image = uploadedImage.publicUrl;
        }

        const { data, error } = await supabase.from("users").update(updateData).eq("id", user.id).select().single();

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