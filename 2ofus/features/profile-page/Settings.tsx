"use client";
import Headings from "@/components/commons/Headings";
import RedirectButton from "@/components/commons/RedirectButton";
import SettingsHolder from "@/components/settings/SettingsHolder";

const Settings = () => {

    return <section className="parent-box">
        <div className="child-box grid grid-cols-[repeat(2, minmax(0, 1fr))] gap-5">
            <div className="col-span-2 border-b-2 border-b-primary-text border-dashed">
                <RedirectButton 
                redirectLink="/home/my-couple"
                />
                <Headings
                    heading="Settings"
                    paragraph="Manage your account, couple space and app experiences"
                />
            </div>

            <SettingsHolder />
        </div>
    </section>
}


export default Settings;