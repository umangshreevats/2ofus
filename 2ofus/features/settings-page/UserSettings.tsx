"use client";
import SettingsDisplay from "@/components/settings/SettingsDisplay";
import { Users, Lock, LogOut, User, ArrowRight } from "lucide-react";

const UserSettings = () => {

    /*Display of all the users settings
    including the username changing and the password changing along with logging-out*/
    const userSettings = [
        {
            id: "profile-settings",
            title: "Update Profile",
            paragraph: "Update how you appear to your partner and others",
            onClick: () => { },
            icon: User,
            secondaryIcon: ArrowRight
        },
        {
            id: "change-username",
            title: "Change Username",
            paragraph: "Update your display username",
            onClick: () => { },
            icon: Users,
            secondaryIcon: ArrowRight
        },
        {
            id: "change-password",
            title: "Change Password",
            paragraph: "Update your account password",
            onClick: () => { },
            icon: Lock,
            secondaryIcon: ArrowRight
        },
        {
            id: "loggout",
            title: "Logout",
            paragraph: "Sign out from this website",
            onClick: () => { },
            icon: LogOut,
            secondaryIcon: ArrowRight
        },

    ];
    return <SettingsDisplay title="User Settings" paragraph="Manage your personal account"
        icon={User} settingsOptions={userSettings} />
}


export default UserSettings;