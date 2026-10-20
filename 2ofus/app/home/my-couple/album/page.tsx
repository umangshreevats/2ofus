import Button from "@/components/commons/Button";
import Image from "next/image";
import { romanticMemories } from "@/data/images";
import MemoryManager from "@/components/couple-profile/album/MemoryManager";
import Suggestion from "@/components/couple-profile/album/Suggestion";


interface PageProps {
    searchParams: Promise<{
        m?: string;
    }>;
}

export default async function AlbumPage({ searchParams }: PageProps) {

    const { m } = await searchParams;

    return <section className="w-full">
        <Suggestion />
    </section>
}
