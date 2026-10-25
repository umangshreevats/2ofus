import type { QuizQuestions } from "@/types/quiz";
import { evaluateAnswer } from "./evaluateAnswers";

export function calculateQuizScore(questions: QuizQuestions[]) {
    let overallScore = 0;

    const evaluatedQuestions = questions.map((question) => {
        const isCorrect = evaluateAnswer(question, {
            answered_options: question.answered_options,
            given_answer: question.given_answer
        });

        const score = isCorrect ? 10 : 0;

        overallScore += score;

        return {
            id: question.id,
            answered_options: question.answered_options,
            given_answer: question.given_answer,
            score
        };
    });

    return {
        evaluatedQuestions,
        overallScore
    };
}