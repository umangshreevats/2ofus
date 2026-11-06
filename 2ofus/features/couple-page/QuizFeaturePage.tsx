"use client";
import { useAuth } from "@/app/auth-provider";
import QuizInfo from "@/components/couple-profile/quiz/QuizInfo";
import type { QuizInfoProps } from "@/types/quiz";
import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/commons/Button";
import { useRouter } from "next/navigation";
import Headings from "@/components/commons/Headings";
import { toast } from "sonner";
import XScaleScroller from "@/components/commons/XScaleScroller";


const QuizfeaturePage = ({ quizes }: { quizes: QuizInfoProps[] }) => {

    const { user, coupleData } = useAuth();
    const router = useRouter();
    const [pendingQuiz, setPendingQuiz] = useState(quizes.filter(quiz => quiz.conductor_id !== user.id && quiz.status === "created"));
    const [attemptedQuiz, setAttemptedQuiz] = useState(quizes.filter(quiz => quiz.conductor_id !== user.id && quiz.status === "attempted"));
    const [userQuiz, setUserQuiz] = useState(quizes.filter(quiz => quiz.conductor_id === user.id));

    // loaders, skip states, and no mores for the different quiz add more buttons
    const [pendingLoading, setPendingLoading] = useState(false);
    const [pendingSkip, setPendingSkip] = useState(pendingQuiz.length);
    const [pendingNoMore, setPendingNoMore] = useState(false);

    const [attemptedLoading, setAttemptedLoading] = useState(false);
    const [attemptedSkip, setAttemptedSkip] = useState(attemptedQuiz.length);
    const [attemptedNoMore, setAttemptedNoMore] = useState(false);

    const [userLoading, setUserLoading] = useState(false);
    const [userSkip, setUserSkip] = useState(userQuiz.length);
    const [userNoMore, setUserNoMore] = useState(false);


    // function to fetch more quizes
    const getMoreQuizes = async (category: "user" | "pending" | "attempted") => {

        let skip = 0;
        if (category === "pending") {
            setPendingLoading(true);
            skip = pendingSkip;
        } else if (category === "attempted") {
            setAttemptedLoading(true);
            skip = attemptedSkip;
        } else if (category === "user") {
            setUserLoading(true);
            skip = userSkip;
        } else {
            toast.error("Such category quizes cannot be retrieved");
            return;
        }

        try {

            const response = await fetch(`/api/couple/quiz/${coupleData.id}?category=${category}&limit=${10}&skip=${skip}`);

            const result = await response.json();

            if (!response.ok) {

                toast.error("Request failed" + result.message);
                return;
            }

            if (category === "pending") {
                setPendingQuiz(prev => [...prev, ...result.quizesInfo]);
                if (result.quizesInfo.length === 0) {
                    setPendingNoMore(true);
                }
                setPendingSkip(result.nextSkip);
            } else if (category === "attempted") {
                setAttemptedQuiz(prev => [...prev, ...result.quizesInfo]);
                if (result.quizesInfo.length === 0) {
                    setAttemptedNoMore(true);
                }
                setAttemptedSkip(result.nextSkip);
            } else if (category === "user") {
                setUserQuiz(prev => [...prev, ...result.quizesInfo]);
                if (result.quizesInfo.length === 0) {
                    setUserNoMore(true);
                }
                setUserSkip(result.nextSkip);
            }
        } catch (err) {

            if (err instanceof Error) {
                toast.error("Something went wrong: " + err.message);
            } else toast.error("Somethign went wrong");
        } finally {
            if (category === "pending") {
                setPendingLoading(false);
            } else if (category === "attempted") {
                setAttemptedLoading(false);
            } else if (category === "user") {
                setUserLoading(false);
            }
        }
    }

    return <div className="parent-box">
        <div className="child-box flex flex-col gap-5 p-5 items-center" style={{ borderBottomStyle: "dashed" }}>

            <div className="w-full flex border-dashed border-b-2 border-b-primary-text">

                <Headings
                    className="w-[70%]"
                    heading="Testing your partner knowledge"
                    paragraph="Tests written by you and your partners for each other get to know each other" />

                <div className="flex-1 flex flex-col gap-1 justify-center items-center p-5">
                    <span>Create Quiz for your partner: </span>
                    <Button text="Create Quiz" onClick={() => router.push("/home/my-couple/know-me/create-quiz")} type="button" />
                </div>
            </div>

            <div className="w-full flex gap-5 flex-col">
                <div className="w-full flex flex-col gap-5">
                    <h4 className="w-full text-lg font-bold">
                        Pending quizes
                    </h4>

                    {pendingQuiz.length === 0 ? <div className="w-full h-40 p-10 flex justify-center items-center rounded-md border border-dashed border-primary-text">
                        There is no pending quiz by your partner
                    </div> :
                        <XScaleScroller>
                            <div className="w-full flex gap-5">
                                {pendingQuiz.map((quiz) => (
                                    <div key={quiz.id}>
                                        <QuizInfo quizInfo={quiz} />
                                    </div>
                                ))}

                                {pendingNoMore ? <div className="flex-grow-0 font-light text-sm">Quiz End!</div>
                                    : <div className="flex-grow-0 mt-20">
                                        <Button
                                            className={pendingLoading ? "animate-spin" : ""}
                                            icon={Plus}
                                            text=""
                                            type="button"
                                            onClick={async () => await getMoreQuizes("pending")}
                                            disabled={pendingLoading} />
                                    </div>}
                            </div></XScaleScroller>}
                </div>

                <div className="w-full flex flex-col gap-5">
                    <h4 className="w-full text-lg font-bold">
                        Attempted quizes
                    </h4>

                    {attemptedQuiz.length === 0 ? <div className="w-full h-40 p-10 flex justify-center items-center rounded-md border border-dashed border-primary-text">
                        You haven't attempted any quiz assigned by your beloved yet!!
                    </div> :
                        <XScaleScroller>
                            <div className="w-full flex gap-5">
                                {attemptedQuiz.map((quiz) => (
                                    <div key={quiz.id}>
                                        <QuizInfo quizInfo={quiz} />
                                    </div>
                                ))}
                                {attemptedNoMore ? <div className="flex-grow-0 font-light text-sm">Quiz End!</div>
                                    : <div className="flex-grow-0 mt-20">
                                        <Button
                                            className={attemptedLoading ? "animate-spin" : ""}
                                            icon={Plus}
                                            text=""
                                            type="button"
                                            onClick={async () => await getMoreQuizes("attempted")}
                                            disabled={attemptedLoading} />
                                    </div>}
                            </div></XScaleScroller>}
                </div>

                <div className="border-t mt-5 border-t-primary-text w-full flex flex-col gap-5" style={{ borderTopStyle: "dashed" }}>
                    <h4 className="w-full text-lg font-bold">
                        Your partner quizes
                    </h4>

                    {userQuiz.length === 0 ? <div className="w-full h-40 p-10 flex flex-col justify-center items-center rounded-md border border-dashed border-primary-text">
                        <span>Give your partner some challenging questions, to find how much love is for you</span>
                        <Button text="Create Quizes" onClick={() => router.push("/home/my-couple/know-me/create-quiz")} type="button" />
                    </div> : <XScaleScroller><div className="w-full flex gap-5">
                        {userQuiz.map((quiz) => (
                            <div key={quiz.id}>
                                <QuizInfo quizInfo={quiz} />
                            </div>
                        ))}
                        {userNoMore ? <div className="flex-grow-0 font-light text-sm">Quiz End!</div>
                            : <div className="flex-grow-0 mt-20">
                                <Button
                                    className={userLoading ? "animate-spin" : ""}
                                    icon={Plus}
                                    text=""
                                    type="button"
                                    onClick={async () => await getMoreQuizes("user")}
                                    disabled={userLoading} />
                            </div>}
                    </div></XScaleScroller>}
                </div>
            </div>
        </div>
    </div>
}

export default QuizfeaturePage;