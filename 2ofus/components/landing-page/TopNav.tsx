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
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import DropDown from "../commons/DropDown";
import Notifications from "../profile-page/nav-bar/Notifications";


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
const RightSideNavElements = ({ userData, coupleData }: { userData: any, coupleData: any }) => {

    if (!userData) {
        const [signIn, setSignIn] = useState(false);
        const [button, setButton] = useState(0);
        const { theme, setTheme } = useThemeSettings();
        return <>
            <ul className="sm:gap-5 gap-2 flex">
                <li><Button text={""} onClick={() => setTheme(theme === "light" ? "dark" : "light")} type="button" backgroundColor={`${theme === "light" ? "white" : "black"}`} textColor={`${theme === "light" ? "black" : "white"}`} icon={theme === "light" ? Moon : Sun} /></li>
                <li><Button onClick={() => { setSignIn(true); setButton(1) }} type="button" text="sign-in" backgroundColor="background" textColor={`${theme === "light" ? "black" : "white"}`} /></li>
                <li><Button onClick={() => { setSignIn(true); setButton(2) }} type="button" text="sign-up" /></li>
            </ul>

            <Popups open={signIn} setOpen={setSignIn}>
                <Auth setOpen={setSignIn} signIn={button === 1} />
            </Popups>
        </>
    }

    const supabase = createClient();

    const router = useRouter();

    const [openNav, setOpenNav] = useState(false);
    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Sign out failed:", error.message);
            return;
        }

        router.replace("/");
    };

    return <div className="gap-5 flex items-center">
        <DropDown open={openNav} setOpen={setOpenNav} right={10} top={10} innerHTML={<Notifications />}>
            <Bell />
        </DropDown>
        {!coupleData && <SearchBar />}
        <ProfileIcon />
    </div>
}

// Main nav bar for the page
const TopNav: React.FC<TopNavProps> = ({ display, navLocations }) => {

    const pathname = usePathname();
    const { userData, coupleData } = useAuth();
    const matchedRoute = Object.entries(headerFooterMain)
        .sort(([a], [b]) => b.length - a.length)
        .find(([route]) =>
            route === "/"
                ? pathname === "/"
                : pathname === route || pathname.startsWith(`${route}/`)
        );

    const show = matchedRoute?.[1].show ?? true;


    return <div className={`${show ? "parent-box" : "hidden"}`}>
        <div className="child-box">
            <nav className={`flex px-3 py-1 h-20 justify-between items-center gap-5 sm:gap-20 ${display ? "flex" : "hidden"}`}>
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


                <RightSideNavElements userData={userData} coupleData={coupleData} />
            </nav>
        </div>
    </div>
}


export default TopNav;