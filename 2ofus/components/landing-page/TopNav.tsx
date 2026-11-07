'use client';
import Link from "next/link";
import { appName } from "@/data/info";
import Button from "../commons/Button";
import Popups from "@/components/commons/Popups";
import Auth from "@/components/auth/Auth";
import { useThemeSettings } from "@/app/theme-provider";
import { useState, useEffect, useRef } from "react";
import { Bell, Menu, Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { headerFooterMain } from "@/data/routingBehaviors";
import SearchBar from "../profile-page/nav-bar/SearchBar";
import { useAuth } from "@/app/auth-provider";
import ProfileIcon from "../profile-page/nav-bar/ProfileIcon";
import DropDown from "../commons/DropDown";
import Notifications from "../profile-page/nav-bar/Notifications";
import CoupleNav from "../profile-page/couple-page/CoupleNav";
import NotificationIcon from "../profile-page/nav-bar/NotificationIcon";

interface TopNavProps {
    display: boolean;
}


// dynamic nav elements:

const RightSideNavElements = ({
    userData,
    coupleData,
}: {
    userData: any;
    coupleData: any;
}) => {
    const [signIn, setSignIn] = useState(false);
    const [isMobileWidth, setIsMobileWidth] = useState(false);
    const [button, setButton] = useState(0);
    const [openNav, setOpenNav] = useState(false);
    const [showNavs, setShowNavs] = useState(false);
    const { theme, setTheme } = useThemeSettings();
    const bodyRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        bodyRef.current = document.body;
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");

        setIsMobileWidth(mediaQuery.matches);

        const handleResize = (e: MediaQueryListEvent) => {
            setIsMobileWidth(e.matches);
        };

        mediaQuery.addEventListener("change", handleResize);

        return () => {
            mediaQuery.removeEventListener("change", handleResize);
        };
    }, []);

    useEffect(() => {
        if(isMobileWidth && openNav) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        }
    }, [isMobileWidth, openNav]);

    if (!userData) {
        return (
            <>
                <ul className="sm:gap-5 gap-2 flex">
                    <li>
                        <Button
                            text=""
                            onClick={() =>
                                setTheme(
                                    theme === "light" ? "dark" : "light"
                                )
                            }
                            type="button"
                            backgroundColor={theme === "light" ? "white" : "black"}
                            textColor={theme === "light" ? "black" : "white"}
                            icon={theme === "light" ? Moon : Sun}
                        />
                    </li>

                    <li>
                        <Button
                            onClick={() => {
                                setSignIn(true);
                                setButton(1);
                            }}
                            type="button"
                            text="Sign In"
                            backgroundColor="background"
                            textColor={theme === "light" ? "black" : "white"}
                        />
                    </li>

                    <li>
                        <Button
                            onClick={() => {
                                setSignIn(true);
                                setButton(2);
                            }}
                            hoverBackgroundColor={theme === "light" ? 'white' : 'black'}
                            hoverTextColor={theme === "light" ? `black` : 'white'}
                            hoverEffect={true}
                            type="button"
                            text="Sign Up"
                        />
                    </li>
                </ul>

                <Popups open={signIn} setOpen={setSignIn}>
                    <Auth setOpen={setSignIn} signIn={button === 1} />
                </Popups>
            </>
        );
    }

    return (
        <div className="gap-5 flex items-center">
            <DropDown
                open={openNav}
                setOpen={setOpenNav}
                right={isMobileWidth ? 0 : 10}
                top={isMobileWidth ? 0 : 10}
                innerHTML={<Notifications setOpenNav={setOpenNav} />}
                innerHTMLPortalRef={isMobileWidth ? bodyRef : undefined}
            >
                <NotificationIcon />
            </DropDown>

            {!coupleData && <div className="hidden md:block"><SearchBar /></div>}

            <ProfileIcon />

            {coupleData && <button type="button" className="lg:hidden" onClick={() => setShowNavs(true)}>
                <Menu />
            </button>}

            <Popups
                open={showNavs}
                setOpen={setShowNavs}
                justify="end">
                <CoupleNav openNav={showNavs} setOpenNav={setShowNavs} />
            </Popups>
        </div>
    );
};


// Main nav bar for the page
const TopNav: React.FC<TopNavProps> = ({ display }) => {

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
                    <h1 className="text-3xl text-primary-text font-bold font-rubik">
                        {appName}
                    </h1>
                </Link>

                {coupleData && <div className="hidden lg:block"><CoupleNav /></div>}


                <RightSideNavElements userData={userData} coupleData={coupleData} />
            </nav>
        </div>
    </div>
}


export default TopNav;