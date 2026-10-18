"use client";
import { Brain, MessagesSquare, Gamepad2, Library, Home } from "lucide-react";
import Link from "next/link";

const CoupleNav = () => {

    const coupleNavItems = [
        { name: "Home", icon: Home, href: "/home/my-couple" },
        { name: "Know Me", icon: Brain, href: "/home/my-couple/know-me" },
        { name: "Tell & Get", icon: MessagesSquare, href: "/home/my-couple/tell-and-get" },
        { name: "Fun", icon: Gamepad2, href: "/home/my-couple/fun" },
        { name: "Your Album", icon: Library, href: "/home/my-couple/album" },
    ];
    return <div className="sticky top-0 z-40 bg-background parent-box border-b-5 border-b-solid border-b-primary-text">
        <div className="child-box flex flex-col p-5 gap-5">
            <nav className="w-full h-[50px]">
                <ul className="w-full flex justify-evenly gap-5">
                    {coupleNavItems.map((item, i) => {

                        const Icon = item.icon;


                        return <li key={i}>
                            <Link className="min-w-20 h-full flex flex-col items-center rounded-full font-bold hover:text-white hover:bg-accent gap-1 p-2" href={item.href}>
                                <Icon />
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    })}
                </ul>
            </nav>
        </div>
    </div>
}

export default CoupleNav;