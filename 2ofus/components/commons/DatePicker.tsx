"use client";

import { useState, useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/style.css";
import PlayfulInput from "./PlayfulInput";
import { createPortal } from "react-dom";

interface DatePickerProps {
    value: Date | null;
    onChange: (date: Date | null) => void;
    id: string;
    placeholder?: string;
}

export default function DatePicker({
    value,
    onChange,
    id,
    placeholder
}: DatePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [today, setToday] = useState<Date | undefined>();
    const [position, setPosition] = useState({ top: 0, left: 0 });

    const inputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setToday(new Date());
    }, []);

    const updatePosition = () => {
        if (!inputRef.current) return;

        const rect = inputRef.current.getBoundingClientRect();

        setPosition({
            top: rect.bottom + 8,
            left: rect.left
        });
    };

    useEffect(() => {
        if (!isOpen) return;

        updatePosition();

        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition, true);

        return () => {
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition, true);
        };
    }, [isOpen]);

    return (
        <>
            <div ref={inputRef}>
                <PlayfulInput
                    placeholder={placeholder || "Enter Something"}
                    id={id}
                    width={100}
                    textAlign="start"
                    wScale="%"
                    text={value ? format(value, "dd MMMM yyyy") : ""}
                    onClick={() => setIsOpen(prev => !prev)}
                    onChange={() => { }}
                />
            </div>

            {isOpen && today && createPortal(
                <div
                    className="z-[9999] fixed bg-background rounded-xl p-3 shadow-lg"
                    style={{
                        top: position.top,
                        left: position.left
                    }}
                >
                    <DayPicker
                        mode="single"
                        selected={value ?? undefined}
                        onSelect={(date) => {
                            onChange(date ?? null);
                            setIsOpen(false);
                        }}
                        captionLayout="dropdown"
                        startMonth={new Date(1950, 0)}
                        endMonth={today}
                        disabled={{ after: today }}
                    />
                </div>,
                document.body
            )}
        </>
    );
}