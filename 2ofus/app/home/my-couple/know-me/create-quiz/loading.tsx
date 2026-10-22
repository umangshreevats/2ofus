import HeartBeatLoader from "@/components/commons/HeartBeatLoader";

export default async function QuizCreatorLoading () {
    return <div className="w-full min-h-screen flex items-center justify-center">
        <HeartBeatLoader />
        <p className="font-medium">Wait a moment...</p>
    </div>
}