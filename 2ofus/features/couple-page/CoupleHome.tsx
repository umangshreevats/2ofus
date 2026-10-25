"use client";
import Aniversary from "@/components/profile-page/couple-page/Aniversary";
import BioPicture from "@/components/profile-page/couple-page/BioPicture";
import CoupleTop from "@/components/profile-page/couple-page/CoupleTop";


const CoupleHome = () => {
    return <div className="parent-box">
        <div className="child-box flex flex-col p-5 gap-5">
            <div className="w-full flex flex-col items-center p-5 gap-5">
                <CoupleTop />
                <BioPicture />
                <Aniversary />
            </ div>
        </div>
    </div>
}

export default CoupleHome;