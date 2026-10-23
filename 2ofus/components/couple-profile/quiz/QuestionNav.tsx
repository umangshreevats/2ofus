"use client";

import { SetStateAction } from "react";
import { useThemeSettings } from "@/app/theme-provider";


const QuestionNav = ({ questions, currentQ, setCurrentQ }: 
    { questions: number, currentQ: number, setCurrentQ: React.Dispatch<SetStateAction<number>> }) => {

        const numbers = Array.from({ length: questions }, (_, index) => index + 1);
        const { theme } = useThemeSettings();

        return <nav className="relative w-full px-10 py-1 h-20 flex items-center gap-5 overflow-x-scroll"
        style={{
            scrollbarWidth: "none"
        }}>

            {numbers.map((num) => (
                <button 
                onClick={() => setCurrentQ(num)}
                key={num} type="button" className={`flex-shrink-0 w-10 h-10 rounded-full cursor-pointer
                    ${theme === "light" ? "shadow-[0_0_15px_5px_rgba(0,0,0,0.1)]" : "shadow-[0_0_15px_5px_rgba(255,255,255,0.1)]"} flex items-center justify-center 
                    ${currentQ === num ? "bg-accent text-white" : "bg-background text-primary-text"}`}>
                    {num}
            </button>
            ))}
        </nav>
}

export default QuestionNav;