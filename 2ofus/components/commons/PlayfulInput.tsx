'use client';
import { LucideIcon } from "lucide-react";
import { CSSProperties } from "react";


interface PlayfulInputProps {
    id: string;
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
    onChange,
    onClick = () => {},
    id,
    type = "text",
    placeholder = "Enter Something",
    noLeft = false,
    disabled = false
}) => {


    return <input
    onClick={() => onClick()}
    disabled={disabled}
        className={`disabled:cursor-not-allowed border-4 border-solid flex font-bold outline-none ${noLeft ? "rounded-r-full" : "rounded-full"}`}
        style={{
            boxShadow: `
    inset 3px -3px 5px rgba(0,0,0,0.08),
    inset -6px 6px 0px 0px var(--accent)
`,
            height: `${height === "auto" ? height : height + hScale}`,
            padding: `${padding + pScale}`,
            backgroundColor: `var(--background)`,
            color: `var(--primary-text)`,
            borderColor: `var(--accent)`,
            transition: "all 0.15s ease-out",
            width: `${width === "auto" ? width : width + wScale}`,
            textAlign: textAlign
        }}
        id={id}
        placeholder={placeholder}
        value={text}
        onChange={onChange}
        type={type}
    />
}


export default PlayfulInput;