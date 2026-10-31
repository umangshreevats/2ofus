import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { uploadProfileImage, getStoragePath } from "@/lib/supabase/storage";
import { getCurrentUser } from "@/lib/auth";



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

//  PATCH: /api/profile/:username
export const PATCH = async (request: NextRequest, { params }: { params: Promise<{ username: string }> }) => {


    try {

        const { user, userData } = await getCurrentUser();


        if (!user) {

            return NextResponse.json({
                message: "Unauthorized"
            }, {
                status: 401
            });
        }

        const supabase = await createClient();


        const { username } = await params;


        if (!username) {
            return NextResponse.json({
                message: "Bad Request: Username is required"
            }, {
                status: 400
            });
        }


        if (userData.username !== username) {
            return NextResponse.json({
                message: "Forbidden: Only the same users are allowed to edit their profiles"
            }, {
                status: 403
            });
        }


        const formData = await request.formData();
        const profileImg = formData.get("profile_image");
        const removeProfileImage = formData.get("removeProfileImage");
        const interests = formData.get("interests");

        const updatedData: Record<string, unknown> = {};


        const editableFields = ["firstname", "lastname", "dob", "gender"] as const;

        editableFields.forEach((field) => {
            if (formData.has(field)) {
                const value = formData.get(field);
                updatedData[field] = value === "" ? null : String(value);
            }
        });

        if (interests) {

            try {
                updatedData.interests = JSON.parse(
                    String(formData.get("interests"))
                );
            } catch {
                return NextResponse.json(
                    { message: "Invalid interests format" },
                    { status: 400 }
                );

            }
        }

        if (removeProfileImage === "true") {
            const savedProfilePath = getStoragePath(userData.profile_image, "profile-images");

            console.log(savedProfilePath);
            await supabase.storage
                .from("profile-images")
                .remove([savedProfilePath]);

            updatedData.profile_image = null;
        }
        if (profileImg instanceof File && profileImg.size > 0) {


            const uploadedImage = await uploadProfileImage(supabase, profileImg, user.id);

            if (uploadedImage) {
                updatedData.profile_image = uploadedImage.publicUrl;
            }
        }


        const { data: profileUpdateData, error: profileUpdateError } = await supabase
            .from("users")
            .update(updatedData)
            .eq("id", user.id)
            .select()
            .single();


        if (profileUpdateError || !profileUpdateData) {

            console.error(profileUpdateError);
            return NextResponse.json(
                { message: "Internal Server Error: Error updating the profile Informations" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "Successfully updated the profile data", profileUpdateData },
            { status: 200 }
        );

    } catch (err) {
        console.error(err);

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}