"use client";

import Headings from "@/components/commons/Headings";
import PlayfulButton from "@/components/commons/PlayfulButton";
import type { Users } from "@/types/profiles";
import { useState, useRef } from "react";
import {
    Pencil, AtSign,
    Mail,
    UserRound,
    CalendarDays,
    VenusAndMars
} from "lucide-react";
import PhotoFrame from "@/components/commons/PhotoFrame";
import InformationHolder from "@/components/profile-page/InformationHolder";
import { useThemeSettings } from "@/app/theme-provider";
import RedirectButton from "@/components/commons/RedirectButton";
import Popups from "@/components/commons/Popups";
import ProfileEditing from "@/components/profile-page/ProfileEditing";



const ProfileInformations = ({ userInfo, allowEdits }: {
    userInfo: any,
    allowEdits: boolean
}) => {

    // Display name for profile heading
    let finalProfilename = userInfo.firstname && userInfo.firstname.length > 0 ? userInfo.firstname : userInfo.username;
    if (finalProfilename === userInfo.firstname) {
        finalProfilename = userInfo.lastname && userInfo.lastname.length > 0 ? finalProfilename + " " + userInfo.lastname : finalProfilename;
    }

    const { theme } = useThemeSettings();
    const [profile, setProfile] = useState<Users>(userInfo);
    const [interestsEditing, setInterestsEditing] = useState(false);

    let fullName = profile.firstname ? profile.firstname : "";

    if (fullName === profile.firstname) {
        fullName = fullName + " " + profile.lastname;
    }


    // Refs
    const fileInputRef = useRef<HTMLInputElement | null>(null);


    return <div className="parent-box">
        <div className="child-box flex flex-col p-10 gap-5">

            <div className="w-full flex flex-col gap-5 justify-between border-b-2 border-b-primary-text border-dashed">
                <div className="w-10 h-10">
                    <RedirectButton redirectLink="/home/my-couple" />
                </div>
                <Headings
                    heading={`Profile Information for: `}
                    subheading={`${finalProfilename}`}
                    paragraph={allowEdits ? "Here you can view and edit the information of yours" : "A special someone you might know!"}
                />
            </div>

            {/*Profile Information and alteration section*/}
            <div className="grid md:grid-cols-[1fr_2fr] md:grid-rows-[1fr_4fr] min-h-[500px]">

                {/*Profile Image*/}
                <div className="relative w-full h-full gap-5 flex flex-col justify-center items-center p-5">
                    <h4 className="w-full font-rubik text-primary-text text-2xl border-b border-b-primary-text border-dashed font-bold">
                        Profile Image
                    </h4>
                    <PhotoFrame width={300} height={300} round={true}>
                        {profile.profile_image && profile.profile_image.length > 0 ?
                            <img src={profile.profile_image} alt="profile Image" width={300} height={300} className="object-cover rounded-full" />
                            : <div className="w-full h-full font-bold background-accent flex justify-center items-center">
                                <span className="text-2xl text-white">{profile.username ? profile.username[0].toUpperCase() : "S"} </span>
                            </div>}
                    </PhotoFrame>

                    <input ref={fileInputRef} onChange={(e) => {
                        if (!e.target.files?.[0]) return;

                        const url = URL.createObjectURL(e.target.files?.[0]);

                        setProfile(prev => ({
                            ...prev,
                            profile_image: url
                        }));
                    }} type="file" accept="image/*" className="hidden" id="profile-image" />
                    {allowEdits && <label htmlFor="profile-image" className="absolute left-5 top-40 sm:left-10 sm:top-16">
                        <PlayfulButton onClick={() => fileInputRef.current?.click()} icon={Pencil} />
                    </label>}
                </div>

                {/*Informations*/}
                <div className="w-full h-full flex flex-col p-5 gap-5">
                    <div className="w-full flex flex-col md:flex-row gap-5 items-center items-center">
                        <InformationHolder
                            profileData={profile}
                            setProfileData={setProfile}
                            heading="Username"
                            information={profile.username ?? "Special Someone"}
                            icon={AtSign}
                            iconColor="#E8DFFF"
                            allowEdit={false}
                        />

                        <InformationHolder
                            profileData={profile}
                            setProfileData={setProfile}
                            heading="Email"
                            information={profile.email ?? "Someone@example.com"}
                            icon={Mail}
                            iconColor="#DCEBFF"
                            allowEdit={false}
                        />
                    </div>
                    <div className="w-full flex-col md:flex-row flex gap-5 items-center items-center">
                        <InformationHolder
                            type="fullname"
                            profileData={profile}
                            setProfileData={setProfile}
                            heading="Full Name"
                            information={fullName}
                            icon={UserRound}
                            iconColor="#FFE1EA"
                            allowEdit={allowEdits}
                        />

                        <InformationHolder
                            type="dob"
                            profileData={profile}
                            setProfileData={setProfile}
                            heading="Date of Birth"
                            information={profile.dob ?? "Some date"}
                            icon={CalendarDays}
                            iconColor="#FFF0C9"
                            allowEdit={allowEdits}
                        />
                    </div>

                    <div className="w-full md:w-1/2 flex flex-col md:flex-row gap-5 items-center items-center">
                        <InformationHolder
                            type="gender"
                            profileData={profile}
                            setProfileData={setProfile}
                            heading="Gender"
                            information={profile.gender ?? "Some kind"}
                            icon={VenusAndMars}
                            iconColor="#DDF5E5"
                            allowEdit={allowEdits}
                        />
                    </div>
                </div>


                {/*Interests*/}
                <div className={`${theme === "light" ? "bg-white" : "bg-black"} col-span-2 auto-rows-min shadow-[0_0_2px_var(--primary-text)] w-full gap-5 rounded-md p-5`}>

                    <div className="w-full flex justify-between items-center">
                        <h4 className="w-full font-rubik text-primary-text text-2xl border-b border-b-primary-text border-dashed font-bold mb-10">
                            Interests
                        </h4>

                        {allowEdits && <div className="aspect-square p-5">
                            <PlayfulButton onClick={() => setInterestsEditing(prev => !prev)} backgroundColor="var(--accent)" textColor="white" padding={5} pScale="px" width={100} height={100} wScale="%" hScale="%" icon={Pencil} />
                        </div>}
                    </div>
                    <div className={`flex gap-5 flex-col`}>
                        {profile.interests && Object.entries(profile.interests).map(([interestName, interestValue]) => (<div key={interestName}>
                            {interestValue.length > 0 && <div className="flex flex-col gap-5 border-b border-b-primary-text border-dashed">
                                <h5 className="text-primary-text font-bold font-rubik first-letter:uppercase">
                                    {interestName}
                                </h5>

                                <div className="flex gap-2 font-medium text-sm flex-wrap font-comfortaa text-secondary-text">
                                    {interestValue.map((interest, i) => (
                                        <span key={i} className="p-2 rounded-full border-2">
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </div>}</div>))}
                    </div>
                </div>
            </div>
        </div>

        <Popups open={interestsEditing} setOpen={setInterestsEditing}>
            <ProfileEditing type={"interests"} setEditing={setInterestsEditing} profileData={profile} setProfileData={setProfile} />
        </Popups>
    </div>
}


export default ProfileInformations;