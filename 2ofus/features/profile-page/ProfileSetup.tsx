'use client';
import Interest from "@/components/profile-page/Interest";
import InterestCategory from "@/components/profile-page/InterestCategory";
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


    const [interests, setInterests] = useState({
        places: [
            { Q1: [] }, // What kind of places do you love visiting?
            { Q2: [] }, // What is your preferred travel style?
            { Q3: [] }, // Which destinations would you love to visit?
        ],

        hobbies: [
            { Q1: [] }, // What do you enjoy doing in your free time?
            { Q2: [] }, // What are your creative interests?
            { Q3: [] }, // How do you prefer spending your weekends?
        ],

        food: [
            { Q1: [] }, // Which cuisines do you enjoy?
            { Q2: [] }, // What kind of food do you prefer?
            { Q3: [] }, // What are your favourite drinks?
        ],

        entertainment: [
            { Q1: [] }, // What movie genres do you enjoy?
            { Q2: [] }, // What kind of shows do you enjoy watching?
            { Q3: [] }, // What entertainment activities do you enjoy?
        ],

        music: [
            { Q1: [] }, // What genres of music do you listen to?
            { Q2: [] }, // What kind of music matches your mood?
            { Q3: [] }, // Which languages do you enjoy listening to?
        ],

        sports: [
            { Q1: [] }, // Which sports do you enjoy?
            { Q2: [] }, // What fitness activities do you enjoy?
            { Q3: [] }, // What sports do you love watching?
        ],

        lifestyle: [
            { Q1: [] }, // How would you describe your lifestyle?
            { Q2: [] }, // What matters most to you in life?
            { Q3: [] }, // What does your ideal day look like?
        ]
    });


    const [option, setOption] = useState<"places" | "hobbies" | "food" | "entertainment" | "music" | "sports" | "lifestyle" | null>(null);

    return (<div>
        {page === 1 && <ProfileForm profileData={profileData} setProfileData={setProfileData} setPage={setPage} />}
        {page === 2 && <InterestCategory setPage={setPage} setOption={setOption} />}
        {page === 3 && <Interest setInterests={setInterests} setPage={setPage} setOption={setOption} option={option} />}
    </div>);
}

export default ProfileSetup;