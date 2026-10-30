import { getCurrentUser } from "@/lib/auth";
import History from "@/features/tell-and-get/History";



export default async function TellAndGetHistoryPage() {


    const { coupleData } = await getCurrentUser();

    return <section className="w-full">
        <History />
    </section>
}