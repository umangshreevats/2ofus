import "server-only";
import { supabaseAdmin } from "../supabase/admin";

type NotificationType =
    | "reminder"
    | "liking"
    | "unliking"
    | "quiz"
    | "quizSubmit"
    | "memory"
    | "request_send"
    | "request_accepted"
    | "request_rejected";

type CreateNotificationParams = {
    senderId: string | null;
    recipientId: string;
    image: string | null;
    type: NotificationType;
    title?: string | null;
    message?: string | null;
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
    },

    request_send: {
        title: "Someone send you a coupling request.",
        message: "Someone shown interest in coupling with you."
    },

    request_accepted: {
        title: "The person you send request to has accepted your request.",
        message: "Congratulations you are couple now, check and create your couple profile together."
    },

    request_rejected: {
        title: "The person you send request to has rejected your request.",
        message: "Too bad seems like the soulmate you were looking for is still yet to be discovered."
    }
}

export async function createNotification({
    senderId,
    recipientId,
    type,
    image,
    title = null,
    message = null,
}: CreateNotificationParams) {

    const additional: Record<string, string> = {};
    
    if(title && title.trim().length > 0) {
        additional.title = title;
    }

    if(message && message.trim().length > 0) {
        additional.message = message;
    }
    const { data: notification, error } = await supabaseAdmin
        .from("notifications")
        .insert({
            ...notificationData[type],
            sender: senderId,
            receiver: recipientId,
            image,
            ...additional
        })
        .select()
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    return notification;
}