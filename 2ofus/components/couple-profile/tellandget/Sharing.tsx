"use client";
import Photograph from "@/components/commons/Photograph";
import PhotoFrame from "@/components/commons/PhotoFrame";
import Image from "next/image";
import { formatDistanceToNowStrict } from "date-fns";
import { useAuth } from "@/app/auth-provider";
import useIsMobile from "@/app/hooks/useIsMobile";
import { useState } from "react";
import Popups from "@/components/commons/Popups";
import MemoryHolder from "../album/MemoryHolder";


const SharingMessage = ({ message }: { message?: string | null }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="text-secondary-text font-comfortaa">
            <p className={expanded ? "" : "line-clamp-3"}>
                {message ?? ""}
            </p>

            {message && message.length > 150 && (
                <button
                    type="button"
                    onClick={() => setExpanded(prev => !prev)}
                    className="mt-2 text-accent font-semibold text-sm hover:underline cursor-pointer font-comfortaa"
                >
                    {expanded ? "Read less" : "Read more"}
                </button>
            )}
        </div>
    );
};

const Sharing = ({ sharingInfo }: { sharingInfo: any }) => {

    const isMobile = useIsMobile();
    const { user } = useAuth();
    const [show, setShow] = useState(false);
    const relativeTime = formatDistanceToNowStrict(
        new Date(sharingInfo.created_at),
        { addSuffix: false }
    );

    return <div className="w-full flex flex-col md:flex-row justify-between md:items-start gap-10 rounded-sm shadow-md p-5">
        <div className="flex gap-5">

            {/*User Image in photoframe*/}
            <div className="grow-0">
                <PhotoFrame round={true} width={isMobile ? 50 : 100} height={isMobile ? 50 : 100}>
                    {sharingInfo.user.profile_image && sharingInfo.user.profile_image.length > 0 ? <Image
                        src={sharingInfo.user.profile_image}
                        alt={`user image: ${sharingInfo.user.id}`}
                        fill
                        sizes="(max-width: 640px) 85px, (max-width: 768px) 120px, (max-width: 1024px) 160px, 185px"
                        className="object-cover"
                    /> : <div className="w-full h-full rounded-full flex items-center justify-center bg-accent text-white font-bold text-2xl md:text-4xl">
                        {sharingInfo.user.username[0].toUpperCase()}
                    </div>}
                </PhotoFrame>
            </div>

            {/*Information about user, the sharing and the messages*/}
            <div className="flex flex-col gap-2">

                <div className="w-full flex md:items-center gap-5">
                    <div className="flex flex-col md:flex-row gap-2 md:items-center md:gap-5">
                        <p className="font-rubik font-bold">
                            {user.id === sharingInfo.user_id ? "You" : "Your Partner"}
                        </p>

                        <p className="font-rubik font-light text-secondary-text text-sm">
                            {relativeTime}
                        </p>
                    </div>
                    <div>
                        <p className={`p-1 font-comfortaa text-sm rounded-md font-bold ${sharingInfo.category === "liking" ? "bg-pink-500/50 text-pink-500 border-pink-500" :
                            "bg-violet-500/50 text-violet-500 border-violet-500"}`}>
                            {sharingInfo.category === "liking" ? "Liking" : "Unliking"}
                        </p>
                    </div>
                </div>
                {!isMobile && <><div className="flex flex-col flex-wrap">
                    {sharingInfo.predefined_messages && sharingInfo.predefined_messages.map((str: string, i: number) => {
                        if (i === 0) {
                            return <p key={i} className="font-bold text-primary-text text-lg">{str}</p>
                        }

                        return <p key={i} className="font-bold text-primary-text text-lg">{`..${str}`}</p>
                    })}
                </div>

                    <SharingMessage message={sharingInfo.user_message} /></>}
            </div>
        </div>

        {isMobile && <><div className="flex flex-col flex-wrap">
            {sharingInfo.predefined_messages && sharingInfo.predefined_messages.map((str: string, i: number) => {
                if (i === 0) {
                    return <p key={i} className="font-bold text-primary-text text-lg">{str}</p>
                }

                return <p key={i} className="font-bold text-primary-text text-lg">{`..${str}`}</p>
            })}
        </div>

            <SharingMessage message={sharingInfo.user_message} /></>}
        {sharingInfo.image_id && <div className="w-full sm:w-[120px] cursor-pointer" onClick={() => setShow(true)}
            style={{
                transform: isMobile ? "" : `rotate(${Math.random() > 0.5 ? 5 : -5}deg)`
            }}
        >
            <Photograph url={sharingInfo.image_id} alternate={`Sharing-${sharingInfo.id}`}
                maxWidth={120} showTitle={false} />
        </div>}
        <Popups open={show} setOpen={setShow}>
            <MemoryHolder memoryInfo={{ ...sharingInfo, content_type: "image", media_id: sharingInfo.image_id, showTitle: false }} />
        </Popups>
    </div>
}


export default Sharing;