'use client';

import { appName } from "@/data/info";
import { useThemeSettings } from "@/app/theme-provider";
import { workingDark, workingLight } from "@/data/images";
import Image from "next/image";

const functionalities = [
    {
        step: 1,
        left: 80,
        top: 40,
        text: "Create an account, to be a part of this community",
    },
    {
        step: 2,
        left: 730,
        top: 40,
        text: "Find your love ❤️, and create a profile together"
    },
    {
        step: 3,
        left: 670,
        top: 320,
        text: "Enjoy, being together forever along"
    }
];

const Functionality = ({ functionality, theme }: { theme: "light" | "dark", functionality: { left: number, top: number, step: number, text: string } }) => {

    return (
        <div key={functionality.step} className={`w-[250px] hover:scale-110 transition-all duration-300 ease-in-out h-[190px] absolute`}
        style={{
            left: `${functionality.left}px`,
            top: `${functionality.top}px`
        }}>
            <div className={`w-full h-full p-5 text-center border-4 border-solid rounded-2xl
    ${theme === "light" ? "shadow-[4px_4px_0px_0px_rgba(0,0,0,1),_-2px_-2px_6px_0px_rgba(0,0,0,0.1)]" : "shadow-[4px_4px_0px_0px_rgba(255,255,255,1),_-2px_-2px_6px_0px_rgba(255,255,255,0.1)]"} 
    border ${theme === "light" ? "border-black" : "border-white"}`}
    style={{
        backgroundColor: `${theme === "light" ? "white" : "black"}`
    }}>
                <span className="text-secondary-text font-bold text-2xl">Step {functionality.step} </span>{functionality.text}
            </div>
        </div>);
}

const Working = () => {

    const { theme } = useThemeSettings();


    return <div className={`parent-box ${theme === "light" ? "bg-white" : "bg-black"}`}>
        <div className="child-box p-10 relative flex items-center flex-col">
            <h4 className="text-3xl font-bold">
                See How {appName} Works?
            </h4>

            <div className="w-full h-full relative">
                <Image src={theme === "light" ? workingLight : workingDark} alt="working-background image" className="object-cover" />
                {functionalities.map((f, _) => (
                    <Functionality theme={theme} functionality={f} />
                ))}
            </div>
        </div>
    </div>
}

export default Working;