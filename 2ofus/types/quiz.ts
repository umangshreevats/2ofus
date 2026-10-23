export interface QuizInfoProps {
    id: string;
    couple_id: string;
    questions: number;
    conductor_id: string;
    conductor: string;
    title: string;
    overall_score: number;
    status: "created" | "attempted";
    created_at: string;
    updated_at: string;
}


export interface QuizQuestions {
    id: string;
    question: string;
    correct_options: string[];
    answer_options: string[];
    answered_options: string[];
    written_answer: string;
    score: number;
    given_answer?: string;
    quiz_id: string;
    question_number: number;
    question_type: number;
}