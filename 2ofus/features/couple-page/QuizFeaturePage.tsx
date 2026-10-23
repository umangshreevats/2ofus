"use client";
import { useAuth } from "@/app/auth-provider";
import QuizInfo, { QuizInfoProps } from "@/components/couple-profile/quiz/QuizInfo";
import { useState } from "react";


const QuizfeaturePage = ({ quizes }: { quizes: QuizInfoProps[] }) => {

    const { user } = useAuth();
    const [pendingQuiz, setPendingQuiz] = useState(quizes.filter(quiz => quiz.conductor_id !== user.id && quiz.status === "created"));
    const [attemptedQuiz, setAttemptedQuiz] = useState(quizes.filter(quiz => quiz.conductor_id !== user.id && quiz.status === "attempted"));
    const [userQuiz, setUserQuiz] = useState(quizes.filter(quiz => quiz.conductor_id === user.id));


    return <div className="parent-box">
        <div className="child-box flex flex-col gap-5 p-5 items-center" style={{ borderBottomStyle: "dashed" }}>

            <div className="w-full gap-5 flex flex-col border-b-2 border-b-primary-text" style={{ borderBottomStyle: "dashed" }}>
                <h1 className="home-headings">Testing your partner knowledge</h1>
                <p className="home-paragraphs">Tests written by you and your partners for each other get to know each other</p>
            </div>

            <div className="w-full flex gap-5 flex-col">
                <div className="w-full flex gap-5">
                    <h4 className="w-full text-lg font-bold">
                        Pending quizes
                    </h4>

                    <div className="w-full flex gap-5 overflow-x-scroll" style={{ scrollbarWidth: "none" }}>
                        {pendingQuiz.map((quiz) => (
                            <div key={quiz.id}>
                                <QuizInfo quizInfo={quiz} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full flex flex-col gap-5">
                    <h4 className="w-full text-lg font-bold">
                        Attempted quizes
                    </h4>

                    <div className="w-full flex gap-5 overflow-x-scroll" style={{ scrollbarWidth: "none" }}>
                        {attemptedQuiz.map((quiz) => (
                            <div key={quiz.id}>
                                <QuizInfo quizInfo={quiz} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t mt-5 border-t-primary-text w-full flex flex-col gap-5" style={{ borderTopStyle: "dashed" }}>
                    <h4 className="w-full text-lg font-bold">
                        Your partner quizes
                    </h4>

                    <div className="w-full flex gap-5 overflow-x-scroll" style={{ scrollbarWidth: "none" }}>
                        {userQuiz.map((quiz) => (
                            <div key={quiz.id}>
                                <QuizInfo quizInfo={quiz} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default QuizfeaturePage;