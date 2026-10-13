'use client';

import { appName } from "@/data/info";
import { usePathname } from "next/navigation";
import { headerFooterMain } from "@/data/routingBehaviors";


const Footer = () => {

    const pathname = usePathname();

    const show = Object.entries(headerFooterMain).find(
        ([route]) => pathname === route || (route !== "/" && pathname.startsWith(route))
    )?.[1].show ?? true;

    return <div className={`${show ? "w-full" : "hidden"}`}>
        <div className="w-full h-20 bg-accent">
            <div className="w-full h-full bg-background rounded-b-full" />
        </div>
        <div className="parent-box bg-accent">
            <div className="p-5 child-box min-h-50 grid grid-rows-[1fr_repeat(auto-fit,_minmax(0,_1fr))] sm:grid-rows-[1fr_3fr] py-5 sm:grid-cols-3 grid-cols-1 bg-accent">
                <h4 className="w-full sm:col-span-3 text-3xl font-bold border-b border-b-primary-text border-b-solid px-1">{appName}</h4>

                <div className="w-full h-full p-1">
                    <h5 className="font-bold text-primary-text mb-3">Your Account</h5>
                    <ul className="w-full text-sm flex flex-col gap-3">
                        <li className="w-full">Sign In</li>
                        <li className="w-full">Sign Up</li>
                    </ul>
                </div>

                <div className="w-full h-full p-1">
                    <h5 className="font-bold text-primary-text mb-3">About Us</h5>
                    <ul className="w-full text-sm flex flex-col gap-3">
                        <li className="w-full">About</li>
                        <li className="w-full">Home</li>
                        <li className="w-full">Couples</li>
                        <li className="w-full">Informations</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
}


export default Footer;