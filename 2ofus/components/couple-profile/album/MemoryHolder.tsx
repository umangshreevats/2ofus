"use client";
import Note from "@/components/commons/Note";
import Photograph from "@/components/commons/Photograph";



const MemoryHolder = ({ memoryInfo }: { memoryInfo: any }) => {


    if (!memoryInfo || Object.keys(memoryInfo).length === 0) {
        return <div className="text-primary-text">
            No Memory To Display
        </div>
    }

    if (memoryInfo.content_type === "note") {
        return <div className="w-full max-w-[calc(100vw-2rem)] max-h-[calc(100dvh-2rem)] overflow-auto mx-auto" style={{ scrollbarWidth: "none" }}>
            <Note title={memoryInfo.title} note={memoryInfo.content} author={memoryInfo.created_by} date={memoryInfo.memory_date} />
        </div>
    }

    return <div className="w-full max-w-[calc(100vw-2rem)] max-h-[calc(100dvh-2rem)] overflow-auto mx-auto" style={{ scrollbarWidth: "none" }}>
        <Photograph maxHeight={700} maxWidth={700} date={memoryInfo.memory_date} url={memoryInfo.media_id} alternate={`Photograph-${memoryInfo.id}`} name={memoryInfo.title} showTitle={memoryInfo.showTitle} />
    </div>
}



export default MemoryHolder;