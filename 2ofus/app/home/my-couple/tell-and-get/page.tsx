import TellAndGetFeaturePage from "@/features/couple-page/TellAndGetFeaturePage";
import { createClient } from "@/utils/supabase/server";
export default async function TellAndGetPage() {

    return <section className="w-full min-h-screen">
        <TellAndGetFeaturePage />
    </section>
}