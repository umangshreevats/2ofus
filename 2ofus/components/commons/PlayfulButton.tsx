'use client';
import { LucideIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import type { CSSProperties } from "react";

interface PlayfulButtonProps {
    text: string;
    onClick: () => void | Promise<void>;
    icon?: LucideIcon | null;
    width?: "auto" | number;
    height?: "auto" | number;
    wScale?: "%" | "px" | "rem";
    hScale?: "%" | "px" | "rem";
    textAlign?: CSSProperties["textAlign"];
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
}
const PlayfulButton: React.FC<PlayfulButtonProps> = ({
    text = "",
    onClick,
    width = "auto",
    height = "auto",
    hScale = "px",
    wScale = "px",
    icon = null,
    textAlign = "center",
    backgroundColor = "",
    textColor = "",
    borderColor = ""
}) => {

    const [onButton, setOnButton] = useState(false);
    const Icon = icon;
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const shadowColor = borderColor.length === 0
        ? "var(--accent)"
        : borderColor;

    useEffect(() => {
        const onHover = () => {

            if (!buttonRef.current) {
                return;
            }

            if (onButton) {
                buttonRef.current.style.translate = `2px -2px`;
                buttonRef.current.style.boxShadow = `-8px 8px 0px 0px ${shadowColor}`;
            } else {
                buttonRef.current.style.translate = `0px 0px`;
                buttonRef.current.style.boxShadow = `-6px 6px 0px 0px ${shadowColor}`;
            }
        }

        onHover();
    }, [onButton]);

    const onTap = () => {

        if (!buttonRef.current) {
            return;
        }

        buttonRef.current.style.translate = `-4px 4px`;
        buttonRef.current.style.boxShadow = `-4px 4px 0px 0px ${shadowColor}`;
    }

    const onRelease = () => {
        if (!buttonRef.current) {
            return;
        }

        buttonRef.current.style.translate = `0px 0px`;
        buttonRef.current.style.boxShadow = `-6px 6px 0px 0px ${shadowColor}`;
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
            backgroundColor: `${backgroundColor.length === 0 ? "var(--background)" : backgroundColor}`,
            color: `${textColor.length === 0 ? "var(--primary-text)" : textColor}`,
            padding: `1rem`,
            borderColor: borderColor.length === 0
                ? "var(--accent)"
                : borderColor,
            boxShadow: `-6px 6px 0px 0px ${shadowColor}`,
            transition: "all 0.15s ease-out",
            width: `${width === "auto" ? width : width + wScale}`,
            height: `${height === "auto" ? height : height + hScale}`,
            textAlign: textAlign
        }}
    >
        {Icon && <Icon />} {text}
    </button>
}


export default PlayfulButton;