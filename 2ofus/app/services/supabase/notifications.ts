
import "server-only";
import type { Notification } from "@/types/notifications";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const updateNotifications = async (
    notifications: Notification[]
): Promise<Notification[]> => {

    const updatedNotifications = await Promise.all(
        notifications.map(async (notification: Notification) => {

            if (!notification?.image_path) {
                return notification;
            }

            const bucketName = notification.metadata?.image_bucket;

            if (!bucketName) {
                return notification;
            }

            const { data, error } = await supabaseAdmin.storage
                .from(bucketName)
                .createSignedUrl(notification.image_path, 3600);

            if (error) {
                console.error("Image URL error:", error);
                return notification;
            }

            return {
                ...notification,
                image: data.signedUrl
            };
        })
    );

    return updatedNotifications;
};
