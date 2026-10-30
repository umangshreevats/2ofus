"use client";
import Photograph from "@/components/commons/Photograph";
import PhotoFrame from "@/components/commons/PhotoFrame";
import Image from "next/image";


const Sharing = ({ sharingInfo }: { sharingInfo: any }) => {

    return <div className="w-full flex items-center justify-evenly rounded-sm">

        {/*User Image in photoframe*/}
        <PhotoFrame round={true} width={100} height={100}>
            <Image src={sharingInfo.user.profile_image} alt={`user image: ${sharingInfo.user.id}`} width={100} height={100} className="object-cover" />
        </PhotoFrame>

        <div className="flex flex-col gap-2">
            <div className="flex flex-wrap">
                {sharingInfo.predefined_messages && sharingInfo.predefined_messages.map((str: string, i: number) => {
                    if (i === 0) {
                        return <span key={i} className="font-bold text-primary-text text-lg">{str}</span>
                    }

                    return <span key={i} className="font-bold text-primary-text text-lg">, {str}</span>
                })}
            </div>

            <div className="text-secondary-text font-comfortaa">
                {sharingInfo.user_message ?? ""}
            </div>
        </div>
    </div>
}


export default Sharing;