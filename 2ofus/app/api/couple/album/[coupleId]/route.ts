import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { uploadMemoryImage } from "@/lib/supabase/storage";
import { decrypt, encrypt } from "@/lib/encryption";
import { supabaseAdmin } from "@/lib/supabase/admin";

// GET: /api/couple/album/:coupleId?limit=&skip=&m=
export async function GET(request: NextRequest, { params }: { params: Promise<{ coupleId?: string }> }) {


    try {
        const supabase = await createClient();
        const { user, coupleData } = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { coupleId } = await params;

        if (!coupleId) {
            return NextResponse.json(
                { message: "Bad Request: Couple Id is required" },
                { status: 400 }
            );
        }

        // Different user who is not a part of the same couple profile try to access the informations
        if (!coupleData || (coupleData.id !== coupleId)) {
            return NextResponse.json(
                { message: "Forbidden" },
                { status: 403 }
            )
        }

        const searchParams = request.nextUrl.searchParams;

        const limit = Number(searchParams.get("limit") ?? 20);
        const skip = Number(searchParams.get("skip") ?? 0);
        const m = searchParams.get("m") ?? "note";


        const { data: memoryData, error: memoryDataError } = await supabase
            .from("memory")
            .select("*")
            .eq("couple_id", coupleId)
            .eq("content_type", m)
            .order("created_at", { ascending: false })
            .range(skip, skip + limit - 1);

        if (memoryDataError) {
            console.error(memoryDataError);
            return NextResponse.json(
                { message: "Error fetching the couple details in server" },
                { status: 500 }
            );
        }
        let updatedMemoryData = null;
        if (m === "image") {
            updatedMemoryData = await Promise.all(
                (memoryData ?? []).map(async (item) => {
                    if (item.content_type !== "image") return item;

                    const decryptedTitle = decrypt(item.title);
                    const { data, error } = await supabase.storage
                        .from("couple-memories")
                        .createSignedUrl(item.media_id, 3600);

                    if (error) {
                        console.error("Signed URL error:", error.message);
                        return item;
                    }

                    console.log("Generated URL:", data.signedUrl);

                    return {
                        ...item,
                        title: decryptedTitle,
                        media_id: data.signedUrl,
                    };
                })
            );
        } else {
            updatedMemoryData =
                (memoryData ?? []).map((item) => {
                    const decryptedTitle = decrypt(item.title);
                    const decryptedData = decrypt(item.content ?? "");
                    return {
                        ...item,
                        title: decryptedTitle,
                        content: decryptedData
                    }
                });
        }

        return NextResponse.json(
            {
                message: `Memory ${m} retrieved successfully!`,
                memoryData: updatedMemoryData ?? memoryData,
                nextSkip: skip + limit
            },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// POST: /api/couple/album/:coupleId
export async function POST(request: NextRequest, { params }: { params: Promise<{ coupleId?: string }> }) {

    try {
        const supabase = await createClient();
        const { user, userData, coupleData } = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { coupleId } = await params;

        if (!coupleId) {
            return NextResponse.json(
                { message: "Bad Request: Couple Id is required" },
                { status: 400 }
            );
        }


        if (!coupleData || (coupleData.id !== coupleId)) {

            return NextResponse.json(
                { message: "Forbidden" },
                { status: 403 }
            );
        }

        const formData = await request.formData();
        const providedTitle = (formData.get("title") as string) ?? "";

        if (providedTitle.length === 0) {
            return NextResponse.json(
                { message: "Title of the memory is required" },
                { status: 400 }
            );
        }

        const title = encrypt(providedTitle);
        const content_type = formData.get("content_type");
        const memory_date = formData.get("memory_date");
        const priority = Number(formData.get("priority"));

        if (!content_type) {
            return NextResponse.json(
                { message: "Content Type is required!" },
                { status: 400 }
            );
        }
        const allowedContent = ["date", "note", "image"];

        if (typeof content_type !== "string" || !content_type) {
            return NextResponse.json(
                { message: "Content Type is required!" },
                { status: 400 }
            );
        }

        if (!allowedContent.includes(content_type)) {
            return NextResponse.json(
                { message: "This type of memory is not saved in the current version!" },
                { status: 400 }
            )
        }

        let content = null;
        let media_id = null;
        if (content_type === "image") {
            const image = formData.get("content");

            if (!(image instanceof File)) {
                return NextResponse.json(
                    { message: "Image file is required" },
                    { status: 400 }
                );
            }

            const { path } = await uploadMemoryImage(
                supabase,
                image,
                coupleId
            );

            media_id = path;
        } else {
            const writtenText = (formData.get("content") as string) ?? "";

            content = encrypt(writtenText);
        }
        const { data: memory, error: memoryCreationError } = await supabase
            .from("memory")
            .insert({
                couple_id: coupleId,
                created_by: userData.username,
                title: title ?? null,
                content,
                media_id,
                content_type,
                memory_date,
                priority
            }).select().single();

        if (memoryCreationError) {
            console.error(memoryCreationError);
            return NextResponse.json(
                { message: "Error creating the memory in server" },
                { status: 500 }
            );
        }

        /*Sending the notification with the type memory to the other user*/
        const { data: notification, error: notificationError } = await supabaseAdmin
            .from("notifications")
            .insert({
                sender: user.id,
                type: "memory",
                image_path: media_id,
                metadata: {
                    image_bucket: "couple-memories",
                },
                receiver: user.id === coupleData.partner_1.id ? coupleData.partner_2.id : coupleData.partner_1.id,
                title: "Your partner has put a memory",
                message: "Your partner has added something inside the album, you might be pleased about it."
            })
            .select()
            .single();

        if (notificationError) {
            console.error(notificationError);
        }

        console.log("Notification: ", notification);

        return NextResponse.json(
            { message: "Memory Created Successfully", memory },
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