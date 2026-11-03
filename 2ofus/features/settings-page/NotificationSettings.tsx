"use client";

import SettingsDisplay from "@/components/settings/SettingsDisplay";
import { Bell, ToggleLeft, Image, MessageCircle, Heart, Smartphone, CalendarDays } from "lucide-react";

const NotificationSettings = () => {


    /*
    The list of notifications for the website
    along to choose what notifications the user want to receive
    */

    const notificationSettings = [
        { id:"push-notifications", title: "Push Notification", paragraph: "Enable or disable all app notifications.", onClick: () => {}, secondaryIcon: ToggleLeft, icon: Smartphone },
        { id:"liking-notifications", title: "Liking Notification", paragraph: "When your partner appreciates you.", onClick: () => {}, secondaryIcon: ToggleLeft, icon: Heart  },
        { id:"unliking-notifications", title: "Unliking Notification", paragraph: "When your partner shares a concern.", onClick: () => {}, secondaryIcon: ToggleLeft, icon: MessageCircle },
        { id:"memory-notifications", title: "Memory Notification", paragraph: "Updates to shared memory and album.", onClick: () => {}, secondaryIcon: ToggleLeft, icon: Image },
        { id:"reminders", title: "Reminders", paragraph: "Relationship reminders and special activities.", onClick: () => {}, secondaryIcon: ToggleLeft, icon: CalendarDays },
    ]
    return <SettingsDisplay
    title="Notification Settings"
    paragraph="Choose what notifications you want to receive"
    icon={Bell}
    settingsOptions={notificationSettings}
    />
}


export default NotificationSettings;