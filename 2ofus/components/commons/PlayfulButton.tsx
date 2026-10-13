'use client';
import { LucideIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import type { CSSProperties } from "react";

interface PlayfulButtonProps {
    text: string;
    onClick: () => void | Promise<void>;
    icon?: LucideIcon | null;
    width?: "auto" | number;
    wScale?: "%" | "px" | "rem";
    textAlign?: CSSProperties["textAlign"];
}
const PlayfulButton: React.FC<PlayfulButtonProps> = ({
    text = "",
    onClick,
    width = "auto",
    wScale = "px",
    icon = null,
    textAlign = "center"
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
    onClick={onClick}
        ref={buttonRef}
        type={"button"}
        onMouseEnter={() => setOnButton(true)}
        onMouseLeave={() => setOnButton(false)}
        onPointerDown={onTap}
        onPointerUp={onRelease}
        onPointerCancel={onRelease}
        className={`cursor-pointer border-4 border-solid font-bold rounded-full`}
        style={{
            backgroundColor: `var(--background)`,
            color: `var(--primary-text)`,
            padding: `1rem`,
            borderColor: `var(--accent)`,
            boxShadow: `-6px 6px 0px 0px var(--accent)`,
            transition: "all 0.15s ease-out",
            width: `${width === "auto" ? width : width + wScale}`,
            textAlign: textAlign
        }}
    >
        {Icon && <Icon />} {text}
    </button>
}


export default PlayfulButton;