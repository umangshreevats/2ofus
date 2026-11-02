import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function HomeLayout({ children }: { children: React.ReactNode }) {

    const { user, userData, coupleData } = await getCurrentUser();

    if (!user) {
        redirect("/");
    }

    if (!userData) {
        throw new Error("User profile not found");
    }
    return <section>
        {children}
    </section>
}