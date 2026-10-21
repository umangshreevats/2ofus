import { createClient } from "@/utils/supabase/server";
import Suggestion from "@/components/couple-profile/album/Suggestion";
import { getCurrentUser } from "@/lib/auth";
import Note from "@/components/commons/Note";


interface PageProps {
    searchParams: Promise<{
        m?: string;
        page?: string;
    }>;
}

export default async function AlbumPage({ searchParams }: PageProps) {
    const { m, page } = await searchParams;
    const supabase = await createClient();
    const { coupleData } = await getCurrentUser();

    const currentPage = Math.max(1, Number(page) || 1);
    const limit = 20;
    const from = (currentPage - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
        .from("memory")
        .select("*", { count: "exact" })
        .eq("couple_id", coupleData.id);

    if (m && m !== "all") {
        query = query.eq("content_type", m);
    }

    const { data: albumData, error: albumDataError, count } = await query
        .order("created_at", { ascending: false })
        .range(from, to);

    if (albumDataError) {
        console.error(albumDataError);
    }

    const totalPages = Math.ceil((count ?? 0) / limit);


    return <section className="w-full">
        {!albumData && <Suggestion />}
       <Note />
    </section>
}
