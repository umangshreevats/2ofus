
"use client";

import { SetStateAction, useEffect, useState } from "react";
import {
    Image,
    NotebookPen
} from "lucide-react";
import PlayfulInput from "@/components/commons/PlayfulInput";
import Photograph from "@/components/commons/Photograph";
import Button from "@/components/commons/Button";
import DatePicker from "@/components/commons/DatePicker";

type MemoryType = "image" | "note";


type MemoryData = {
    title: string,
    content: string,
    contentType: MemoryType,
    memoryDate: Date
}

interface MemoryManagerProps {
    show: boolean;
    setShow: React.Dispatch<SetStateAction<boolean>>;
    memoryData?: MemoryData | null;
}

const MemoryManager: React.FC<MemoryManagerProps> = ({
    show,
    setShow,
    memoryData
}) => {
    const [memoryType, setMemoryType] = useState<MemoryType | null>(null);
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [memoryDate, setMemoryDate] = useState<Date | null>(null);

    useEffect(() => {

        if(show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        () => {
            document.body.style.overflow = "";
        }

    }, [show]);
    return (
        <div
            onClick={() => {
                setShow(false);
                setMemoryType(null);
            }}
            className="fixed inset-0 z-50 justify-center items-center bg-black/50"
            style={{
                display: show ? "flex" : "none"
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-[800px] max-h-[90vh] overflow-y-auto p-5 bg-background text-primary-text rounded-2xl" style={{ scrollbarWidth: "none" }}
            >
                {memoryType ? (
                    <div className="w-full p-5">
                        <div className="w-full flex gap-2 border-b">
                            <button
                                onClick={() => setMemoryType(null)}
                            >
                                ← Back
                            </button>

                            <h3 className="text-2xl font-bold capitalize">
                                Create {memoryType} memory
                            </h3>
                        </div>

                        <div className="w-full p-5">
                            <form className="w-full flex flex-col gap-2">

                                <label className="w-full font-medium text-primary-text">
                                    Enter a title:
                                </label>
                                <PlayfulInput text={title} placeholder="Enter a title" onChange={(e) => setTitle(e.target.value)} textAlign="start" />

                                {memoryType === "note" && <><label className="w-full font-medium text-primary-text">
                                    Write a note:
                                </label>
                                    <PlayfulInput text={note} textArea={true} placeholder="What's are you thinking?" height={300} onChange={(e) => setNote(e.target.value)} textAlign="start" /></>}


                                {memoryType === "image" && <>
                                    <label className="w-full font-medium text-primary-text">
                                        Choose an image:
                                    </label>

                                    <Photograph
                                        photograph={image}
                                        fwidth={100}
                                        fwscale="%"
                                        alternate="Your photograph goes here"
                                    />

                                    <input
                                        className="hidden"
                                        type="file"
                                        id="bio"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] ?? null;
                                            setImage(file);
                                        }}
                                    />

                                    <label
                                        htmlFor="bio"
                                        className="cursor-pointer text-center border border-dashed p-3 rounded-lg hover:opacity-70"
                                    >
                                        📸 Choose Photograph
                                    </label>

                                    <Button type="button" className={`${!image && "hidden"}`} onClick={() => setImage(null)} text={"Remove Image"} backgroundColor="background" textColor="red" />

                                </>}

                                <label className="w-full text-lg font-bold">The date for this memory: </label>
                                <DatePicker
                                    placeholder="Pick the date for this memory"
                                    id="aniversary"
                                    value={memoryDate}
                                    onChange={(date: any) =>
                                        setMemoryDate(date)}
                                />

                                <Button text="Submit" />
                            </form>
                        </div>

                    </div>
                ) : (
                    <div className="w-full">
                        <h3 className="text-2xl font-bold mb-5">
                            Choose a memory type:
                        </h3>

                        <div className="w-full flex gap-5 justify-center items-center">
                            <button
                                onClick={() => setMemoryType("image")}
                                className="border rounded-xl flex flex-col p-10 cursor-pointer justify-center items-center"
                            >
                                <Image />
                                Image
                            </button>

                            <button
                                onClick={() => setMemoryType("note")}
                                className="border rounded-xl flex flex-col p-10 cursor-pointer justify-center items-center"
                            >
                                <NotebookPen />
                                Note
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MemoryManager;
