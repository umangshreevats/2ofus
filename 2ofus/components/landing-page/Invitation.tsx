'use client';
import { joinUsOpen, joinUsClosed } from "@/data/images";
import Image from "next/image";
import { useState } from "react";
import PlayfulButton from "../commons/PlayfulButton";


const Letter = ({ onVelop }: { onVelop: boolean }) => {

    return <div onClick={e => e.stopPropagation()} className={`${onVelop ? "flex" : "hidden"} gap-4 flex-col items-center p-5 absolute left-[400px] top-[300px]`}>
        <p className="text-primary-text font-bold">
            Login to you account to connect with your partner!
        </p>

        <PlayfulButton text="Sign In" />
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