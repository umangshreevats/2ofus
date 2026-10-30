CREATE POLICY "Receiver can read own notifications"
ON public.notifications
FOR SELECT
TO authenticated
USING (auth.uid() = receiver);

CREATE POLICY "Receiver can update own notifications"
ON public.notifications
FOR UPDATE
TO authenticated
USING (auth.uid() = receiver)
WITH CHECK (auth.uid() = receiver);