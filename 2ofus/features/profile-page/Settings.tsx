"use client";
import Headings from "@/components/commons/Headings";
import RedirectButton from "@/components/commons/RedirectButton";
import UserSettings from "../settings-page/UserSettings";
import CoupleSettings from "../settings-page/CoupleSettings";

const Settings = () => {

    return <section className="parent-box">
        <div className="child-box grid grid-cols-[repeat(2, minmax(0, 1fr))] gap-5 p-5">

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
            <CoupleSettings />
        </div>
    </section>
}


export default Settings;