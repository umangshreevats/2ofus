'use client';
import { frontImage } from "@/data/images";
import { useState } from "react";
import Image from "next/image";
import Button from "../commons/Button";
import Popups from "../commons/Popups";
import Auth from "../auth/Auth";
import { appName } from "@/data/info";
import { useThemeSettings } from "@/app/theme-provider";

const Mid = () => {
    const { theme } = useThemeSettings();
    const [signIn, setSignIn] = useState(false);

    return <div className="parent-box"><div className="rounded-2xl child-box grid grid-rows-1 grid-cols-1 md:grid-rows-1 md:grid-cols-2">
        <div className="w-full h-full hidden md:block">
            <Image src={frontImage} className="rounded-tl-2xl sm:rounded-bl-2xl rounded-tr-2xl sm:rounded-br-none object-cover" alt="front-image" />
        </div>

        <div className="w-full h-full flex flex-col items-center p-10 gap-10">
            <h1 className="text-4xl font-bold text-primary-text">
                Welcome to <span className="text-accent">{appName}</span>, your little space for love, laughter, and togetherness!
            </h1>

            <p className="text-md font-medium text-secondary-text">
                A special space made just for you and your partner to share beautiful memories, express your feelings, appreciate the little things, and understand each other better. Celebrate your bond, cherish every moment, and make your journey together even more meaningful!
            </p>

            <Button
                onClick={() => setSignIn(true)}
                type="button"
                text="Get Started"
                textSize={"large"}
                padding={1}
                hoverEffect={true}
                hoverBackgroundColor={theme === "light" ? "white" : "black"}
                hoverTextColor={theme === "light" ? "black" : "white"}
            />
        </div>

        <Popups open={signIn} setOpen={setSignIn}>
            <Auth setOpen={setSignIn} signIn={true} />
        </Popups>
    </div></div>
}

export default Mid;