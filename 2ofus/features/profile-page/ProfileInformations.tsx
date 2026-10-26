"use client";

import Headings from "@/components/commons/Headings";
import PlayfulButton from "@/components/commons/PlayfulButton";
import { Users } from "@/types/profiles";
import { useState, useRef } from "react";
import { Pencil } from "lucide-react";
import PhotoFrame from "@/components/commons/PhotoFrame";
import PlayfulInput from "@/components/commons/PlayfulInput";

const ProfileInformations = ({ userInfo, allowEdits }: {
    userInfo: any,
    allowEdits: boolean
}) => {

    // Display name for profile heading
    let finalProfilename = userInfo.firstname && userInfo.firstname.length > 0 ? userInfo.firstname : userInfo.username;
    if (finalProfilename === userInfo.firstname) {
        finalProfilename = userInfo.lastname && userInfo.lastname.length > 0 ? finalProfilename + " " + userInfo.lastname : finalProfilename;
    }

    const [profile, setProfile] = useState<Users>(userInfo);

    // Editing options
    const [nameEdit, setNameEdit] = useState(false);


    // Refs
    const fileInputRef = useRef<HTMLInputElement | null>(null);


    return <div className="parent-box">
        <div className="child-box flex flex-col p-10 gap-5">

            <div className="w-full flex justify-between items-center border-b-2 border-b-primary-text border-dashed">
                <Headings
                    heading={`Profile Information for: `}
                    subheading={`${finalProfilename}`}
                    paragraph={allowEdits ? "Here you can view and edit the information of yours" : "A special someone you might know!"}
                />
            </div>

            {/*Profile Information and alteration section*/}
            <div className="grid grid-rows-[1fr_2fr] md:grid-rows-1 md:grid-cols-2 min-h-[500px]">

                {/*Profile Image*/}
                <div className="relative w-full h-full flex justify-center items-center">
                    <PhotoFrame width={300} height={300} round={true}>
                        {profile.profile_image && profile.profile_image.length > 0 ? 
                        <img src={profile.profile_image} alt="profile Image" width={300} height={300} className="object-cover rounded-full" />
                        : <div className="w-full h-full font-bold background-accent flex justify-center items-center">
                            <span className="text-2xl text-white">{profile.username ? profile.username[0].toUpperCase() : "S"} </span>
                        </div>}
                    </PhotoFrame>

                    <input ref={fileInputRef} onChange={(e) => {
                        if(!e.target.files?.[0]) return;

                        const url = URL.createObjectURL(e.target.files?.[0]);

                        setProfile(prev => ({
                            ...prev,
                            profile_image: url
                        }));
                    }} type="file" accept="image/*" className="hidden" id="profile-image" />
                    {allowEdits && <label htmlFor="profile-image" className="absolute left-5 top-5 sm:left-10 sm:top-10">
                        <PlayfulButton onClick={() => fileInputRef.current?.click()} icon={Pencil} />
                    </label>}
                </div>

                {/*Other Informations*/}
                <div className="relative w-full h-full flex flex-col items-center p-5">

                    <div className="relative w-full flex flex-col gap-5">
                        {!nameEdit && <h2 className="w-full text-lg font-bold">Full Name: </h2>}
                        <div className="w-full flex gap-5 items-center">
                            {nameEdit ?
                                <div className="flex flex-col gap-2">
                                    <h2 className="w-full text-lg font-bold">First Name: </h2>
                                    <PlayfulInput text={profile.firstname ?? ""}
                                        disabled={!allowEdits || !nameEdit}
                                        textAlign="center"
                                        onChange={(e) => setProfile(prev => ({
                                            ...prev,
                                            firstname: e.target.value
                                        }))} />
                                    <h2 className="w-full text-lg font-bold">Last Name: </h2>
                                    <PlayfulInput text={profile.lastname ?? ""}
                                        disabled={!allowEdits || !nameEdit}
                                        textAlign="center"
                                        onChange={(e) => setProfile(prev => ({
                                            ...prev,
                                            lastname: e.target.value
                                        }))} />
                                </div> :

                                <PlayfulInput text={profile.firstname ?? "" + " " + profile.lastname ?? ""}
                                    disabled={true}
                                    textAlign="center"
                                    onChange={(e) => setProfile(prev => ({
                                        ...prev,
                                        firstname: e.target.value
                                    }))} />}
                            {allowEdits && <label htmlFor="full-name" className="relative bottom-2">
                                <PlayfulButton onClick={() => setNameEdit(prev => !prev)} icon={Pencil} />
                            </label>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}


export default ProfileInformations;