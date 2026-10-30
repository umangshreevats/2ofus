import { getCurrentUser } from "@/lib/auth";
import History from "@/features/tell-and-get/History";
import { createClient } from "@/utils/supabase/server";


export default async function TellAndGetHistoryPage({
    searchParams
}: {
    searchParams: Promise<{ page?: number, category?: "liking" | "unliking" }>
}) {


    const { coupleData } = await getCurrentUser();

    const supabase = await createClient();

    const { category, page } = await searchParams;

    const currentPage = Math.max(1, Number(page) || 1);

    const limit = 10;
    const from = (currentPage - 1) * limit;
    const to = from + limit - 1;
    let totalPages = 0;


    let query = supabase.from('tell_and_get')
        .select('*')
        .eq("couple_id", coupleData.id);


    if(category) {
        query = query.eq("category", category);
    }

    const { data: historyData, error: historyError } = await query.range(from, to);


    const { count } = await supabase
    .from('tell_and_get')
    .select('*', { count: "exact", head: true })
    .eq('couple_id', coupleData.id);


    if(count) {
        totalPages = Math.ceil((count ?? 0) / 10);
    }


    if(historyError || !historyData) {
        console.error("History failed to retrieve");
    }


    return <section className="w-full">
        <History historyData={historyData ?? []} totalPages={totalPages} currentPage={currentPage} category={category ?? null} />
    </section>
}