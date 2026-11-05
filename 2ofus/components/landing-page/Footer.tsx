'use client';

import { appName } from "@/data/info";
import { usePathname } from "next/navigation";
import { headerFooterMain } from "@/data/routingBehaviors";
import { footer, footerDark } from "@/data/images";


const Footer = () => {

    const pathname = usePathname();

    const matchedRoute = Object.entries(headerFooterMain)
        .sort(([a], [b]) => b.length - a.length)
        .find(([route]) =>
            route === "/"
                ? pathname === "/"
                : pathname === route || pathname.startsWith(`${route}/`)
        );

    const show = matchedRoute?.[1].show ?? true;

    return <div className={`${show ? "w-full" : "hidden"}`}>
        <div className="w-full h-20 bg-surface">
            <div className="w-full h-full bg-background rounded-b-full" />
        </div>
        <div className="parent-box bg-surface">
            <div className="child-box min-h-[500px] p-5 grid grid-cols-1 sm:grid-cols-3 gap-8 p-5 sm:p-8 bg-surface bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url("${footer.src}")`,
                }}>
            </div>
        </div>
    </div>
}


export default Footer;