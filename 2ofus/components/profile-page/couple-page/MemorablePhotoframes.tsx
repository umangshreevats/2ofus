"use client";

import Headings from "@/components/commons/Headings";
import PhotoFrame from "@/components/commons/PhotoFrame";
import Image from "next/image";



const MemorablePhotoframes = ({ memorablePhotos }: { memorablePhotos: any }) => {


    return <div className="w-full p-5 flex flex-col">

        <Headings
            heading="Memorable Photos"
            paragraph="A collections of our beautiful memories"
        />

        <div className="w-full flex flex-wrap justify-center items-center gap-6">

            {memorablePhotos?.map((photo: any, index: number) => (
                <div
                    key={photo.id}
                    className={`w-[140px] sm:w-[170px] md:w-[200px]
                ${index % 3 === 0
                            ? "-rotate-3"
                            : index % 3 === 1
                                ? "rotate-2"
                                : ""
                        }
                transition-transform duration-300 hover:rotate-0 hover:scale-105`}
                >
                    <PhotoFrame
                        width={100}
                        height={100}
                        wscale="%"
                        hscale="%"
                    >
                        <div className="relative w-full aspect-[4/5]">
                            <Image
                                src={photo.media_id}
                                alt={`Memorable photo ${photo.id}`}
                                fill
                                sizes="200px"
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    </PhotoFrame>
                </div>
            ))}

        </div>

    </div>
}

export default MemorablePhotoframes;