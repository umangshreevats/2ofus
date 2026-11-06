
"use client";

import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { useRef } from "react";
import Button from "./Button";

const XScaleScroller = ({ children }: { children: React.ReactNode }) => {
    const childRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        const container = childRef.current;
        if (!container) return;

        container.scrollBy({
            left: direction === "left" ? -300 : 300,
            behavior: "smooth",
        });
    };

    return (
        <div className="w-full min-w-0 flex items-center gap-3">
            {/* Left button: hidden on mobile */}
            <div className="hidden md:block shrink-0">
                <Button
                    type="button"
                    icon={ArrowLeftCircle}
                    text=""
                    onClick={() => scroll("left")}
                />
            </div>

            {/* Scrollable content */}
            <div
                ref={childRef}
                className="flex-1 min-w-0 overflow-x-auto"
                style={{
                    scrollbarWidth: "none",
                    WebkitOverflowScrolling: "touch",
                }}
            >
                {children}
            </div>

            {/* Right button: hidden on mobile */}
            <div className="hidden md:block shrink-0">
                <Button
                    type="button"
                    icon={ArrowRightCircle}
                    text=""
                    onClick={() => scroll("right")}
                />
            </div>
        </div>
    );
};

export default XScaleScroller;
