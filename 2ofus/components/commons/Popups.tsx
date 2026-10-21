'use client';

import { useEffect, SetStateAction } from "react";
import { useThemeSettings } from "@/app/theme-provider";


interface PopupsProps {
    open: boolean;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
    className?: string;
    children: React.ReactNode;
}


const Popups: React.FC<PopupsProps> = ({ open, setOpen, children, className = "" }) => {

    const { theme } = useThemeSettings();

    useEffect(() => {

        document.body.style.overflow = open ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        }
    }, [open])
    return <>{open && <div onClick={() => setOpen(false)} className={`w-screen h-screen fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md`}>
        <div onClick={(e) => e.stopPropagation()} className={`${theme === "light" ? "shadow-[0_0_15px_5px_rgba(0,0,0,0.3)]" : "shadow-[0_0_15px_5px_rgba(255,255,255,0.15)]"} ${className}`}>
            {children}
        </div>
    </div>}</>
}

export default Popups;