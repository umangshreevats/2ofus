import { createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { encrypt } from "@/lib/encryption";
import { uploadTellAndGetImage } from "@/lib/supabase/storage";



//  POST: /api/couple/tell-and-get/liking
export const POST = async (request: NextRequest) => {

    try {

        const { user, coupleData } = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        if (!coupleData) {
            return NextResponse.json(
                { message: "Forbidden: Only couples can add likings" },
                { status: 403 }
            );
        }
        const supabase = await createClient();
        const formData = await request.formData();
        const predefined_messages = (formData.get("predefinedMessages") as string);
        const user_message = (formData.get("userMessage") as string);


        const insertValues: Record<any, any> = {
            category: "liking",
            user_id: user.id,
            couple_id: coupleData.id
        };


        if (predefined_messages) {
            const encryptedPredefinedMessages = encrypt(predefined_messages);
            insertValues.predefined_messages = encryptedPredefinedMessages;
        }

        if (user_message) {
            const encryptedUserMessages = encrypt(user_message);
            insertValues.user_message = encryptedUserMessages;

        }

        const image = formData.get("image");
        let imageUrl = null;
        if (image && image instanceof File) {
            const { url, path } = await uploadTellAndGetImage(supabase, image, coupleData.id, "liking");
            insertValues.image_id = path;

            // image url extraction for notification
            imageUrl = url;
        }

        const { data, error } = await supabase
            .from("tell_and_get")
            .insert(insertValues)
            .select();


        if (error || !data) {
            console.error(error);

            return NextResponse.json(
                { message: "Internal Server Error: An error occured while saving the informations" },
                { status: 500 }
            );
        }

        // Notification
        const { error: notificationError } = await supabase
            .from("notifications")
            .insert({
                sender: user.id,
                receiver: coupleData.partner_1.id === user.id ? coupleData.partner_2.id : coupleData.partner_1.id,
                title: "Your partner shared an liking for you",
                image: imageUrl,
                message: "Check what your partner has shared for you"
            });

        if (notificationError) {
            console.error("Some problem with notifications: ", notificationError);
        }

        return NextResponse.json(
            { message: "Successfuly saved the informations" },
            { status: 201 }
        );
    } catch (err) {
        console.error(err);

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}