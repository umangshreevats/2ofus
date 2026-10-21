"use client";

import Note from "@/components/commons/Note";
import Photograph from "@/components/commons/Photograph";
import Suggestion from "@/components/couple-profile/album/Suggestion";



const AllMemory = ({ albumData }: { albumData: unknown | null }) => {

    if (!albumData || !Array.isArray(albumData)) {

        return <Suggestion />;
    }


    const albumImages = albumData.filter(d => d.content_type === "image");

    console.log(albumImages);
    const albumNotes = albumData.filter(d => d.content_type === "note");


    return <section className="w-full flex flex-col gap-5">

        <section className="w-full flex flex-col gap-2">
            <h4 className="text-lg font-bold">
                Images
            </h4>

            <div className="max-w-full overflow-x-scroll flex flex-row p-3 gap-3" style={{ scrollbarWidth: "none" }}>
                {albumImages.map((image) => (
                    <div key={image.id}>
                        <Photograph url={image.content} alternate={`Photograph-${image.id}`} name={image.title} />
                    </div>
                ))}
            </div>
        </section>


        <section className="w-full flex flex-col gap-5">
            <h4 className="text-lg font-bold">
                Notes
            </h4>

            <div className="max-w-full overflow-x-scroll flex flex-row p-3 gap-3" style={{ scrollbarWidth: "none" }}>
                {albumNotes.map((note) => (
                    <div key={note.id}>
                        <Note title={note.title} note={note.content} author={note.created_by} date={note.memory_date} />
                    </div>
                ))}
            </div>
        </section>
    </section>
}

export default AllMemory;