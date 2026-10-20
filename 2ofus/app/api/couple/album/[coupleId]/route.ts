import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "@/lib/auth";




// POST: /api/couple/album/:coupleId
export async function POST(request: NextRequest, { params }: { params: Promise<{ coupleId?: string }>}) {

    try {
        const supabase = await createClient();
        const { user, userData } = await getCurrentUser();

        if(!user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { coupleId } = await params;

        if(!coupleId) {
            return NextResponse.json(
                { message: "Bad Request: Couple Id is required" },
                { status: 404 }
            );
        }

        const formData = await request.json();
        const title = formData.get("created_by");
        const content = formData.get("content");
        const content_type = formData.get("content_type");
        const memory_date = formData.get("memory_date");
        const priority = formData.get("priority");

        const allowedContent = ["date", "note", "image"];

        if(!allowedContent.includes(content_type)) {
            return NextResponse.json(
                { message: "Bad Request: This content is not supported in current version" },
                { status: 404 }
            );
        }

        let publicId = null;
        if(content_type === "image") {
            // Image storing logic goes here
        }
        const { data: memory, error: memoryCreationError } = await supabase
        .from("memory")
        .insert({
            couple_id: coupleId,
            created_by: userData.username,
            title: title ?? null,
            content: content_type === "image" ? publicId : content,
            content_type,
            memory_date,
            priority
        }).select().single();

        if(memoryCreationError) {
            throw memoryCreationError;
        }

        return NextResponse.json(
            { message: "Memory Created Successfully", memory },
            { status: 201 }
        );
    } catch(err) {

        console.error(err);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}