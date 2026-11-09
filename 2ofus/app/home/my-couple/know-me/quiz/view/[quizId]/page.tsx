import Headings from "@/components/commons/Headings";
import { getCurrentUser } from "@/lib/auth"
import { decrypt } from "@/lib/encryption";
import { createClient } from "@/utils/supabase/server";
import RedirectButton from "@/components/commons/RedirectButton";
import { TbArrowNarrowLeftDashed } from "react-icons/tb";
import { errorMonitor } from "events";

export default async function QuizScoreLoading({ params }: { params: Promise<{ quizId?: string }> }) {


    const { quizId } = await params;

    if (!quizId || quizId.length === 0) {

        return <div className="parent-box">
            <div className="child-box flex justify-center items-center">
                Quiz id is required
            </div>
        </div>
    }
    const { coupleData } = await getCurrentUser();

    const supabase = await createClient();

    const { data: quizData, error: quizError } = await supabase
        .from("quiz")
        .select("*")
        .eq("id", quizId)
        .eq("couple_id", coupleData.id)
        .single();

    // Quiz Informations failed to retrieve
    if (quizError || !quizData) {
        return <div className="parent-box">
            <div className="child-box flex justify-center items-center">
                Error Retrieving Quiz Informations
            </div>
        </div>
    }


    // The quiz has not been attempted yet
    if (quizData.status === "created") {
        return <div className="parent-box">
            <div className="child-box flex justify-center items-center">
                The Quiz doesn't seem to be attempted yet by the partner it is assigned for.
            </div>
        </div>
    }

    const updatedQuizTitle = decrypt(quizData.title);

    const updatedQuizData = {
        ...quizData,
        title: updatedQuizTitle
    }

    const { data: quizQuestions, error: quizQuestionsError } = await supabase
        .from("quiz_questions")
        .select("*")
        .eq("quiz_id", quizId);


    if (quizQuestionsError || !quizQuestions) {
        return <div className="parent-box">
            <div className="child-box flex justify-center items-center">
                Failed retrieving Quiz Question Informations
            </div>
        </div>
    }

    // Decrypting all the information about each question in the quiz_questions
    const updatedQuizQuestions = quizQuestions.map((question) => {

        const decryptedQuestion = decrypt(question.question);

        const decryptedAnswerOptions = question.answer_options ? JSON.parse(decrypt(question.answer_options)) : null;

        const decryptedCorrectOptions = question.correct_options ? JSON.parse(decrypt(question.correct_options)) : null;

        const decryptedAnsweredOptions = question.answered_options ? JSON.parse(decrypt(question.answered_options)) : null;

        const decryptedWrittenAnswer = question.written_answer ? decrypt(question.written_answer) : null;

        const decryptedGivenAnswer = question.given_answer ? decrypt(question.given_answer) : null;


        return {
            ...question,
            question: decryptedQuestion,
            answer_options: decryptedAnswerOptions,
            answered_options: decryptedAnsweredOptions,
            correct_options: decryptedCorrectOptions,
            written_answer: decryptedWrittenAnswer,
            given_answer: decryptedGivenAnswer
        }
    });

    console.log(updatedQuizQuestions);


    return (
        <section className="parent-box">
            <div className="child-box flex flex-col gap-6 p-5">

                {/* Back Button */}
                <div className="w-10 h-10">
                    <RedirectButton redirectLink="/home/my-couple/know-me" />
                </div>

                {/* Quiz Heading */}
                <Headings
                    heading={updatedQuizData.title}
                    paragraph="Quiz Score and Details"
                />

                {/* Quiz Statistics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                    <div className="rounded-2xl p-5 bg-accent text-white">
                        <p className="text-sm opacity-70">Total Questions</p>
                        <h2 className="text-3xl font-bold">
                            {updatedQuizQuestions.length}
                        </h2>
                    </div>

                    <div className="rounded-2xl p-5 bg-accent text-white">
                        <p className="text-sm opacity-70">Total Score</p>
                        <h2 className="text-3xl font-bold">
                            {updatedQuizQuestions.reduce(
                                (total, question) => total + (Number(question.score) || 0),
                                0
                            )}
                        </h2>
                    </div>

                    <div className="rounded-2xl p-5 bg-accent text-white">
                        <p className="text-sm opacity-70">Questions Attempted</p>
                        <h2 className="text-3xl font-bold">
                            {updatedQuizQuestions.filter(
                                question =>
                                    question.given_answer !== null ||
                                    (question.answered_options?.length ?? 0) > 0
                            ).length}
                        </h2>
                    </div>

                </div>

                {/* Question Breakdown */}
                <div className="flex flex-col gap-5">

                    <Headings
                        heading="Question Breakdown"
                        paragraph="Review the questions, correct answers and your partner's responses."
                    />

                    {updatedQuizQuestions.map((question, index) => {

                        const isCorrect =
                            question.question_type === "short-answer"
                                ? question.written_answer?.trim().toLowerCase() ===
                                question.given_answer?.trim().toLowerCase()

                                : question.question_type === "multi-choice"
                                    ? question.answered_options?.some(
                                        (option: string) =>
                                            option.trim() === question.correct_options?.trim()
                                    )

                                    : question.question_type === "multi-select"
                                        ? question.correct_options?.length ===
                                        question.answered_options?.length &&
                                        question.correct_options?.every((option: string) =>
                                            question.answered_options?.includes(option)
                                        )
                                        : false;

                        return (
                            <div
                                key={question.id}
                                className="rounded-2xl border border-[var(--border)] p-5 flex flex-col gap-5"
                            >

                                {/* Question Header */}
                                <div className="flex flex-wrap justify-between items-center gap-3">

                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="font-bold">
                                            Question {question.question_number || index + 1}
                                        </span>

                                        <span className="text-xs px-3 py-1 rounded-full bg-[var(--secondary-bg)]">
                                            {question.question_type.replace("-", " ")}
                                        </span>
                                    </div>

                                    <span className={`text-sm font-bold ${isCorrect ? "text-green-500/50" : "text-red-500/50"
                                        }`}>
                                        {isCorrect ? "Correct" : "Incorrect"}
                                    </span>

                                </div>

                                {/* Question */}
                                <h3 className="text-lg font-bold">
                                    {question.question}
                                </h3>

                                {/* Options */}
                                {question.answer_options && (
                                    <div className="flex flex-col gap-2">

                                        <p className="text-sm font-bold opacity-70">
                                            Answer Options
                                        </p>

                                        {question.answer_options.map((option: string, i: number) => {

                                            const selected =
                                                question.answered_options?.includes(option);

                                            const correct =
                                                question.correct_options?.includes(option);

                                            return (
                                                <div
                                                    key={i}
                                                    className={`rounded-xl p-3 border flex justify-between gap-2 ${correct
                                                        ? "border-green-500 bg-green-500/10"
                                                        : selected
                                                            ? "border-red-500 bg-red-500/10"
                                                            : "border-secondary-text"
                                                        }`}
                                                >
                                                    <span>{option}</span>

                                                    <span className="text-xs font-semibold">
                                                        {correct
                                                            ? "Correct Answer"
                                                            : selected
                                                                ? "Selected"
                                                                : ""}
                                                    </span>
                                                </div>
                                            );
                                        })}

                                    </div>
                                )}

                                {/* Short Answer */}
                                {question.question_type === "short-answer" && (
                                    <div className="flex flex-col gap-3">

                                        <div className="rounded-xl p-4 bg-accent text-white">
                                            <p className="text-sm opacity-60 mb-2">
                                                Correct Answer
                                            </p>
                                            <p className="font-semibold">
                                                {question.written_answer || "Not available"}
                                            </p>
                                        </div>

                                        <div className="rounded-xl p-4 bg-accent text-white">
                                            <p className="text-sm opacity-60 mb-2">
                                                Partner's Answer
                                            </p>
                                            <p className="font-semibold">
                                                {question.given_answer || "Not answered"}
                                            </p>
                                        </div>

                                    </div>
                                )}

                                {/* Score */}
                                <div className="flex justify-between items-center border-t border-secondary-text pt-4">
                                    <span className="text-sm opacity-70">
                                        Points Earned
                                    </span>

                                    <span className="font-bold text-lg">
                                        {question.score}
                                    </span>
                                </div>

                            </div>
                        );
                    })}

                </div>

            </div>
        </section>
    );
}