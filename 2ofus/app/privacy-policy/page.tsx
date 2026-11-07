"use client";

import Headings from "@/components/commons/Headings";
import RedirectButton from "@/components/commons/RedirectButton";
import { privacyPolicy } from "@/data/info";




export default function PrivacyPolicy () {


    return <div className="parent-box">
        <div className="child-box flex flex-col gap-5 p-5">
            <div className="border-b-2 border-b-primary-text border-dashed">
                <div>
                    <RedirectButton
                    redirectLink="/"
                    />
                </div>

                <Headings
                heading="Privacy Policy"
                />
            </div>

            <div className="w-full p-5 text-lg">
                {privacyPolicy}
            </div>
        </div>
    </div>
}