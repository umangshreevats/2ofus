import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { uploadBioImage } from "@/lib/supabase/storage";


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

        if(data?.partner_1 !== user.id && data?.partner_2 !== user.id) {

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