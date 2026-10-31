"use client";

import Button from "@/components/commons/Button";
import { supabase } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/auth-provider";

const Notifications = () => {

    // states and values
    const [notifications, setNotifications] = useState<any[]>([]);
    const [notificationsLoading, setNotificationsLoading] = useState(false);
    const { user } = useAuth();


    // Function to mark the notification is_read as true
    // call it on click
    const markAsRead = async (notificationId: string) => {
        const { error } = await supabase
            .from("notifications")
            .update({ is_read: true })
            .eq("id", notificationId)
            .eq("receiver", user.id);

        if (error) {
            console.error(error);
            return;
        }

        setNotifications((prev) =>
            prev.map((notification) =>
                notification.id === notificationId
                    ? { ...notification, is_read: true }
                    : notification
            )
        );
    };

    // Fetching the notifications on the start
    useEffect(() => {

        let isMounted = true;
        // Function to fetch the notifications
        // on user demand
        const getNotifications = async () => {
            setNotificationsLoading(true);

            const { data: notificationData, error: notificationError } = await supabase
                .from("notifications")
                .select("*")
                .eq("receiver", user.id)
                .limit(30)
                .order("created_at", { ascending: false });
            if (!isMounted) return;
            if (notificationError || !notificationData) {
                console.error(notificationError);
                setNotificationsLoading(false);
                return;
            }

            setNotifications(prev => ([
                ...prev,
                ...notificationData
            ]));
            setNotificationsLoading(false);
        }
        getNotifications();

        return () => {
            isMounted = false;
        }
    }, [user.id]);


    // Subscribe to realtime notifications
    useEffect(() => {

        const channel = supabase
            .channel(`notifications-${user.id}`)
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "notifications",
                    filter: `receiver=eq.${user.id}`,
                },
                (payload) => {
                    const newNotification =
                        payload.new as Notification;

                    setNotifications((prev) => {
                        return [newNotification, ...prev];
                    });
                }
            )
            .subscribe((status) => {
                console.log("Notification channel:", status);
            });

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);



    return <div className="w-screen h-screen sm:h-auto sm:w-[500px] p-5 rounded-sm bg-surface flex flex-col gap-5 items-center">

        <h3 className="w-full rounded-t-sm border-b border-b-solid border-b-primary-text text-lg font-bold">
            Recent Notifications
        </h3>

        {notifications.length === 0 ? <div className="w-full h-50 sm:h-64 flex flex-col justify-center items-center">
            No notifications currently!
        </div> : <ul className="w-full flex flex-col gap-2 max-h-[500px] rounded-b-sm overflow-scroll" style={{ scrollbarWidth: "none" }}>
            {notifications.map((notification) => (<>
                {/*Notification display*/}
                <div onClick={() => markAsRead(notification.id)} className={`w-full cursor-pointer flex items-start gap-2 p-2 transition-all duration-200 ${notification.is_read
                    ? "bg-surface"
                    : "bg-background"
                    }`}>
                    {/* Icon */}
                    <div className="w-11 h-11 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                        {notification.image ? (
                            <img
                                src={notification.image}
                                alt=""
                                className="w-full h-full rounded-full object-cover"
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

            </>))}
        </ul>}
    </div>
}

export default Notifications;