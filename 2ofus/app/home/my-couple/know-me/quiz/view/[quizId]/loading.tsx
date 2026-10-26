import HeartBeatLoader from "@/components/commons/HeartBeatLoader";

export default async function QuizScoreLoading () {
    return <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <HeartBeatLoader />
        <p className="font-medium">Loading Quiz Score...</p>
    </div>
}