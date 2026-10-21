"use client";
import { CommonScales } from "@/types/commonScale";
import { commonComponentStyles, backgroundTextStyles } from "@/data/style";
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
    author = "Mr. Annoymous",
    width = "auto",
    height = "auto",
    wscale = "px",
    hscale = "px",
    padding = 1,
    pscale = "rem"
}) => {

    const { theme } = useThemeSettings();
    return <div className="relative p-1 flex flex-col gap-5"
    style={{
        ...commonComponentStyles({ width, wscale, height, hscale, padding, pscale }),
        ...backgroundTextStyles(theme, true)
    }}>

        <div className="flex justify-between items-center">
            <h3 className="text-3xl text-primary-text font-bold">
                {title}
            </h3>

            <span className="font-medium">
                {date}
            </span>
        </div>

        <p className="font-medium text-md">
            {note}
        </p>

        <span className="absolute bottom-10 right-10">- {author}</span>
    </div>
}

export default Note;