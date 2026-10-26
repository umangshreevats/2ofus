
import type { QuizQuestions } from "@/types/quiz";

interface UserAnswer {
    answered_options: string[] | null;
    given_answer: string | null;
}

export function evaluateAnswer(
    question: QuizQuestions,
    answer: UserAnswer
): number {
    switch (question.question_type) {
        case "multi-select": {
            const selected = answer.answered_options ?? [];

            const correct = Array.isArray(question.correct_options)
                ? question.correct_options
                : [];

            if (correct.length === 0 || selected.length === 0) return 0;

            const correctSelections = selected.filter(
                option => correct.includes(option)
            ).length;

            const incorrectSelections = selected.length - correctSelections;

            const score = Math.max(
                0,
                ((correctSelections - incorrectSelections) / correct.length) * 10
            );

            return Math.round(score * 100) / 100;
        }
        case "multi-choice": {
            const selected = answer.answered_options?.[0] ?? "";

            const correct = typeof question.correct_options === "string"
                ? question.correct_options
                : "";

            return (
                selected !== "" && selected === correct ? 10 : 0
            );
        }

        case "short-answer":
            return (
                answer.given_answer?.trim().toLowerCase() ===
                    question.written_answer?.trim().toLowerCase() ? 10 : 0
            );

        default:
            return 0;
    }
}
