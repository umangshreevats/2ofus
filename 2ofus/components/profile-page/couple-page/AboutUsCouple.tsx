"use client";

import { useAuth } from "@/app/auth-provider";
import Headings from "@/components/commons/Headings";





const AboutUsCouple = () => {


    const { coupleData } = useAuth();
    return <div className="w-full p-5 flex flex-col items-center rounded-xl bg-surface">

        <div className="w-full items-center border-b border-b-secondary-text border-dashed">
            <Headings
            heading="About Us"
            />
        </div>

        {coupleData.bio && coupleData.bio.length > 0 ? <p className="w-full text-primary-text font-comfortaa py-5">{coupleData.bio}</p>
        : <p className="w-full h-50 flex items-center justify-center text-secondary-text font-comfortaa py-5">
            You haven't put anything about your relationship, you can describe what your relationship is like,
            what you do, etc.
        </p>}

    </div>
}

export default AboutUsCouple;