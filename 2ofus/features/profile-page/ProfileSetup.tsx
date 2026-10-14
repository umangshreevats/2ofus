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


    const [page, setPage] = useState(1);
    const [profileData, setProfileData] = useState<ProfileData>({
        firstname: "",
        lastname: "",
        dob: null,
        profileImg: null,
        gender: null
    });

    return (<div>
        {page === 1 && <ProfileForm profileData={profileData} setProfileData={setProfileData} />}
        {page === 2 && <div></div>}
    </div>);
}

export default ProfileSetup;