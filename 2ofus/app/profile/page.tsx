import { appName } from "@/data/info";
import ProfileSetup from "@/features/profile-page/ProfileSetup";

export default function ProfilePage () {

    return <div className="parent-box flex-col justify-start items-center">
        <div className="child-box p-10 flex flex-col gap-5">

            <h1 className="w-full text-3xl text-center font-bold">
                Get Started with {appName}
            </h1>

            <ProfileSetup />
        </div>
    </div>
}