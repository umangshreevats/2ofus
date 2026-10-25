"use client";
import { useAuth } from "@/app/auth-provider";
import { proposal } from "@/data/images";
import Image from "next/image";
import { useState, useEffect } from "react";
import { intervalToDuration } from "date-fns";

const Aniversary = () => {

    const { coupleData } = useAuth();

    const [duration, setDuration] = useState({
        years: 0,
        months: 0,
        days: 0,
    });

    useEffect(() => {
        if (!coupleData?.anniversary_date) return;

        const updateDuration = () => {
            const startDate = new Date(
                `${coupleData.anniversary_date}T00:00:00`
            );
            const today = new Date();

            const result = intervalToDuration({
                start: startDate,
                end: today,
            });

            setDuration({
                years: result.years ?? 0,
                months: result.months ?? 0,
                days: result.days ?? 0,
            });
        };

        updateDuration();
        const interval = setInterval(updateDuration, 1000);

        return () => clearInterval(interval);
    }, [coupleData?.anniversary_date]);


    return <div className="w-full flex flex-col rounded-md relative font-comfortaa">
        <Image src={proposal} alt="proposal" className="z-20 object-cover rounded-md" />

        <div className="z-30 absolute top-0 right-0 text-white w-2/3 h-full flex flex-col items-center">
            <p className="w-full text-sm sm:text-md lg:text-2xl mt-[23%] sm:mt-[25%] text-center">
                Our Forever ❤️
            </p>

            <div className="w-full flex items-center justify-center justify-evenly mt-5 md:mt-24 text-secondary-text">
                <div className="flex flex-col ml-8 sm:ml-20 items-center">
                    <span className="text-sm sm:text-3xl lg:text-5xl font-bold">
                        {duration.years}
                    </span>
                    <span className="text-xs sm:text-sm">Years</span>
                </div>

                <div className="flex flex-col items-center">
                    <span className="text-sm sm:text-3xl lg:text-5xl font-bold">
                        {duration.months}
                    </span>
                    <span className="text-xs sm:text-sm">Months</span>
                </div>

                <div className="flex flex-col items-center">
                    <span className="text-sm sm:text-3xl lg:text-5xl font-bold">
                        {duration.days}
                    </span>
                    <span className="text-xs sm:text-sm">Days</span>
                </div>
            </div>
        </div>
    </div>
}


export default Aniversary;