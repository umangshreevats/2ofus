import { LucideIcon } from "lucide-react";
import { Dispatch, SetStateAction, ReactNode } from "react";

export type Dropdown = {
    id: string | number;
    name: string;
    onClick?: (...args: any[]) => any | Promise<any>;
    icon?: LucideIcon;
    href?: string;
    danger?: boolean;
    close?: boolean;

    ddOptions?: Dropdown[];

    ddInfo?: {
        open: boolean;
        setOpen: Dispatch<SetStateAction<boolean>>;
        left?: number;
        top?: number;
        right?: number;
        bottom?: number;
        width?: "auto" | number;
        wscale?: "px" | "rem" | "%";
        iconPos?: string;
        innerHTML?: ReactNode;
        placement?: "left" | "right" | null;
        innerHTMLPortalRef?: React.RefObject<HTMLElement | null>;
    };
};