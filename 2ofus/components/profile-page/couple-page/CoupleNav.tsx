"use client";

import { Brain, MessagesSquare, Gamepad2, Library, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { headerFooterMain } from "@/data/routingBehaviors";


const CoupleNav = () => {

    const pathname = usePathname();

    const matchedRoute = Object.entries(headerFooterMain)
        .sort(([a], [b]) => b.length - a.length)
        .find(([route]) =>
            route === "/"
                ? pathname === "/"
                : pathname === route || pathname.startsWith(`${route}/`)
        );

    const show = matchedRoute?.[1].show ?? true;

    const coupleNavItems = [
        { name: "Home", icon: Home, href: "/home/my-couple" },
        { name: "Know Me", icon: Brain, href: "/home/my-couple/know-me" },
        { name: "Tell & Get", icon: MessagesSquare, href: "/home/my-couple/tell-and-get" },
        { name: "Fun", icon: Gamepad2, href: "/home/my-couple/fun" },
        { name: "Your Album", icon: Library, href: "/home/my-couple/album" },
    ];

    const isActive = (href: string) => {
        if (href === "/home/my-couple") {
            return pathname === href;
        }

        return pathname === href || pathname.startsWith(`${href}/`);
    };

    return (
        <div
            className={show ? `sticky top-0 z-40 bg-background parent-box border-b-5 border-b-solid border-b-primary-text overflow-x-auto` : "hidden"}
            style={{ scrollbarWidth: "none" }}
        >
            <div className="child-box flex flex-col p-5">
                <nav className="w-full">
                    <ul className="flex w-full items-center justify-evenly gap-5">
                        {coupleNavItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <li key={item.href} className="shrink-0">

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
                                            w-24 h-20
                                            flex flex-col
                                            items-center justify-center
                                            rounded-full
                                            font-bold
                                            gap-1
                                            p-2
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