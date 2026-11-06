"use client";
import Button from "@/components/commons/Button";
import DropDown from "@/components/commons/DropDown";
import type { Question } from "@/features/quiz/QuizForm";
import { SetStateAction, useState, ChangeEvent } from "react";
import PlayfulInput from "@/components/commons/PlayfulInput";
import { useThemeSettings } from "@/app/theme-provider";


const QuizQuestion = ({ question, setQuestions, qNo }: {
    question: Question,
    setQuestions: React.Dispatch<SetStateAction<Question[]>>,
    qNo: number
}) => {

    const { theme } = useThemeSettings();
    const [isHovered, setIsHovered] = useState(false);
    const shadowColor = theme === "light"
        ? "#222222"
        : "#ffffff";
    const [show, setShow] = useState(false);
    const options = [
        {
            id: "short-answer",
            name: "short-anwer",
            onClick: () => {
                updateQuestion({
                    type: "short-answer",
                    options: [],
                    correctOptions: undefined
                });
                setShow(false);
            }
        },
        {
            id: "multi-choice",
            name: "multi-choice",
            onClick: () => {
                updateQuestion({
                    type: "multi-choice",
                    options: ["", "", "", ""],
                    correctOptions: ""
                });
                setShow(false);
            }
        },
        {
            id: "multi-select",
            name: "multi-select",
            onClick: () => {
                updateQuestion({
                    type: "multi-select",
                    options: ["", "", "", ""],
                    correctOptions: []
                });
                setShow(false);
            }
        }
    ];


    const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        const words = value.trim().split(/\s+/);

        if (words.length <= 3 || value.trim() === "") {
            updateQuestion({ writtenAnswer: e.target.value })
        }
    };


    const updateQuestion = (updates: Partial<Question>) => {
        setQuestions(prev =>
            prev.map((q, index) =>
                index === qNo - 1 ? { ...q, ...updates } : q
            )
        );
    };

    const handleOptionChange = (index: number, value: string) => {
        setQuestions(prev =>
            prev.map((q, i) => {
                if (i !== qNo - 1) return q;

                const oldOption = q.options?.[index] ?? "";
                const updatedOptions = [...(q.options ?? [])];

                updatedOptions[index] = value;

                // Keep the correct answer synchronized when an option is edited.
                let updatedCorrectOptions = q.correctOptions;

                if (q.type === "multi-choice" && updatedCorrectOptions === oldOption) {
                    updatedCorrectOptions = value;
                }

                if (
                    q.type === "multi-select" &&
                    Array.isArray(updatedCorrectOptions)
                ) {
                    updatedCorrectOptions = updatedCorrectOptions.map(option =>
                        option === oldOption ? value : option
                    );
                }

                return {
                    ...q,
                    options: updatedOptions,
                    correctOptions: updatedCorrectOptions
                };
            })
        );
    };

    const handleCorrectOptionChange = (value: string) => {
        updateQuestion({
            correctOptions: value
        });
    };

    const handleMultiSelectChange = (value: string, checked: boolean) => {
        const currentOptions = Array.isArray(question.correctOptions)
            ? question.correctOptions
            : [];

        updateQuestion({
            correctOptions: checked
                ? [...currentOptions, value]
                : currentOptions.filter(option => option !== value)
        });
    };

    return <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full p-5 bg-accent text-white flex flex-col gap-5"
        style={{
            transform: isHovered
                ? "translate(8px, -8px)"
                : "translate(0px, 0px)",

            boxShadow: isHovered
                ? `-12px 12px 0px ${shadowColor}`
                : `-5px 5px 0px ${shadowColor}`,

            transition: "all 250ms ease-in-out",
        }}
    >
        <div className="w-full flex justify-between">
            <h3 className="text-lg font-bold">
                Question {qNo}:
            </h3>

            <DropDown open={show} setOpen={setShow} dropDownOptions={options} left={0} top={10}>
                <Button type="button" text={question.type} />
            </DropDown>
        </div>

        <label className="w-full text-lg font-bold">Question: </label>
        <PlayfulInput
            textAlign="start"
            textArea={true}
            backgroundColor="accent"
            borderColor="background"
            textColor="background"
            width={100}
            wScale="%"
            text={question.question}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateQuestion({ question: e.target.value })}
            placeholder={`Enter Question ${qNo}`}
            id={`question-${qNo}`}
        />
        <div className="w-full flex flex-col p-5 border-t-2 border-t-bakground" style={{ borderTopStyle: "dashed" }}>
            <div className="w-full flex flex-col gap-5">
                {question.type === "short-answer" ? (<>
                    <label className="w-full text-lg font-bold">Answer: </label>
                    <PlayfulInput
                        textAlign="start"
                        textArea={true}
                        backgroundColor="accent"
                        borderColor="background"
                        textColor="background"
                        width={100}
                        wScale="%"
                        text={question.writtenAnswer ?? ""}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleAnswerChange(e)}
                        placeholder={`Enter 3 words maximum, and max length 50 characters`}
                        maxLength={50}
                        id={`question-${qNo}`}
                    />
                </>) : <>
                    <label className="w-full text-lg font-bold">Option: </label>
                    <p className="text-sm font-semibold">
                        {question.type === "multi-choice"
                            ? "Select one correct answer:"
                            : "Select all correct answers:"}
                    </p>
                    <div className="w-full grid grid-cols-2 grid-rows-2 gap-5">
                        {(["a)", "b)", "c)", "d)"] as const).map((label, index) => {
                            const option = question.options?.[index] ?? "";
                            const isMultiChoice = question.type === "multi-choice";
                            const isMultiSelect = question.type === "multi-select";

                            const isCorrect = isMultiChoice
                                ? question.correctOptions === option && option !== ""
                                : Array.isArray(question.correctOptions) &&
                                question.correctOptions.includes(option) &&
                                option !== "";

                            return (
                                <div key={index} className="flex items-center gap-2">
                                    <label className="text-sm font-bold">{label}</label>

                                    <input
                                        className="w-full outline-0 h-8"
                                        type="text"
                                        value={option}
                                        maxLength={50}
                                        placeholder={`Option ${index + 1}`}
                                        onChange={(e) =>
                                            handleOptionChange(index, e.target.value)
                                        }
                                    />

                                    {isMultiChoice && (
                                        <input
                                            type="radio"
                                            name={`correct-option-${qNo}`}
                                            checked={isCorrect}
                                            disabled={!option.trim()}
                                            onChange={() => handleCorrectOptionChange(option)}
                                            title="Mark as correct answer"
                                            className="h-5 w-5 cursor-pointer accent-rose-500 disabled:cursor-not-allowed"
                                        />
                                    )}

                                    {isMultiSelect && (
                                        <input
                                            type="checkbox"
                                            checked={isCorrect}
                                            disabled={!option.trim()}
                                            onChange={(e) =>
                                                handleMultiSelectChange(option, e.target.checked)
                                            }
                                            title="Mark as correct answer"
                                            className="h-5 w-5 cursor-pointer accent-rose-500 disabled:cursor-not-allowed"
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </>}
            </div>
        </div>
    </div>
}

export default QuizQuestion;