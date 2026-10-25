"use client";

import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/style.css";
import PlayfulInput from "./PlayfulInput";

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
    const [today, setToday] = useState<Date | undefined>(undefined);

    useEffect(() => {
        setToday(new Date());
    }, []);

    return (
        <div className="relative">
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

            {isOpen && today && (
                <div className="absolute z-50 mt-2 bg-background rounded-xl p-3 shadow-lg">
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
                </div>
            )}
        </div>
    );
}