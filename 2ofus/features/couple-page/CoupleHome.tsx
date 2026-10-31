"use client";
import Aniversary from "@/components/profile-page/couple-page/Aniversary";
import CoupleTop from "@/components/profile-page/couple-page/CoupleTop";
import MemorablePhotoframes from "@/components/profile-page/couple-page/MemorablePhotoframes";
import OurSpace from "@/components/profile-page/couple-page/OurSpace";


const CoupleHome = ({ memorablePhotos }: { memorablePhotos: any }) => {
    return <div className="parent-box">
        <div className="child-box flex flex-col p-5 gap-5">
            <div className="w-full flex flex-col items-center gap-5">
                <CoupleTop />
                <MemorablePhotoframes memorablePhotos={memorablePhotos} />
                <OurSpace />
                <Aniversary />
            </ div>
        </div>
    </div>
}

export default CoupleHome;