"use client";
import Popups from "@/components/commons/Popups";
import SettingsDisplay from "@/components/settings/SettingsDisplay";
import Delete from "@/components/commons/Delete";
import { FileText, ArrowRight, ShieldCheck, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const PrivacySetting = () => {

    const router = useRouter();
    const [profileDelete, setProfileDelete] = useState(false);
    const [profileLoading, setProfileLoading] = useState(false);
    /*
    Function to delete the user account and all the informations and data related to it,
    including the couple profile formed with the current user account.*/
    const deleteProfile = async () => {
        setProfileLoading(true);
        try {

            const response = await fetch("/api/auth", {
                method: "DELETE"
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error("An error occured: " + result.message);
                setProfileLoading(false);
                return;
            }

            toast.success("Profile Deleted successfully!");
            router.replace("/");
            router.refresh();
        } catch (err) {

            if (err instanceof Error) {
                toast.error("An error occured: " + err.message);
            }
        } finally {

            setProfileLoading(false);
        }
    }
    /*
    The settings for the privacy policy and, links for the terms and conditions and
    privacy policy*/
    const privacySettings = [
        {
            id: "terms-and-conditions",
            title: "Terms of service",
            paragraph: "The terms for 2ofus.",
            link: "/terms-of-service",
            onClick: null,
            icon: FileText,
            secondaryIcon: ArrowRight,
            danger: false
        },
        {
            id: "privacy",
            title: "Privacy and Policy",
            paragraph: "How 2ofus handles your data.",
            link: "/privac-policsy",
            onClick: null,
            icon: ShieldCheck,
            secondaryIcon: ArrowRight,
            danger: false
        },
        {
            id: "delete-account",
            title: "Delete My Account",
            paragraph: "Permanently delete your account and data.",
            onClick: () => setProfileDelete(true),
            link: null,
            icon: Trash2,
            secondaryIcon: ArrowRight,
            danger: true
        }
    ];
    return <>
        {/*Main settings display for the privacy and security settings*/}
        <SettingsDisplay
            title="Privacy & Security"
            paragraph="Manage your data and app privacy"
            icon={ShieldCheck}
            settingsOptions={privacySettings}
        />

        {/*The popup for the delete for the user personal profile*/}
        <Popups open={profileDelete} setOpen={setProfileDelete} className="rounded-2xl">
            <Delete setOpen={setProfileDelete}
            title="Delete My Account"
            message="Are you sure you wish to delete your account?" 
            deleteFunction={deleteProfile}
            loading={profileLoading}
            />
        </Popups>
    </>

}


export default PrivacySetting;