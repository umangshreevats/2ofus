CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    sender UUID REFERENCES public.users(id) ON DELETE SET NULL,

    receiver UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,

    title TEXT NOT NULL,

    message TEXT NOT NULL,

    image TEXT,

    is_read BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.notifications
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own notifications"
ON public.notifications
FOR SELECT
TO authenticated
USING (auth.uid() = receiver);

CREATE POLICY "Users can update own notifications"
ON public.notifications
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = receiver);


ALTER PUBLICATION supabase_realtime
ADD TABLE public.notifications;