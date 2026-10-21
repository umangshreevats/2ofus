'use client';
import { useState } from "react";
import { useAuth } from "@/app/auth-provider";
import Image from "next/image";
import DropDown from "@/components/commons/DropDown";
import { User, Settings, LogOut } from 'lucide-react';
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import PhotoFrame from "@/components/commons/PhotoFrame";

const ProfileIcon = () => {

    const supabase = createClient();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const { userData } = useAuth();

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Sign out failed:", error.message);
            return;
        }
        router.replace("/");
        router.refresh();
    };

    const dropDownOptions = [
        { id: "view-profile", name: "View Profile", icon: User, href: "/home/profile" },
        { id: "settings", name: "Settings", icon: Settings, href: "/home/settings" },
        { id: "logout", name: "Logout", danger: true, icon: LogOut, onClick: handleSignOut }
    ];
    return <DropDown iconPos="end" open={open} setOpen={setOpen} right={10} top={10} dropDownOptions={dropDownOptions}>
        <div className="w-10 h-10 rounded-full font-bold">
            <PhotoFrame width={100} height={100} wscale="%" hscale="%" round={true}>
                {(userData.profile_image && userData.profile_image.length > 0) ?
                    <Image src={userData.profile_image}
                        width={150}
                        height={150} alt="profile-Image" className="object-cover rounded-full" /> :
                    <div className="w-full h-full rounded-full bg-accent text-white flex items-center justify-center">
                        {userData.username[0].toUpperCase() ?? "U"}
                    </div>}
            </PhotoFrame>
        </div>
    </DropDown>
}

export default ProfileIcon;