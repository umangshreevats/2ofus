"use client";
import { useAuth } from "@/app/auth-provider";
import PhotoFrame from "@/components/commons/PhotoFrame";
import Image from "next/image";


const BioPicture = () => {

    const { coupleData } = useAuth();
    return <div className="w-full flex flex-col items-center">
        <div className="w-full h-[200px] md:h-[700px]">
            <PhotoFrame width={100} height={100} wscale="%" hscale="%" >
                {(coupleData?.cover_image && coupleData?.cover_image.length > 0) ?
                    <Image src={coupleData?.cover_image} sizes="100vw" alt="Couple Image"
                        fill className="object-cover" />
                    : <div className="w-full h-full">
                        Your Together Image goes here
                    </div>
                }
            </PhotoFrame>
        </div>

        {/* Partner individual profile photo frames */}
        <div className="w-full aspect-video grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 place-items-center gap-4 p-4">

            <div className="w-full h-full flex items-center justify-center p-3">
                <div className="relative w-[100px] aspect-square sm:w-[400px]">
                    <PhotoFrame
                        width={100}
                        height={100}
                        wscale="%"
                        hscale="%"
                        round={true}
                    >
                        {coupleData?.partner_1.profile_image ? (
                            <Image
                                src={coupleData.partner_1.profile_image}
                                alt="Profile Image 1"
                                fill
                                sizes="144px"
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-accent text-white text-3xl font-bold rounded-full">
                                {coupleData?.partner_1.username?.[0]?.toUpperCase() ?? "U"}
                            </div>
                        )}
                    </PhotoFrame>
                </div>
            </div>

            <div className="w-full h-full flex items-center justify-center p-3">
                <div className="relative w-[100px] aspect-square sm:w-[400px]">
                    <PhotoFrame
                        width={100}
                        height={100}
                        wscale="%"
                        hscale="%"
                        round={true}
                    >
                        {coupleData?.partner_2.profile_image ? (
                            <Image
                                src={coupleData.partner_2.profile_image}
                                alt="Profile Image 2"
                                fill
                                sizes="144px"
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-accent text-white text-3xl font-bold rounded-full">
                                {coupleData?.partner_2.username?.[0]?.toUpperCase() ?? "U"}
                            </div>
                        )}
                    </PhotoFrame>
                </div>
            </div>

        </div>
    </div >
}

export default BioPicture;