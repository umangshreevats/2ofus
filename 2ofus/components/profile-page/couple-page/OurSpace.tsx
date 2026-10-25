"use client";

import { coupleAlbum, coupleBeach, coupleNote, question } from "@/data/images";
import { Image, Mail, Images, BrainCircuit, Heading } from "lucide-react";
import Space from "./Space";
import Headings from "@/components/commons/Headings";

const OurSpace = () => {
    const spaces = [
        {
            id: "couple-beach",
            name: "Our Memories",
            image: coupleBeach,
            icon: Image,
            href: "/home/my-couple/album",
            paragraph: "Our favourite moments in one place.",
            backgroundColor: "bg-[#FFF5E8]",
            iconBackground: "bg-[#F2C47F]",
            arrowBackground: "bg-[#F6D9AE]",
            textColor: "text-[#966039]",
        },
        {
            id: "couple-album",
            name: "Our Album",
            image: coupleAlbum,
            icon: Images,
            href: "/home/my-couple/album?m=image",
            paragraph: "A collection of us, for us.",
            backgroundColor: "bg-[#EAF4FF]",
            iconBackground: "bg-[#72B5F2]",
            arrowBackground: "bg-[#C5E2FF]",
            textColor: "text-[#315D8B]",
        },
        {
            id: "couple-note",
            name: "Our Letter",
            image: coupleNote,
            icon: Mail,
            href: "/home/my-couple/album?m=note",
            paragraph: "Words from the heart, anytime.",
            backgroundColor: "bg-[#FFF0F4]",
            iconBackground: "bg-[#EE789B]",
            arrowBackground: "bg-[#F9C6D7]",
            textColor: "text-[#A44369]",
        },
        {
            id: "couple-quiz",
            name: "Know Me",
            image: question,
            icon: BrainCircuit,
            href: "/home/my-couple/know-me",
            paragraph: "How well do we know each other?",
            backgroundColor: "bg-[#F2ECFF]",
            iconBackground: "bg-[#A77BE8]",
            arrowBackground: "bg-[#DCC9FF]",
            textColor: "text-[#7250B1]",
        },
    ];

    return (
        <div className="w-full p-5 flex flex-col gap-5">

            {/* Heading */}
            
            <Headings
            heading="Our Shared Spaces"
            paragraph="Little corners of our world" />

            {/* Cards */}
            <div className="w-full flex flex-wrap gap-4">
                {spaces.map((space) => (
                    <div
                        key={space.id}
                        className="flex-1 min-w-[220px]"
                    >
                        <Space {...space} />
                    </div>
                ))}
            </div>

        </div>
    );
};

export default OurSpace;