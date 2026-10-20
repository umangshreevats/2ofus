import CoupleSetup from "@/features/couple-page/CoupleSetup";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function CoupleSetupPage ({ params }: { params: Promise<{ coupleId: string }>}) {

    const supabase = await createClient();

    const { coupleData } = await getCurrentUser();

    // if(coupleData.is_profile_completed) {
    //     redirect("/home/my-couple");
    // }
    const { coupleId } = await params;

    if(!coupleId) {
        throw Error("Couple Id is required");
    }

    await supabase.from("couples").update({ is_profile_completed: true }).eq("id", coupleId).single();

    return <section className="w-full">
        <CoupleSetup profileId={coupleId} />
    </section>
}