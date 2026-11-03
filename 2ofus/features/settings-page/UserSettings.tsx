"use client";
import { useAuth } from "@/app/auth-provider";
import Popups from "@/components/commons/Popups";
import SettingPopup from "@/components/settings/SettingPopup";
import SettingsDisplay from "@/components/settings/SettingsDisplay";
import { Users, Lock, LogOut, User, ArrowRight } from "lucide-react";
import { useState } from "react";


const UserSettings = () => {


    const { userData } = useAuth();

    /*
    State managment to show the popups to configure the available settings.*/
    const [changeUsername, setChangeUsername] = useState(false);


    /*Display of all the users settings
    including the username changing and the password changing along with logging-out*/
    const userSettings = [
        {
            id: "profile-settings",
            title: "Update Profile",
            paragraph: "Update how you appear to your partner and others.",
            onClick: null,
            link: `/home/profile/@${userData.username}`,
            icon: User,
            secondaryIcon: ArrowRight,
            danger: false
        },
        {
            id: "change-username",
            title: "Change Username",
            paragraph: "Update your display username.",
            onClick: () => setChangeUsername(true),
            link: null,
            icon: Users,
            secondaryIcon: ArrowRight,
            danger: false
        },
        {
            id: "change-password",
            title: "Change Password",
            paragraph: "Update your account password.",
            onClick: () => { },
            link: null,
            icon: Lock,
            secondaryIcon: ArrowRight,
            danger: false
        },
        {
            id: "loggout",
            title: "Logout",
            paragraph: "Sign out from this website.",
            onClick: () => { },
            link: null,
            icon: LogOut,
            secondaryIcon: ArrowRight,
            danger: true
        },

    ];
    return <>
        <SettingsDisplay title="User Settings" paragraph="Manage your personal account"
            icon={User} settingsOptions={userSettings} />

        <Popups className="rounded-2xl" open={changeUsername} setOpen={setChangeUsername}>
            <SettingPopup 
            title="Change Username"
            message="Update or change username"
            btnTitle="Update"
            setOpen={setChangeUsername}>
                <input 
                type="text" 
                placeholder="Enter new Username"
                className="w-full outline-none p-2 rounded-full border-2 border-solid border-primary-text" />
            </SettingPopup>
        </Popups>
    </>
}


export default UserSettings;