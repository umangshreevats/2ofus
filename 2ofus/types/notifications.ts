export type NotificationType =
    | "reminder"
    | "liking"
    | "unliking"
    | "quiz"
    | "quizSubmit"
    | "memory"
    | "request_send"
    | "request_accepted"
    | "request_rejected"
    | "system";


export type Notification = {
    id: string;
    sender: string;
    receiver: string;
    title: string;
    message: string;
    image: string | null;
    image_path: string | null;
    metadata: any;
    is_read: boolean;
    created_at: string;
    type: NotificationType;
    reference_id: string;
};