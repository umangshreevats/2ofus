'use client';

import { ProfileData } from "@/features/profile-page/ProfileSetup";
import { SetStateAction, useMemo, useEffect, ChangeEvent, useState } from "react";
import Image from "next/image";
import { defaultUser } from "@/data/images";
import DatePicker from "../commons/DatePicker";
import PlayfulInput from "../commons/PlayfulInput";
import PlayfulButton from "../commons/PlayfulButton";
import Button from "../commons/Button";
import { useThemeSettings } from "@/app/theme-provider";


interface ProfileFormProps {
    profileData: ProfileData;
    setProfileData: React.Dispatch<SetStateAction<ProfileData>>;
    setPage: React.Dispatch<SetStateAction<number>>;
    username: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ username, profileData, setProfileData, setPage }) => {

    const { theme } = useThemeSettings();
    const [loading, setLoading] = useState(false);
    // Profile Image
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

    const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (profileData.firstname.length === 0 || profileData.lastname.length === 0 || !profileData.dob || !profileData.gender) {
            alert("One or more entries are empty");
            return;
        }
        setLoading(true);

        try {

            const response = await fetch(`/api/profile/${username}`, {
                method: "POST",
                body: JSON.stringify({
                    firstname: profileData.firstname,
                    lastname: profileData.lastname,
                    dob: profileData.dob?.toISOString() ?? null,
                    gender: profileData.gender,
                }),
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Profile creation failed");
            }
            setPage(2);
        } catch (err) {
            alert("An error occured");
        } finally {
            setLoading(false);
        }
    }


    return <div className="w-full">
        <form onSubmit={handleProfileSubmit} className="w-full p-5 flex flex-col gap-5">
            <div className="w-full flex justify-center items-center p-5">
                <div className="flex flex-col items-center gap-3">

                    {/*Profile Image Setup*/}
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
                    <p className="w-full text-secondary-text font-light">Choose the best image with you and your soulmate, ❤️</p>
                </div>
            </div>
            <div className="w-full flex flex-col sm:flex-row gap-5">

                {/*First Name*/}
                <label htmlFor="firstname" className="w-full">

                    <label className="w-full text-lg font-bold">First name: </label>

                    <PlayfulInput
                        textAlign="start"
                        width={100}
                        wScale="%"
                        text={profileData.firstname}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setProfileData(prev => ({ ...prev, firstname: e.target.value }))}
                        placeholder="Enter First Name"
                        id="firstname"
                    />
                </label>

                {/*Last Name*/}
                <label htmlFor="lastname" className="w-full">
                    <label className="w-full text-lg font-bold">Last name: </label>

                    <PlayfulInput
                        textAlign="start"
                        width={100}
                        wScale="%"
                        text={profileData.lastname}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setProfileData(prev => ({ ...prev, lastname: e.target.value }))}
                        placeholder="Enter Last Name"
                        id="lastname"
                    />
                </label>
            </div>

            {/*DOB*/}
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
            <p className="w-full text-secondary-text font-light">Your birthday helps us celebrate your special day! 🎂</p>

            {/*Gender*/}

            <label className="w-full text-lg font-bold">Choose Gender:</label>

            <input className="w-full font-bold rounded-sm outline-accent"
                type="text"
                value={`Gender: ${profileData.gender ?? ""}`}
                disabled={true}
            />
            <div className="flex gap-2 h-40 p-2">
                <PlayfulButton
                    width={100}
                    height={100}
                    wScale="%"
                    hScale="%"
                    text="Male"
                    backgroundColor="rgba(144, 238, 144, 0.5)"
                    textColor="rgba(0, 128, 0, 1)"
                    borderColor="rgba(0, 128, 0, 1)"
                    onClick={() => setProfileData(prev => ({ ...prev, gender: "male" }))} />

                <PlayfulButton
                    width={100}
                    height={100}
                    wScale="%"
                    hScale="%"
                    text="Female"
                    backgroundColor="rgba(255, 182, 193, 0.5)"
                    textColor="rgba(255, 105, 180, 1)"
                    borderColor="rgba(255, 105, 180, 1)"
                    onClick={() => setProfileData(prev => ({ ...prev, gender: "female" }))} />

                <PlayfulButton
                    width={100}
                    height={100}
                    wScale="%"
                    hScale="%"
                    text="Other"
                    backgroundColor="rgba(255, 200, 150, 0.5)"
                    borderColor="rgba(255, 165, 0, 1)"
                    textColor="rgba(255, 165, 0, 1)"
                    onClick={() => setProfileData(prev => ({ ...prev, gender: "other" }))} />

            </div>
            <p className="w-full text-secondary-text font-light">Choose whichever best describes you.</p>

            <Button text={loading ? "Creating Profile..." : "Continue"} disabled={loading} />
            <Button type="button"
                onClick={() => setPage(2)}
                text="Skip" backgroundColor="background" textColor={theme === "light" ? "black" : "white"} />
        </form>
    </div>
}


export default ProfileForm;