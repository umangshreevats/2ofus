import type { QuizQuestions } from "@/types/quiz";

interface UserAnswer {
    answered_options: string[] | null;
    given_answer: string | null;
}

export function evaluateAnswer(
    question: QuizQuestions,
    answer: UserAnswer
): boolean {
    switch (question.question_type) {
        case "multi-choice":
        case "multi-select": {
            const selected = [...(answer.answered_options ?? [])].sort();
            const correct = [...(question.correct_options ?? [])].sort();

            return (
                selected.length === correct.length &&
                selected.every((option, index) => option === correct[index])
            );
        }

        case "short-answer":
            return (
                answer.given_answer?.trim().toLowerCase() ===
                question.written_answer?.trim().toLowerCase()
            );

        default:
            return false;
    }
}