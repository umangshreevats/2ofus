'use client';

import { appName } from "@/data/info";



const Footer = () => {


    return <div className="w-full">
        <div className="w-full h-20 bg-accent">
            <div className="w-full h-full bg-background rounded-b-full" />
        </div>
        <div className="parent-box bg-accent">
            <div className="p-5 child-box min-h-50 grid grid-rows-[1fr_repeat(auto-fit,_minmax(0,_1fr))] sm:grid-rows-[1fr_3fr] py-5 sm:grid-cols-3 grid-cols-1 bg-accent">
                <h4 className="w-full sm:col-span-3 text-3xl font-bold border-b border-b-primary-text border-b-solid px-1">{appName}</h4>

                <div className="w-full h-full p-1">
                    <h5 className="font-bold text-primary-text mb-2">Your Account</h5>
                    <ul className="w-full text-sm flex flex-col gap-2">
                        <li className="w-full">Sign In</li>
                        <li className="w-full">Sign Up</li>
                    </ul>
                </div>

                <div className="w-full h-full p-1">
                    <h5 className="font-bold text-primary-text mb-2">About Us</h5>
                    <ul className="w-full text-sm flex flex-col gap-2">
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