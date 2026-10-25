"use client";

import PlayfulInput from "@/components/commons/PlayfulInput";
import type { QuizQuestions } from "@/types/quiz";
import { SetStateAction } from "react";

interface DisplayQuestionProps {
    currentQ: number;
    questionsInfo: QuizQuestions[];
    setQuestionsInfo: React.Dispatch<SetStateAction<QuizQuestions[]>>;
}

const DisplayQuestion: React.FC<DisplayQuestionProps> = ({ currentQ, questionsInfo, setQuestionsInfo }) => {

    const {
        id,
        question,
        question_number,
        question_type,
        answer_options,
        answered_options
    } = questionsInfo[currentQ - 1];

    const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        const words = value.trim().split(/\s+/);

        if (words.length <= 3 || value.trim() === "") {
            setQuestionsInfo(prev =>
                prev.map((q, index) =>
                    index === currentQ - 1
                        ? { ...q, given_answer: e.target.value }
                        : q
                )
            );
        }
    };

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
                                name={`question-${id}`}
                                value={option}
                                onChange={() => {
                                    setQuestionsInfo(prev =>
                                        prev.map((q, index) =>
                                            index === currentQ - 1
                                                ? { ...q, answered_options: [option] }
                                                : q
                                        )
                                    );
                                }}
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
                                name={`question-${id}`}
                                value={option}
                                onChange={(e) => {
                                    setQuestionsInfo(prev =>
                                        prev.map((q, index) =>
                                            index === currentQ - 1
                                                ? {
                                                    ...q,
                                                    answered_options: e.target.checked
                                                        ? [...(q.answered_options ?? []), option]
                                                        : (q.answered_options ?? []).filter(
                                                            answer => answer !== option
                                                        )
                                                }
                                                : q
                                        )
                                    );
                                }}
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
                <PlayfulInput textArea={true} onChange={handleAnswerChange} maxLength={50}
                    text={questionsInfo[currentQ - 1].given_answer ?? ""} placeholder="Enter your Answer here..." textAlign="start" />
            )}

        </div>
    );
};

export default DisplayQuestion;