"use client";

import { X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/utils/supabase/client";
import { useState, useEffect, SetStateAction } from "react";
import { useAuth } from "@/app/auth-provider";
import { useNotifications } from "@/app/notification-provider";

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
        </div> : <ul className="w-full flex flex-col gap-2 max-h-auto sm:max-h-[500px] rounded-b-sm overflow-scroll" style={{ scrollbarWidth: "none" }}>
            {notifications.map((notification) => (<div key={notification.id}>
                {/*Notification display*/}
                <div onClick={() => markAsRead(notification.id)} className={`w-full cursor-pointer flex items-start gap-2 p-2 transition-all duration-200 ${notification.is_read
                    ? "bg-surface"
                    : "bg-background"
                    }`}>
                    {/* Icon */}
                    <div className="w-11 h-11 shrink-0 aspect-square bg-primary/10 flex items-center justify-center">
                        {notification.image ? (
                            <img
                                src={notification.image}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-primary-text text-lg">
                                🔔
                            </span>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-3">
                            <h4 className="font-bold text-primary-text font-rubik text-sm sm:text-base">
                                {notification.title}
                            </h4>

                            {!notification.is_read && (
                                <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
                            )}
                        </div>

                        <p className="text-sm leading-relaxed text-secondary-text font-comfortaa">
                            {notification.message}
                        </p>

                        <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-secondary-text">
                                {new Date(notification.created_at).toLocaleString()}
                            </span>

                            {!notification.is_read && (
                                <span className="text-xs font-semibold text-primary-text">
                                    New
                                </span>
                            )}
                        </div>
                    </div>
                </div>

            </div>))}
        </ul>}
    </div>
}

export default Notifications;