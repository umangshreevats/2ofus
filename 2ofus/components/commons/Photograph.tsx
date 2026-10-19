
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
}: {
    photograph?: File | null;
    alternate?: string;
    fwidth?: "auto" | number;
    fheight?: "auto" | number;
    fwscale?: "px" | "rem" | "%";
    fhscale?: "px" | "rem" | "%";
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

    return (
        <div
            className="border p-3"
            style={{
                width: fwidth === "auto"
                    ? "auto"
                    : `${fwidth}${fwscale}`,

                height: fheight === "auto"
                    ? "auto"
                    : `${fheight}${fhscale}`,

                backgroundColor: theme === "light" ? "white" : "black",

                boxShadow: "-6px 6px 0px 0px rgba(0, 0, 0, 0.2)",
            }}
        >
            <div className="relative w-full h-full overflow-hidden">

                {imageURL ? (
                    <Image
                        src={imageURL}
                        alt={alternate ?? "Photograph"}
                        fill
                        sizes="(max-width: 768px) 100vw, 1000px"
                        className="object-cover"
                        unoptimized
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center font-light text-secondary-text">
                        {alternate ?? "No photo to show"}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Photograph;