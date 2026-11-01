"use client";
import Pagination from "@/components/commons/Pagination";
import Suggestion from "@/components/couple-profile/album/Suggestion";
import Popups from "@/components/commons/Popups";
import MemoryHolder from "@/components/couple-profile/album/MemoryHolder";
import { useState } from "react";
import AlbumData from "@/components/couple-profile/album/AlbumData";

const ImageMemory = ({ albumData, numberOfPages, numPage }: { albumData: unknown | null, numberOfPages: number, numPage: number }) => {

    if (!albumData || !Array.isArray(albumData)) {

        return <Suggestion />;
    }

    const numbers = Array.from(
        { length: numberOfPages },
        (_, i) => i + 1
    );

    const [show, setShow] = useState(false);
    const [choosenOne, setChoosenOne] = useState<any>(null);

    const handleChoosenOne = (memory: any) => {
        setChoosenOne(memory);
        setShow(true);
    }

    return <section className="w-full flex flex-col gap-5">
        <h3 className="w-full text-2xl font-bold">
            Memorable Images
        </h3>

        <div className="w-full p-5 flex gap-5 flex-wrap">
            {albumData.map((image) => (<div key={image.id} className="relative">
                <AlbumData dataType="image" data={image} handleChoosenOne={handleChoosenOne}/>
            </div>))}
        </div>

        <Pagination url="/home/my-couple/album" q={["m=image"]} numPage={numPage} numbers={numbers} numberOfPages={numberOfPages} />

        <Popups open={show} setOpen={setShow}>
            <MemoryHolder memoryInfo={choosenOne} />
        </Popups>
    </section>
}

export default ImageMemory;