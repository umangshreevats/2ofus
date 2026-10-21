import { CommonScales } from "@/types/commonScale"
import { useThemeSettings } from "@/app/theme-provider"



export const commonComponentStyles = ({ width = "auto", wscale = "px", height = "auto", hscale = "px", padding = 1, pscale = "rem" }: CommonScales) => {


    return {
        width: width === "auto" ? width : `${width + wscale}`,
        height: height === "auto" ? height : `${height + wscale}`,
        padding: padding === "auto" ? padding : `${padding + pscale}`
    }
}



export const backgroundTextStyles = (theme: "light" | "dark", blackAndWhite = false, properties = { backgroundColor: "", textColor: "", borderColor: "" }) => {


    if (blackAndWhite) {
        return {
            backgroundColor: properties.backgroundColor.length > 0 ? properties.backgroundColor : theme === "light" ? "white" : "black",
            color: properties.textColor.length > 0 ? properties.textColor : theme === "light" ? "black" : "white",
            borderColor: properties.borderColor.length > 0 ? properties.borderColor : theme === "light" ? "black" : "white"
        }
    }

    return {
        backgroundColor: properties.backgroundColor.length === 0 ? "var(--background)" : properties.backgroundColor,
        color: properties.textColor.length === 0 ? "var(--primary-text)" : properties.textColor,
        borderColor: properties.borderColor.length === 0 ? "var(--accent)" : properties.borderColor
    }
}

