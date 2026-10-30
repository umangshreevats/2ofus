"use client";

import Headings from "@/components/commons/Headings";
import RedirectButton from "@/components/commons/RedirectButton";
import { useState } from "react";
import { useThemeSettings } from "@/app/theme-provider";
import Pagination from "@/components/commons/Pagination";
import Link from "next/link";
import type { TellAndGet } from "@/types/tell-and-get";
import Sharing from "@/components/couple-profile/tellandget/Sharing";

const History = ({ historyData, totalPages, currentPage, category }: { historyData: TellAndGet[], totalPages: number, currentPage: number, category: "liking" | "unliking" | null }) => {

    const { theme } = useThemeSettings();
    const [history, setHistory] = useState(historyData);

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
                                <Link href={`/home/my-couple/tell-and-get/history?category=liking&page=1`}
                                    className={`p-2 rounded-md cursor-pointer border ${category === "liking" ? "bg-accent text-white" : finalBg}`}>
                                    Liking
                                </Link>
                            </li>

                            <li>
                                <Link href={`/home/my-couple/tell-and-get/history?category=unliking&page=1`}
                                    className={`p-2 rounded-md cursor-pointer border ${category === "unliking" ? "bg-accent text-white" : finalBg}`}>
                                    Unliking
                                </Link>
                            </li>

                            <li>
                                <Link href={`/home/my-couple/tell-and-get/history?page=1`}
                                    className={`p-2 rounded-md cursor-pointer border ${category === null ? "bg-accent text-white" : finalBg}`}>
                                    All
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>


                <div className="w-full flex">
                    <div className="w-16 shrink-0">

                    </div>

                    <div className="flex-1 flex flex-col gap-5 items-center min-w-0">
                        {historyData.map((sharing) => (
                            <div key={sharing.id} className="w-full">
                                <Sharing sharingInfo={sharing} />
                            </div>
                        ))}
                    </div>
                </div>

                <Pagination numPage={currentPage} numberOfPages={totalPages}
                    q={category ? [`category=${category}`] : []}
                    url="/home/my-couple/tell-and-get/history"
                />
            </div>
        </div>
    </div>
}

export default History;