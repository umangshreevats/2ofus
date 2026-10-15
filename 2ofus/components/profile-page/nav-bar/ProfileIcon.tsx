'use client';

import { useAuth } from "@/app/auth-provider";
import Image from "next/image";


const ProfileIcon = () => {

    const { userData } = useAuth();
    console.log(userData.profile_image);
    return <div className="w-10 h-10 rounded-full font-bold">

        {(userData.profile_image && userData.profile_image.length > 0) ? 
        <Image src={userData.profile_image} width={150}
    height={150} alt="profile-Image" className="object-cover rounded-full" /> :
        <div className="w-full h-full rounded-full bg-accent text-white flex items-center justify-center">
            {userData.firstname[0] ?? userData.username[0] ?? "U"}
        </div>}
    </div>
}

export default ProfileIcon;