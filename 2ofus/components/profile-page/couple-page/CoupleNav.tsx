"use client";
import { Brain, MessagesSquare, Gamepad2, Library } from "lucide-react";
import Link from "next/link";

const CoupleNav = () => {

    const coupleNavItems = [
        { name: "Know Me", icon: Brain, href: "/home/my-couple/know-me" },
        { name: "Tell & Get", icon: MessagesSquare, href: "/home/my-couple/tell-and-get" },
        { name: "Fun", icon: Gamepad2, href: "/home/my-couple/fun" },
        { name: "Library", icon: Library, href: "/home/my-couple/library" },
    ];
    return <nav className="w-full h-[80px]
    border-b-5 border-b-solid border-b-primary-text">
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
}

export default CoupleNav;