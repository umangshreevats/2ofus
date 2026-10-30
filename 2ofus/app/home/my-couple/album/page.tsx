import { createClient } from "@/utils/supabase/server";
import Suggestion from "@/components/couple-profile/album/Suggestion";
import { getCurrentUser } from "@/lib/auth";
import Album from "@/features/couple-page/Album";
import { decrypt } from "@/lib/encryption";


interface PageProps {
    searchParams: Promise<{
        m?: string;
        page?: string;
    }>;
}

export default async function AlbumPage({ searchParams }: PageProps) {

    const memoryTypes = ["image", "note"];
    const { m, page } = await searchParams;
    const supabase = await createClient();
    const { coupleData } = await getCurrentUser();

    // Pagination: Request for the album items, based on page and the memory: m selected
    const currentPage = Math.max(1, Number(page) || 1);
    const limit = 10;
    const from = (currentPage - 1) * limit;
    const to = from + limit - 1;


    let albumData = null;

    let queryCount = supabase
    .from("memory")
    .select("*", { count: "exact", head: true })
    .eq("couple_id", coupleData.id);

    if(m && m !== "all") {
        queryCount = queryCount.eq("content_type", m);
    }


    const fetchMemory = async (contentType: string) => {
        let query = supabase
            .from("memory")
            .select("*")
            .eq("couple_id", coupleData.id)
            .eq("content_type", contentType);

        const { data: albumData, error: albumDataError } = await query
            .order("created_at", { ascending: false })
            .range(from, to);

        if (albumDataError) {
            console.error(albumDataError);
        }

        return albumData;
    }

    if (m && m !== "all") {
        const memories = await fetchMemory(m);
        albumData = memories;
    } else {
        const completeAlbum = await Promise.all(
            memoryTypes.map(async (m) => {
                const memories = await fetchMemory(m);

                return memories;
            })
        );

        albumData = completeAlbum.flat();
    }


    const { count } = await queryCount;

    // Getting the url of the images, that are stored privately in the bucket
    const updatedAlbumData = await Promise.all(
        (albumData ?? []).map(async (item) => {
            if (item.content_type !== "image") {
                const decryptedTitle = decrypt(item.title);
                const decryptedContent = decrypt(item.content ?? "");
                return {
                    ...item,
                    title: decryptedTitle,
                    content: decryptedContent
                };
            }
            const decryptedTitleI = decrypt(item.title);
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
                title: decryptedTitleI,
                media_id: data.signedUrl,
            };
        })
    );

    const totalPages = Math.ceil((count ?? 0) / limit);

    return <section className="w-full p-10">
        {(updatedAlbumData && updatedAlbumData.length > 0) ?
            <Album m={m} page={currentPage} totalPages={totalPages} albumData={updatedAlbumData} /> :
            <Suggestion />}
    </section>
}
