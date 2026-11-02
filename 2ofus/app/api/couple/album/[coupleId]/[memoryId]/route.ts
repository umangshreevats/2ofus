import { getCurrentUser } from "@/lib/auth";
import { encrypt } from "@/lib/encryption";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { uploadMemoryImage } from "@/lib/supabase/storage";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";



// PATCH: /api/couple/album/:coupleId/:memoryId
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ coupleId?: string, memoryId?: string }> }) {


    try {

        const { user, coupleData } = await getCurrentUser();


        if (!user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { coupleId, memoryId } = await params;

        if (!coupleId) {
            return NextResponse.json(
                { message: "Couple Id is required" },
                { status: 400 }
            );
        }

        if (!memoryId) {
            return NextResponse.json(
                { message: "Memory Id is required" },
                { status: 400 }
            );
        }

        if (coupleData.id !== coupleId) {
            return NextResponse.json(
                { message: "Forbidden" },
                { status: 403 }
            )
        }


        const supabase = await createClient();

        const formData = await request.formData();


        const title = formData.get("title");
        const content = formData.get("content");
        const priority = formData.get("priority");
        const memoryDate = formData.get("memory_date");

        const { data: contentType, error: contentTypeError } = await supabase
            .from("memory")
            .select("id, couple_id, content_type, media_id")
            .eq("id", memoryId)
            .eq("couple_id", coupleId)
            .maybeSingle();

        if (contentTypeError || !contentType) {
            console.error(contentTypeError);
            return NextResponse.json(
                { message: "Error reading the informations" },
                { status: 500 }
            );
        }


        let updatedMemory: Record<string, any> = {};


        if (title && typeof title === "string") {
            const encryptedTitle = encrypt(title);
            updatedMemory.title = encryptedTitle;
        }

        if (priority) {
            updatedMemory.priority = Number(priority);
        }

        if (memoryDate && typeof memoryDate === "string") {
            updatedMemory.memory_date = memoryDate;
        }

        if (content &&
            ((contentType.content_type === "note" && typeof content !== "string") ||
                contentType.content_type === "image" && !(content instanceof File))) {
            return NextResponse.json(
                { message: "Bad Request: Type mismatch for content" },
                { status: 400 }
            );
        } else if (typeof content === "string") {
            const encryptedContent = encrypt(content as string);
            updatedMemory.content = encryptedContent;
        } else if (content && contentType.content_type === "image") {

            if (contentType.media_id) {
                const { error } = await supabaseAdmin.storage.from("couple-memories").remove([contentType.media_id]);

                if (error) {
                    console.error(error);
                    return NextResponse.json(
                        { message: "Error updating the informations" },
                        { status: 500 }
                    )
                }
            }

            const { path } = await uploadMemoryImage(supabase, content, coupleId);

            updatedMemory.media_id = path;
        }


        const { data: updatedData, error: updateError } = await supabase
            .from("memory")
            .update(updatedMemory)
            .eq("id", memoryId)
            .eq("couple_id", coupleId)
            .select()
            .single();


        if (updateError) {
            console.error(updateError);
            return NextResponse.json(
                { message: "Error updating the memory" },
                { status: 500 }
            );
        }


        return NextResponse.json(
            { message: "Memory updated successfully", updatedData },
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



// DELETE: /api/couple/album/:coupleId/:memoryId
export async function DELETE(request: NextRequest,
    { params }: { params: Promise<{ coupleId?: string, memoryId?: string }> }
) {


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
                { message: "Couple data is required" },
                { status: 400 }
            );
        }


        const { coupleId, memoryId } = await params;
        if (coupleId !== coupleData.id) {
            return NextResponse.json(
                { message: "Forbidden" },
                { status: 403 }
            );
        }


        const supabase = await createClient();
        const { data: memoryInfo, error: memoryInfoError } = await supabase
            .from("memory")
            .select("media_id, content_type, content, id, couple_id")
            .eq("id", memoryId)
            .eq("couple_id", coupleId)
            .single();


        if (memoryInfoError) {
            console.error(memoryInfoError);

            return NextResponse.json(
                { message: "Error reading memory information" },
                { status: 500 }
            );
        }


        if (!memoryInfo) {
            return NextResponse.json(
                { message: "Memory Not Found" },
                { status: 404 }
            );
        }


        if (memoryInfo.media_id) {
            const { error: deleteMedia } = await supabaseAdmin.storage.from("couple-memories").remove([memoryInfo.media_id]);

            if (deleteMedia) {

                return NextResponse.json(
                    { message: "Error deleting the informations" },
                    { status: 500 }
                );
            }
        }


        const { data, error: deleteMemoryError } = await supabase
            .from("memory")
            .delete()
            .eq("id", memoryId)
            .eq("couple_id", coupleId)
            .select("id");

        if (deleteMemoryError || !data?.length) {
            console.error(deleteMemoryError);
            return NextResponse.json(
                { message: "Error deleting the memory, or memory not found" },
                { status: 500 }
            );
        }


        return NextResponse.json(
            { message: `Memory deleted successfully` },
            { status: 200 }
        );

    } catch (err) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}