"use client";
import AboutUsCouple from "@/components/profile-page/couple-page/AboutUsCouple";
import Aniversary from "@/components/profile-page/couple-page/Aniversary";
import Begin from "@/components/profile-page/couple-page/Begin";
import CoupleTop from "@/components/profile-page/couple-page/CoupleTop";
import MemorablePhotoframes from "@/components/profile-page/couple-page/MemorablePhotoframes";
import OurSpace from "@/components/profile-page/couple-page/OurSpace";


const CoupleHome = ({ memorablePhotos }: { memorablePhotos: any }) => {

    return <div className="parent-box">
        <div className="child-box flex flex-col p-5 gap-5">
            <div className="w-full flex flex-col items-center gap-5">
                <CoupleTop />
                <AboutUsCouple />
                <MemorablePhotoframes memorablePhotos={memorablePhotos} />
                <OurSpace />
                <Begin />
                <Aniversary />
            </ div>
        </div>
    </div>
}

export default CoupleHome;