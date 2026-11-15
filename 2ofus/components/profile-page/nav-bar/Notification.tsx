"use client";
import { Bell } from "lucide-react";
import type { Notification } from "@/types/notifications";
import { useRef } from "react";
import { useElementVisibility } from "@/app/hooks/useElementVisibility";


const Notification = ({ notification, markAsRead }: { notification: Notification, markAsRead: (...args: any[]) => Promise<void> }) => {

    const notificationRef = useRef<HTMLDivElement | null>(null);
    useElementVisibility(notificationRef, {
        delay: 3000,
        onVisible: () => markAsRead(notification.id),
    });


    return <div ref={notificationRef} className={`w-full cursor-pointer flex items-start gap-2 p-2 transition-all duration-200 ${notification.is_read
        ? "bg-surface"
        : "bg-background"
        }`}>
        {/* Icon */}
        <div className="w-11 h-11 shrink-0 aspect-square bg-primary/10 flex items-center justify-center">
            {notification.image ? (
                <img
                    src={notification.image}
                    alt=""
                    className={`w-full h-full object-cover ${(notification.type === "request_accepted" || notification.type === "request_rejected" || notification.type === "request_send") && "rounded-full"}`}
                />
            ) : (
                <span className="text-primary-text text-lg">
                    <Bell color="#B8860B" />
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
}


export default Notification;