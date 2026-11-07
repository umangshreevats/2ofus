
"use client";

import {
    createContext,
    SetStateAction,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import { toast } from "sonner";
import { supabase } from "@/utils/supabase/client";
import { useAuth } from "@/app/auth-provider";
import type { Notification } from "@/types/notifications";

type NotificationContextType = {
    notifications: Notification[];
    notificationsLoading: boolean;
    markAsRead: (notificationId: string) => Promise<void>;
    unRead: number;
    newRequest: any;
    setNewRequest: React.Dispatch<SetStateAction<any>>;
    newCouple: boolean;
    setNewCouple: React.Dispatch<SetStateAction<boolean>>;
};

const NotificationContext =
    createContext<NotificationContextType | null>(null);

export function NotificationProvider({
    children,
}: {
    children: ReactNode;
}) {
    const { user } = useAuth();

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [notificationsLoading, setNotificationsLoading] = useState(false);
    const [newCouple, setNewCouple] = useState<boolean>(false);
    const [newRequest, setNewRequest] = useState<any>(null);
    const [unRead, setUnRead] = useState(0);


    /*
    Function to handle the new couple request whenever the notification
    is about a user sending a coupling notification to the current user id.*/
    const handleNewRequest = async (requestId: string) => {

        try {
            const { data: requestInfo, error: requestError } = await supabase
                .from("coupling_requests")
                .select(`*,
                sender:users!coupling_requests_sender_id_fkey (
                    id,
                    username,
                    firstname,
                    lastname,
                    profile_image
                )
            `)
                .eq("id", requestId)
                .single();

            if (requestError) {
                console.error("Error occured while reading the new request: " + requestError.message);
                return;
            }

            setNewRequest(requestInfo);
        } catch (err) {

            if (err instanceof Error) {
                console.error("Error occured while reading the new request: " + err.message);
            }
        }
    }

    // Fetch notifications
    useEffect(() => {
        if (!user?.id) {
            setNotifications([]);
            return;
        }

        let isMounted = true;

        const getNotifications = async () => {
            setNotificationsLoading(true);

            const { data, error } = await supabase
                .from("notifications")
                .select("*")
                .eq("receiver", user.id)
                .limit(30)
                .order("created_at", { ascending: false });

            if (!isMounted) return;

            if (error) {
                toast.error(
                    "An error occurred while loading notifications: " +
                    error.message
                );
                setNotificationsLoading(false);
                return;
            }

            setNotifications(data ?? []);
            setUnRead(data?.filter((notification: Notification) => !notification.is_read).length ?? 0);
            setNotificationsLoading(false);
        };

        getNotifications();

        return () => {
            isMounted = false;
        };
    }, [user?.id]);


    // Subscribe to realtime notifications
    useEffect(() => {
        if (!user?.id) return;

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
                async (payload) => {
                    const newNotification =
                        payload.new as Notification;


                    setNotifications((prev) => [
                        newNotification,
                        ...prev,
                    ]);

                    // new notification is about a request send
                    if (newNotification.type === "request_send" &&
                        newNotification.reference_id && newNotification.reference_id.length > 0) {
                        await handleNewRequest(newNotification.reference_id);
                    }

                    // new notification is about a request accepted
                    if(newNotification.type === "request_accepted") {
                        setNewCouple(true);   // this shall be set to null once the user is redirected to the couple page
                    }

                    setUnRead(prev => prev + 1);
                }
            )
            .subscribe((status) => {
                console.log("Notification channel:", status);
            });

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user?.id]);


    // Mark notification as read
    const markAsRead = async (notificationId: string) => {
        if (!user?.id) return;

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


    return (
        <NotificationContext.Provider
            value={{
                notifications,
                notificationsLoading,
                markAsRead,
                unRead,
                newRequest,
                setNewRequest,
                newCouple,
                setNewCouple
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}


export function useNotifications() {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error(
            "useNotifications must be used inside NotificationProvider"
        );
    }

    return context;
}
