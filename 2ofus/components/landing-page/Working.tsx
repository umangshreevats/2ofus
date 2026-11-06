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
        text: "Create your account and join our little world of love and togetherness."
    },
    {
        step: 2,
        left: 750,
        top: 40,
        text: "Find your partner and send them an invitation to join you."
    },
    {
        step: 3,
        left: 820,
        top: 420,
        text: "Create your own personal couple space to share memories and cherish your journey together."
    },
    {
        step: 4,
        left: 80,
        top: 320,
        text: "Share your feelings, appreciate each other, and celebrate all the little things that make your relationship special."
    }
];

const Functionality = ({ functionality, theme }: { theme: "light" | "dark", functionality: { left: number, top: number, step: number, text: string } }) => {

    return (
        <div className={`xl:w-[250px] w-full hover:scale-110 transition-all duration-300 ease-in-out xl:h-[190px] xl:absolute xl:mt-auto mt-5`}
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
                <Image src={theme === "light" ? workingLight : workingDark} alt="working-background image" className="hidden xl:block object-cover" />
                {functionalities.map((f, i) => (
                    <div key={i}>
                        <Functionality theme={theme} functionality={f} />
                    </div>
                ))}
            </div>
        </div>
    </div>
}

export default Working;