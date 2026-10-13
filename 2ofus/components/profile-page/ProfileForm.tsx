'use client';

import { ProfileData } from "@/features/profile-page/ProfileSetup";
import { SetStateAction, useMemo, useEffect } from "react";
import Image from "next/image";
import { defaultUser } from "@/data/images";
import DatePicker from "../commons/DatePicker";

interface ProfileFormProps {
    profileData: ProfileData;
    setProfileData: React.Dispatch<SetStateAction<ProfileData>>;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ profileData, setProfileData }) => {

    const imagePreview = useMemo(() => {
        return profileData.profileImg
            ? URL.createObjectURL(profileData.profileImg)
            : null;
    }, [profileData.profileImg]);

    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);
    return <div className="w-full">
        <form className="w-full p-5 flex flex-col gap-5">

            <div className="w-full flex justify-center items-center p-5">
                <div className="flex flex-col items-center gap-3">

                    <label className="w-full text-lg font-bold">Profile Image: </label>
                    <label className="relative block h-40 w-40 rounded-full border-4 border-accent border-solid overflow-hidden cursor-pointer">

                        <Image
                            src={imagePreview ?? defaultUser}
                            alt="profile"
                            fill
                            className="object-cover"
                        />

                        <input
                            type="file"
                            accept="image/png, image/jpeg, image/webp"
                            className="hidden"
                            onChange={(e) =>
                                setProfileData(prev => ({
                                    ...prev,
                                    profileImg: e.target.files?.[0] ?? null,
                                }))
                            }
                        />

                    </label>

                    {profileData.profileImg && (
                        <button
                            type="button"
                            onClick={() => {
                                setProfileData(prev => ({
                                    ...prev,
                                    profileImg: null,
                                }));
                            }}
                            className="cursor-pointer text-sm text-red-500 hover:text-red-600 transition-colors"
                        >
                            Remove Photo
                        </button>
                    )}

                </div>
            </div>
            <div className="w-full flex flex-col sm:flex-row gap-5">
                <label htmlFor="firstname" className="w-full">

                    <label className="w-full text-lg font-bold">First name: </label>
                    <input
                        value={profileData.firstname}
                        onChange={(e) => setProfileData(prev => ({ ...prev, firstname: e.target.value }))}
                        type="text"
                        id="firstname"
                        placeholder="Enter First Name"
                        className="p-2 rounded-sm w-full outline-accent" />
                </label>

                <label htmlFor="lastname" className="w-full">
                    <label className="w-full text-lg font-bold">Last name: </label>
                    <input
                        value={profileData.lastname}
                        onChange={(e) => setProfileData(prev => ({ ...prev, lastname: e.target.value }))}
                        type="text"
                        id="lastname"
                        placeholder="Enter Last Name"
                        className="p-2 rounded-sm w-full outline-accent" />
                </label>
            </div>

            <label className="w-full text-lg font-bold">Date of Birth: </label>
            <DatePicker
                value={profileData.dob}
                onChange={(date) =>
                    setProfileData(prev => ({
                        ...prev,
                        dob: date
                    }))
                }
            />
        </form>
    </div>
}


export default ProfileForm;