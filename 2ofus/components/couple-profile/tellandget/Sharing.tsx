"use client";
import Photograph from "@/components/commons/Photograph";
import PhotoFrame from "@/components/commons/PhotoFrame";
import Image from "next/image";


const Sharing = ({ sharingInfo }: { sharingInfo: any }) => {

    return <div className="w-full flex items-center gap-5 rounded-sm">

        {/*User Image in photoframe*/}
        <PhotoFrame round={true} width={150} height={150}>
            <Image
                src={sharingInfo.user.profile_image}
                alt={`user image: ${sharingInfo.user.id}`}
                fill
                sizes="(max-width: 640px) 85px, (max-width: 768px) 120px, (max-width: 1024px) 160px, 185px"
                className="object-cover"
            />
        </PhotoFrame>

        <div className="flex flex-col gap-2">
            <div className="flex flex-col flex-wrap">
                {sharingInfo.predefined_messages && sharingInfo.predefined_messages.map((str: string, i: number) => {
                    if (i === 0) {
                        return <p key={i} className="font-bold text-primary-text text-lg">{str}</p>
                    }

                    return <p key={i} className="font-bold text-primary-text text-lg">{`..${str}`}</p>
                })}
            </div>

            <div className="text-secondary-text font-comfortaa">
                {sharingInfo.user_message ?? ""}
            </div>
        </div>
    </div>
}


export default Sharing;