"use client";

import PlayfulInput from "@/components/commons/PlayfulInput";
import type { QuizQuestions } from "@/types/quiz";

interface DisplayQuestionProps {
    quizQuestion: QuizQuestions;
}

const DisplayQuestion: React.FC<DisplayQuestionProps> = ({ quizQuestion }) => {

    const {
        question,
        question_number,
        question_type,
        answer_options,
        answered_options
    } = quizQuestion;

    return (
        <div className="w-full flex flex-col gap-6 py-8">

            {/* Question */}
            <div className="flex flex-col gap-3">
                <span className="home-paragraphs text-sm opacity-70">
                    QUESTION {question_number}
                </span>

                <h2 className="text-lg font-bold pl-3">
                    {question}
                </h2>
            </div>

            {/* Multi Choice */}
            {question_type === "multi-choice" && (
                <div className="flex flex-col gap-3">
                    {answer_options?.map((option, index) => (
                        <label
                            key={index}
                            className="flex items-center gap-3 p-4 border-2 border-primary-text/20 rounded-xl cursor-pointer hover:border-primary-text transition-colors"
                        >
                            <input
                                type="radio"
                                name={`question-${quizQuestion.id}`}
                                value={option}
                                defaultChecked={answered_options?.includes(option)}
                                className="accent-primary"
                            />

                            <span className="home-paragraphs">
                                {option}
                            </span>
                        </label>
                    ))}
                </div>
            )}

            {/* Multi Select */}
            {question_type === "multi-select" && (
                <div className="flex flex-col gap-3">
                    {answer_options?.map((option, index) => (
                        <label
                            key={index}
                            className="flex items-center gap-3 p-4 border-2 border-primary-text/20 rounded-xl cursor-pointer hover:border-primary-text transition-colors"
                        >
                            <input
                                type="checkbox"
                                name={`question-${quizQuestion.id}`}
                                value={option}
                                defaultChecked={answered_options?.includes(option)}
                                className="accent-primary"
                            />

                            <span className="home-paragraphs">
                                {option}
                            </span>
                        </label>
                    ))}
                </div>
            )}

            {/* Short Answer */}
            {question_type === "short-answer" && (
                <PlayfulInput textArea={true} onChange={() => {}} text="" placeholder="Enter your Answer here..." textAlign="start" />
            )}

        </div>
    );
};

export default DisplayQuestion;