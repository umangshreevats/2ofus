"use client";
import Button from "@/components/commons/Button";
import PlayfulInput from "@/components/commons/PlayfulInput";
import QuizQuestion from "@/components/couple-profile/quiz/QuizQuestion";
import { useState } from "react";


export type Question = {
    question: string,
    type: "multi-choice" | "multi-select" | "short-answer",
    options?: string[] | null,
    correctOptions?: string[] | string | null,
    writtenAnswer?: string | null
}
const QuizForm = () => {

    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");

    const [questions, setQuestions] = useState<Question[]>([
        {
            question: "",
            type: "short-answer",
            correctOptions: null,
            options: null,
            writtenAnswer: ""
        }
    ]);

    return <div className="parent-box">
        <div className="child-box">

            <form className="w-full p-10 flex gap-3 flex-col">

                <h2 className="w-full text-3xl font-bold text-primary-text">
                    Create a quiz for your loved one
                </h2>
                <p className="text-md text-secondary-text border-b border-b-dashed border-b-primary-text font-medium w-full">
                    Give your quiz a title, and add atleast 5, and atmost 10 quiz questions with answers, in any category
                </p>

                <label className="w-full text-lg font-bold">Title: </label>
                <PlayfulInput
                    textAlign="start"
                    width={100}
                    wScale="%"
                    text={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter Title"
                    id="quiz-title"
                />

                <label className="w-full text-lg font-bold">{"Questions(max: 10): "}</label>

                <div className="flex-grow-0">
                    <Button type="button" text="+ add" />
                </div>

                {questions.map((question, i) => (
                    <div key={i}>
                        <QuizQuestion question={question} setQuestions={setQuestions} qNo={i + 1} />
                    </div>
                ))}

                <Button text={loading ? "Creating..." : "Create Quiz"} />
                <Button type="button" text="cancel" textColor="red" backgroundColor="background" />
            </form>
        </div>
    </div>
}

export default QuizForm;