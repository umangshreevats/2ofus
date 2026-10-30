"use client";

import Headings from "@/components/commons/Headings";
import RedirectButton from "@/components/commons/RedirectButton";
import { useState } from "react";
import { useThemeSettings } from "@/app/theme-provider";


const History = () => {

    const [selectedOption, setSelectedOption] = useState<"liking" | "unliking" | "all">("all");
    const { theme } = useThemeSettings();

    const finalBg = theme === "light" ? "bg-white border-black text-black" : "bg-black border-white text-white";

    return <div className="parent-box">
        <div className="child-box flex items-center flex-col p-5 gap-5">

            {/*History top*/}
            <div className="w-full flex flex-col gap-5 border-b-2 border-b-primary-text border-dashed">
                <div>
                    <RedirectButton redirectLink="/home/my-couple/tell-and-get" />
                </div>
                <Headings
                    heading="Your Tell & Get History"
                    paragraph="Look back at your shared feelings, appreciations and moments."
                />
            </div>

            {/*Display*/}
            <div className="w-full py-5 flex flex-col gap-5 items-center">
                <div className="w-full flex justify-between items-center gap-5">

                    {/*Top Navigation*/}
                    <nav>
                        <ul className="flex gap-2">
                            <li>
                                <button type="button" onClick={() => setSelectedOption("liking")}
                                className={`p-2 rounded-md cursor-pointer border ${selectedOption === "liking" ? "bg-accent text-white" : finalBg}`}>
                                    Liking
                                </button>
                            </li>

                            <li>
                                <button type="button" onClick={() => setSelectedOption("unliking")}
                                className={`p-2 rounded-md cursor-pointer border ${selectedOption === "unliking" ? "bg-accent text-white" : finalBg}`}>
                                    Unlking
                                </button> 
                            </li>

                            <li>
                                <button type="button" onClick={() => setSelectedOption("all")}
                                className={`p-2 rounded-md cursor-pointer border ${selectedOption === "all" ? "bg-accent text-white" : finalBg}`}>
                                    All
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
}

export default History;