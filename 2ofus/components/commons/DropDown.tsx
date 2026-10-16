"use client";
import { SetStateAction, useEffect, useRef, useState } from "react";

const DropDown = ({
    children,
    dropDownOptions = [],
    left,
    top,
    bottom,
    right,
    open,
    width = "auto",
    wScale = "px",
    iconPos = "center",
    setOpen,
    innerHTML = null
}: {
    children: React.ReactNode,
    dropDownOptions?: any[],
    left?: number,
    top?: number,
    right?: number,
    bottom?: number,
    width?: "auto" | number,
    wScale?: "px" | "rem" | "%",
    iconPos?: string,
    open: boolean,
    setOpen: React.Dispatch<SetStateAction<boolean>>;
    innerHTML?: React.ReactNode;
}) => {

    const [leftPos, setLeftPos] = useState<number>(0);
    const [topPos, setTopPos] = useState<number>(0);
    const [rightPos, setRightPos] = useState<number>(0);
    const [bottomPos, setBottomPos] = useState<number>(0);
    const iconRef = useRef<HTMLDivElement | null>(null);
    const parentRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        const setDropDownPos = () => {

            if (!iconRef.current) {
                return;
            }

            const rect = iconRef.current.getBoundingClientRect();
            const parentRect = parentRef.current?.getBoundingClientRect();

            if (!parentRect) return;

            setLeftPos(rect.left - parentRect.left + (left ?? 0));
            setTopPos(rect.bottom - parentRect.top + (top ?? 0));
            setRightPos(rect.right - parentRect.right + (right ?? 0));
            setBottomPos(rect.top - parentRect.bottom + (bottom ?? 0));
        }
        setDropDownPos();
    }, [])

    return <div ref={parentRef} className="relative"
    style={{
        width: `${width === "auto" ? width : width+wScale}`,
        display: "flex",
        justifyContent: iconPos,
        alignItems: "center"
    }}>
        <div ref={iconRef} onClick={() => setOpen(prev => !prev)} className="cursor-pointer">
            {children}
        </div>

        {innerHTML ? <div className={`absolute ${open ? "flex" : "hidden"} rounded-sm shadow-[0px_0px_6px_var(--accent)]`}
        style={{
                left: (left && left > 0) ? `${leftPos}px` : "",
                top: (top && top > 0) ? `${topPos}px` : "",
                right: (right && right > 0) ? `${rightPos}px` : "",
                bottom: (bottom && bottom > 0) ? `${bottomPos}px` : ""
            }}>{innerHTML}
        </div> : <ul
            className={`absolute ${open ? "flex" : "hidden"} rounded-sm shadow-[0px_0px_6px_var(--accent)] 
        flex-col gap-2 p-2 bg-background`}
            style={{
                left: (left && left > 0) ? `${leftPos}px` : "",
                top: (top && top > 0) ? `${topPos}px` : "",
                right: (right && right > 0) ? `${rightPos}px` : "",
                bottom: (bottom && bottom > 0) ? `${bottomPos}px` : ""
            }}>
            {dropDownOptions.map((opt, i) => (
                <li key={opt?.id ?? i} onClick={() => setOpen(false)} className="w-full p-2">
                    {opt.name}
                </li>
            ))}
        </ul>}
    </div>
}

export default DropDown;