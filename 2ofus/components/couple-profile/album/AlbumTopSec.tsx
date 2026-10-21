"use client";

import Button from "@/components/commons/Button";
import {
    LayoutGrid,
    Image,
    CalendarHeart,
    NotebookPen
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import MemoryManager from "./MemoryManager";
import Popups from "@/components/commons/Popups";

const AlbumTopSec = () => {

    const [show, setShow] = useState(false);
    const options = [
        { id: "all", name: "All", icon: LayoutGrid, route: "/home/my-couple/album?m=all" },
        { id: "photo", name: "Photos", icon: Image, route: "/home/my-couple/album?m=image" },
        { id: "date", name: "Dates", icon: CalendarHeart, route: "/home/my-couple/album?m=date" },
        { id: "note", name: "Notes", icon: NotebookPen, route: "/home/my-couple/album?m=note" }
    ];

    const [selected, setSelected] = useState<string | null>(null);


    return <div className="parent-box">
        <div className="child-box flex flex-col items-center p-5 gap-1 border-b-2 border-b-secondary-text"
            style={{
                borderBottomStyle: "dashed"
            }}>
            <h1 className="w-full p-1 text-primary-text font-bold text-3xl">
                Our Little World
            </h1>

            <p className="font-medium text-md text-secondary-text w-full">
                A collection of everything that matters
            </p>

            <div className="w-full flex flex-col gap-2 p-5 rounded-sm bg-background brightness-150">
                <h2 className="w-full text-2xl font-thin text-primary-text">
                    OUR SHARED COLLECTION
                </h2>

                <h1 className="w-full text-3xl font-bold text-primary-text">
                    Every moment tells a story.
                </h1>

                <p className="w-full text-sm font-medium text-secondary-text">
                    Memories we've collected together, one little moment at a time.
                </p>
                <div>
                    <Button onClick={() => setShow(true)} type="button" text="+ Add a memory" backgroundColor="accent" textColor="white" />
                </div>
            </div>

            <Popups open={show} setOpen={setShow} className="rounded-2xl">
                <MemoryManager show={show} setShow={setShow} />
            </Popups>

            <nav className="w-full p-2 flex gap-2 overflow-x-scroll" style={{ scrollbarWidth: "none" }}>
                {options.map((opt) => {
                    const Icon = opt.icon;

                    return <div key={opt.id}>
                        <Link href={opt.route} className={`p-2 flex cursor-pointer ${selected && selected === opt.id ? "bg-black" : "bg-accent"} 
                        rounded-full gap-2`} onClick={() => setSelected(opt.id)}>
                            {Icon && <Icon />} {opt.name}
                        </Link>
                    </div>
                })}
            </nav>
        </div>
    </div>
}

export default AlbumTopSec;