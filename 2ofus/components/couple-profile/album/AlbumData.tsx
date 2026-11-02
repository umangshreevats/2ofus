"use client"
import { Ellipsis, Heart, Pencil, Trash2 } from "lucide-react";
import Photograph from "@/components/commons/Photograph";
import Note from "@/components/commons/Note";
import { Dropdown } from "@/types/dropdown";
import { Pin, PinOff } from "lucide-react";
import DropDown from "@/components/commons/DropDown";
import { useState } from "react";
import MemoryManager from "./MemoryManager";
import Popups from "@/components/commons/Popups";
import Delete from "@/components/commons/Delete";
import { toggleMemoryPin } from "@/app/services/supabase/album";
import { useAuth } from "@/app/auth-provider";
import { toast } from "sonner";

const AlbumData = ({ dataType, data, handleChoosenOne, marginTop = "auto" }: { dataType: "note" | "image", data: any, handleChoosenOne: (...args: any[]) => void, marginTop?: "auto" | number }) => {


    const [albumData, setAlbumData] = useState(data);
    const { coupleData } = useAuth();
    const [edit, setEdit] = useState(false);
    const dropDownOptions: Dropdown[] = [
        {
            id: "pin",
            name: albumData.is_pinned ? "Unpin" : "Pin",
            onClick: async () => {
                setAlbumData((prev: any) => ({
                    ...prev,
                    is_pinned: !prev.is_pinned
                }));
                await toggleMemoryPin(data.id)
            },
            icon: albumData.is_pinned ? PinOff : Pin,
            danger: false
        },

        {
            id: "edit",
            name: "Edit",
            onClick: () => setEdit(prev => !prev),
            icon: Pencil,
            danger: false
        },
        {
            id: "delete",
            name: "Delete",
            onClick: () => setDeleteOpen(true),
            icon: Trash2,
            danger: true
        }

    ];

    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const deleteMemory = async () => {


        try {

            const response = await fetch(`/api/couple/album/${coupleData.id}/${data.id}`, {
                method: "DELETE"
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to delete memory");
            }

            toast.success("Memory deleted successfully");
        } catch (err) {
            if (err instanceof Error) {
                toast.error("An error occured: " + err.message);
            }
        }
    }

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


            {albumData.is_pinned && <div className="absolute top-3 left-3 z-10 bg-pink-200 text-red-500 w-8 h-8 rounded-full bg-accent flex items-center justify-center border">
                <Heart />
            </div>}
            <Photograph onClick={() => handleChoosenOne(albumData)} cursor="pointer" maxHeight={220} maxWidth={220} date={albumData.memory_date} url={albumData.media_id} alternate={`Photograph-${albumData.id}`} name={albumData.title} />
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

            {albumData.is_pinned && <div className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-pink-200 text-red-500 flex items-center justify-center border">
                <Heart />
            </div>}
            <Note cursor="pointer" onClick={() => handleChoosenOne(albumData)} title={albumData.title} note={albumData.content} author={albumData.created_by} date={albumData.memory_date} />
        </div>}

        <Popups open={edit} setOpen={setEdit} className="rounded-2xl">
            <MemoryManager memoryData={albumData} show={edit} setShow={setEdit} />
        </Popups>

        <Popups open={deleteOpen} setOpen={setDeleteOpen} className="rounded-md">
            <Delete
                title="Delete Memory"
                message="Are you sure you want to delete this memory?"
                deleteFunction={deleteMemory}
                setOpen={setDeleteOpen}
            />
        </Popups>
    </>
}


export default AlbumData;