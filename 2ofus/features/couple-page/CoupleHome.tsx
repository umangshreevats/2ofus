"use client";

import Aniversary from "@/components/profile-page/couple-page/Aniversary";
import BioPicture from "@/components/profile-page/couple-page/BioPicture";



const CoupleHome = () => {


    return <div className="w-full flex flex-col items-center p-5 gap-5">
        <BioPicture bio={null} />
        <Aniversary />
    </ div>
}

export default CoupleHome;