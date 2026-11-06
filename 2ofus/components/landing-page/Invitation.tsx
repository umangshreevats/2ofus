
'use client';

import { joinUsOpen, joinUsClosed } from "@/data/images";
import Image from "next/image";
import { useState } from "react";
import PlayfulButton from "../commons/PlayfulButton";
import Popups from "../commons/Popups";
import Auth from "../auth/Auth";

const Letter = ({ onVelop }: { onVelop: boolean }) => {
    const [signIn, setSignIn] = useState(false);

    return (<>
        <div
            onClick={(e) => e.stopPropagation()}
            className={`
                ${onVelop ? "flex" : "hidden"}
                absolute
                left-1/2 top-1/2
                -translate-x-1/2 -translate-y-1/2
                z-20

                w-[75%]
                max-w-[300px]
                min-w-[220px]

                p-2
                min-[400px]:p-3
                sm:p-4
                md:p-5

                flex-col items-center
                gap-2
                sm:gap-3
                md:gap-4
            `}
        >
            <p className="
                text-black font-bold text-center
                text-[9px]
                min-[400px]:text-[10px]
                sm:text-xs
                md:text-sm
                lg:text-base
                leading-tight
                sm:leading-snug
                break-words
            ">
                Login to your account to connect with your partner!
            </p>

            <PlayfulButton
                onClick={() => setSignIn(true)}
                text="Sign In"
                className="text-sm"
            />
        </div>
        <Popups open={signIn} setOpen={setSignIn}>
            <Auth signIn={true} setOpen={setSignIn} />
        </Popups>
    </>
    );
};

const Invitation = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const onVelop = isHovered || isClicked;

    return (
        <div className="parent-box">
            <div className="
                child-box
                p-2
                min-[400px]:p-3
                sm:p-5
                md:p-8
                lg:p-12
                xl:p-16
                flex justify-center items-center
            ">
                <div
                    className="
                        relative
                        w-full
                        max-w-2xl
                        aspect-[4/3]
                        cursor-pointer
                    "
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => setIsClicked(!isClicked)}
                >
                    <Image
                        src={onVelop ? joinUsOpen : joinUsClosed}
                        alt="join-us"
                        fill
                        priority
                        sizes="
                            (max-width: 640px) 100vw,
                            (max-width: 1024px) 80vw,
                            672px
                        "
                        className="object-contain"
                    />

                    <Letter onVelop={onVelop} />
                </div>
            </div>
        </div>
    );
};

export default Invitation;
