"use client";

import Headings from "@/components/commons/Headings";
import RedirectButton from "@/components/commons/RedirectButton";



const History = () => {

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
                <div className="w-full flex justify-evenly items-center gap-5">
                    <nav>
                        <ul className="flex gap-2">
                            <li>
                                <button className="p-2 rounded-md border bg-white text-black">
                                    Liking
                                </button>
                            </li>

                            <li>
                                <button className="p-2 rounded-md border bg-white text-black">
                                    Unlking
                                </button>
                            </li>

                            <li>
                                <button className="p-2 rounded-md border bg-white text-black">
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