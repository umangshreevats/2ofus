"use client";
import { useThemeSettings } from "@/app/theme-provider";
import { useEffect, useState, useRef } from "react";

const Photograph = ({
    photograph = null,
    alternate,
    showTitle = true,
    fheight = "auto",
    fhscale = "px",
    name = "",
    url = "",
    date = "20XX/XX/XX",
    maxHeight = "auto",
    maxWidth = "auto",
    mhscale = "px",
    mwscale = "px",
    onClick = () => { console.log("Photograph") },
    cursor = "auto"
}: {
    url?: string;
    photograph?: File | null;
    alternate?: string;
    fwidth?: "auto" | number;
    fheight?: "auto" | number;
    fwscale?: "px" | "rem" | "%";
    fhscale?: "px" | "rem" | "%";
    maxWidth?: "auto" | number;
    maxHeight?: "auto" | number;
    mwscale?: "px" | "rem" | "%";
    mhscale?: "px" | "rem" | "%";
    name?: string;
    showTitle?: boolean;
    date?: string;
    onClick?: (...args: any[]) => any | Promise<any>;
    cursor?: string;
}) => {
    const { theme } = useThemeSettings();
    const [imageURL, setImageURL] = useState<string | null>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [cardWidth, setCardWidth] = useState<number | null>(null);
    const [imageDimensions, setImageDimensions] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {

        if (!photograph && url && url.length === 0) {
            setImageURL(null);
            return;
        }

        if (!photograph) {
            setImageURL(url);
            return;
        }

        const createdUrl = URL.createObjectURL(photograph);
        setImageURL(createdUrl);

        return () => {
            URL.revokeObjectURL(createdUrl);
        };
    }, [photograph, url]);

    const isLight = theme === "light";

    return (
        <div
            onClick={onClick}
            className="
    group relative flex flex-col w-fit self-start
    gap-3 p-3
    border
    transition-all duration-300 ease-out
    hover:-translate-y-2
    hover:shadow-xl
"
            style={{
                cursor: cursor,
                width: cardWidth ? `${cardWidth}px` : "fit-content",
                height: fheight === "auto" ? "auto" : `${fheight}${fhscale}`,
                backgroundColor: isLight ? "#ffffff" : "#202020",
                borderColor: isLight ? "#e5e5e5" : "#383838",
                boxShadow: isLight
                    ? "0px 5px 15px rgba(0,0,0,0.08)"
                    : "0px 5px 15px rgba(0,0,0,0.3)",
            }}
        >
            {/* Photograph */}
            <div className="w-fit relative overflow-visible">
                {imageURL ? (
                    <img
                        ref={imageRef}
                        src={imageURL}
                        alt={alternate ?? "Photograph"}
                        className="block w-auto h-auto object-contain"
                        style={{
                            maxWidth: `${maxWidth === "auto" ? maxWidth : maxWidth + mwscale}`,
                            maxHeight: `${maxHeight === "auto" ? maxHeight : maxHeight + mhscale}`
                        }}
                        onLoad={(e) => {
                            const img = e.currentTarget;

                            setImageDimensions({
                                width: img.naturalWidth,
                                height: img.naturalHeight,
                            });

                            setCardWidth(img.getBoundingClientRect().width + 24);
                        }}
                    />
                ) : (
                    <div className="w-40 min-h-40 flex flex-col items-center justify-center gap-3 text-neutral-400">
                        <span className="text-2xl">♡</span>
                        <span>{alternate ?? "A memory waiting to happen"}</span>
                    </div>
                )}
            </div>

            {/* Caption */}
            {showTitle && <div className="flex flex-col items-center w-full min-w-0 gap-2 px-1 pb-1">
                <p
                    className="text-sm font-semibold text-center whitespace-normal break-words w-full"
                    style={{
                        color: isLight ? "#333333" : "#f5f5f5",
                        overflowWrap: "anywhere"
                    }}
                >
                    {name || "Untitled Memory"}
                </p>

                <div className="flex gap-2 items-center flex-wrap justify-center">
                    <span
                        className="text-xs font-medium pt-1"
                        style={{
                            color: isLight ? "#a39482" : "#b4a496"
                        }}
                    >
                        {date}
                    </span>
                    <span
                        className="text-lg leading-none"
                        style={{
                            color: isLight ? "#e8a0a0" : "#d98c9c",
                        }}
                    >
                        ♡
                    </span>
                </div>
            </div>}
        </div>
    );
};

export default Photograph;