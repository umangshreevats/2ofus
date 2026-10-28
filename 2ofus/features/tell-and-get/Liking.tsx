"use client";

import Headings from "@/components/commons/Headings";
import { HeartPlus } from "lucide-react";



const Liking = () => {



    return <div className="w-full rounded-2xl p-5 border border-solid border-pink-500 bg-pink-500/5 text-pink-500">
        <div className="w-full flex gap-5 items-center">
            <div className="border border-solid border-pink-500 rounded-full p-5">
                <HeartPlus />
            </div>

            <Headings
                heading="Express What you like or appriciate"
                paragraph="Let your partner know a little(or big) things that mean a lot."
                headingColor="text-pink-500"
            />
        </div>
    </div>
}


export default Liking;