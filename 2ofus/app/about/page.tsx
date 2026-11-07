"use client";

import Headings from "@/components/commons/Headings";
import RedirectButton from "@/components/commons/RedirectButton";
import { about } from "@/data/info";




export default function AboutUsPage() {


    return <div className="parent-box">
        <div className="child-box flex flex-col gap-5 p-5">
            <div className="w-full border-b-2 border-b-primary-text border-dashed flex gap-5 flex-col">
                <div>
                    <RedirectButton
                        redirectLink="/"
                    />
                </div>
                <Headings
                    heading="About Us"
                />
            </div>

            <div className="w-full p-5 text-lg">
                {about}
            </div>
        </div>
    </div>
}