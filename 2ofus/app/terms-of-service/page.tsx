"use client";

import Headings from "@/components/commons/Headings";
import RedirectButton from "@/components/commons/RedirectButton";
import { termsOfService, version } from "@/data/info";




export default function TermsOfService () {


    return <div className="parent-box">
        <div className="child-box flex flex-col gap-5 p-5">
            <div className="border-b-2 border-b-primary-text border-dashed">
                <div>
                    <RedirectButton
                    redirectLink="/"
                    />
                </div>

                <Headings
                heading="Terms of Service"
                subheading={`version: ${version}`}
                />
            </div>

            <div className="w-full p-5 text-lg">
                {termsOfService}
            </div>
        </div>
    </div>
}