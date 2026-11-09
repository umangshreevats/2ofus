"use client";
import Button from "@/components/commons/Button";
import PlayfulInput from "@/components/commons/PlayfulInput";
import QuizQuestion from "@/components/couple-profile/quiz/QuizQuestion";
import { X } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/auth-provider";
import { toast } from "sonner";


export type Question = {
    question: string,
    type: "multi-choice" | "multi-select" | "short-answer",
    options?: string[] | null,
    correctOptions?: string[] | string | null,
    writtenAnswer?: string | null
}
const QuizForm = () => {

    const { coupleData } = useAuth();
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
            toast.warning("Cannot add more questions");
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

    const handleQuizSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title.trim() || !questions || questions.length === 0) {
            toast.error("Quiz title and at least one question are required!");
            return;
        }

        if (questions.length > 10) {
            toast.error("Only 10 questions are allowed!");
            return;
        }

        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            const questionNumber = i + 1;

            if (!question.question.trim()) {
                toast.warning(`Question ${questionNumber} cannot be empty!`);
                return;
            }

            // Validate short-answer questions
            if (question.type === "short-answer") {
                const answer = question.writtenAnswer?.trim() ?? "";

                if (!answer) {
                    toast.warning(`Please provide an answer for Question ${questionNumber}!`);
                    return;
                }

                const wordCount = answer.split(/\s+/).filter(Boolean).length;

                if (wordCount > 3 || answer.length > 50) {
                    toast.warning(`Answer for Question ${questionNumber} must contain at most 3 words and 50 characters!`);
                    return;
                }
            }

            // Validate multiple-choice and multiple-select questions
            if (
                question.type === "multi-choice" ||
                question.type === "multi-select"
            ) {
                if (
                    !question.options ||
                    question.options.length !== 4 ||
                    question.options.some(option => !option.trim())
                ) {
                    toast.warning(`All four options are required for Question ${questionNumber}!`);
                    return;
                }

                if (question.type === "multi-choice") {
                    if (
                        typeof question.correctOptions !== "string" ||
                        !question.correctOptions.trim() ||
                        !question.options.includes(question.correctOptions)
                    ) {
                        toast.warning(`Select one correct answer for Question ${questionNumber}!`);
                        return;
                    }
                }

                if (question.type === "multi-select") {
                    if (
                        !Array.isArray(question.correctOptions) ||
                        question.correctOptions.length === 0 ||
                        question.correctOptions.some(
                            option => !question.options!.includes(option)
                        )
                    ) {
                        toast.warning(`Select at least one correct answer for Question ${questionNumber}!`);
                        return;
                    }
                }
            }
        }

        setLoading(true);

        try {

            const response = await fetch(`/api/couple/quiz/${coupleData.id}`, {
                method: "POST",
                body: JSON.stringify({
                    title,
                    questions
                })
            });

            const result = await response.json();
            if (!response.ok) {
                toast.error("Something went wrong!" + result.message);
                return;
            }

            toast.success("Success creating the quiz");
            router.replace("/home/my-couple/know-me");
            router.refresh();
        } catch (err) {

            console.error(err);
            if (err instanceof Error) {
                toast.error("Something went wrong" + err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return <div className="parent-box">
        <div className="child-box">

            <form onSubmit={handleQuizSubmit} className="w-full p-10 flex gap-3 flex-col">

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
                <Button onClick={() => router.push("/home/my-couple/know-me")} type="button" text="cancel" textColor="red" backgroundColor="background" />
            </form>
        </div>
    </div>
}

export default QuizForm;