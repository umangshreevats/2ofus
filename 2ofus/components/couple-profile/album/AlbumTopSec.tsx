"use client";

import Button from "@/components/commons/Button";
import {
    LayoutGrid,
    Image,
    CalendarHeart,
    NotebookPen
} from "lucide-react";
import { useState } from "react";


const AlbumTopSec = () => {


    const options = [
        { id: "all", name: "All", icon: LayoutGrid },
        { id: "photo", name: "Photos", icon: Image },
        { id: "date", name: "Dates", icon: CalendarHeart },
        { id: "note", name: "Notes", icon: NotebookPen }
    ];

    const [selected, setSelected] = useState<string | null>(null);


    return <div className="parent-box">
        <div className="child-box flex flex-col items-center p-5 gap-1">
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

                <p className="w-full text-sm font-light text-secondary-text">
                    Memories we've collected together, one little moment at a time.
                </p>

                <Button text="+ Add a memory" width="auto" backgroundColor="accent" textColor="white" />
            </div>

            <nav className="w-full p-2 flex gap-2">
                {options.map((opt) => {
                    const Icon = opt.icon;

                    return <div key={opt.id}><button type="button" className={`p-2 flex cursor-pointer ${selected && selected === opt.id ? "bg-black" : "bg-accent"} rounded-full gap-2`} onClick={() => setSelected(opt.id)}>{Icon && <Icon />} {opt.name}</button></div>
                })}
            </nav>
        </div>
    </div>
}

export default AlbumTopSec;