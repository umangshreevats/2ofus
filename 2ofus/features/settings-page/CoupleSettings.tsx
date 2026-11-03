"use client";

import { useAuth } from "@/app/auth-provider";
import SettingsDisplay from "@/components/settings/SettingsDisplay";
import { Users, Heart, ArrowRight, User, Trash } from "lucide-react";



const CoupleSettings = () => {

    const { user, coupleData } = useAuth();
    /*
    Display of all the couple settings including the couple informations 
    disabling the couple account or deleting the account.*/
    const coupleSettings = [
        {
            id: "couple-informations",
            title: "Couple Information",
            paragraph: "View and update your couple details.",
            onClick: null,
            link: `/home/my-couple/profile-edit`,
            icon: Users,
            secondaryIcon: ArrowRight,
            danger: false
        },
        {
            id: "partner-informations",
            title: "Partner Information",
            paragraph: "View your partner's profile.",
            onClick: null,
            link: `/home/profile/@${coupleData.partner_1.id === user.id ? coupleData.partner_2.username : coupleData.partner_1.username}`,
            icon: User,
            secondaryIcon: ArrowRight,
            danger: false
        },

        {
            id: "delete-couple",
            title: "Delete Couple",
            paragraph: "Parmanently delete the couple space and the data.",
            onClick: () => { },
            icon: Trash,
            secondaryIcon: ArrowRight,
            danger: true
        },

    ];
    return <SettingsDisplay
            icon={Heart} title="Couple Settings"
            paragraph="Manage your couple space with your partner."
            settingsOptions={coupleSettings}
    />
}


export default CoupleSettings;