"use client";
import { useThemeSettings } from "@/app/theme-provider";
import { useEffect, useState } from "react";

const Photograph = ({
    photograph = null,
    alternate,
    fwidth = "auto",
    fheight = "auto",
    fwscale = "px",
    fhscale = "px",
    name = "",
    url = "",
    date = "20XX/XX/XX"
}: {
    url?: string;
    photograph?: File | null;
    alternate?: string;
    fwidth?: "auto" | number;
    fheight?: "auto" | number;
    fwscale?: "px" | "rem" | "%";
    fhscale?: "px" | "rem" | "%";
    name?: string;
    date?: string;
}) => {
    const { theme } = useThemeSettings();
    const [imageURL, setImageURL] = useState<string | null>(null);
    const [imageDimensions, setImageDimensions] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {

        if (!photograph && url.length === 0) {
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
            className="
                group relative flex flex-col
                gap-3 p-3
                border
                transition-all duration-300 ease-out
                hover:-translate-y-2
                hover:shadow-xl
            "
            style={{
                width: fwidth === "auto" ? "auto" : `${fwidth}${fwscale}`,
                height: fheight === "auto" ? "auto" : `${fheight}${fhscale}`,
                backgroundColor: isLight ? "#ffffff" : "#202020",
                borderColor: isLight ? "#e5e5e5" : "#383838",
                boxShadow: isLight
                    ? "0px 5px 15px rgba(0,0,0,0.08)"
                    : "0px 5px 15px rgba(0,0,0,0.3)",
            }}
        >
            {/* Photograph */}
            <div className="w-full relative overflow-visible">
                {imageURL ? (
                    <img
                        src={imageURL}
                        alt={alternate ?? "Photograph"}
                        className="block w-auto h-auto object-contain"
                        style={{
                            maxWidth: "220px",
                            maxHeight: "220px",
                        }}
                        onLoad={(e) => {
                            const img = e.currentTarget;

                            setImageDimensions({
                                width: img.naturalWidth,
                                height: img.naturalHeight,
                            });
                        }}
                        onError={(e) => {
                            console.log("Failed URL:", e.currentTarget.src);
                        }}
                    />
                ) : (
                    <div className="w-full min-h-40 flex flex-col items-center justify-center gap-3 text-neutral-400">
                        <span className="text-2xl">♡</span>
                        <span>{alternate ?? "A memory waiting to happen"}</span>
                    </div>
                )}
            </div>

            {/* Caption */}
            <div className="flex items-center flex-wrap justify-between gap-2 px-1 pb-1">
                <p
                    className="text-sm font-semibold truncate"
                    style={{
                        color: isLight ? "#333333" : "#f5f5f5",
                    }}
                >
                    {name || "Untitled Memory"}
                </p>

                <div className="flex gap-2 items-center">
                    <span
                        className="text-xs font-medium whitespace-nowrap pt-1"
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
            </div>
        </div>
    );
};

export default Photograph;