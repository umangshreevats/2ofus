"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface SpaceProps {
    name: string;
    image: StaticImageData;
    icon: LucideIcon;
    href: string;
    paragraph: string;
    backgroundColor: string;
    iconBackground: string;
    arrowBackground: string;
    textColor: string;
}

const Space = ({
    name,
    image,
    icon: Icon,
    href,
    paragraph,
    backgroundColor,
    iconBackground,
    arrowBackground,
    textColor,
}: SpaceProps) => {
    return (
        <Link
            href={href}
            className={`group block w-full rounded-xl p-3 border border-black/5 shadow-sm
                transition-all duration-300 hover:-translate-y-1 hover:shadow-md
                ${backgroundColor}`}
        >
            <div className="relative w-full h-28 overflow-hidden rounded-lg">
                <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover"
                />
            </div>

            <div
                className={`relative -mt-6 ml-2 w-11 h-11 rounded-full flex items-center justify-center
                    border-2 border-white shadow-sm ${iconBackground}`}
            >
                <Icon size={21} color="white" strokeWidth={2.2} />
            </div>

            <div className="flex justify-between items-end gap-2 px-1 mt-1">
                <div className="min-w-0">
                    <h3 className="font-bold text-base text-[#193B61]">
                        {name}
                    </h3>

                    <p className={`text-xs mt-0.5 leading-relaxed ${textColor}`}>
                        {paragraph}
                    </p>
                </div>

                <div
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                        transition-transform duration-300 group-hover:translate-x-1
                        ${arrowBackground}`}
                >
                    <ArrowRight size={17} className={textColor} />
                </div>
            </div>
        </Link>
    );
};

export default Space;