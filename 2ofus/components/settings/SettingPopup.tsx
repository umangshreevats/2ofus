"use client";
import { SetStateAction } from "react";
import Button from "../commons/Button";


const SettingPopup = ({ children, title, message, btnTitle, btnDisabled, setOpen, btnOnClick }: {
    children: React.ReactNode,
    title: string,
    message: string,
    btnTitle: string, 
    btnOnClick: () => Promise<any>,
    btnDisabled: boolean,
    setOpen: React.Dispatch<SetStateAction<boolean>> 
}) => {


    return <div className="w-full p-10 flex flex-col gap-5 rounded-2xl bg-background">

        {/*Heading section for the popup*/}
        <div className="flex flex-col gap-2">
            <h4 className="w-full text-2xl font-bold text-primary-text font-rubik">
                {title}
            </h4>
            <p className="font-comfortaa text-md font-medium text-secondary-text">
                {message}
            </p>
        </div>

        {/*User defined html for each popup and it's own settings*/}
        <div className="w-full">
            {children}
        </div>

        {/*Cancel and update button*/}
        <div className="flex gap-2">
            <Button type="button" width={100} wscale="%" onClick={() => setOpen(false)} backgroundColor="red" textColor="white" text="Cancel" />
            <Button disabled={btnDisabled} type="button" width={100} wscale="%" onClick={btnOnClick} text={btnTitle} backgroundColor="surface" textColor="primary-text" />
        </div>
    </div>
}

export default SettingPopup;