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
  title: string;
  message: string;
  image: string;
};

export async function createNotification({
  senderId,
  recipientId,
  title,
  message,
  image
}: CreateNotificationParams) {
  const { data: notification, error } = await supabaseAdmin
    .from("notifications")
    .insert({
      sender: senderId,
      receiver: recipientId,
      title,
      message,
      image
    })
    .select()
    .single();

  if (error) return null;

  return notification;
}