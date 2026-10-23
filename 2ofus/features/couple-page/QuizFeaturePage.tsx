"use client";
import { useAuth } from "@/app/auth-provider";
import QuizInfo, { QuizInfoProps } from "@/components/couple-profile/quiz/QuizInfo";
import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/commons/Button";

const QuizfeaturePage = ({ quizes }: { quizes: QuizInfoProps[] }) => {

    const { user } = useAuth();
    const [pendingQuiz, setPendingQuiz] = useState(quizes.filter(quiz => quiz.conductor_id !== user.id && quiz.status === "created"));
    const [attemptedQuiz, setAttemptedQuiz] = useState(quizes.filter(quiz => quiz.conductor_id !== user.id && quiz.status === "attempted"));
    const [userQuiz, setUserQuiz] = useState(quizes.filter(quiz => quiz.conductor_id === user.id));

    // loaders, skip states, and no mores for the different quiz add more buttons
    const[pendingLoading, setPendingLoading] = useState(false);
    const [pendingSkip, setPendingSkip] = useState(pendingQuiz.length);
    const [pendingNoMore, setPendingNoMore] = useState(false);

    const[attemptedLoading, setAttemptedLoading] = useState(false);
    const [attemptedSkip, setAttemptedSkip] = useState(pendingQuiz.length);
    const [attemptedNoMore, setAttemptedNoMore] = useState(false);

    const[userLoading, setUserLoading] = useState(false);
    const [userSkip, setUserSkip] = useState(pendingQuiz.length);
    const [userNoMore, setUserNoMore] = useState(false);

    return <div className="parent-box">
        <div className="child-box flex flex-col gap-5 p-5 items-center" style={{ borderBottomStyle: "dashed" }}>

            <div className="w-full gap-5 flex flex-col border-b-2 border-b-primary-text" style={{ borderBottomStyle: "dashed" }}>
                <h1 className="home-headings">Testing your partner knowledge</h1>
                <p className="home-paragraphs">Tests written by you and your partners for each other get to know each other</p>
            </div>

            <div className="w-full flex gap-5 flex-col">
                <div className="w-full flex flex-col gap-5">
                    <h4 className="w-full text-lg font-bold">
                        Pending quizes
                    </h4>

                    {pendingQuiz.length === 0 ? <div className="w-full h-40 p-10 flex justify-center items-center rounded-md border border-dashed border-primary-text">
                        There is no pending quiz by your partner
                    </div> : <div className="w-full flex gap-5 overflow-x-scroll" style={{ scrollbarWidth: "none" }}>
                        {pendingQuiz.map((quiz) => (
                            <div key={quiz.id}>
                                <QuizInfo quizInfo={quiz} />
                            </div>
                        ))}

                        {pendingNoMore ? <div className="flex-grow-0 font-light text-sm">Quiz End!</div>
                        : <div className="flex-grow-0 mt-20">
                            <Button className={pendingLoading ? "animate-spin" : ""} icon={Plus} text="" type="button" disabled={pendingLoading} />
                        </div>}
                    </div>}
                </div>

                <div className="w-full flex flex-col gap-5">
                    <h4 className="w-full text-lg font-bold">
                        Attempted quizes
                    </h4>

                    {attemptedQuiz.length === 0 ? <div className="w-full h-40 p-10 flex justify-center items-center rounded-md border border-dashed border-primary-text">
                        You haven't attempted any quiz assigned by your beloved yet!!
                    </div> : <div className="w-full flex gap-5 overflow-x-scroll" style={{ scrollbarWidth: "none" }}>
                        {attemptedQuiz.map((quiz) => (
                            <div key={quiz.id}>
                                <QuizInfo quizInfo={quiz} />
                            </div>
                        ))}
                        {attemptedNoMore ? <div className="flex-grow-0 font-light text-sm">Quiz End!</div>
                        : <div className="flex-grow-0 mt-20">
                            <Button className={attemptedLoading ? "animate-spin" : ""} icon={Plus} text="" type="button" disabled={attemptedLoading} />
                        </div>}
                    </div>}
                </div>

                <div className="border-t mt-5 border-t-primary-text w-full flex flex-col gap-5" style={{ borderTopStyle: "dashed" }}>
                    <h4 className="w-full text-lg font-bold">
                        Your partner quizes
                    </h4>

                    {userQuiz.length === 0 ? <div className="w-full h-40 p-10 flex justify-center items-center rounded-md border border-dashed border-primary-text">
                        Give your partner some challenging questions, to find how much love is for you
                        </div> : <div className="w-full flex gap-5 overflow-x-scroll" style={{ scrollbarWidth: "none" }}>
                        {userQuiz.map((quiz) => (
                            <div key={quiz.id}>
                                <QuizInfo quizInfo={quiz} />
                            </div>
                        ))}
                        {userNoMore ? <div className="flex-grow-0 font-light text-sm">Quiz End!</div>
                        : <div className="flex-grow-0 mt-20">
                            <Button className={userLoading ? "animate-spin" : ""} icon={Plus} text="" type="button" disabled={userLoading} />
                        </div>}
                    </div>}
                </div>
            </div>
        </div>
    </div>
}

export default QuizfeaturePage;