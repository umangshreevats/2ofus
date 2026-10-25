"use client";
import Image from "next/image";
import { Mars, Venus, VenusAndMars } from "lucide-react";
import Button from "../commons/Button";
import { useState } from "react";

const UserProfile = ({ profileInfo }: { profileInfo: any }) => {

    const [requestLoading, setRequestLoading] = useState(false);
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

            if(!response.ok){
                alert("An Error occured"+result.message);
            }
        } catch(err) {
            alert("An Error Occured");
        } finally {
            setRequestLoading(false);
        }
    }

    let finalProfileName = profileInfo.firstname && profileInfo.firstname.length > 0 ? profileInfo.firstname : "Someone Special";

    if(profileInfo.lastname && profileInfo.lastname.length > 0) {
        if(finalProfileName === profileInfo.firstname) {
            finalProfileName = finalProfileName+profileInfo.lastname;
        }
    }

    return <div className="relative w-full flex-wrap rounded-md flex gap-5 items-center p-2 hover:shadow-[0_0_6px_var(--accent)]">
        <div className="w-16 h-16 rounded-full">
            {(profileInfo.profile_image && profileInfo.profile_image.length > 0) ?
                <Image src={profileInfo.profile_image} alt={`profile-image-@${profileInfo.username}`}
                    width={150} height={150} className="object-cover rounded-full" /> :
                <div className="w-full h-full flex 
                justify-center rounded-full items-center bg-accent text-2xl font-bold text-white">
                    {profileInfo.username[0] ?? profileInfo.firstname[0] ?? profileInfo.lastname[0]}
                </div>}
        </div>

        <div className="flex flex-col gap-1">
            <p className="w-full font-bold">{finalProfileName}</p>
            <p className="w-full font-light text-secondary-text">@{profileInfo.username}</p>
        </div>

        <div>{profileInfo.gender === "male" ? <Mars color="green" /> : profileInfo.gender === "female" ? <Venus color="pink" /> : <VenusAndMars color="orange" />}</div>

        <div className="relative sm:absolute sm:right-10">
            <Button onClick={sendCoupleRequest} text={requestLoading ? "Sending..." : "Send Request"} disabled={requestLoading} />
        </div>
    </div>
}

export default UserProfile;