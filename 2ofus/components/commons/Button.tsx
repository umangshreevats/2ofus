'use client';
import type { LucideIcon } from 'lucide-react';
import { IconType } from 'react-icons';
import { useThemeSettings } from '@/app/theme-provider';

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
    padding = 0.5
}) => {

    const Icon = icon || null;

    const { theme } = useThemeSettings();


    const finalBackgroundColor =
        backgroundColor ?? (theme === "light" ? "black" : "white");

    const finalTextColor =
        textColor ?? (theme === "light" ? "white" : "black");

    return <button disabled={disabled} onClick={onClick} type={type} className={`flex disabled:cursor-not-allowed items-center gap-5 justify-center rounded-full font-bold text-center cursor-pointer`}
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