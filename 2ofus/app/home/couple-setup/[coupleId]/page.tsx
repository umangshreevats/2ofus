import CoupleSetup from "@/features/couple-page/CoupleSetup";

export default async function CoupleSetupPage ({ params }: { params: Promise<{ coupleId: string }>}) {

    const { coupleId } = await params;

    if(!coupleId) {
        throw Error("Couple Id is required");
    }
    return <section className="w-full">
        <CoupleSetup profileId={coupleId} />
    </section>
}