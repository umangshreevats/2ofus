import CoupleNav from "@/components/profile-page/couple-page/CoupleNav";


export default function CoupleLayout({ children }: { children: React.ReactNode }) {

    return <section>
            <CoupleNav />
            {children}
    </section>
}