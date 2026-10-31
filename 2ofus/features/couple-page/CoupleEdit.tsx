"use client";

import Headings from "@/components/commons/Headings";
import RedirectButton from "@/components/commons/RedirectButton";
import PhotoFrame from "@/components/commons/PhotoFrame";
import { useState, useRef } from "react";
import PlayfulButton from "@/components/commons/PlayfulButton";
import Button from "@/components/commons/Button";
import { Pencil, X } from "lucide-react";


const CoupleEdit = ({ profileData, allowEdits }: { profileData: any, allowEdits: boolean }) => {
    
    const originalProfile = useRef(profileData);
    const [profile, setProfile] = useState(profileData);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = async () => {};

    const handleRemoveProfileImage = () => {};

    return <div className="parent-box">
        <div className="child-box p-5 gap-5 flex flex-col">
            <div>
                <RedirectButton
                    redirectLink="/home/my-couple"
                />


                <div className="w-full border-b-2 border-dashed border-b-primary-text">
                    <Headings
                        heading="Edit Couple Profile"
                        paragraph="Update your shared space, add memories, and make it truly yours."
                    />
                </div>


                {/*Grid box for the couple data*/}
                <div className="w-full flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:grid-rows-2">
                    {/*Couple Cover Image*/}
                    <div className="relative w-full h-full gap-5 flex flex-col justify-center items-center p-5">
                        <h4 className="w-full font-rubik text-primary-text text-2xl border-b border-b-primary-text border-dashed font-bold">
                            Cover Image
                        </h4>
                        <PhotoFrame width={300} height={300} round={true}>
                            {profile.cover_image && profile.cover_image.length > 0 ?
                                <img src={profile.cover_image} alt="profile Image" width={300} height={300} className="object-cover rounded-full" />
                                : <div className="w-full h-full font-bold background-accent flex justify-center items-center">
                                    <span className="text-2xl text-white">{profile.couple_name ? profile.couple_name[0].toUpperCase() : "S"} </span>
                                </div>}
                        </PhotoFrame>

                        <input
                            ref={fileInputRef}
                            onChange={(e) => {
                                const file = e.target.files?.[0];

                                if (!file) return;

                                setSelectedImage(file);

                                const url = URL.createObjectURL(file);

                                setProfile((prev: any) => ({
                                    ...prev,
                                    cover_image: url
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

                                {profile.cover_image && (
                                    <PlayfulButton
                                        onClick={handleRemoveProfileImage}
                                        icon={X}
                                    />
                                )}
                            </div>
                        </label>
                        }


                        {(allowEdits && (selectedImage || (originalProfile.current && originalProfile.current.cover_image && !profile.cover_image))) &&
                            <Button type="button" onClick={handleSubmit} text={loading ? "Saving..." : "Save Changes"} disabled={loading} />}
                    </div>
                </div>
            </div>
        </div>
    </div>
}


export default CoupleEdit;