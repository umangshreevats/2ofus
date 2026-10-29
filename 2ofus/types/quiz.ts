export interface QuizInfoProps {
    id: string;
    couple_id: string;
    questions: number;
    conductor_id: string;
    conductor: string;
    title: string | { iv: string, authTag: string , encryptedData: string };
    overall_score: number;
    status: "created" | "attempted";
    created_at: string;
    updated_at: string;
}


export interface QuizQuestions {
    id: string;
    question: string | { iv: string, authTag: string , encryptedData: string };
    correct_options: string[] | { iv: string, authTag: string , encryptedData: string } | null;
    answer_options: string[] | { iv: string, authTag: string , encryptedData: string } | null;
    answered_options: string[] | { iv: string, authTag: string , encryptedData: string } | null;
    written_answer: string | { iv: string, authTag: string , encryptedData: string } | null;
    score: number;
    given_answer: string | { iv: string, authTag: string , encryptedData: string } | null;
    quiz_id: string;
    question_number: number;
    question_type: "multi-choice" | "multi-select" | "short-answer";
}