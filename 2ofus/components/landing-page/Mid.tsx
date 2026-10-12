'use client';
import { frontImage } from "@/data/images";
import { useState } from "react";
import Image from "next/image";
import Button from "../commons/Button";
import Popups from "../commons/Popups";
import Auth from "../auth/Auth";
import { appName } from "@/data/info";

const Mid = () => {
    const [signIn, setSignIn] = useState(false);

    return <div className="parent-box"><div className="rounded-2xl child-box grid grid-rows-2 grid-cols-1 sm:grid-rows-1 sm:grid-cols-2">
        <div className="w-full h-full">
            <Image src={frontImage} className="rounded-tl-2xl sm:rounded-bl-2xl rounded-tr-2xl sm:rounded-br-none object-cover" alt="front-image" />
        </div>

        <div className="w-full h-full flex flex-col items-center py-50 px-30 gap-10">
            <h1 className="text-4xl font-bold text-primary-text">
                Welcome to the <span className="text-accent">{appName}</span>, a place to be bounded love forever!
            </h1>

            <p className="text-md font-medium text-secondary-text">
                This website is made for you and your partner, to understand each other better, notice what's wrong and be together forever!
            </p>

            <Button onClick={() => setSignIn(true)} type="button" text="Get Started" textSize={"large"} padding={1} />
        </div>

        <Popups open={signIn} setOpen={setSignIn}>
            <Auth setOpen={setSignIn} signIn={true} />
        </Popups>
    </div></div>
}

export default Mid;