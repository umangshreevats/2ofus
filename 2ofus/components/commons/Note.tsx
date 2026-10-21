
"use client";

import { CommonScales } from "@/types/commonScale";
import { commonComponentStyles } from "@/data/style";
import { useThemeSettings } from "@/app/theme-provider";

interface NoteCommon {
    title?: string;
    note?: string;
    date?: string;
    author?: string;
}

type NoteProps = NoteCommon & CommonScales;

const Note: React.FC<NoteProps> = ({
    title = "A love letter",
    note = "A love letter",
    date = "XX/XX/20XX",
    author = "Mr. Anonymous",
    width = "auto",
    height = "auto",
    wscale = "px",
    hscale = "px",
    padding = 1.5,
    pscale = "rem"
}) => {
    const { theme } = useThemeSettings();
    const isLight = theme === "light";

    return (
        <article
            className="
                relative flex flex-col
                min-h-64
                rounded-sm
                border
                overflow-hidden
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-xl
            "
            style={{
                ...commonComponentStyles({
                    width,
                    wscale,
                    height,
                    hscale,
                    padding,
                    pscale
                }),
                backgroundColor: isLight ? "#fffdf5" : "#292725",
                borderColor: isLight ? "#e8dfca" : "#49413c",
                boxShadow: isLight
                    ? "0 6px 20px rgba(90, 70, 40, 0.10)"
                    : "0 6px 20px rgba(0, 0, 0, 0.25)",
                color: isLight ? "#514638" : "#e9dfd1"
            }}
        >
            {/* Decorative top border */}
            <div
                className="absolute top-0 left-0 w-full h-1"
                style={{
                    backgroundColor: isLight ? "#d9a5a5" : "#a8757d"
                }}
            />

            {/* Header */}
            <header className="flex items-start justify-between gap-3 pb-4 border-b"
                style={{
                    borderColor: isLight ? "#e9dfd5" : "#49413c"
                }}
            >
                <div className="min-w-0">
                    <span
                        className="block text-xs uppercase tracking-[0.25em] mb-2"
                        style={{
                            color: isLight ? "#b68b83" : "#c28e94"
                        }}
                    >
                        A little memory
                    </span>

                    <h3
                        className="text-xl sm:text-2xl font-serif font-semibold break-words"
                        style={{
                            color: isLight ? "#554238" : "#f0dfd2"
                        }}
                    >
                        {title}
                    </h3>
                </div>

                <span
                    className="text-xs font-medium whitespace-nowrap pt-1"
                    style={{
                        color: isLight ? "#a39482" : "#b4a496"
                    }}
                >
                    {date}
                </span>
            </header>

            {/* Note content */}
            <div className="flex-1 py-5">
                <p
                    className="text-sm sm:text-base leading-8 whitespace-pre-wrap break-words font-serif"
                    style={{
                        color: isLight ? "#665849" : "#d8cabb"
                    }}
                >
                    {note}
                </p>
            </div>

            {/* Footer */}
            <footer
                className="flex items-center justify-between gap-3 pt-3 border-t mt-auto"
                style={{
                    borderColor: isLight ? "#e9dfd5" : "#49413c"
                }}
            >
                <span
                    className="text-xs italic"
                    style={{
                        color: isLight ? "#a39482" : "#b4a496"
                    }}
                >
                    Written with love
                </span>

                <span
                    className="text-sm font-serif italic font-semibold truncate"
                    style={{
                        color: isLight ? "#a66f75" : "#d99ba4"
                    }}
                >
                    — {author}
                </span>
            </footer>

            {/* Decorative heart */}
            <span
                className="absolute top-3 right-3 text-sm opacity-30 pointer-events-none"
                style={{
                    color: isLight ? "#bd777d" : "#e1a0a6"
                }}
            >
                ♡
            </span>
        </article>
    );
};

export default Note;
