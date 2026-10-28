"use client";

import Headings from "@/components/commons/Headings";
import Button from "@/components/commons/Button";
import { Clock, Heart, HeartCrack } from "lucide-react";
import { useState, useEffect } from "react";
import { useThemeSettings } from "@/app/theme-provider";
import Liking from "../tell-and-get/Liking";

const TellAndGetFeaturePage = () => {

    const { theme } = useThemeSettings();
    const [selected, setSelected] = useState("liking");

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
                    <button className={`w-full rounded-full h-full flex gap-5 items-center justify-center cursor-pointer
                    ${selected === "liking"
                            ? "trans-accent border-2 border-solid border-accent"
                            : ""}`}
                        style={{
                            color: selected === "liking" ? "white" : "var(--primary-text)"
                        }}
                        onClick={() => setSelected("liking")}
                    >
                        <Heart />
                        Liking
                    </button>

                    <button className={`w-full rounded-full h-full flex items-center gap-5 justify-center cursor-pointer
                    ${selected === "unliking"
                            ? "trans-accent border-2 border-solid border-accent"
                            : ""}`}
                        style={{
                            color: selected === "unliking" ? "white" : "var(--primary-text)"
                        }}
                        onClick={() => setSelected("unliking")}
                    >
                        <HeartCrack />
                        Unliking
                    </button>
                </nav>

                <div className="w-full">
                    <Liking />
                </div>
            </div>
        </div>
    </div>
}


export default TellAndGetFeaturePage;