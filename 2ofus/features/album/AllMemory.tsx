"use client";

import Note from "@/components/commons/Note";
import Photograph from "@/components/commons/Photograph";
import Suggestion from "@/components/couple-profile/album/Suggestion";
import Button from "@/components/commons/Button";
import { useState } from "react";
import { useAuth } from "@/app/auth-provider";
import Popups from "@/components/commons/Popups";
import MemoryHolder from "@/components/couple-profile/album/MemoryHolder";
import { Plus } from "lucide-react";


const AllMemory = ({ albumData }: { albumData: unknown | null }) => {

    const { coupleData } = useAuth();
    if (!albumData || !Array.isArray(albumData)) {

        return <Suggestion />;
    }


    const [albumImages, setAlbumImages] = useState(albumData.filter(d => d.content_type === "image"));
    const [imgLoading, setImgLoading] = useState(false);
    const [imgSkip, setImgSkip] = useState(albumImages.length);
    const [noMoreImages, setNoMoreImages] = useState(false);
    const [albumNotes, setAlbumNotes] = useState(albumData.filter(d => d.content_type === "note"));
    const [noteLoading, setNoteLoading] = useState(false);
    const [noteSkip, setNoteSkip] = useState(albumNotes.length);
    const [noMoreNotes, setNoMoreNotes] = useState(false);

    const[choosenOne, setChoosenOne] = useState<any>(null);
    const [show, setShow] = useState(false);

    const getMoreMemory = async (m: string) => {
        if (m === "image") {
            setImgLoading(true);
        } else if (m === "note") {
            setNoteLoading(true);
        }
        try {

            const response = await fetch(`/api/couple/album/${coupleData.id}?limit=20&skip=${m === "image" ? imgSkip : noteSkip}&m=${m}`);

            const result = await response.json();

            if (!response.ok) {
                alert("Something went wrong" + result.message);
                return;
            }

            if (m === "image") {
                setAlbumImages(prev => [...prev, ...result.memoryData]);
                setImgSkip(result.skip);
                setNoMoreImages(result.memoryData.length === 0);
            } else if (m === "note") {
                setAlbumNotes(prev => [...prev, ...result.memoryData]);
                setNoteSkip(result.skip);
                setNoMoreNotes(result.memoryData.length === 0);
            }
        } catch (err) {
            alert("Something went wrong");
        } finally {
            if (m === "image") {
                setImgLoading(false);
            } else if (m === "note") {
                setNoteLoading(false);
            }
        }
    }

    const handleChoosenOne = (memory: any) => {
        setChoosenOne(memory);
        setShow(true);
    }

    return <section className="w-full flex flex-col gap-5">

        <section className="relative w-full flex flex-col gap-2">
            <h4 className="text-lg font-bold">
                Images
            </h4>
            <div className="w-full">
                <div className="w-full h-0 border-b-2 border-b-secondary-text" style={{ borderBottomStyle: "solid" }} />
                <div className="w-full min-w-0 overflow-x-scroll flex flex-row gap-3" style={{ scrollbarWidth: "none" }}>
                    {albumImages.map((image) => (<div key={image.id} className="relative">
                        <div className="h-10 absolute left-10 border-l-2 border-l-secondary-text" style={{ borderBottomStyle: "solid" }} />
                        <div className="mt-10">
                            <Photograph onClick={() => handleChoosenOne(image)} cursor="pointer" maxHeight={220} maxWidth={220} date={image.memory_date} url={image.media_id} alternate={`Photograph-${image.id}`} name={image.title} />
                        </div>
                    </div>))}
                    {noMoreImages ? <div className="flex-grow-0 mt-20 font-light text-sm">Memory End!</div>
                        : <div className="flex-grow-0 mt-20">
                            <Button onClick={async () => await getMoreMemory("image")} className={imgLoading ? "animate-spin" : ""} icon={Plus} text="" type="button" disabled={imgLoading} />
                        </div>}
                </div>
            </div>
        </section>


        <section className="relative w-full flex flex-col gap-5">
            <h4 className="text-lg font-bold">
                Notes
            </h4>

            <div className="w-full">
                <div className="w-full h-0 border-b-2 border-b-secondary-text" style={{ borderBottomStyle: "solid" }} />
                <div className="max-w-full overflow-x-scroll flex flex-row gap-3" style={{ scrollbarWidth: "none" }}>
                    {albumNotes.map((note) => (<div key={note.id} className="relative">
                        <div className="h-10 absolute left-10 border-l-2 border-l-secondary-text" style={{ borderBottomStyle: "solid" }} />
                        <div className="mt-10">
                            <Note cursor="pointer" onClick={() => handleChoosenOne(note)} title={note.title} note={note.content} author={note.created_by} date={note.memory_date} />
                        </div>
                    </div>))}
                    {noMoreNotes ? <div className="flex-grow-0 mt-20 font-light text-sm">Memory End!</div>
                        : <div className="flex-grow-0 mt-20">
                            <Button onClick={async () => await getMoreMemory("note")} className={noteLoading ? "animate-spin" : ""} icon={Plus} text="" type="button" disabled={noteLoading} />
                        </div>}
                </div>
            </div>
        </section>

        <Popups open={show} setOpen={setShow}>
            <MemoryHolder memoryInfo={choosenOne} />
        </Popups>
    </section>
}

export default AllMemory;