import CoupleNav from "@/components/profile-page/couple-page/CoupleNav";
import BioPicture from "@/components/profile-page/couple-page/BioPicture";


export default function CoupleLayout({ children }: { children: React.ReactNode }) {

    return <section>
            <CoupleNav />
            <BioPicture />
            {children}
    </section>
}