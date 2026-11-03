"use client";

import SettingsDisplay from "@/components/settings/SettingsDisplay";
import { Users, Heart, ArrowRight, User, Unplug, Trash } from "lucide-react";



const CoupleSettings = () => {
    /*
    Display of all the couple settings including the couple informations 
    disabling the couple account or deleting the account.*/
    const coupleSettings = [
        {
            id: "couple-informations",
            title: "Couple Information",
            paragraph: "View and update your couple details.",
            onClick: () => { },
            icon: Users,
            secondaryIcon: ArrowRight
        },
        {
            id: "partner-informations",
            title: "Partner Information",
            paragraph: "View your partner's profile.",
            onClick: () => { },
            icon: User,
            secondaryIcon: ArrowRight
        },
        {
            id: "leave-couple",
            title: "Leave Couple",
            paragraph: "Disconnect your account from this couple.",
            onClick: () => { },
            icon: Unplug,
            secondaryIcon: ArrowRight
        },

        {
            id: "delete-couple",
            title: "Delete Couple",
            paragraph: "Parmanently delete the couple space and the data.",
            onClick: () => { },
            icon: Trash,
            secondaryIcon: ArrowRight
        },

    ];
    return <SettingsDisplay
            icon={Heart} title="Couple Settings"
            paragraph="Manage your couple space with your partner."
            settingsOptions={coupleSettings}
    />
}


export default CoupleSettings;