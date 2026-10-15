CREATE TYPE relationship_status_options AS ENUM('talking', 'dating', 'engaged', 'married');

CREATE TABLE public.couples (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partner_1 UUID REFERENCES public.users(id),
    partner_2 UUID REFERENCES public.users(id),
    couple_name VARCHAR(100),
    relationship_status relationship_status_options,
    anniversary_date DATE,
    first_meet_date DATE,
    first_meet_location TEXT,
    cover_image TEXT,
    profile_image TEXT,
    bio VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

ALTER TABLE public.couples
ENABLE ROW LEVEL SECURITY;


CREATE POLICY "only couples can read their profiles"
ON public.couples
FOR SELECT
TO authenticated
USING(
    auth.uid() = partner_1
    OR
    auth.uid() = partner_2
);


CREATE POLICY "only couples can insert in their profiles"
ON public.couples
FOR INSERT 
TO authenticated
WITH CHECK(
    auth.uid() = partner_1
    OR
    auth.uid() = partner_2
);


CREATE POLICY "only couples can update their profiles"
ON public.couples
FOR UPDATE 
TO authenticated
USING(
    auth.uid() = partner_1
    OR
    auth.uid() = partner_2
)
WITH CHECK( 
auth.uid() = partner_1
    OR
    auth.uid() = partner_2
);

CREATE POLICY "only couples can delete their profiles"
ON public.couples
FOR DELETE
TO authenticated
USING (
    auth.uid() = partner_1
    OR auth.uid() = partner_2
);