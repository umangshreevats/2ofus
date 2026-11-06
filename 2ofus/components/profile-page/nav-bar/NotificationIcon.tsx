"use client";

import { useNotifications } from "@/app/notification-provider";
import { Bell } from "lucide-react";

const NotificationIcon = () => {
    const { unRead } = useNotifications();

    return (
        <div className="relative p-2">
            <Bell className="w-6 h-6" />

            {unRead > 0 && (
                <span className="absolute -top-0.5 -right-0.5 z-20 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-none text-white">
                    {unRead > 99 ? "99+" : unRead}
                </span>
            )}
        </div>
    );
};

export default NotificationIcon;