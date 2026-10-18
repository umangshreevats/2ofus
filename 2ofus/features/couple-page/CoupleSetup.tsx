"use client";

import DropDown from "@/components/commons/DropDown";
import PlayfulInput from "@/components/commons/PlayfulInput";
import { useState } from "react";


const CoupleSetup = () => {

    const [coupleName, setCoupleName] = useState("");
    const [relationshipStatus, setRelationShipStatus] = useState("");

    const dropDownOptions = [
        {
            id: 1,
            name: "Talking",
            onClick: async () => setRelationShipStatus("Talking"),
        },
        {
            id: 2,
            name: "Dating",
            onClick: async () => setRelationShipStatus("Dating"),
        },
        {
            id: 3,
            name: "Engaged",
            onClick: async () => setRelationShipStatus("Engaged"),
        },
        {
            id: 4,
            name: "Married",
            onClick: async () => setRelationShipStatus("Married"),
        },
    ];

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return <section>
        <div className="parent-box">
            <div className="child-box">
                <form className="w-full flex flex-col gap-5 items-center p-10">


                    <h2 className="w-full text-3xl font-bold text-primary-text">
                        Tell Us Your Love Story 💕
                    </h2>
                    <p className="text-md text-secondary-text border-b border-b-dashed border-b-primary-text font-medium w-full">
                        Give your little world a name, share your story, and upload your favourite pictures and precious memories. Let's create a beautiful space that belongs to both of you! 🥰✨
                    </p>

                    <label htmlFor="couple-name" className="w-full flex gap-2 flex-col">

                        <label className="w-full text-lg font-bold">Enter a beautiful Name you like to call your relationship: </label>
                        <PlayfulInput id="couple-name" width={100} textAlign="start" wScale="%" placeholder="Enter Name" text={coupleName} onChange={(e) => setCoupleName(e.target.value)} />
                    </label>

                    <label htmlFor="relationship-status" className="w-full flex gap-2 flex-col">
                        <label className="w-full text-lg font-bold">What's your relationship status? </label>

                        <DropDown
                            dropDownOptions={dropDownOptions}
                            open={isDropdownOpen}
                            setOpen={setIsDropdownOpen}
                            width={100}
                            wScale="%"
                            left={0}
                            top={5}
                        >
                            <PlayfulInput
                                id="relationship-status"
                                width={100}
                                textAlign="start"
                                wScale="%"
                                placeholder="Select Relationship Status"
                                text={relationshipStatus}
                                onChange={() => { }}
                            />
                        </DropDown>
                    </label>
                </form>
            </div>
        </div>
    </section>
}

export default CoupleSetup;