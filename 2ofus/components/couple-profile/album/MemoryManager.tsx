
"use client";

import { SetStateAction, useEffect, useState } from "react";
import {
    Image,
    NotebookPen,
    Heart
} from "lucide-react";
import PlayfulInput from "@/components/commons/PlayfulInput";
import Photograph from "@/components/commons/Photograph";
import Button from "@/components/commons/Button";
import DatePicker from "@/components/commons/DatePicker";
import { toast } from "sonner";
import { useAuth } from "@/app/auth-provider";

type MemoryType = "image" | "note";


type MemoryData = {
    title: string,
    content: string,
    content_type: MemoryType,
    memoryDate: Date,
    priority: number
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

    const { coupleData } = useAuth();
    const [memoryType, setMemoryType] = useState<MemoryType | null>(memoryData?.content_type ?? null);
    const [title, setTitle] = useState(memoryData?.title ?? "");
    const [note, setNote] = useState(memoryData?.content || "");
    const [image, setImage] = useState<File | null>(null);
    const [memoryDate, setMemoryDate] = useState<Date | null>(null);
    const [priority, setPriority] = useState(memoryData?.priority ?? 0);
    const [loading, setLoading] = useState(false);

    const handleMemoryFormSubmit = async (e: any) => {
        e.preventDefault();

        if (!memoryType) {
            toast.warning("No memory type available to create or update!");
            return;
        }

        setLoading(true);
        try {

            const formData = new FormData();

            formData.append("title", title);
            formData.append("content_type", memoryType);

            if (memoryType === "image") {
                if (!image) {
                    toast.warning("Choose an Image to save!");
                    return;
                }
                formData.append("content", image);
            }

            if (memoryType === "note") {
                if (note.length === 0) {
                    toast.warning("Write a note or something for this type!");
                    return;
                }
                formData.append("content", note);
            }

            if (!memoryDate) {
                toast.warning("Give a memory date");
                return;
            }
            formData.append("memory_date", memoryDate.toISOString());

            formData.append("priority", String(priority));

            const response = await fetch(`/api/couple/album/${coupleData.id}`, {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error("Something went wrong! " + result.message);
                return;
            }
            setShow(false);

            toast.success("Memory created successfully!");
        } catch (err) {

            if (err instanceof Error) {
                toast.error("Something went wrong: " + err.message);
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {

        if (show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        () => {
            document.body.style.overflow = "";
        }

    }, [show]);
    return (<div
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
                    <form onSubmit={handleMemoryFormSubmit} className="w-full flex flex-col gap-2">

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

                        <label className="w-full text-lg font-bold">How much is this memory close to your heart?: </label>
                        <div className="flex flex-wrap gap-2">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <Heart
                                    key={value}
                                    onClick={() => setPriority(value)}
                                    className={`cursor-pointer ${value <= priority ? "fill-red-500 text-red-500" : "text-gray-400"
                                        }`}
                                />
                            ))}
                        </div>

                        <Button text={loading ? "Saving..." : "Save Memory"} disabled={loading} />
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
    );
};

export default MemoryManager;
