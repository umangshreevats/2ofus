'use client';
import ProfileForm from "@/components/profile-page/ProfileForm";
import { useState } from "react";


export interface ProfileData {
    profileImg: File | null;
    firstname: string;
    lastname: string;
    dob: Date | null;
    gender: "male" | "female" | "other" | null
}

const ProfileSetup = () => {

    const [profileData, setProfileData] = useState<ProfileData>({
        firstname: "",
        lastname: "",
        dob: null,
        profileImg: null,
        gender: null
    });

    return (<div>
        <ProfileForm profileData={profileData} setProfileData={setProfileData} />
    </div>);
}

export default ProfileSetup;