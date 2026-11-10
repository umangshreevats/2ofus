
"use client";

import { useAuth } from "@/app/auth-provider";
import PlayfulButton from "@/components/commons/PlayfulButton";
import { useRouter } from "next/navigation";
import type { QuizInfoProps } from "@/types/quiz";
import { Copy, Ellipsis, Eye, Trash2 } from "lucide-react";
import { Dropdown } from "@/types/dropdown";
import DropDown from "@/components/commons/DropDown";
import { useState } from "react";
import { toast } from "sonner";
import Popups from "@/components/commons/Popups";
import Delete from "@/components/commons/Delete";

interface QuizInfoComponentProps {
    quizInfo: QuizInfoProps;
}

const QuizInfo = ({
    quizInfo
}: QuizInfoComponentProps) => {

    const { user } = useAuth();
    const router = useRouter();
    const isConductor = quizInfo.conductor_id === user.id;
    const isAttempted = quizInfo.status === "attempted";

    const [open, setOpen] = useState(false);
    const [del, setDel] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const handleCopy = async (path: string) => {
        const url = `${window.location.origin}${path}`;

        await navigator.clipboard.writeText(url);
    };

    const deleteQuiz = async () => {

        try {
            setDel(false);
            const response = await fetch(`/api/couple/quiz/${quizInfo.couple_id}/${quizInfo.id}`, {
                method: "DELETE"
            });

            const result = await response.json();

            if(!response.ok) {
                toast.error("Error deleting the quiz: " + result.message);
                return;
            }

            toast.success("Quiz Deleted Successfully");
            setDeleted(true);
        } catch (err) {
            if(err instanceof Error) {
                toast.error("Error deleting the quiz: " + err.message);
            }
        }
    }
    const quizDropDown: Dropdown[] = [
        { id: "copy-link", name: "Copy Link", icon: Copy, onClick: () => handleCopy(`/home/my-couple/know-me/quiz/${quizInfo.id}`) },
        { id: "view", name: "View", icon: Eye, href: `/home/my-couple/know-me/quiz/view/${quizInfo.id}` },
        { id: "delete", name: "Delete", icon: Trash2, danger: true, onClick: () => setDel(true) }
    ];

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


    const onStartQuiz = () => {
        router.push(`/home/my-couple/know-me/quiz/${quizInfo.id}`);
    }

    const onViewQuiz = () => {
        router.push(`/home/my-couple/know-me/quiz/view/${quizInfo.id}`);
    }

    const onViewScore = () => {
        router.push(`/home/my-couple/know-me/quiz/view/${quizInfo.id}`);
    }

    const handleAction = () => {
        if (isConductor) {
            onViewQuiz();
        } else if (isAttempted) {
            onViewScore();
        } else {
            onStartQuiz();
        }
    };


    if(deleted) {
        return null;
    }

    return (
        <div className="w-full min-w-[280px] max-w-[340px] 
                        rounded-xl bg-accent text-white p-5 
                        flex flex-col gap-5 shadow-md">

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

                <DropDown dropDownOptions={quizDropDown} open={open} setOpen={setOpen} top={10} right={10}>
                    <button type="button" className="cursor-pointer">
                        <Ellipsis />
                    </button>
                </DropDown>

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
            <Popups open={del} setOpen={setDel} className="rounded-2xl">
                <Delete setOpen={setDel} deleteFunction={deleteQuiz} title="Delete Quiz" message="Are you sure you want to delete the quiz?"/>
            </Popups>
        </div>
    );
};

export default QuizInfo;
