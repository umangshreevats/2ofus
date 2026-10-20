"use client";

import Image from "next/image";
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
}: {
    photograph?: File | null;
    alternate?: string;
    fwidth?: "auto" | number;
    fheight?: "auto" | number;
    fwscale?: "px" | "rem" | "%";
    fhscale?: "px" | "rem" | "%";
    name?: string;
}) => {
    const { theme } = useThemeSettings();
    const [imageURL, setImageURL] = useState<string | null>(null);

    useEffect(() => {
        if (!photograph) {
            setImageURL(null);
            return;
        }

        const url = URL.createObjectURL(photograph);
        setImageURL(url);

        return () => URL.revokeObjectURL(url);
    }, [photograph]);

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
            <div
                className="
                    relative w-full h-full min-h-40
                    overflow-hidden
                    bg-neutral-100 dark:bg-neutral-900
                "
            >
                {imageURL ? (
                    <>
                        <Image
                            src={imageURL}
                            alt={alternate ?? "Photograph"}
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            className="
                                object-cover
                                transition-transform duration-700
                                group-hover:scale-105
                            "
                            unoptimized
                        />

                        <div className="
                            absolute inset-0
                            bg-black/0
                            group-hover:bg-black/5
                            transition-colors duration-300
                        " />
                    </>
                ) : (
                    <div className="
                        w-full h-full min-h-40
                        flex flex-col items-center justify-center
                        gap-3 text-neutral-400
                    ">
                        <div className="
                            w-12 h-12 rounded-full
                            border border-dashed border-current
                            flex items-center justify-center
                        ">
                            <span className="text-2xl">♡</span>
                        </div>

                        <span className="text-xs font-medium tracking-wide">
                            {alternate ?? "A memory waiting to happen"}
                        </span>
                    </div>
                )}
            </div>

            {/* Caption */}
            <div className="flex items-center justify-between gap-2 px-1 pb-1">
                <p
                    className="text-sm font-semibold truncate"
                    style={{
                        color: isLight ? "#333333" : "#f5f5f5",
                    }}
                >
                    {name || "Untitled Memory"}
                </p>

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
    );
};

export default Photograph;