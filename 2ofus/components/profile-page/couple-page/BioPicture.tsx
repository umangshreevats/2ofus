"use client";
import { Heart } from "lucide-react";
import Image from "next/image";


const BioPicture = ({ bio, profileOne, profileTwo }: { bio?: string | null, profileOne?: string | null, profileTwo?: string | null }) => {



    return <div className="w-full p-5 flex flex-col items-center gap-5">
        <div className="flex gap-2 justify-center items-center relative">

            <div className="">
                <div className="w-50 h-50 rounded-full border">

                </div>
                <p className="w-full text-center mt-2 font-bold">Partner 1</p>
            </div>

            <div className="">
                <div className="w-50 h-50 rounded-full border">

                </div>
                <p className="w-full text-center mt-2 font-bold">Partner 2</p>
            </div>

            <div className="absolute bg-accent z-20 left-[calc(100% - 40px)] top-[calc(100% - 40px)] w-[40px] aspect-square shadow-md rounded-full flex items-center justify-center">
                <Heart color="pink" />
            </div>
        </div>
        <div className="relative w-full h-[200px] rounded-3xl border border-dashed border-secondary-text">
            {(bio && bio.length > 0) ?
                <Image src={bio} alt="couple-bio-image" className="rounded-3xl object-cover" /> :
                <div className="rounded-3xl bg-pink-500/50 w-full text-lg font-bold h-full flex justify-center items-center">
                    Your Together, and best Image goes here</div>}
        </div>
    </div>
}

export default BioPicture;