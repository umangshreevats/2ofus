'use client';

import { useAuth } from "@/app/auth-provider";
import Image from "next/image";


const ProfileIcon = () => {

    const { userData } = useAuth();
    return <div className="w-10 h-10 rounded-full font-bold">

        {(userData.profileImg && userData.profileImg.length > 0) ? 
        <Image src={userData.profileImg} alt="profileImage" className="object-cover" /> :
        <div className="w-full h-full rounded-full bg-accent text-white flex items-center justify-center">
            {userData.firstname[0] ?? userData.username[0] ?? "U"}
        </div>}
    </div>
}

export default ProfileIcon;