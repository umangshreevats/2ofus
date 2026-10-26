import type { QuizQuestions } from "@/types/quiz";
import { evaluateAnswer } from "./evaluateAnswers";

export function calculateQuizScore(questions: QuizQuestions[]) {
    let overallScore = 0;

    const evaluatedQuestions = questions.map((question) => {
        const score = evaluateAnswer(question, {
            answered_options: question.answered_options,
            given_answer: question.given_answer
        });


        overallScore += score;

        return {
            quizQuestionId: question.id,
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