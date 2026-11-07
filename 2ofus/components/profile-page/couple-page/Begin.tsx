"use client";

import Headings from "@/components/commons/Headings";
import { useAuth } from "@/app/auth-provider";



const Begin = () => {

    const { coupleData } = useAuth();
    return <div className="w-full p-5 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 grid-rows-3 gap-5">

        <div className="w-full md:col-span-2 border-b border-dashed border-b-secondary-text">
            <Headings
            heading="Where it begin ❤️"
            />
        </div>

        <div className="w-full rounded-xl bg-surface flex p-5 gap-5 flex-col">
            <h3 className="text-xl font-bold">
                First Meet Date:
            </h3>

            <p className="font-comfortaa font-bold text-pink-500">
                {coupleData.first_meet_date ?? "(Add Date)"}
            </p>
        </div>

        <div className="w-full rounded-xl bg-surface flex p-5 gap-5 flex-col">
            <h3 className="text-xl font-bold">
                First Meet Location:
            </h3>

            <p className="font-comfortaa font-bold text-pink-500">
                {coupleData.first_meet_location ?? "(Add Location)"}
            </p>
        </div>
    </div>
}


export default Begin;