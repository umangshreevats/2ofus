"use client";

import Headings from "@/components/commons/Headings";
import RedirectButton from "@/components/commons/RedirectButton";



const CoupleEdit = () => {


    return <div className="parent-box">
        <div className="child-box p-5 gap-5 flex flex-col">
            <div>
                <RedirectButton
                    redirectLink="/home/my-couple"
                />


                <div className="w-full border-b-2 border-dashed border-b-primary-text">
                    <Headings
                        heading="Edit Couple Profile"
                        paragraph="Update your shared space, add memories, and make it truly yours."
                    />
                </div>
            </div>
        </div>
    </div>
}


export default CoupleEdit;