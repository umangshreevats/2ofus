import { createClient } from "@/utils/supabase/server";
import Suggestion from "@/components/couple-profile/album/Suggestion";
import { getCurrentUser } from "@/lib/auth";
import Album from "@/features/couple-page/Album";


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

    // Pagination: Request for the album items, based on page and the memory: m selected
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

    // Getting the url of the images, that are stored privately in the bucket
    const updatedAlbumData = await Promise.all(
        (albumData ?? []).map(async (item) => {
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

    const totalPages = Math.ceil((count ?? 0) / limit);

    return <section className="w-full">
        {(updatedAlbumData && updatedAlbumData.length > 0) ?
            <Album m={m} page={currentPage} totalPages={totalPages} albumData={updatedAlbumData} /> :
            <Suggestion />}
    </section>
}
