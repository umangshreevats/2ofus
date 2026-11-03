"use client";
import { SetStateAction } from "react";
import Button from "../commons/Button";


const SettingPopup = ({ children, title, message, btnTitle, setOpen }: {
    children: React.ReactNode,
    title: string,
    message: string,
    btnTitle: string, 
    setOpen: React.Dispatch<SetStateAction<boolean>> 
}) => {


    return <div className="w-full p-5 flex flex-col gap-5 rounded-2xl bg-background">
        <div className="flex flex-col gap-2">
            <h4 className="w-full text-2xl font-bold text-primary-text font-rubik">
                {title}
            </h4>
            <p className="font-comfortaa text-md font-medium text-secondary-text">
                {message}
            </p>
        </div>

        <div className="w-full">
            {children}
        </div>
        <div className="flex gap-2">
            <Button type="button" width={100} wscale="%" onClick={() => setOpen(false)} backgroundColor="red" textColor="white" text="Cancel" />
            <Button type="button" width={100} wscale="%" text={btnTitle} backgroundColor="surface" />
        </div>
    </div>
}

export default SettingPopup;