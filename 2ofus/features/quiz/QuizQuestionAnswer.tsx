"use client";
import DisplayQuestion from "@/components/couple-profile/quiz/DisplayQuestion";
import QuestionNav from "@/components/couple-profile/quiz/QuestionNav";
import type { QuizInfoProps, QuizQuestions } from "@/types/quiz";
import { useState } from "react";


interface QuizQuestionAnswerProps {
    quizInfo: QuizInfoProps;
    quizQuestions: QuizQuestions[];
}

const QuizQuestionAnswer: React.FC<QuizQuestionAnswerProps> = ({ quizInfo, quizQuestions }) => {


    const [currentQ, setCurrentQ] = useState(1);
    const currentQuestion = quizQuestions.find(
        (question) => question.question_number === currentQ
    );

    return <div className="parent-box">
        <div className="child-box p-10">

            <div className="w-full flex flex-col gap-3 border-b-2 border-b-primary-text border-dashed">
                <h1 className="home-headings text-5xl">
                    {quizInfo.title}
                </h1>

                <p className="home-paragraphs">
                    Attempt all the questions to be a star in your soulmate's eyes
                </p>
            </div>
            {currentQuestion && <DisplayQuestion quizQuestion={currentQuestion} />}
            <QuestionNav questions={quizInfo.questions} currentQ={currentQ} setCurrentQ={setCurrentQ} />
        </div>
    </div>
}

export default QuizQuestionAnswer;