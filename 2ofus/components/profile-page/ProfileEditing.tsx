
"use client";

import { Couples, Users } from "@/types/profiles";
import { SetStateAction } from "react";
import IndividualProfile from "./IndividualProfile";

const ProfileEditing = ({
    type,
    profileData,
    setEditing,
    setProfileData,
    setCoupleData,
    selectedImage,
    setSelectedImage,
    originalProfile,
    originalCouple
}: {
    type: "fullname"
    | "dob"
    | "gender"
    | "interests"
    | "couple_name"
    | "anniversary_date"
    | "first_meet_date"
    | "first_meet_location"
    | "relationship_status";
    profileData: Users | Couples;
    setEditing: React.Dispatch<SetStateAction<boolean>>;
    setProfileData?: React.Dispatch<SetStateAction<Users>>;
    setCoupleData?: React.Dispatch<SetStateAction<Couples>>;
    selectedImage: File | null;
    setSelectedImage: React.Dispatch<SetStateAction<File | null>>;
    originalProfile?: React.RefObject<Users>;
    originalCouple?: React.RefObject<Couples>;
}) => {

    return (
        <div className="relative p-8 md:p-10 flex flex-col gap-5 bg-background rounded-md max-h-[85vh] overflow-y-auto w-full" style={{ scrollbarWidth: "none" }}>
            {setProfileData && originalProfile ? (
                <IndividualProfile
                    profileInfo={{
                        profileType: "users",
                        profileData: profileData as Users,
                        setProfileData,
                        originalProfile
                    }}
                    setEditing={setEditing}
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                    type={type}
                />
            ) : null}
        </div>
    );
};

export default ProfileEditing;
