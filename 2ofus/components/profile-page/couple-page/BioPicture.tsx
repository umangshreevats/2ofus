"use client";
import { useAuth } from "@/app/auth-provider";
import { Heart } from "lucide-react";
import Image from "next/image";


const BioPicture = ({ bio, profileOne, profileTwo }: { bio?: string | null, profileOne?: string | null, profileTwo?: string | null }) => {

    const { coupleData } = useAuth();
    return <div className="w-full p-5 flex flex-col items-center gap-5">
        <div className="flex gap-2 justify-center items-center relative">

            <div className="">
                <div className="w-50 h-50 rounded-full border">
                    {(coupleData?.partner_1.profile_image && coupleData?.partner_1.profile_image.length > 0) ?
                        <Image src={coupleData?.partner_1.profile_image} alt="couple-image-1" width={300} height={300} className="object-cover rounded-full" /> :
                        <div className="w-full text-4xl h-full rounded-full flex items-center justify-center bg-accent text-white">
                            {coupleData?.partner_1.username[0].toUpperCase()}
                        </div>}
                </div>
                <p className="w-full text-center mt-2 font-bold">{coupleData?.partner_1.username}</p>
            </div>

            <div className="">
                <div className="w-50 h-50 rounded-full border">
                    {(coupleData?.partner_2.profile_image && coupleData?.partner_2.profile_image.length > 0) ?
                        <Image src={coupleData?.partner_2.profile_image} alt="couple-image-2" width={300} height={300} className="object-cover rounded-full" /> :
                        <div className="w-full text-4xl h-full flex rounded-full items-center justify-center bg-accent text-white">
                            {coupleData?.partner_2.username[0].toUpperCase()}
                        </div>}
                </div>
                <p className="w-full text-center mt-2 font-bold">{coupleData?.partner_2.username}</p>
            </div>

            <div className="absolute bg-accent z-20 left-[calc(100% - 40px)] top-[calc(100% - 40px)] w-[40px] aspect-square shadow-md rounded-full flex items-center justify-center">
                <Heart color="pink" />
            </div>
        </div>
        <div className="relative w-full h-[500px] rounded-3xl border border-dashed border-secondary-text">
            {(bio && bio.length > 0) ?
                <Image src={bio} alt="couple-bio-image" className="rounded-3xl object-cover" /> :
                <div className="rounded-3xl bg-pink-500/50 w-full text-lg font-bold h-full flex justify-center items-center">
                    Your Together, and best Image goes here</div>}
        </div>
    </div>
}

export default BioPicture;