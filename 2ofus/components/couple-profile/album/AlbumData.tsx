"use client"
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import Photograph from "@/components/commons/Photograph";
import Note from "@/components/commons/Note";
import { Dropdown } from "@/types/dropdown";
import { Pin } from "lucide-react";
import DropDown from "@/components/commons/DropDown";
import { useState } from "react";


const AlbumData = ({ dataType, data, handleChoosenOne, marginTop = "auto" }: { dataType: "note" | "image", data: any, handleChoosenOne: (...args: any[]) => void, marginTop?: "auto" | number }) => {


    const dropDownOptions: Dropdown[] = [
        {
            id: "pin",
            name: "Pin",
            onClick: () => { },
            icon: Pin,
            danger: false
        },

        {
            id: "edit",
            name: "Edit",
            onClick: () => { },
            icon: Pencil,
            danger: false
        },
        {
            id: "delete",
            name: "Delete",
            onClick: () => { },
            icon: Trash2,
            danger: true
        }

    ];

    const [open, setOpen] = useState(false);
    return <>
        {dataType === "image" ? <div className="relative p-5"
            style={{
                marginTop: marginTop === "auto" ? marginTop : `${marginTop}rem`
            }}>
            <div className="absolute right-3 top-3 z-10">
                <DropDown open={open} setOpen={setOpen} dropDownOptions={dropDownOptions} top={10} right={10}>
                    <button type="button" className="cursor-pointer w-5 h-5 border bg-primary-text text-surface rounded-full flex items-center justify-center">
                        <Ellipsis />
                    </button>
                </DropDown>
            </div>
            <Photograph onClick={() => handleChoosenOne(data)} cursor="pointer" maxHeight={220} maxWidth={220} date={data.memory_date} url={data.media_id} alternate={`Photograph-${data.id}`} name={data.title} />
        </div> : <div className="relative p-5"
            style={{
                marginTop: marginTop === "auto" ? marginTop : `${marginTop}rem`
            }}>
            <div className="absolute right-3 top-3 z-10">
                <DropDown open={open} setOpen={setOpen} dropDownOptions={dropDownOptions} top={10} right={10}>
                    <button type="button" className="cursor-pointer w-5 h-5 border bg-primary-text text-surface rounded-full flex items-center justify-center">
                        <Ellipsis />
                    </button>
                </DropDown>
            </div>
            <Note cursor="pointer" onClick={() => handleChoosenOne(data)} title={data.title} note={data.content} author={data.created_by} date={data.memory_date} />
        </div>}
    </>
}


export default AlbumData;