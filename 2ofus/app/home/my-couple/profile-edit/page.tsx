import CoupleEdit from "@/features/couple-page/CoupleEdit";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/utils/supabase/server";




export default async function CoupleProfileEditPage() {

    return <section className="w-full">
        <CoupleEdit profileData={{}} allowEdits={true} />
    </section>
}