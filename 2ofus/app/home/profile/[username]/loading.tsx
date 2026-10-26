import HeartBeatLoader from "@/components/commons/HeartBeatLoader";

export default async function ProfileLoading() {
    return <div className="w-full min-h-screen flex items-center justify-center">
        <HeartBeatLoader />
    </div>
}