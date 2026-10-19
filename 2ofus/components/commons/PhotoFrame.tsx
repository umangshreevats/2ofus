
"use client";

import React, { ReactNode } from "react";

interface PhotoFrameProps {
    width: number;
    height: number;
    wscale?: "px" | "%" | "rem";
    hscale?: "px" | "%" | "rem";
    children?: ReactNode;
    round?: boolean;
}

const PhotoFrame: React.FC<PhotoFrameProps> = ({
    width,
    height,
    wscale = "px",
    hscale = "px",
    children,
    round = false
}) => {
    return (
        <div
            className={`relative flex items-center justify-center ${round ? "rounded-full" : "rounded-md"}`}
            style={{
                width: `${width}${wscale}`,
                height: `${height}${hscale}`,
                padding: "3%",
                boxSizing: "border-box",
                background: `
                    linear-gradient(
                        135deg,
                        #d9b77e 0%,
                        #a77a43 25%,
                        #e4c795 50%,
                        #9c6e3b 75%,
                        #d9b77e 100%
                    )
                `,
                boxShadow: `
                    0 8px 20px rgba(0,0,0,0.20),
                    inset 0 2px 3px rgba(255,255,255,0.5),
                    inset 0 -3px 5px rgba(0,0,0,0.25)
                `,
            }}
        >
            {/* Inner decorative border */}
            <div
                className={`w-full h-full ${round ? "rounded-full" : "rounded-sm"} p-[3%]`}
                style={{
                    background: "linear-gradient(145deg, #fff8e9, #d8c7a7)",
                    boxShadow: "inset 0 1px 5px rgba(0,0,0,0.15)",
                }}
            >
                {/* Photograph */}
                <div
                    className={`relative w-full h-full overflow-hidden ${round ? "rounded-full" : "rounded-[2px]"
                        } bg-background`}
                    style={{
                        boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PhotoFrame;
