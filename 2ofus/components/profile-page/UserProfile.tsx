"use client";
import Image from "next/image";
import { Check, Mars, Venus, VenusAndMars } from "lucide-react";
import Button from "../commons/Button";
import { useState } from "react";
import Link from "next/link";
import PhotoFrame from "../commons/PhotoFrame";
import { toast } from "sonner";


const UserProfile = ({ profileInfo }: { profileInfo: any }) => {

    const [requestLoading, setRequestLoading] = useState(false);
    const [requestSend, setRequestSend] = useState(false);
    const sendCoupleRequest = async () => {

        setRequestLoading(true);
        try {

            const response = await fetch("/api/couple/connect", {
                method: "POST",
                body: JSON.stringify({
                    requestedId: profileInfo.id,
                })
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error("An Error occured" + result.message);
                setRequestLoading(false);
                return;
            }

            toast.success("Request to connect send successfully!");
            setRequestSend(true);
        } catch (err) {

            if(err instanceof Error) {
                toast.error("An Error Occured: " + err.message);
            }
        } finally {
            setRequestLoading(false);
        }
    }

    let finalProfileName = profileInfo.firstname && profileInfo.firstname.length > 0 ? profileInfo.firstname : "Someone Special";

    if (profileInfo.lastname && profileInfo.lastname.length > 0) {
        if (finalProfileName === profileInfo.firstname) {
            finalProfileName = finalProfileName + profileInfo.lastname;
        }
    }


    // Get user's interests
    const getInterests = () => {
        return Object.values(profileInfo.interests ?? {})
            .flat()
            .slice(0, 10);
    };

    return (
        <div className="flex flex-col gap-2 hover:shadow-[0_0_6px_var(--accent)] rounded-md">

            <div className="relative w-full flex-wrap rounded-md flex gap-5 items-center p-2">

                <Link
                    href={`/home/profile/@${profileInfo.username}`}
                    className="flex items-center gap-5 flex-1 min-w-0"
                >

                    <div className="w-16 h-16 rounded-full shrink-0">
                        <PhotoFrame width={70} height={70} round={true}>
                            {profileInfo.profile_image ? (
                                <img src={profileInfo.profile_image} alt="profile Image" width={70} height={70} className="object-cover rounded-full" />
                            ) : (
                                <div className="w-full h-full flex justify-center rounded-full items-center bg-accent text-2xl font-bold text-white">
                                    {profileInfo.username[0]}
                                </div>
                            )}
                        </PhotoFrame>
                    </div>

                    <div className="flex flex-col gap-1 min-w-0">
                        <p className="w-full font-bold">{finalProfileName}</p>
                        <p className="w-full font-light text-secondary-text">
                            @{profileInfo.username}
                        </p>
                    </div>

                    <div>
                        {profileInfo.gender === "male" ?
                            <Mars color="green" /> :
                            profileInfo.gender === "female" ?
                                <Venus color="pink" /> :
                                <VenusAndMars color="orange" />
                        }
                    </div>
                </Link>

                <div className="relative shrink-0 sm:absolute sm:right-10">
                    {requestSend ? <div className="flex gap-2 items-center w-full h-10 rounded full p-5 bg-green-500/70 text-white">
                    <Check /> Request Send
                    </div> : <Button
                        hoverEffect={true}
                        onClick={sendCoupleRequest}
                        text={requestLoading ? "Sending..." : "Send Request"}
                        disabled={requestLoading}
                    />}
                </div>
            </div>

            {getInterests().length > 0 && (
                <div className="p-2 w-full flex flex-col gap-2">
                    <h3 className="font-rubik font-bold text-lg text-primary-text">
                        Interests
                    </h3>

                    <div className="flex flex-wrap gap-2 font-medium font-comfortaa text-secondary-text">
                        {getInterests().map((interest: any, i: number) => (
                            <span key={i}>
                                {interest}{i !== getInterests().length - 1 ? "," : ""}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserProfile;