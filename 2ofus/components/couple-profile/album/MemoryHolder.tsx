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
        return <div>
            <Note title={memoryInfo.title} note={memoryInfo.content} author={memoryInfo.created_by} date={memoryInfo.memory_date} />
        </div>
    }

    return <div>
        <Photograph maxHeight={700} maxWidth={700} date={memoryInfo.memory_date} url={memoryInfo.content} alternate={`Photograph-${memoryInfo.id}`} name={memoryInfo.title} />
    </div>
}



export default MemoryHolder;