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

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ profileId: string }> }) {


    try {


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

        if (formData.get("remove_cover_image") !== undefined && typeof formData.get("remove_cover_image") === "boolean") {

            if (formData.get("remove_cover_image") === "true") {
                const { error } = await supabaseAdmin.storage
                    .from("couple-bio-images")
                    .remove([currentProfile.cover_image]);
                
                if(error) {
                    return NextResponse.json(
                        { message: "Error updating couple informations in server" },
                        { status: 500 }
                    );
                }

                updatedCoupleProfile.cover_image = null;
            }
        }

        const coverImage = formData.get("cover_image");
        if(coverImage && 
        (coverImage instanceof File && coverImage.size > 0)) {
            const { path } = await uploadBioImage(supabase, coverImage, profileId);
            updatedCoupleProfile.cover_image = path;
        }
    } catch (err) {

    }
}