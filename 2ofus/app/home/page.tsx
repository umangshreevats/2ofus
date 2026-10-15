import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import SearchPartner from "@/features/profile-page/SearchPartner";


export default async function HomePage() {

    const user = await getCurrentUser();

    if (!user) {
        redirect("/");
    }

    return <div>
        <SearchPartner />
    </div>
}