'use client';
import { type LucideIcon } from 'lucide-react';
import { IconType } from 'react-icons';
import { useThemeSettings } from '@/app/theme-provider';
import { useState } from 'react';

interface ButtonProps {
    type?: "button" | "submit" | "reset";
    icon?: LucideIcon | IconType;
    onClick?: (...params: any[]) => any | Promise<any>;
    text: string;
    backgroundColor?: string | "accent";
    textColor?: string | "secondary-text";
    hoverColor?: string;
    width?: "auto" | number;
    height?: "auto" | number;
    textSize?: string | number;
    padding?: 0.5 | number;
    wscale?: "px" | "%" | "em" | "rem",
    hscale?: "px" | "%" | "em" | "rem",
    tscale?: "px" | "%" | "em" | "rem",
    pscale?: "px" | "%" | "em" | "rem",
    disabled?: boolean;
    className?: string;
    selectButton?: boolean;
    selectColor?: string;
};

const Button: React.FC<ButtonProps> = ({
    type = "submit",
    disabled = false,
    onClick = () => { console.log(text) },
    backgroundColor,
    text,
    hoverColor = "",
    textSize = "small",
    icon,
    width = "auto",
    wscale = "px",
    hscale = "px",
    tscale = "px",
    pscale = "rem",
    height = "auto",
    textColor,
    padding = 0.5,
    className = "",
    selectButton = false,
    selectColor = ""
}) => {

    const Icon = icon || null;

    const { theme } = useThemeSettings();
    const [select, setSelect] = useState(false);

    const finalBackgroundColor = selectButton && select
        ? selectColor || (theme === "light" ? "black" : "white")
        : backgroundColor ?? (theme === "light" ? "black" : "white");

    const finalTextColor = selectButton && select
    ? (theme === "light" ? "white" : "black")
    : textColor ?? (theme === "light" ? "white" : "black");


    const handleOnClick = async () => {
        await onClick();

        if (selectButton) {
            setSelect?.(!select);
        }
    };

    return <button disabled={disabled} onClick={handleOnClick} type={type} className={`${className} flex disabled:cursor-not-allowed items-center gap-2 justify-center rounded-full font-bold text-center cursor-pointer`}
        style={{
            backgroundColor: `var(--${finalBackgroundColor}, ${finalBackgroundColor})`,
            color: finalTextColor,
            width: `${typeof width === "number" ? width + wscale : width}`,
            height: `${typeof height === "number" ? height + hscale : height}`,
            fontSize: `${typeof textSize === "number" ? textSize + tscale : textSize}`,
            padding: `${typeof padding === "number" ? padding + pscale : padding}`
        }}
    >
        {Icon && <Icon />} {text}
    </button>
}

export default Button;