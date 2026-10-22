'use client';
import { backgroundTextStyles } from "@/data/style";
import { CSSProperties } from "react";
import { useThemeSettings } from "@/app/theme-provider";

interface PlayfulInputProps {
    id?: string;
    text?: string;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute;
    width?: "auto" | number;
    height?: "auto" | number;
    hScale?: "%" | "px" | "rem";
    wScale?: "%" | "px" | "rem";
    pScale?: "%" | "px" | "rem";
    padding?: number;
    textAlign?: CSSProperties["textAlign"];
    onChange: (...props: any) => void;
    onClick?: (...props: any) => void;
    noLeft?: boolean;
    disabled?: boolean;
    textArea?: boolean;
    borderColor?: string;
    backgroundColor?: string;
    textColor?: string;
    maxLength?: number;
}

const PlayfulInput: React.FC<PlayfulInputProps> = ({
    width = "auto",
    height = "auto",
    hScale = "px",
    wScale = "px",
    padding = "1",
    pScale = "rem",
    textAlign = "center",
    text = "",
    maxLength,
    onChange,
    onClick = () => { },
    id = "",
    type = "text",
    placeholder = "Enter Something",
    noLeft = false,
    disabled = false,
    textArea = false,
    borderColor = "accent",
    backgroundColor = "background",
    textColor = "primary-text"
}) => {

    const { theme } = useThemeSettings();
    return <>{!textArea ? <input
        maxLength={maxLength}
        onClick={() => onClick()}
        disabled={disabled}
        className={`disabled:cursor-not-allowed border-4 border-solid flex font-bold outline-none ${noLeft ? "rounded-r-full" : "rounded-full"}`}
        style={{
            boxShadow: `
    inset 3px -3px 5px rgba(0,0,0,0.08),
    inset -6px 6px 0px 0px var(--${borderColor}, ${borderColor})
`,
            height: `${height === "auto" ? height : height + hScale}`,
            padding: `${padding + pScale}`,
            transition: "all 0.15s ease-out",
            width: `${width === "auto" ? width : width + wScale}`,
            textAlign: textAlign,
            ...backgroundTextStyles(theme, false, { backgroundColor: backgroundColor, borderColor: borderColor, textColor: textColor })
        }}
        id={id}
        placeholder={placeholder}
        value={text}
        onChange={onChange}
        type={type}
    /> : <textarea
        maxLength={maxLength}
        onClick={() => onClick()}
        disabled={disabled}
        className={`disabled:cursor-not-allowed border-4 border-solid flex font-bold outline-none ${noLeft ? "rounded-r-2xl" : "rounded-2xl"}`}
        style={{
            boxShadow: `
        inset 3px -3px 5px rgba(0,0,0,0.08),
        inset -6px 6px 0px 0px var(--${borderColor})
    `,
            height: `${height === "auto" ? height : height + hScale}`,
            padding: `${padding}${pScale}`,
            transition: "all 0.15s ease-out",
            width: `${width === "auto" ? width : width + wScale}`,
            textAlign,
            ...backgroundTextStyles(theme, false, {
                backgroundColor,
                borderColor,
                textColor
            })
        }}
        id={id}
        placeholder={placeholder}
        value={text}
        onChange={onChange} />}</>
}


export default PlayfulInput;