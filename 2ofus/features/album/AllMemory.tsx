"use client";

import Note from "@/components/commons/Note";
import Photograph from "@/components/commons/Photograph";
import Suggestion from "@/components/couple-profile/album/Suggestion";
import Button from "@/components/commons/Button";
import { useState } from "react";


const AllMemory = ({ albumData }: { albumData: unknown | null }) => {

    if (!albumData || !Array.isArray(albumData)) {

        return <Suggestion />;
    }


    const [albumImages, setAlbumImages] = useState(albumData.filter(d => d.content_type === "image"));

    const [albumNotes, setAlbumNotes] = useState(albumData.filter(d => d.content_type === "note"));

    return <section className="w-full flex flex-col gap-5">

        <section className="relative w-full flex flex-col gap-2">
            <h4 className="text-lg font-bold">
                Images
            </h4>
            <div className="w-full">
                <div className="w-full h-0 border-b-2 border-b-secondary-text" style={{ borderBottomStyle: "solid" }} />
                <div className="w-full min-w-0 overflow-x-scroll flex flex-row gap-3" style={{ scrollbarWidth: "none" }}>
                    {albumImages.map((image) => (<div className="relative">
                        <div className="h-10 absolute left-10 border-l-2 border-l-secondary-text" style={{ borderBottomStyle: "solid" }} />
                        <div key={image.id} className="mt-10">
                            <Photograph date={image.memory_date} url={image.content} alternate={`Photograph-${image.id}`} name={image.title} />
                        </div>
                    </div>))}
                    <div className="flex-grow-0 mt-20">
                        <Button text="Load More" type="button" />
                    </div>
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
                    {albumNotes.map((note) => (<div className="relative">
                        <div className="h-10 absolute left-10 border-l-2 border-l-secondary-text" style={{ borderBottomStyle: "solid" }} />
                        <div key={note.id} className="mt-10">
                            <Note title={note.title} note={note.content} author={note.created_by} date={note.memory_date} />
                        </div>
                    </div>))}
                    <div className="flex-grow-0 mt-20">
                        <Button text="Load More" type="button" />
                    </div>
                </div>
            </div>
        </section>
    </section>
}

export default AllMemory;