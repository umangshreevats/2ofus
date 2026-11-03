"use client";
import { useAuth } from "@/app/auth-provider";
import SettingsDisplay from "@/components/settings/SettingsDisplay";
import { Users, Lock, LogOut, User, ArrowRight } from "lucide-react";

const UserSettings = () => {


    const { userData } = useAuth();
    /*Display of all the users settings
    including the username changing and the password changing along with logging-out*/
    const userSettings = [
        {
            id: "profile-settings",
            title: "Update Profile",
            paragraph: "Update how you appear to your partner and others",
            onClick: null,
            link: `/home/profile/@${userData.username}`,
            icon: User,
            secondaryIcon: ArrowRight,
            danger: false
        },
        {
            id: "change-username",
            title: "Change Username",
            paragraph: "Update your display username",
            onClick: () => { },
            link: null,
            icon: Users,
            secondaryIcon: ArrowRight,
            danger: false
        },
        {
            id: "change-password",
            title: "Change Password",
            paragraph: "Update your account password",
            onClick: () => { },
            link: null,
            icon: Lock,
            secondaryIcon: ArrowRight,
            danger: false
        },
        {
            id: "loggout",
            title: "Logout",
            paragraph: "Sign out from this website",
            onClick: () => { },
            link: null,
            icon: LogOut,
            secondaryIcon: ArrowRight,
            danger: true
        },

    ];
    return <SettingsDisplay title="User Settings" paragraph="Manage your personal account"
        icon={User} settingsOptions={userSettings} />
}


export default UserSettings;