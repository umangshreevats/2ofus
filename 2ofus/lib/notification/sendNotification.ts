import "server-only";
import { supabaseAdmin } from "../supabase/admin";

type NotificationType =
    | "reminder"
    | "liking"
    | "unliking"
    | "quiz"
    | "quizSubmit"
    | "memory";

type CreateNotificationParams = {
    senderId: string | null;
    recipientId: string;
    image: string | null;
    type: NotificationType;
};



/*
Set of title and messages for each notifications in the website, based on the type
*/
const notificationData: Record<NotificationType, any> = {
    reminder: {
        title: "Reminder for you",
        message: "Urgent reminder for you",
    },

    liking: {
        title: "Your Partner shared a liking",
        message: "See what your partner has shared good about you!",
    },

    unliking: {
        title: "Your Partner shared an un-liking",
        message: "See what your partner is concern about."
    },

    memory: {
        title: "Your partner has put a memory",
        message: "Your partner has added something inside the album, you might be pleased about it."
    },

    quiz: {
        title: "Your partner created a quiz for you",
        message: "Check what has your partner got for you"
    },

    quizSubmit: {
        title: "Your partner has submitted their response.",
        message: "Your partner just submitted a quiz created by you, check the scores and see how much they care about you."
    }
}

export async function createNotification({
    senderId,
    recipientId,
    type,
    image
}: CreateNotificationParams) {
    const { data: notification, error } = await supabaseAdmin
        .from("notifications")
        .insert({
            ...notificationData[type],
            sender: senderId,
            receiver: recipientId,
            image
        })
        .select()
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    return notification;
}