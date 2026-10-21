"use client";
import Pagination from "@/components/commons/Pagination";
import Note from "@/components/commons/Note";
import Suggestion from "@/components/couple-profile/album/Suggestion";


const NoteMemory = ({ albumData, numberOfPages, numPage }: { albumData: unknown | null, numberOfPages: number, numPage: number }) => {

    if (!albumData || !Array.isArray(albumData)) {

        return <Suggestion />;
    }

    const numbers = Array.from(
        { length: numberOfPages },
        (_, i) => i + 1
    );

    return <section className="w-full flex flex-col gap-5 max-h-[800px]">
        <h3 className="w-full text-2xl font-bold">
            Memorable Notes
        </h3>

        <div className="w-full p-5 flex gap-5 flex-wrap">
            {albumData.map((note) => (<div key={note.id} className="relative">
                <div>
                    <Note title={note.title} note={note.content} author={note.created_by} date={note.memory_date} />
                </div>
            </div>))}
        </div>

        <Pagination url="/home/my-couple/album" q={["m=note"]} numPage={numPage} numbers={numbers} numberOfPages={numberOfPages} />
    </section>
}

export default NoteMemory;