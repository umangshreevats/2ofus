
"use client";

import { useAuth } from "@/app/auth-provider";
import PlayfulButton from "@/components/commons/PlayfulButton";

export interface QuizInfoProps {
    id: string;
    couple_id: string;
    questions: number;
    conductor_id: string;
    conductor: string;
    title: string;
    overall_score: number;
    status: "created" | "attempted";
    created_at: string;
    updated_at: string;
}

interface QuizInfoComponentProps {
    quizInfo: QuizInfoProps;
    onStartQuiz?: (quizId: string) => void;
    onViewScore?: (quizId: string) => void;
    onViewQuiz?: (quizId: string) => void;
}

const QuizInfo = ({
    quizInfo,
    onStartQuiz,
    onViewScore,
    onViewQuiz
}: QuizInfoComponentProps) => {

    const { user } = useAuth();

    const isConductor = quizInfo.conductor_id === user.id;
    const isAttempted = quizInfo.status === "attempted";

    const createdDate = new Date(quizInfo.created_at).toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

    const buttonText = isConductor
        ? "View quiz"
        : isAttempted
            ? "View score"
            : "Start quiz";

    const handleAction = () => {
        if (isConductor) {
            onViewQuiz?.(quizInfo.id);
        } else if (isAttempted) {
            onViewScore?.(quizInfo.id);
        } else {
            onStartQuiz?.(quizInfo.id);
        }
    };

    return (
        <div className="w-full min-w-[280px] max-w-[340px]
                rounded-md bg-accent text-white p-5
                flex flex-col gap-5
                shadow-[-4px_0_0_0_hsl(var(--accent)),0_4px_0_0_#ffffff]">

            {/* Header */}
            <div className="flex flex-col gap-2">

                <div className="flex justify-between items-start gap-3">

                    <h3 className="text-lg font-bold break-words">
                        {quizInfo.title}
                    </h3>

                    <span className="text-xs bg-white/20 rounded-full 
                                     px-3 py-1 whitespace-nowrap">
                        {isConductor ? "Created by you" : "Partner's quiz"}
                    </span>

                </div>

                <p className="text-sm opacity-80">
                    Created by {quizInfo.conductor}
                </p>

            </div>

            {/* Quiz information */}
            <div className="grid grid-cols-2 gap-3">

                <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-xs opacity-70">
                        Questions
                    </p>
                    <p className="text-lg font-bold">
                        {quizInfo.questions}
                    </p>
                </div>

                <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-xs opacity-70">
                        Created on
                    </p>
                    <p className="text-sm font-bold">
                        {createdDate}
                    </p>
                </div>

            </div>

            {/* Score information */}
            {isAttempted && (
                <div className="border-t border-white/30 pt-3">
                    <p className="text-sm opacity-80">
                        Overall score
                    </p>

                    <p className="text-2xl font-bold">
                        {quizInfo.overall_score}
                    </p>
                </div>
            )}

            {/* Status and action */}
            <div className="flex justify-between items-center gap-3">

                <span className="text-sm font-semibold">
                    {isConductor
                        ? "Your quiz"
                        : isAttempted
                            ? "Completed"
                            : "Not attempted"}
                </span>

                <PlayfulButton
                    text={buttonText}
                    onClick={handleAction}
                    backgroundColor="white"
                    textColor="var(--accent)"
                    borderColor="white"
                />

            </div>

        </div>
    );
};

export default QuizInfo;
