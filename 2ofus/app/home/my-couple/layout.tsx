import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function CoupleLayout({ children }: { children: React.ReactNode }) {

    const { coupleData } = await getCurrentUser();
    
        if (!coupleData) {
            redirect("/home");
        }
    return <section>
            {children}
    </section>
}