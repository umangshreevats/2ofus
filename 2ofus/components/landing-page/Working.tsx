'use client';

import { appName } from "@/data/info";
import { useThemeSettings } from "@/app/theme-provider";



const Working = () => {

    const { theme } = useThemeSettings();

    
    return <div className={`parent-box ${theme === "light" ? "bg-white" : "bg-black"}`}>
        <div className="child-box p-10 relative flex items-center flex-col">
            <h4 className="text-3xl font-bold">
                See How {appName} Works?
            </h4>
        </div>
    </div>
}

export default Working;