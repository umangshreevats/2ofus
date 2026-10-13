'use client';
import { joinUsOpen, joinUsClosed } from "@/data/images";
import Image from "next/image";
import { useState } from "react";
import PlayfulButton from "../commons/PlayfulButton";
import Popups from "../commons/Popups";
import Auth from "../auth/Auth";

const Letter = ({ onVelop }: { onVelop: boolean }) => {

    const [signIn, setSignIn] = useState(false);

    return <div onClick={e => e.stopPropagation()} className={`${onVelop ? "flex" : "hidden"} gap-4 flex-col items-center p-5 absolute left-[280px] top-[190px]`}>
        <p className="text-black font-bold">
            Login to you account to connect with your partner!
        </p>

        <PlayfulButton onClick={() => setSignIn(true)} text="Sign In" />

        <Popups open={signIn} setOpen={setSignIn}>
            <Auth signIn={true} setOpen={setSignIn} />
        </Popups>
    </div>
}
const Invitation = () => {

    const [onVelop, setOnvelop] = useState(false);
    return <div className="parent-box">
        <div className="child-box p-20 flex justify-center items-center">
            <div className="w-full h-full relative" 
            onMouseEnter={() => setOnvelop(true)} 
            onMouseLeave={() => setOnvelop(false)} 
            onClick={() => setOnvelop(!onVelop)}>
                <Image src={onVelop ? joinUsOpen : joinUsClosed} alt="join-us" className="object-cover" />

                <Letter onVelop={onVelop} />
            </div>
        </div>
    </div>
}

export default Invitation;