import HeartBeatLoader from "@/components/commons/HeartBeatLoader";

export default async function TellAndGetLoading () {
    return <div className="w-full min-h-screen flex items-center justify-center">
        <HeartBeatLoader />
    </div>
}