"use client";
import { User } from "lucide-react";
import { useThemeSettings } from "@/app/theme-provider";

const SettingsHolder = () => {

    const { theme } = useThemeSettings();


    return <div className="w-full rounded-2xl bg-surface p-5 flex flex-col gap-5 component-shadow">
        <div className="flex gap-5 items-center">
            <div className="rounded-full p-5 component-shadow bg-background">
                <User />
            </div>

            <h3 className="font-bold text-2xl font-rubik">
                User Settings
            </h3>
        </div>


        <ul className={`w-full rounded-2xl ${theme === "light" ? "bg-white" : "bg-black"} text-primary-text flex flex-col p-5 gap-5`}>
            <li className="w-full border-b border-b-primary-text">Change Username</li>

            <li className="w-full border-b border-b-primary-text">Change Username</li>

            <li className="w-full border-b border-b-primary-text">Change Username</li>
        </ul>
    </div>
}


export default SettingsHolder;