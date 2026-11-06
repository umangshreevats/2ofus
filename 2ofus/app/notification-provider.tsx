
"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import { toast } from "sonner";
import { supabase } from "@/utils/supabase/client";
import { useAuth } from "@/app/auth-provider";

type Notification = {
    id: string;
    sender: string;
    receiver: string;
    title: string;
    message: string;
    image: string | null;
    is_read: boolean;
    created_at: string;
};

type NotificationContextType = {
    notifications: Notification[];
    notificationsLoading: boolean;
    markAsRead: (notificationId: string) => Promise<void>;
    unRead: number;
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
    const [unRead, setUnRead] = useState(0);

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
                (payload) => {
                    const newNotification =
                        payload.new as Notification;

                    setNotifications((prev) => [
                        newNotification,
                        ...prev,
                    ]);
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
                unRead
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
