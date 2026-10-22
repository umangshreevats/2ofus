"use client";
import Button from "@/components/commons/Button";
import PlayfulInput from "@/components/commons/PlayfulInput";
import QuizQuestion from "@/components/couple-profile/quiz/QuizQuestion";
import { X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export type Question = {
    question: string,
    type: "multi-choice" | "multi-select" | "short-answer",
    options?: string[] | null,
    correctOptions?: string[] | string | null,
    writtenAnswer?: string | null
}
const QuizForm = () => {

    const router = useRouter();
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

    // Adding and deleting the questions in form
    // Adding
    const addQuestions = () => {

        if (questions.length >= 10) {
            alert("Cannot add more questions");
            return;
        }
        const q: Question = {
            question: "",
            type: "short-answer",
            correctOptions: undefined,
            options: [],
            writtenAnswer: ""
        };

        setQuestions(prev => [...prev, q]);
    };

    // Removing
    const removeQuestion = (qNo: number) => {
        setQuestions(prev =>
            prev.filter((_, index) => index !== qNo - 1)
        );
    };

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
                    <Button type="button" text="+ add" onClick={addQuestions} />
                </div>

                {questions.map((question, i) => {

                    if (i === 0) {
                        return <div key={i}>
                            <QuizQuestion question={question} setQuestions={setQuestions} qNo={i + 1} />
                        </div>
                    }

                    return <div key={i} className="w-full flex gap-2 items-center">
                        <QuizQuestion question={question} setQuestions={setQuestions} qNo={i + 1} />
                        <button onClick={() => removeQuestion(i)} className="cursor-pointer" type="button">
                            <X color="red" />
                        </button>
                    </div>
                })}

                <Button text={loading ? "Creating..." : "Create Quiz"} />
                <Button onClick={ () => router.push("/home/my-couple/know-me") } type="button" text="cancel" textColor="red" backgroundColor="background" />
            </form>
        </div>
    </div>
}

export default QuizForm;