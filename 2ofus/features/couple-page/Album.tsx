"use client";

import AllMemory from "../album/AllMemory";



const Album = ({ m, page, totalPages, albumData }: { m?: string, page?: number, totalPages?: number, albumData?: unknown | null }) => {

    return <div className="parent-box">
        <div className="child-box">
            {(!m || m === "all") && <AllMemory albumData={albumData} />}
        </div>
    </div>
}


export default Album;