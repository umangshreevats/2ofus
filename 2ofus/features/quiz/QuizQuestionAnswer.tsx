"use client";
import Headings from "@/components/commons/Headings";
import DisplayQuestion from "@/components/couple-profile/quiz/DisplayQuestion";
import QuestionNav from "@/components/couple-profile/quiz/QuestionNav";
import type { QuizInfoProps, QuizQuestions } from "@/types/quiz";
import { useState, useEffect } from "react";
import Button from "@/components/commons/Button";
import { useThemeSettings } from "@/app/theme-provider";
import { useRouter } from "next/navigation";

interface QuizQuestionAnswerProps {
    quizInfo: QuizInfoProps;
    quizQuestions: QuizQuestions[];
}

const QuizQuestionAnswer: React.FC<QuizQuestionAnswerProps> = ({ quizInfo, quizQuestions }) => {

    const { theme } = useThemeSettings();
    const router = useRouter();
    const [currentQ, setCurrentQ] = useState(1);
    const [questionsInfo, setQuestionsInfo] = useState<QuizQuestions[]>(quizQuestions ?? []);
    const [submitLoading, setSubmitLoading] = useState(false);

    


    return <div className="parent-box">
        <div className="child-box p-10">

            <Headings
                heading={quizInfo.title}
                paragraph="Attempt all the questions to be a star in your soulmate's eyes"
            />

            {currentQ > 0 && <DisplayQuestion currentQ={currentQ} questionsInfo={questionsInfo} setQuestionsInfo={setQuestionsInfo} />}
            <QuestionNav
                questions={quizInfo.questions}
                currentQ={currentQ}
                setCurrentQ={setCurrentQ} />

            <div className="w-full flex flex-col gap-2">
                <Button type="button" text="Submit" />
                <Button 
                type="button" 
                backgroundColor="background" 
                text="Cancel" 
                onClick={() => router.push("/home/my-couple/know-me") }
                textColor={theme === "light" ? "black" : "white"} />
            </div>
        </div>
    </div>
}

export default QuizQuestionAnswer;