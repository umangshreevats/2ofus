'use client';
import { useState } from "react";
import { useAuth } from "@/app/auth-provider";
import Image from "next/image";
import DropDown from "@/components/commons/DropDown";
import {
    User,
    Settings,
    LogOut,
    Sun,
    Moon,
    SunMoon,
    Palette as PaletteIcon,
    Droplet,
    Flower2,
    Waves,
    Layers,
    Flame
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import PhotoFrame from "@/components/commons/PhotoFrame";
import { useThemeSettings } from "@/app/theme-provider";


const ProfileIcon = () => {

    const { setTheme, setPalette } = useThemeSettings();
    const supabase = createClient();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [paletteOpen, setPaletteOpen] = useState(false);
    const [themeOpen, setThemeOpen] = useState(false);
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


    const themeDropDownOptions = [
        {
            id: "light",
            icon: Sun,
            name: "Light",
            onClick: () => setTheme("light")
        },
        {
            id: "dark",
            icon: Moon,
            name: "Dark",
            onClick: () => setTheme("dark")
        }
    ];

    const paletteDropDownOptions = [
        {
            id: "dew",
            name: "Dew",
            icon: Droplet,
            onClick: () => setPalette("dew")
        },
        {
            id: "bloom",
            name: "Bloom",
            icon: Flower2,
            onClick: () => setPalette("bloom")
        },
        {
            id: "tide",
            name: "Tide",
            icon: Waves,
            onClick: () => setPalette("tide")
        },
        {
            id: "slate",
            name: "Slate",
            icon: Layers,
            onClick: () => setPalette("slate")
        },
        {
            id: "ember",
            name: "Ember",
            icon: Flame,
            onClick: () => setPalette("ember")
        }
    ];

    const dropDownOptions = [
        {
            id: "view-profile",
            name: "View Profile",
            icon: User,
            href: "/home/profile"
        },
        {
            id: "appearance",
            name: "Appearance",
            icon: SunMoon,
            ddOptions: themeDropDownOptions,
            ddInfo: {
                open: themeOpen,
                setOpen: setThemeOpen
            },
            close: false
        },
        {
            id: "palette",
            name: "Palette",
            icon: PaletteIcon,
            ddOptions: paletteDropDownOptions,
            ddInfo: {
                open: paletteOpen,
                setOpen: setPaletteOpen
            },
            close: false
        },
        {
            id: "settings",
            name: "Settings",
            icon: Settings,
            href: "/home/settings"
        },
        {
            id: "logout",
            name: "Logout",
            danger: true,
            icon: LogOut,
            onClick: handleSignOut
        }
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