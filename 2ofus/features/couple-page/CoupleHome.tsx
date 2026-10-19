"use client";

import PhotoFrame from "@/components/commons/PhotoFrame";
import Aniversary from "@/components/profile-page/couple-page/Aniversary";



const CoupleHome = () => {
    return <div className="parent-box">
        <div className="child-box flex flex-col p-5 gap-5"><div className="w-full flex flex-col items-center p-5 gap-5">
            <PhotoFrame width={100} height={300} wscale="%" >
            </PhotoFrame>
            <Aniversary />
        </ div>
        </div>
    </div>
}

export default CoupleHome;