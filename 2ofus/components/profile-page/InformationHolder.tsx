"use client";
import { LucideIcon } from "lucide-react";
import PlayfulButton from "../commons/PlayfulButton";
import { Pencil } from "lucide-react";
import { SetStateAction, useState } from "react";
import { useThemeSettings } from "@/app/theme-provider";
import { Users } from "@/types/profiles";
import Popups from "../commons/Popups";
import ProfileEditing from "./ProfileEditing";

const InformationHolder = ({ heading, icon, iconColor, profileData, setProfileData, information, allowEdit = false, type }: {
    heading: string,
    profileData: Users,
    setProfileData: React.Dispatch<SetStateAction<Users>>,
    icon: LucideIcon,
    iconColor: string,
    information: string,
    allowEdit?: boolean,
    type?: "fullname" | "dob" | "gender" | "interests"
}) => {

    const Icon = icon;
    const { theme } = useThemeSettings();
    const [editing, setEditing] = useState(false);
    const getDarkerColor = (color: string, amount = 25) =>
        `color-mix(in srgb, ${color}, black ${amount}%)`;

    return <div className={`${theme === "light" ? "bg-white" : "bg-black"} w-full shadow-[0_0_2px_var(--primary-text)] h-full rounded-md text-primary-text flex items-center gap-5 p-2`}>
        <div className="p-5 border-2 border-solid rounded-md aspect-square" style={{
            backgroundColor: iconColor,
            borderColor: getDarkerColor(iconColor, 25)
        }}>
            <Icon
                style={{
                    color: getDarkerColor(iconColor, 50)
                }}
            />
        </div>

        <div className="w-full h-full flex flex-col gap-2">
            <h5 className="text-md font-medium text-primary-text font-rubik">
                {heading}
            </h5>

            <p className="text-md font-medium text-secondary-text font-comfortaa">
                {information}
            </p>
        </div>


        {allowEdit && <div className="aspect-square p-5">
            <PlayfulButton backgroundColor="var(--accent)" textColor="white" padding={5} pScale="px" width={100} height={100} wScale="%" hScale="%" icon={Pencil} onClick={() => setEditing(prev => !prev)} />
        </div>}

        {type && <Popups open={editing} setOpen={setEditing}>
            <ProfileEditing type={type} setEditing={setEditing} profileData={profileData} setProfileData={setProfileData} />
        </Popups>}
    </div>
}


export default InformationHolder;