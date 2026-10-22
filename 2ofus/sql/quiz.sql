CREATE TYPE question_types AS ENUM('multi-choice', 'multi-select', 'short-answer');


CREATE TABLE public.quiz (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    couple_id UUID NOT NULL REFERENCES public.couples(id) ON DELETE CASCADE,
    conductor_id NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    conductor UUID NOT NULL REFERENCES public.users(username),
    title JSONB NOT NULL,
    questions INT NOT NULL CHECK(questions BETWEEN 1 AND 10),
    overall_score INT NOT NULL CHECK(overall_score BETWEEN 0 AND 100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE public.quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID NOT NULL REFERENCES public.quiz(id) ON DELETE CASCADE,
    question_number INT NOT NULL CHECK(question_number BETWEEN 1 AND 10),
    question JSONB NOT NULL,
    question_type question_types NOT NULL,
    answer_options JSONB,
    correct_options JSONB,
    answered_options JSONB,
    written_answer JSONB,
    score INT NOT NULL (score BETWEEN 1 AND 10),
    UNIQUE(quiz_id, question_number)
);