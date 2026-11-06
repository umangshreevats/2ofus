"use client";
import Headings from "@/components/commons/Headings";
import RedirectButton from "@/components/commons/RedirectButton";
import UserSettings from "../settings-page/UserSettings";
import CoupleSettings from "../settings-page/CoupleSettings";
import { useAuth } from "@/app/auth-provider";
import PrivacySetting from "../settings-page/PrivacySettings";

const Settings = () => {

    const { coupleData } = useAuth();
    return <section className="parent-box">
        <div className="child-box md:grid flex flex-col md:grid-cols-[repeat(2, minmax(0, 1fr))] gap-5 p-5">

            {/*Top Heading section with redirect button*/}
            <div className="col-span-2 border-b-2 border-b-primary-text border-dashed">
                <RedirectButton 
                redirectLink="/home/my-couple"
                />
                <Headings
                    heading="Settings"
                    paragraph="Manage your account, couple space and app experiences"
                />
            </div>

            {/*Display for all the settings together*/}
            <UserSettings />
            {coupleData && <CoupleSettings />}
            <PrivacySetting />
        </div>
    </section>
}


export default Settings;