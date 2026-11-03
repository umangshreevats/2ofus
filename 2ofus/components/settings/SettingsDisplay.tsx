"use client";
import { LucideIcon, User } from "lucide-react";
import { useThemeSettings } from "@/app/theme-provider";


/*
Reusable display for the different settings, with different settings options*/
const SettingsDisplay = ({ title, paragraph, settingsOptions, icon }:
    {
        title: string,
        paragraph: string,
        icon: LucideIcon,
        settingsOptions: any[]
    }
) => {

    const Icon = icon;
    const { theme } = useThemeSettings();


    return <div className="w-full rounded-2xl bg-surface p-5 flex flex-col gap-5 component-shadow">

        {/*Headings part for the settings display*/}
        <div className="flex gap-5 items-center">
            <div className="rounded-full p-5 component-shadow bg-background">
                <Icon />
            </div>

            <div className="w-full flex flex-col gap-2">
                <h3 className="font-bold text-2xl font-rubik">
                    {title}
                </h3>
                <p className="font-medium text-md font-comfortaa text-secondary-text">{paragraph}</p>
            </div>
        </div>


        {/*Settings list*/}
        <ul className={`w-full rounded-2xl ${theme === "light" ? "bg-white" : "bg-black"} text-primary-text flex flex-col p-5 gap-5`}>
            {settingsOptions.map((option) => {

                const OptionIcon = option.icon;
                const SecondaryIcon = option.secondaryIcon;
                return <li key={option.id} className="w-full border-b border-b-secondary-text p-3">

                    {/*Option Display*/}
                    <button onClick={option.onClick} className="cursor-pointer w-full text-secondary-text font-rubik flex justify-between items-center">
                        <div className="flex gap-2 items-center sm:gap-5">
                            <div className="p-2 sm:p-5 rounded-full component-shadow aspect-square">
                                <OptionIcon />
                            </div>

                            <div className="flex flex-1 min-w-0 flex-col gap-2">
                                <h4 className="text-primary-text font-rubik text-lg sm:text-xl">
                                    {option.title}
                                </h4>

                                <p className="font-medium text-secondary-text font-comfortaa">
                                    {option.paragraph}
                                </p>
                            </div>
                        </div>

                        <div className="p-2 sm:p-5 shrink-0">
                            <SecondaryIcon />
                        </div>
                    </button>
                </li>
            })}
        </ul>
    </div>
}


export default SettingsDisplay;