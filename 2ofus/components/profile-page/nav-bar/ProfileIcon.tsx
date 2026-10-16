'use client';
import { useState } from "react";
import { useAuth } from "@/app/auth-provider";
import Image from "next/image";
import DropDown from "@/components/commons/DropDown";

const dropDownOptions = [
    { id: "first", name: "First" },
    { id: "second", name: "Second" }
];
const ProfileIcon = () => {

    const [open, setOpen] = useState(false);
    const { userData } = useAuth();
    return <DropDown iconPos="end" open={open} setOpen={setOpen} right={10} top={10} dropDownOptions={dropDownOptions}>
        <div className="w-10 h-10 rounded-full font-bold">

            {(userData.profile_image && userData.profile_image.length > 0) ?
                <Image src={userData.profile_image} width={150}
                    height={150} alt="profile-Image" className="object-cover rounded-full" /> :
                <div className="w-full h-full rounded-full bg-accent text-white flex items-center justify-center">
                    {userData.firstname[0] ?? userData.username[0] ?? "U"}
                </div>}
        </div>
    </DropDown>
}

export default ProfileIcon;