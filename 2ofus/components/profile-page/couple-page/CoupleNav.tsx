"use client";

import { Brain, MessagesSquare, Gamepad2, Library, Home, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SetStateAction } from "react";


const CoupleNav = ({ openNav, setOpenNav }: { openNav?: boolean, setOpenNav?: React.Dispatch<SetStateAction<boolean>> }) => {

    const pathname = usePathname();

    const coupleNavItems = [
        { name: "Home", icon: Home, href: "/home/my-couple", onClick: () => setOpenNav?.(false) },
        { name: "Know Me", icon: Brain, href: "/home/my-couple/know-me", onClick: () => setOpenNav?.(false) },
        { name: "Tell & Get", icon: MessagesSquare, href: "/home/my-couple/tell-and-get", onClick: () => setOpenNav?.(false) },
        { name: "Fun", icon: Gamepad2, href: "/home/my-couple/fun", onClick: () => setOpenNav?.(false) },
        { name: "Your Album", icon: Library, href: "/home/my-couple/album", onClick: () => setOpenNav?.(false) },
    ];


    const isActive = (href: string) => {
        if (href === "/home/my-couple") {
            return pathname === href;
        }

        return pathname === href || pathname.startsWith(`${href}/`);
    };

    return (
        <div
            className="max-lg:w-[300px] max-lg:h-screen bg-background overflow-x-auto font-comforta"
            style={{ scrollbarWidth: "none" }}
        >
            <div className="w-full h-10 p-5 relative block lg:hidden">
                <button onClick={() => setOpenNav?.(false)} type="button" className="absolute right-2">
                    <X />
                </button>
            </div>
            <div className="w-full max-md:h-full flex flex-col p-5">
                <nav className="h-full md:h-auto w-full">
                    <ul className="flex flex-col lg:flex-row w-full items-center justify-evenly gap-1 lg:gap-5">
                        {coupleNavItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <li key={item.href} className="shrink-0" onClick={item.onClick}>

                                    <Link
                                        style={{
                                            backgroundColor: isActive(item.href)
                                                ? "var(--accent)"
                                                : "var(--background)",
                                            color: isActive(item.href)
                                                ? "white"
                                                : "var(--primary-text)",
                                        }}
                                        className="
                                            w-12 h-10
                                            sm:w-24 sm:h-15
                                            flex md:flex-col
                                            items-center
                                            justify-start 
                                            lg:justify-center
                                            rounded-full
                                            font-bold
                                            gap-5
                                            sm:gap-1
                                            p-3 sm:p-5
                                            text-center
                                            hover:text-white
                                            hover:bg-accent
                                        "
                                        href={item.href}
                                    >
                                        <Icon size={22} className="shrink-0" />
                                        <span className="text-sm whitespace-nowrap">
                                            {item.name}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default CoupleNav;