"use client";

import AllMemory from "../album/AllMemory";
import ImageMemory from "../album/ImageMemory";



const Album = ({ m, page, totalPages, albumData }: { m?: string, page: number, totalPages: number, albumData?: unknown | null }) => {

    return <div className="parent-box">
        <div className="child-box">
            {(!m || m === "all") && <AllMemory albumData={albumData} />}
            {(m === "image") && <ImageMemory numberOfPages={totalPages} numPage={page} albumData={albumData} />}
        </div>
    </div>
}


export default Album;