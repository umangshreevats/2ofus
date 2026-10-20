import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { uploadMemoryImage } from "@/lib/supabase/storage";



// POST: /api/couple/album/:coupleId
export async function POST(request: NextRequest, { params }: { params: Promise<{ coupleId?: string }> }) {

    try {
        const supabase = await createClient();
        const { user, userData } = await getCurrentUser();

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

        const formData = await request.formData();
        const title = formData.get("title");
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

        let content: string;

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

            content = path;
        } else {
            content = (formData.get("content") as string) ?? "";
        }
        const { data: memory, error: memoryCreationError } = await supabase
            .from("memory")
            .insert({
                couple_id: coupleId,
                created_by: userData.username,
                title: title ?? null,
                content,
                content_type,
                memory_date,
                priority
            }).select().single();

        if (memoryCreationError) {
            console.error(memoryCreationError);
            throw memoryCreationError;
        }

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