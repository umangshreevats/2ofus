'use client';
import Interest from "@/components/profile-page/Interest";
import InterestCategory from "@/components/profile-page/InterestCategory";
import ProfileForm from "@/components/profile-page/ProfileForm";
import { useState, useEffect } from "react";


export interface ProfileData {
    profileImg: File | null;
    firstname: string;
    lastname: string;
    dob: Date | null;
    gender: "male" | "female" | "other" | null
}

const ProfileSetup = ({ username }: { username: string }) => {


    const [page, setPage] = useState(1);
    const [profileData, setProfileData] = useState<ProfileData>({
        firstname: "",
        lastname: "",
        dob: null,
        profileImg: null,
        gender: null
    });


    const [interests, setInterests] = useState({
        places: [],

        hobbies: [],

        food: [],

        entertainment: [],

        music: [],

        sports: [],

        lifestyle: []
    });

    useEffect(() => {
        const savedPage = localStorage.getItem("page");

        if (savedPage) {
            const parsedPage = Number(savedPage);

            if ([1, 2, 3].includes(parsedPage)) {
                setPage(parsedPage);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("page", String(page));
    }, [page]);


    const [option, setOption] = useState<"places" | "hobbies" | "food" | "entertainment" | "music" | "sports" | "lifestyle" | null>(null);

    return (<div>
        {page === 1 && <ProfileForm username={username} profileData={profileData} setProfileData={setProfileData} setPage={setPage} />}
        {page === 2 && <InterestCategory username={username} interestsList={interests} setPage={setPage} setOption={setOption} />}
        {page === 3 && <Interest interests={interests} setInterests={setInterests} setPage={setPage} setOption={setOption} option={option} />}
    </div>);
}

export default ProfileSetup;