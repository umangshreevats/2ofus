CREATE TYPE couple_memory_type AS ENUM ('image', 'note', 'date');

CREATE TABLE public.memory (
    id UUID PRIMARY KEY DEFaULT gen_random_uuid(),
    couple_id UUID NOT NULL REFERENCES public.couples(id) ON DELETE CASCADE,
    created_by TEXT UNIQUE NOT NULL REFERENCES public.users(username) ON DELETE CASCADE,
    title TEXT,
    content TEXT NOT NULL,
    content_type couple_memory_type,
    is_pinned BOOLEAN,
    memory_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


ALTER TABLE public.memory
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only couples can select their own album items"
ON public.memory
FOR SELECT
TO authenticated
USING (
    EXISTS(
        SELECT 1
        FROM public.couples AS c
        WHERE c.id = memory.couple_id
        AND (c.partner_1 = auth.uid() OR c.partner_2 = auth.uid())
    )
);


CREATE POLICY "Only couples can update their own album items"
ON public.memory
FOR UPDATE
TO authenticated
USING (
    EXISTS(
        SELECT 1
        FROM public.couples AS c
        WHERE c.id = memory.couple_id
        AND (c.partner_1 = auth.uid() OR c.partner_2 = auth.uid())
    )
)
WITH CHECK (
    EXISTS(
        SELECT 1
        FROM public.couples AS c
        WHERE c.id = memory.couple_id
        AND (c.partner_1 = auth.uid() OR c.partner_2 = auth.uid())
    )
);


CREATE POLICY "Only couples can insert in their own album items"
ON public.memory
FOR SELECT
TO authenticated
WITH CHECK (
    EXISTS(
        SELECT 1
        FROM public.couples AS c
        WHERE c.id = memory.couple_id
        AND (c.partner_1 = auth.uid() OR c.partner_2 = auth.uid())
    )
);


CREATE POLICY "Only couples can delete their own album items"
ON public.memory
FOR SELECT
TO authenticated
USING (
    EXISTS(
        SELECT 1
        FROM public.couples AS c
        WHERE c.id = memory.couple_id
        AND (c.partner_1 = auth.uid() OR c.partner_2 = auth.uid())
    )
);