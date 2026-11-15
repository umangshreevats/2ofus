"use client";

import { X } from "lucide-react";
import { SetStateAction } from "react";
import { useNotifications } from "@/app/notification-provider";
import Notification from "./Notification";

const Notifications = ({ setOpenNav }: { setOpenNav: React.Dispatch<SetStateAction<boolean>> }) => {

    const { notifications, markAsRead } = useNotifications();


    return <div className="w-screen h-screen sm:h-auto sm:w-[500px] p-5 rounded-sm bg-surface flex flex-col gap-5 items-center">

        <div className="flex justify-between items-center w-full border-b border-b-solid border-b-primary-text">
            <h3 className="rounded-t-sm text-lg font-bold">
                Recent Notifications
            </h3>

            <button type="button"
                onClick={() => setOpenNav(false)}
                className="sm:hidden cursor-pointer">
                <X />
            </button>
        </div>

        {notifications.length === 0 ? <div className="w-full h-50 sm:h-64 flex flex-col justify-center items-center">
            No notifications currently!
        </div> : <div className="w-full flex flex-col gap-2 max-h-auto sm:max-h-[500px] rounded-b-sm overflow-scroll" style={{ scrollbarWidth: "none" }}>
            {notifications.map((notification) => (<div key={notification.id}>
                {/*Notification display*/}
                <Notification notification={notification} markAsRead={markAsRead} />
                </div>))}
        </div>}
    </div>
}

export default Notifications;