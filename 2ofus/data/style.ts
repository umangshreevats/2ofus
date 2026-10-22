import { CommonScales } from "@/types/commonScale"
import { useThemeSettings } from "@/app/theme-provider"



export const commonComponentStyles = ({ width = "auto", wscale = "px", height = "auto", hscale = "px", padding = 1, pscale = "rem" }: CommonScales) => {


    return {
        width: width === "auto" ? width : `${width + wscale}`,
        height: height === "auto" ? height : `${height + wscale}`,
        padding: padding === "auto" ? padding : `${padding + pscale}`
    }
}



export const backgroundTextStyles = (
    theme: "light" | "dark",
    blackAndWhite = false,
    properties = {
        backgroundColor: "",
        textColor: "",
        borderColor: ""
    }
) => {
    if (blackAndWhite) {
        return {
            backgroundColor: properties.backgroundColor
                ? `var(--${properties.backgroundColor}, ${properties.backgroundColor})`
                : theme === "light" ? "white" : "black",

            color: properties.textColor
                ? `var(--${properties.textColor}, ${properties.textColor})`
                : theme === "light" ? "black" : "white",

            borderColor: properties.borderColor
                ? `var(--${properties.borderColor}, ${properties.borderColor})`
                : theme === "light" ? "black" : "white"
        };
    }

    return {
        backgroundColor: properties.backgroundColor
            ? `var(--${properties.backgroundColor}, var(--background))`
            : "var(--background)",

        color: properties.textColor
            ? `var(--${properties.textColor}, var(--primary-text))`
            : "var(--primary-text)",

        borderColor: properties.borderColor
            ? `var(--${properties.borderColor}, var(--accent))`
            : "var(--accent)"
    };
};