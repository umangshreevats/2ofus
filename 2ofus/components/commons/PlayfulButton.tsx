'use client';
import { LucideIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";


interface PlayfulButtonProps {
    text: string,
    icon?: LucideIcon | null
}
const PlayfulButton: React.FC<PlayfulButtonProps> = ({
    text = "",
    icon = null
}) => {

    const [onButton, setOnButton] = useState(false);
    const Icon = icon;
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const onHover = () => {

            if (!buttonRef.current) {
                return;
            }

            if (onButton) {
                buttonRef.current.style.translate = `2px -2px`;
                buttonRef.current.style.boxShadow = `-8px 8px 0px 0px var(--accent)`;
            } else {
                buttonRef.current.style.translate = `0px 0px`;
                buttonRef.current.style.boxShadow = `-6px 6px 0px 0px var(--accent)`;
            }
        }

        onHover();
    }, [onButton]);

    const onTap = () => {

        if(!buttonRef.current) {
            return;
        }

        buttonRef.current.style.translate = `-4px 4px`;
        buttonRef.current.style.boxShadow = `-4px 4px 0px 0px var(--accent)`;
    }

    const onRelease = () => {
        if(!buttonRef.current) {
            return;
        }

        buttonRef.current.style.translate = `0px 0px`;
        buttonRef.current.style.boxShadow = `-6px 6px 0px 0px var(--accent)`;
    }
    return <button
        ref={buttonRef}
        type={"button"}
        onMouseEnter={() => setOnButton(true)}
        onMouseLeave={() => setOnButton(false)}
        onPointerDown={onTap}
        onPointerUp={onRelease}
        onPointerCancel={onRelease}
        className={`text-center cursor-pointer border-3 border-solid font-bold rounded-full`}
        style={{
            backgroundColor: `var(--background)`,
            color: `var(--primary-text)`,
            padding: `1rem`,
            borderColor: `var(--accent)`,
            boxShadow: `-6px 6px 0px 0px var(--accent)`,
            transition: "all 0.15s ease-out",

        }}
    >
        {Icon && <Icon />} {text}
    </button>
}


export default PlayfulButton;