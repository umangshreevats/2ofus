
"use client";

import { useAuth } from "@/app/auth-provider";
import { proposal } from "@/data/images";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
    addYears,
    intervalToDuration,
    isBefore,
    parseISO,
    startOfDay,
    format,
} from "date-fns";
import Headings from "@/components/commons/Headings";

const Aniversary = () => {
    const { coupleData } = useAuth();

    const [duration, setDuration] = useState({
        months: 0,
        days: 0,
    });

    useEffect(() => {
        if (!coupleData?.anniversary_date) return;

        const updateCountdown = () => {
            const today = startOfDay(new Date());

            const anniversaryDate = parseISO(
                coupleData.anniversary_date
            );

            let nextAnniversary = new Date(
                today.getFullYear(),
                anniversaryDate.getMonth(),
                anniversaryDate.getDate()
            );

            // Move to next year's anniversary if this year's has passed
            if (isBefore(nextAnniversary, today)) {
                nextAnniversary = addYears(nextAnniversary, 1);
            }

            const result = intervalToDuration({
                start: today,
                end: nextAnniversary,
            });

            setDuration({
                months: result.months ?? 0,
                days: result.days ?? 0,
            });
        };

        updateCountdown();

        const interval = setInterval(updateCountdown, 60000);

        return () => clearInterval(interval);
    }, [coupleData?.anniversary_date]);

    const formattedAnniversary = coupleData?.anniversary_date
        ? format(
            parseISO(coupleData.anniversary_date),
            "dd MMMM yyyy"
        )
        : "Not set";

    return (
        <div className="w-full flex flex-col rounded-md relative font-comfortaa">

            <Image
                src={proposal}
                alt="proposal"
                className="z-20 object-cover rounded-md"
            />

            <div className="w-full z-30 absolute top-0 h-1/3 text-white flex flex-col items-center">

                <Headings
                    heading="Our Together"
                    subheading={`Anniversary Date: ${formattedAnniversary}`}
                    paragraph="You'r special date, the date you become one"
                    headingColor="white"
                    paragraphColor="white"
                    subheadingColor="text-pink-500/70"
                />

                <div className="w-full flex items-center justify-center text-secondary-text p-2 sm:p-5">

                    {/* Months */}
                    <div className="flex flex-col items-center">
                        <span className="text-sm sm:text-3xl lg:text-5xl font-bold">
                            {duration.months}
                        </span>

                        <span className="text-xs sm:text-sm">
                            Months
                        </span>
                    </div>

                    {/* Days */}
                    <div className="flex flex-col items-center ml-10">
                        <span className="text-sm sm:text-3xl lg:text-5xl font-bold">
                            {duration.days}
                        </span>

                        <span className="text-xs sm:text-sm">
                            Days
                        </span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Aniversary;
