"use client";
import { SetStateAction, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { Dropdown } from "@/types/dropdown";

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
    innerHTML = null,
    innerHTMLPortalRef,
    placement = null
}: {
    children: React.ReactNode,
    dropDownOptions?: Dropdown[],
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
    placement?: "left" | "right" | null;
    innerHTMLPortalRef?: React.RefObject<HTMLElement | null>;
}) => {

    if (open == null && setOpen == null) {
        return <>{children}</>;
    }
    const [leftPos, setLeftPos] = useState<number>(0);
    const [topPos, setTopPos] = useState<number>(0);
    const [rightPos, setRightPos] = useState<number>(0);
    const [bottomPos, setBottomPos] = useState<number>(0);
    const iconRef = useRef<HTMLDivElement | null>(null);
    const parentRef = useRef<HTMLDivElement | null>(null);
    const portalTarget = innerHTMLPortalRef?.current ?? parentRef.current;

    const closeDropDown = () => setOpen?.(false);
    const handleClick = async (callback?: () => Promise<void>, close?: undefined | boolean) => {
        await callback?.();
        if (close === undefined || close === true) {
            closeDropDown();
        }
    };
    useEffect(() => {
        if (!open) return;

        const setDropDownPos = () => {
            if (!iconRef.current || !parentRef.current) return;

            const rect = iconRef.current.getBoundingClientRect();
            const parentRect = parentRef.current.getBoundingClientRect();

            setLeftPos(rect.left - parentRect.left + (left ?? 0));
            setTopPos(rect.bottom - parentRect.top + (top ?? 0));
            setRightPos(rect.right - parentRect.right + (right ?? 0));
            setBottomPos(rect.top - parentRect.bottom + (bottom ?? 0));
        };

        setDropDownPos();
    }, [open, left, top, right, bottom]);


    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                parentRef.current &&
                !parentRef.current.contains(event.target as Node)
            ) {
                closeDropDown();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    return (
        <div
            ref={parentRef}
            className="relative"
            style={{
                width: `${width === "auto" ? width : width + wScale}`,
                display: "flex",
                justifyContent: iconPos,
                alignItems: "center"
            }}
        >
            <div
                ref={iconRef}
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen?.(prev => !prev);
                }}
                className="w-full cursor-pointer"
            >
                {children}
            </div>

            {!innerHTML ? (
                <ul
                    className={`absolute ${open ? "flex" : "hidden"} z-[999] min-w-full rounded-sm shadow-[0px_0px_6px_var(--accent)] flex-col gap-2 p-2 bg-background`}
                    style={(placement && placement === "left")
                        ? {
                            right: "100%",
                            top: 0,
                        }
                        : {
                            left: left !== undefined ? `${leftPos}px` : undefined,
                            top: top !== undefined ? `${topPos}px` : undefined,
                            right: right !== undefined ? `${rightPos}px` : undefined,
                            bottom: bottom !== undefined ? `${bottomPos}px` : undefined,
                        }}
                >
                    {dropDownOptions.map((opt) => {
                        const Icon = opt.icon;

                        const commonClass = `
                            w-full p-2 cursor-pointer flex items-center gap-2
                            rounded-sm hover:bg-accent/10 transition-colors
                            ${opt.danger ? "text-red-600" : "text-primary-text"}
                        `;

                        const menuItem = opt.href ? (
                            <Link
                                href={opt.href}
                                onClick={closeDropDown}
                                className={commonClass}
                            >
                                {Icon && <Icon size={17} />}
                                {opt.name}
                            </Link>
                        ) : (
                            <button
                                type="button"
                                onClick={() => handleClick(opt.onClick, opt.close)}
                                className={commonClass}
                            >
                                {Icon && <Icon size={17} />}
                                {opt.name}
                            </button>
                        );

                        return (
                            <li key={opt.id} className="w-full">
                                {opt.ddInfo &&
                                    Object.keys(opt.ddInfo).length > 0 ? (
                                    <DropDown
                                        open={opt.ddInfo.open}
                                        setOpen={opt.ddInfo.setOpen}
                                        dropDownOptions={opt.ddOptions}
                                        left={opt.ddInfo.left ?? 0}
                                        top={opt.ddInfo.top ?? 0}
                                        right={opt.ddInfo.right ?? 0}
                                        bottom={opt.ddInfo.bottom ?? 0}
                                        width={opt.ddInfo.width ?? "auto"}
                                        wScale={opt.ddInfo.wscale ?? "px"}
                                        iconPos={opt.ddInfo.iconPos ?? "center"}
                                        innerHTML={opt.ddInfo.innerHTML ?? null}
                                        placement="left"
                                    >
                                        {menuItem}
                                    </DropDown>
                                ) : (
                                    menuItem
                                )}
                            </li>
                        );
                    })}
                </ul>
            ) : portalTarget ? createPortal(
                <div
                    className={`absolute ${open ? "flex" : "hidden"} min-w-full bg-surface rounded-sm z-[999] shadow-[0px_0px_6px_var(--accent)]`}
                    style={(placement && placement === "left")
                        ? {
                            right: "100%",
                            top: 0,
                        }
                        : {
                            left: left !== undefined ? `${leftPos}px` : undefined,
                            top: top !== undefined ? `${topPos}px` : undefined,
                            right: right !== undefined ? `${rightPos}px` : undefined,
                            bottom: bottom !== undefined ? `${bottomPos}px` : undefined,
                        }}
                >
                    {innerHTML}
                </div>, portalTarget
            ) : (<div
                className={`absolute ${open ? "flex" : "hidden"} min-w-full bg-surface rounded-sm z-[999] shadow-[0px_0px_6px_var(--accent)]`}
                style={(placement && placement === "left")
                    ? {
                        right: "100%",
                        top: 0,
                    }
                    : {
                        left: left !== undefined ? `${leftPos}px` : undefined,
                        top: top !== undefined ? `${topPos}px` : undefined,
                        right: right !== undefined ? `${rightPos}px` : undefined,
                        bottom: bottom !== undefined ? `${bottomPos}px` : undefined,
                    }}
            >
                {innerHTML}
            </div>)
            }
        </div >
    );
}

export default DropDown;