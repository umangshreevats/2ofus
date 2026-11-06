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
    VenusAndMars,
    X
} from "lucide-react";
import PhotoFrame from "@/components/commons/PhotoFrame";
import InformationHolder from "@/components/profile-page/InformationHolder";
import { useThemeSettings } from "@/app/theme-provider";
import RedirectButton from "@/components/commons/RedirectButton";
import Popups from "@/components/commons/Popups";
import ProfileEditing from "@/components/profile-page/ProfileEditing";
import Button from "@/components/commons/Button";
import { toast } from "sonner";
import Image from "next/image";


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

    const originalProfile = useRef<Users>(
        structuredClone(userInfo)
    );

    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState<Users>(userInfo);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [interestsEditing, setInterestsEditing] = useState(false);

    let fullName = profile.firstname ? profile.firstname : "";

    if (fullName === profile.firstname) {
        fullName = fullName + " " + profile.lastname;
    }


    // Refs
    const fileInputRef = useRef<HTMLInputElement | null>(null);


    const handleRemoveProfileImage = () => {
        setSelectedImage(null);

        setProfile(prev => ({
            ...prev,
            profile_image: null
        }));

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };


    const handleSubmit = async () => {

        setLoading(true);
        try {
            const formData = new FormData();

            const editableFields: (keyof Users)[] = [
                "firstname",
                "lastname",
                "dob",
                "gender",
                "interests"
            ];

            // Compare original and edited profile
            editableFields.forEach((field) => {
                const originalValue = originalProfile.current[field];
                const editedValue = profile[field];

                const hasChanged =
                    JSON.stringify(originalValue ?? null) !==
                    JSON.stringify(editedValue ?? null);

                if (hasChanged) {
                    if (field === "interests") {
                        formData.append(
                            field,
                            JSON.stringify(editedValue ?? {})
                        );
                    } else {
                        formData.append(
                            field,
                            typeof editedValue === "object"
                                ? JSON.stringify(editedValue ?? {})
                                : String(editedValue ?? "")
                        );
                    }
                }
            });

            // Profile image comparison
            if (selectedImage) {
                if (originalProfile.current.profile_image !== null) formData.append("removeProfileImage", "true");
                else formData.append("removeProfileImage", "false");
                formData.append("profile_image", selectedImage);
            } else if (
                originalProfile.current.profile_image &&
                !profile.profile_image
            ) {
                formData.append("removeProfileImage", "true");
            } else {
                formData.append("removeProfileImage", "false");
            }

            // Check if anything changed
            if ([...formData.keys()].length === 0) {
                console.log("Nothing to update");
                return;
            }

            const response = await fetch(`/api/profile/${userInfo.username}`, {
                method: "PATCH",
                body: formData
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error(result.message || "Update failed");
                setLoading(false);
                return;
            }
            setSelectedImage(null);

            // Update original snapshot
            originalProfile.current = structuredClone(result.user);

            toast.success("Profile updated!");

        } catch (err) {

            if (err instanceof Error) {
                toast.error("Error updating profile:" + err.message);
            } else toast.error("Error updating profile");
        } finally {
            setLoading(false);
        }
    };


    return <div className="parent-box">
        <div className="child-box flex flex-col p-10 gap-5">
            <Popups open={interestsEditing} setOpen={setInterestsEditing}>
                <ProfileEditing selectedImage={selectedImage} setSelectedImage={setSelectedImage} originalProfile={originalProfile} type={"interests"} setEditing={setInterestsEditing} profileData={profile} setProfileData={setProfile} />
            </Popups>
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
            <div className="flex flex-col items-center min-h-[500px]">

                <div className="w-full flex flex-col md:flex-row gap-5">
                    {/*Profile Image*/}
                    <div className="relative w-full h-full gap-5 flex flex-col justify-center items-center p-5">
                        <h4 className="w-full font-rubik text-primary-text text-2xl border-b border-b-primary-text border-dashed font-bold">
                            Profile Image
                        </h4>
                        <PhotoFrame width={300} height={300} round={true}>
                            {profile.profile_image && profile.profile_image.length > 0 ?
                                <Image src={profile.profile_image} alt="profile-image" fill
                                    sizes="(max-width: 640px) 85px, (max-width: 768px) 120px, (max-width: 1024px) 160px, 185px" />
                                : <div className="w-full h-full font-bold background-accent flex justify-center items-center">
                                    <span className="text-2xl text-white">{profile.username ? profile.username[0].toUpperCase() : "S"} </span>
                                </div>}
                        </PhotoFrame>

                        <input
                            ref={fileInputRef}
                            onChange={(e) => {
                                const file = e.target.files?.[0];

                                if (!file) return;

                                setSelectedImage(file);

                                const url = URL.createObjectURL(file);

                                setProfile(prev => ({
                                    ...prev,
                                    profile_image: url
                                }));
                            }}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="profile-image"
                        />


                        {allowEdits && <label htmlFor="profile-image" className="absolute left-5 top-40 sm:left-10 sm:top-16 flex gap-2">
                            <div>
                                <PlayfulButton
                                    onClick={() => fileInputRef.current?.click()}
                                    icon={Pencil}
                                />

                                {profile.profile_image && (
                                    <PlayfulButton
                                        onClick={handleRemoveProfileImage}
                                        icon={X}
                                    />
                                )}
                            </div>
                        </label>
                        }


                        {(allowEdits && (selectedImage || (originalProfile.current && originalProfile.current.profile_image && !profile.profile_image))) &&
                            <Button type="button" onClick={handleSubmit} text={loading ? "Saving..." : "Save Changes"} disabled={loading} />}
                    </div>

                    {/*Informations*/}
                    <div className="w-full h-full flex flex-col p-5 gap-5">
                        <div className="w-full flex flex-col md:flex-row gap-5 items-center items-center">
                            <InformationHolder
                                selectedImage={selectedImage} setSelectedImage={setSelectedImage} originalProfile={originalProfile}
                                profileData={profile}
                                setProfileData={setProfile}
                                heading="Username"
                                information={profile.username ?? "Special Someone"}
                                icon={AtSign}
                                iconColor="#E8DFFF"
                                allowEdit={false}
                            />

                            <InformationHolder
                                selectedImage={selectedImage} setSelectedImage={setSelectedImage} originalProfile={originalProfile}
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
                                selectedImage={selectedImage} setSelectedImage={setSelectedImage} originalProfile={originalProfile}
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
                                selectedImage={selectedImage}
                                setSelectedImage={setSelectedImage} originalProfile={originalProfile}
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
                                selectedImage={selectedImage} setSelectedImage={setSelectedImage} originalProfile={originalProfile}
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
    </div>
}


export default ProfileInformations;