"use client";

import Headings from "@/components/commons/Headings";
import Button from "@/components/commons/Button";
import { Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { useThemeSettings } from "@/app/theme-provider";

const TellAndGetFeaturePage = () => {

    const { theme } = useThemeSettings();
    const [selected, setSelected] = useState(localStorage.getItem("t&gValue") ?? "liking");

    useEffect(() => {
        const savedValue = localStorage.getItem("t&gValue");

        if (savedValue === "liking" || savedValue === "unliking") {
            setSelected(savedValue);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("t&gValue", selected);
    }, [selected]);

    return <div className="parent-box">
        <div className="child-box flex flex-col gap-5 p-5">
            <div className="flex justify-between items-center border-b-2 border-b-primary-text border-dashed">
                <Headings
                    heading="Tell & Get"
                    paragraph="Share your feelings, express appreciation and be there for each other"
                />

                <Button type="button" text="History" icon={Clock} />
            </div>

            <div className="w-full flex flex-col gap-5 items-center px-5">

                <nav className="w-full rounded-full h-10 flex p-1"
                style={{
                    backgroundColor: theme === "light" ? "white" : "black"
                }}>
                    <button className="w-full rounded-full h-full flex items-center justify-center cursor-pointer"
                    style={{
                        backgroundColor: selected === "liking" ? "var(--accent)" : "inherit",
                        color: selected === "liking" ? "white" : "var(--primary-text)"
                    }}
                    onClick={() => setSelected("liking")}
                    >
                        Liking
                    </button> 

                    <button className="w-full rounded-full h-full flex items-center justify-center cursor-pointer"
                    style={{
                        backgroundColor: selected === "unliking" ? "var(--accent)" : "inherit",
                        color: selected === "unliking" ? "white" : "var(--primary-text)"
                    }}
                    onClick={() => setSelected("unliking")}
                    >
                        Unliking
                    </button>
                </nav>
            </div>
        </div>
    </div>
}


export default TellAndGetFeaturePage;