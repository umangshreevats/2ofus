import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { uploadMemoryImage } from "@/lib/supabase/storage";


// GET: /api/couple/album/:coupleId?limit=&skip=&m=
export async function GET(request: NextRequest, { params }: { params: Promise<{ coupleId?: string }> }) {


    try {
        const supabase = await createClient();
        const { user } = await getCurrentUser();

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
            throw memoryDataError
        }
        let updatedMemoryData = null;
        if (m === "image") {
            updatedMemoryData = await Promise.all(
                (memoryData ?? []).map(async (item) => {
                    if (item.content_type !== "image") return item;

                    const { data, error } = await supabase.storage
                        .from("couple-memories")
                        .createSignedUrl(item.content, 3600);

                    if (error) {
                        console.error("Signed URL error:", error.message);
                        return item;
                    }

                    console.log("Generated URL:", data.signedUrl);

                    return {
                        ...item,
                        content: data.signedUrl,
                    };
                })
            );
        }

        return NextResponse.json(
            { message: `Memory ${m} retrieved successfully!`, memoryData: updatedMemoryData ?? memoryData, nextSkip: skip + limit },
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