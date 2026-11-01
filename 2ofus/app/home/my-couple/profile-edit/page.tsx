import CoupleEdit from "@/features/couple-page/CoupleEdit";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/utils/supabase/server";




export default async function CoupleProfileEditPage() {


    const { coupleData } = await getCurrentUser();


    return <section className="w-full">
        <CoupleEdit profileData={coupleData} allowEdits={true} />
    </section>
}