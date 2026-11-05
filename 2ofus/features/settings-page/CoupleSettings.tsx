"use client";

import { useAuth } from "@/app/auth-provider";
import Popups from "@/components/commons/Popups";
import SettingsDisplay from "@/components/settings/SettingsDisplay";
import Delete from "@/components/commons/Delete";
import { Users, Heart, ArrowRight, User, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";



const CoupleSettings = () => {

    const { user, coupleData } = useAuth();

    const [deleteCouple, setDeleteCouple] = useState(false);
    const [coupleDelLoading, setCoupleDelLoading] = useState(false);

    /*
    Function to call the api key to delete the couple profile, and
    all the data and informations stored at it/*/

    const deleteProfile = async () => {

        setCoupleDelLoading(true);
        try {

            const response = await fetch(`/api/profile/couple-profile/${coupleData.id}`,
                {
                    method: "DELETE"
                }
            );

            const result = await response.json();

            if (!response.ok) {
                toast.error("Error deleting the couple profile" + result.message);
                setCoupleDelLoading(false);
                return;
            }

            toast.success("Profile deleted successfully!");
            setDeleteCouple(false);
        } catch (err) {
            if (err instanceof Error) {
                toast.error("Error deleting the couple profile: " + err.message);
            }
        } finally {
            setCoupleDelLoading(false);
        }
    }


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
            onClick: () => setDeleteCouple(true),
            icon: Trash,
            secondaryIcon: ArrowRight,
            danger: true
        },

    ];

    return <>

        {/*Main settings display for the couple settings*/}
        <SettingsDisplay
            icon={Heart} title="Couple Settings"
            paragraph="Manage your couple space with your partner."
            settingsOptions={coupleSettings}
        />

        {/*Popup for holding the Delete for the couples*/}
        <Popups open={deleteCouple} setOpen={setDeleteCouple} className="rounded-2xl">
            <Delete setOpen={setDeleteCouple} title="Delete the Couple Profile"
                message="Are you sure you wish to delete this beautiful couple profile you set up with your partner?"
                deleteFunction={deleteProfile}
            />
        </Popups>
    </>
}


export default CoupleSettings;