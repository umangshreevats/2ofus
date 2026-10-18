import CoupleHome from "@/features/couple-page/CoupleHome";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function CouplePage() {

    const { coupleData } = await getCurrentUser();

    if(!coupleData) {
        redirect("/home");
    }
    return <>
        <CoupleHome />
    </>
}