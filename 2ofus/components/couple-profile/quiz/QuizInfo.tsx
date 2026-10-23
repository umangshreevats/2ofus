"use client";
import { useAuth } from "@/app/auth-provider";

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

const QuizInfo = ({ quizInfo }: { quizInfo: QuizInfoProps }) => {

    const { user } = useAuth();

    return <div className="w-full p-5 bg-accent text-white">

        <div className="w-full flex justify-between items-center">
            <h3 className="text-lg font-bold">
                {quizInfo.title}
            </h3>

            <span className="text-md">~created by {quizInfo.conductor}</span>
        </div>
    </div>
}


export default QuizInfo;