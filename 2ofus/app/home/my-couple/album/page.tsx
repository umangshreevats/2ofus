import Button from "@/components/commons/Button";
import Image from "next/image";
import { romanticMemories } from "@/data/images";
import MemoryManager from "@/components/couple-profile/album/MemoryManager";


interface PageProps {
    searchParams: Promise<{
        m?: string;
    }>;
}

export default async function AlbumPage({ searchParams }: PageProps) {

    const { m } = await searchParams;

    return <section className="w-full">

        <div className="parent-box p-5 items-center justify-start flex-col gap-5">
            <div className="child-box p-5 grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 bg-background brightness-125 rounded-sm">
                <div className="w-full rounded-sm p-2 flex flex-col gap-2">
                    <h3 className="w-full font-medium text-primary-text">
                        Add your lovely memories
                    </h3>

                    <p className="w-full font-light text-secondary-text">
                        Share your loving memories in the form of images, a letter, or any date you want to mention to remember.
                    </p>
                    <div>
                        <Button text="+Add a memory" backgroundColor="accent" textColor="white" />
                    </div>
                </div>

                <div className="w-full h-full p-10">
                    <Image
                        src={romanticMemories}
                        alt="romantic-memories"
                        className="object-cover"
                        width={400}
                        height={300}
                    />
                </div>
            </div>
        </div>
    </section>
}
