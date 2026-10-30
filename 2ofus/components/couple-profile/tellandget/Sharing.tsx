"use client";
import Photograph from "@/components/commons/Photograph";
import PhotoFrame from "@/components/commons/PhotoFrame";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/app/auth-provider";

const Sharing = ({ sharingInfo }: { sharingInfo: any }) => {

    const { user } = useAuth();
    const relativeTime = formatDistanceToNow(new Date(sharingInfo.created_at), {
        addSuffix: true
    });

    return <div className="w-full flex justify-between items-center gap-5 rounded-sm shadow-md p-5">
        <div className="flex items-center gap-5">

            {/*User Image in photoframe*/}
            <div className="grow-0">
                <PhotoFrame round={true} width={100} height={100}>
                    <Image
                        src={sharingInfo.user.profile_image}
                        alt={`user image: ${sharingInfo.user.id}`}
                        fill
                        sizes="(max-width: 640px) 85px, (max-width: 768px) 120px, (max-width: 1024px) 160px, 185px"
                        className="object-cover"
                    />
                </PhotoFrame>
            </div>

            {/*Information about user, the sharing and the messages*/}
            <div className="flex flex-col gap-2">

                <div className="w-full flex items-center gap-5">
                    <p className="font-rubik font-bold">
                        {user.id === sharingInfo.user_id ? "You" : "Your Partner"}
                    </p>

                    <p className="font-rubik font-light text-secondary-text text-sm">
                        {relativeTime}
                    </p>

                    <p className={`p-1 font-comfortaa text-sm rounded-md font-bold ${sharingInfo.category === "liking" ? "bg-pink-500/50 text-pink-500 border-pink-500" :
                        "bg-violet-500/50 text-violet-500 border-violet-500"}`}>
                        {sharingInfo.category === "liking" ? "Liking" : "Unliking"}
                    </p>
                </div>
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
        {sharingInfo.image_id && <div className="w-[120px]"
            style={{
                transform: `rotate(${Math.random() > 0.5 ? 5 : -5}deg)`
            }}
        >
            <Photograph url={sharingInfo.image_id} alternate={`Sharing-${sharingInfo.id}`}
                maxWidth={120} showTitle={false} />
        </div>}
    </div>
}


export default Sharing;