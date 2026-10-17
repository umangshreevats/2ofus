import CoupleNav from "@/components/profile-page/couple-page/CoupleNav";

export default function CoupleLayout({ children }: { children: React.ReactNode }) {

    return <div className="parent-box">
        <div className="child-box flex flex-col p-5 gap-5">
            <CoupleNav />
            {children}
        </div>
    </div>
}