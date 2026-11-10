import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { uploadBioImage } from "@/lib/supabase/storage";
import { supabaseAdmin } from "@/lib/supabase/admin";



// POST: /api/profile/couple-profile/:profileId
export async function POST(request: NextRequest, { params }: { params: Promise<{ profileId: string }> }) {
    try {
        const supabase = await createClient();

        const { user } = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { profileId } = await params;

        if (!profileId) {
            return NextResponse.json(
                { message: "Bad Request: Profile Id is required" },
                { status: 400 }
            );
        }

        const { data } = await supabase.from("couples").select("partner_1, partner_2").single();

        if (data?.partner_1 !== user.id && data?.partner_2 !== user.id) {

            return NextResponse.json(
                { message: "Forbidden: You are not allowed to update this profile" },
                { status: 403 }
            );
        }

        const formData = await request.formData();

        const coupleName = formData.get("coupleName");
        const bioImage = formData.get("bioImage");
        const aniversaryDate = formData.get("aniversaryDate");
        const description = formData.get("description");
        const status = formData.get("relationShipStatus");

        let uploadedImage: {
            path: string;
            publicUrl: string;
        } | null = null;

        if (bioImage instanceof File && bioImage.size > 0) {
            uploadedImage = await uploadBioImage(
                supabase,
                bioImage,
                profileId
            );
        }

        const { data: profileSetup, error: profileSetupError } = await supabase
            .from("couples")
            .update({
                couple_name: coupleName,
                relationship_status: status,
                anniversary_date: aniversaryDate,
                cover_image: uploadedImage?.publicUrl ?? null,
                cover_image_path: uploadedImage?.path ?? null,
                bio: description
            }).eq("id", profileId).select().single();

        if (profileSetupError) {
            console.error(profileSetupError);
            return NextResponse.json(
                { message: "Internal Server Error: while updating the profile data" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                message: "Profile data added successfully!",
                profileSetup
            },
            { status: 200 }
        );

    } catch (err) {

        console.error(err);
        return NextResponse.json(
            {
                message: "Internal Server Error"
            },
            { status: 500 }
        );
    }
}



// PATCH: /api/profile/couple-profile/:profileId

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ profileId?: string }> }) {


    try {

        const relationshipStatus = ["talking", "dating", "married", "engaged"];
        const { user } = await getCurrentUser();

        if (!user) {

            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { profileId } = await params;

        if (!profileId) {
            return NextResponse.json(
                { message: "Bad Request: Profile Id is required" },
                { status: 400 }
            )
        }
        const supabase = await createClient();


        const { data: currentProfile, error: profileError } = await supabase
            .from("couples")
            .select("*")
            .eq("id", profileId)
            .or(`partner_1.eq.${user.id},partner_2.eq.${user.id}`)
            .single();


        if (profileError) {
            console.error(profileError);
            return NextResponse.json(
                { message: "Some Error occured while getting profile informations" },
                { status: 500 }
            );
        }

        if (!currentProfile) {
            return NextResponse.json(
                { message: "Couple Profile not found" },
                { status: 404 }
            );
        }

        const formData = await request.formData();

        let updatedCoupleProfile: Record<string, any> = {};

        if (formData.get("couple_name") && typeof formData.get("couple_name") === "string") {
            updatedCoupleProfile.couple_name = formData.get("couple_name");
        }

        if (formData.get("removeCoverImage") === "true") {
            if (currentProfile.cover_image && currentProfile.cover_image_path) {
                const { error } = await supabaseAdmin.storage
                    .from("couple-bio-images")
                    .remove([currentProfile.cover_image_path]);

                if (error) {
                    console.error("Image deletion error:", error);
                }
            }

            updatedCoupleProfile.cover_image = null;
            updatedCoupleProfile.cover_image_path = null;
        }

        const coverImage = formData.get("cover_image");
        if (coverImage &&
            (coverImage instanceof File && coverImage.size > 0)) {
            const { path, publicUrl } = await uploadBioImage(supabase, coverImage, profileId);
            updatedCoupleProfile.cover_image = publicUrl;
            updatedCoupleProfile.cover_image_path = path;
        }

        if (formData.get("bio") && typeof formData.get("bio") === "string") {
            updatedCoupleProfile.bio = formData.get("bio");
        }

        const changedRelationshipStatus = formData.get("relationship_status");
        if (changedRelationshipStatus && typeof changedRelationshipStatus === "string") {
            if (!relationshipStatus.includes(changedRelationshipStatus.toLowerCase())) {
                return NextResponse.json(
                    { message: "Relationship Status is invalid" },
                    { status: 400 }
                );
            }
            updatedCoupleProfile.relationship_status = changedRelationshipStatus.toLowerCase();
        }

        if (formData.get("first_meet_date") && typeof formData.get("first_meet_date") === "string") {
            updatedCoupleProfile.first_meet_date = formData.get("first_meet_date");
        }

        if (formData.get("first_meet_location") && typeof formData.get("first_meet_location") === "string") {
            updatedCoupleProfile.first_meet_location = formData.get("first_meet_location");
        }

        if (formData.get("anniversary_date") && typeof formData.get("anniversary_date") === "string") {
            updatedCoupleProfile.anniversary_date = formData.get("anniversary_date");
        }


        const { data: updatedProfile, error: updateError } = await supabase
            .from("couples")
            .update(updatedCoupleProfile)
            .eq("id", profileId)
            .or(`partner_1.eq.${user.id},partner_2.eq.${user.id}`)
            .select()
            .single();


        if (updateError) {
            console.error(updateError);
            return NextResponse.json(
                { message: "Error updating the profile Informations" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "Profile Informations updated successfully", updatedProfile },
            { status: 200 }
        );

    } catch (err) {

        console.error(err);

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}


// DELETE: /api/profile/couple-profile/:profileId

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ profileId?: string }> }) {


    try {

        const { user, coupleData } = await getCurrentUser();


        /*Fetching the current user informations in the app*/
        if (!user) {

            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        /*The couple data either not found or server error to fetch it*/
        if (!coupleData) {
            return NextResponse.json(
                { message: "Error fetching couple information" },
                { status: 400 }
            );
        }

        const { profileId } = await params;   // couple profile id

        /*Profile Id is required, for future potential to delete by admin or super admin*/
        if (!profileId) {
            return NextResponse.json(
                { message: "Profile Id is required" },
                { status: 400 }
            );
        }

        /*Couple Id didn't matched the profile Id*/
        if (profileId !== coupleData.id) {

            return NextResponse.json(
                { message: "Forbidden: you cannot access this profile" },
                { status: 403 }
            );
        }

        const supabase = await createClient();

        const { error: coupleProfileImageError } = await supabase.storage.from("profile-images").remove([coupleData.cover_image_path]);

        if (coupleProfileImageError) {
            console.error("Error deleting the cover Image: ", coupleProfileImageError);
        }

        // Delete couple profile
        const { data, error } = await supabase
            .from("couples")
            .delete()
            .eq("id", profileId)
            .select("id");

        if (error) {
            console.error("Couple deletion error:", error);

            return NextResponse.json(
                { message: "Error deleting couple profile" },
                { status: 500 }
            );
        }

        // Check whether a row was actually deleted
        if (!data || data.length === 0) {
            return NextResponse.json(
                { message: "Couple profile was not deleted" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: "Couple profile deleted successfully"
            },
            { status: 200 }
        );

    } catch (err) {
        console.error("Unexpected couple deletion error:", err);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}