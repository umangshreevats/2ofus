'use client';
import { CSSProperties } from "react";


interface PlayfulInputProps {
    id: string;
    text?: string;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute;
    width?: "auto" | number;
    wScale?: "%" | "px" | "rem";
    textAlign?: CSSProperties["textAlign"];
    onChange: (...props: any) => void;
}

const PlayfulInput: React.FC<PlayfulInputProps> = ({
    width = "auto",
    wScale = "px",
    textAlign = "center",
    text = "",
    onChange,
    id,
    type = "text",
    placeholder = "Enter Something"
}) => {


    return <input
        className={`border-4 outline-none border-solid font-bold rounded-full`}
        id={id}
        style={{
            backgroundColor: `var(--background)`,
            color: `var(--primary-text)`,
            padding: `1rem`,
            borderColor: `var(--accent)`,
            boxShadow: `inset -6px 6px 0px 0px var(--accent)`,
            transition: "all 0.15s ease-out",
            width: `${width === "auto" ? width : width + wScale}`,
            textAlign: textAlign
        }}
        placeholder={placeholder}
        value={text}
        onChange={onChange}
        type={type}
    />
}


export default PlayfulInput;