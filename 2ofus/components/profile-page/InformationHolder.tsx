"use client";
import { LucideIcon } from "lucide-react";
import PlayfulButton from "../commons/PlayfulButton";
import { Pencil } from "lucide-react";
import { SetStateAction, useState } from "react";
import { useThemeSettings } from "@/app/theme-provider";
import { Couples, Users } from "@/types/profiles";
import Popups from "../commons/Popups";
import ProfileEditing from "./ProfileEditing";

const InformationHolder = ({
    heading,
    icon,
    iconColor,
    profileData,
    setProfileData,
    setCoupleData,
    information,
    allowEdit = false,
    type,
    selectedImage,
    setSelectedImage,
    originalProfile,
    originalCouple
}: {
    heading: string,
    profileData: Users | Couples,
    setProfileData?: React.Dispatch<SetStateAction<Users>>,
    setCoupleData?: React.Dispatch<SetStateAction<Couples>>,
    icon: LucideIcon,
    iconColor: string,
    information: string,
    allowEdit?: boolean,
    type?: "fullname"
    | "dob"
    | "gender"
    | "interests"
    | "couple_name"
    | "anniversary_date"
    | "first_meet_date"
    | "first_meet_location"
    | "relationship_status"
    | "bio",
    selectedImage: File | null;
    setSelectedImage: React.Dispatch<SetStateAction<File | null>>;
    originalProfile?: React.RefObject<Users>;
    originalCouple?: React.RefObject<Couples>;
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

        <div className="w-full min-w-0 flex-1 flex flex-col gap-2">
            <h5 className="text-md font-medium text-primary-text font-rubik">
                {heading}
            </h5>

            <p className="text-md font-medium text-secondary-text font-comfortaa break-words [overflow-wrap:anywhere]">
                {information}
            </p>
        </div>


        {allowEdit && <div className="aspect-square p-5">
            <PlayfulButton backgroundColor="var(--accent)" textColor="white" padding={1} pScale="px" width={100} height={100} wScale="%" hScale="%" icon={Pencil} onClick={() => setEditing(prev => !prev)} />
        </div>}

        {editing && type && (
            (setProfileData && originalProfile) ? <Popups open={editing} setOpen={setEditing}>
                <ProfileEditing
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                    originalProfile={originalProfile}
                    type={type}
                    setEditing={setEditing}
                    profileData={profileData}
                    setProfileData={setProfileData}
                />
            </Popups> : (setCoupleData && originalCouple) ? <Popups open={editing} setOpen={setEditing}>
                <ProfileEditing
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                    originalCouple={originalCouple}
                    type={type}
                    setEditing={setEditing}
                    profileData={profileData}
                    setCoupleData={setCoupleData}
                />
            </Popups> : null
        )}
    </div>
}


export default InformationHolder;