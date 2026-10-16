'use client';
import Link from "next/link";
import { appName } from "@/data/info";
import Button from "../commons/Button";
import Popups from "@/components/commons/Popups";
import Auth from "@/components/auth/Auth";
import { useThemeSettings } from "@/app/theme-provider";
import { useState } from "react";
import { Bell, Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { headerFooterMain } from "@/data/routingBehaviors";
import SearchBar from "../profile-page/nav-bar/SearchBar";
import { useAuth } from "@/app/auth-provider";
import ProfileIcon from "../profile-page/nav-bar/ProfileIcon";


type NavLocations = {
    name: string;
    path: string;
    icon: any;
}

interface TopNavProps {
    display: boolean;
    navLocations: NavLocations[];
}


// dynamic nav elements:
const RightSideNavElements = ({ userData }: { userData: any }) => {

    if (!userData) {
        const [signIn, setSignIn] = useState(false);
        const [button, setButton] = useState(0);
        const { theme, setTheme } = useThemeSettings();
        return <>
            <ul className="gap-5 flex">
                <li><Button text={""} onClick={() => setTheme(theme === "light" ? "dark" : "light")} type="button" backgroundColor={`${theme === "light" ? "white" : "black"}`} textColor={`${theme === "light" ? "black" : "white"}`} icon={theme === "light" ? Moon : Sun} /></li>
                <li><Button onClick={() => { setSignIn(true); setButton(1) }} type="button" text="sign-in" backgroundColor="background" textColor={`${theme === "light" ? "black" : "white"}`} /></li>
                <li><Button onClick={() => { setSignIn(true); setButton(2) }} type="button" text="sign-up" /></li>
            </ul>

            <Popups open={signIn} setOpen={setSignIn}>
                <Auth setOpen={setSignIn} signIn={button === 1} />
            </Popups>
        </>
    }

    return <div className="gap-5 flex items-center">
        <button type="button" className="common-button">
            <Bell />
        </button>
        <SearchBar />
        <ProfileIcon />
    </div>
}

// Main nav bar for the page
const TopNav: React.FC<TopNavProps> = ({ display, navLocations }) => {

    const pathname = usePathname();
    const { userData } = useAuth();
    const show = Object.entries(headerFooterMain).find(
        ([route]) => pathname === route || (route !== "/" && pathname.startsWith(route))
    )?.[1].show ?? true;


    return <div className={`${show ? "parent-box" : "hidden"}`}>
        <nav className={`child-box px-3 py-1 h-20 justify-between items-center gap-20 ${display ? "flex" : "hidden"}`}>
            <Link href="/">
                <h1 className="text-3xl text-primary-text font-bold">
                    {appName}
                </h1>
            </Link>

            {!userData && <ul className="hidden sm:flex gap-10 items-center">
                {navLocations.map((nl: NavLocations, index: number) => (
                    <li key={index} className="text-primary-text font-medium"><Link href={nl.path}>
                        {nl.icon ?? ""} <span>{nl.name}</span>
                    </Link></li>
                ))}
            </ul>}


            <RightSideNavElements userData={userData} />
        </nav>
    </div>
}


export default TopNav;