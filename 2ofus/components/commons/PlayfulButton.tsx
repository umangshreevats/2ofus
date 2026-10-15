'use client';
import { LucideIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import type { CSSProperties } from "react";

interface PlayfulButtonProps {
    text?: string;
    onClick?: (...args: any[]) => void | Promise<void>;
    onSecondClick?: (...args: any[]) => void | Promise<void>;
    icon?: LucideIcon | null;
    width?: "auto" | number;
    height?: "auto" | number;
    padding?: number;
    wScale?: "%" | "px" | "rem";
    hScale?: "%" | "px" | "rem";
    pScale?: "%" | "px" | "rem";
    textAlign?: CSSProperties["textAlign"];
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    onlyOnce?: boolean;
    clickTextColor?: string;
    clickBackColor?: string;
    clickBorderColor?: string;
    pressUp?: boolean;
    pressed?: boolean;
    noRight?: boolean;
    type?: "button" | "submit" | "reset";
}
const PlayfulButton: React.FC<PlayfulButtonProps> = ({
    onlyOnce = false,
    clickTextColor = "",
    clickBackColor = "",
    clickBorderColor = "",
    text = "",
    onClick,
    onSecondClick,
    width = "auto",
    height = "auto",
    padding = 1,
    pScale = "rem",
    hScale = "px",
    wScale = "px",
    icon = null,
    textAlign = "center",
    backgroundColor = "",
    textColor = "",
    borderColor = "",
    pressUp = false,
    pressed = false,
    noRight = false,
    type = "button"
}) => {

    const [clicked, setClicked] = useState(pressed);
    const [onButton, setOnButton] = useState(false);
    const Icon = icon;
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const shadowColor = borderColor.length === 0
        ? "var(--accent)"
        : borderColor;

    useEffect(() => {
        setClicked(pressed);
    }, [pressed]);
    useEffect(() => {
        const onHover = () => {

            if (!buttonRef.current) {
                return;
            }

            if (onButton) {

                if (onlyOnce && clicked) return;
                buttonRef.current.style.translate = `2px -2px`;
                buttonRef.current.style.boxShadow = `-8px 8px 0px 0px ${shadowColor}`;
            } else {
                if (onlyOnce && clicked) return;
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

        if (clicked && pressUp) {
            onSecondClick?.();
            buttonRef.current.style.translate = `0px 0px`;
            buttonRef.current.style.boxShadow = `-6px 6px 0px 0px ${shadowColor}`;
            buttonRef.current.style.backgroundColor = backgroundColor.length === 0 ? "var(--background)" : backgroundColor;
            buttonRef.current.style.color = textColor.length === 0 ? "var(--primary-text)" : textColor;
            buttonRef.current.style.borderColor = borderColor.length === 0 ? "var(--accent)" : borderColor;
            setClicked(false);
            return;
        }
        onClick?.();
        setClicked(true);
        buttonRef.current.style.translate = `-4px 4px`;
        buttonRef.current.style.boxShadow = `-4px 4px 0px 0px ${clickBorderColor.length > 0 ? clickBorderColor : shadowColor}`;
        clickBackColor.length > 0 ? buttonRef.current.style.backgroundColor = clickBackColor : null;
        clickTextColor.length > 0 ? buttonRef.current.style.color = clickTextColor : null;
        clickBorderColor.length > 0 ? buttonRef.current.style.borderColor = clickBorderColor : null;
    }

    const onRelease = () => {
        if (onlyOnce && clicked) return;

        if (!buttonRef.current) {
            return;
        }

        buttonRef.current.style.translate = `0px 0px`;
        buttonRef.current.style.boxShadow = `-6px 6px 0px 0px ${shadowColor}`;
        buttonRef.current.style.backgroundColor = backgroundColor.length === 0 ? "var(--background)" : backgroundColor;
        buttonRef.current.style.color = textColor.length === 0 ? "var(--primary-text)" : textColor;
        buttonRef.current.style.borderColor = borderColor.length === 0 ? "var(--accent)" : borderColor;
    }
    return <button
        ref={buttonRef}
        type={type}
        onMouseEnter={() => setOnButton(true)}
        onMouseLeave={() => setOnButton(false)}
        onPointerDown={onTap}
        onPointerUp={onRelease}
        onPointerCancel={onRelease}
        className={`cursor-pointer border-4 border-solid font-bold ${noRight ? "rounded-l-full" : "rounded-full"}`}
        style={{
            backgroundColor: clicked
                ? (clickBackColor || backgroundColor || "var(--background)")
                : (backgroundColor || "var(--background)"),

            color: clicked
                ? (clickTextColor || textColor || "var(--primary-text)")
                : (textColor || "var(--primary-text)"),

            padding: `${padding+pScale}`,

            borderColor: clicked
                ? (clickBorderColor || borderColor || "var(--accent)")
                : (borderColor || "var(--accent)"),

            boxShadow: clicked
                ? `-4px 4px 0px 0px ${clickBorderColor || shadowColor}`
                : `-6px 6px 0px 0px ${shadowColor}`,

            translate: clicked ? "-4px 4px" : "0px 0px",

            transition: "all 0.15s ease-out",

            width: width === "auto" ? width : `${width}${wScale}`,
            height: height === "auto" ? height : `${height}${hScale}`,

            textAlign: textAlign
        }}
    >
        {Icon && <Icon />} {text}
    </button>
}


export default PlayfulButton;