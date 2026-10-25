
"use client";

import { useAuth } from "@/app/auth-provider";
import PhotoFrame from "@/components/commons/PhotoFrame";
import Image from "next/image";
import { connectingHearts } from "@/data/images";

const BioPicture = () => {
    const { coupleData } = useAuth();

    if (!coupleData) return null;

    const partner1 = coupleData.partner_1;
    const partner2 = coupleData.partner_2;

    return (
        <section className="w-full flex justify-center py-8 md:py-14 px-3">
            <div className="relative flex w-full max-w-5xl items-center justify-center">

                {/* Connecting Hearts */}
                <div className="absolute inset-x-[10%] -translate-y-1/2 z-0 pointer-events-none">
                    <Image
                        src={connectingHearts}
                        alt=""
                        width={1000}
                        height={300}
                        priority
                        className="w-full h-auto object-contain"
                    />
                </div>

                <div className="relative z-10 flex w-full items-center justify-center gap-1 sm:gap-4 md:gap-10 lg:gap-14">

                    {/* Partner 1 */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-[85px] h-[85px] sm:w-[120px] sm:h-[120px] md:w-[160px] md:h-[160px] lg:w-[185px] lg:h-[185px]">
                            <PhotoFrame
                                width={100}
                                height={100}
                                wscale="%"
                                hscale="%"
                                round
                            >
                                {partner1?.profile_image && (
                                    <Image
                                        src={partner1.profile_image}
                                        alt={partner1.firstname || partner1.username}
                                        fill
                                        sizes="(max-width: 640px) 85px, (max-width: 768px) 120px, (max-width: 1024px) 160px, 185px"
                                        className="object-cover"
                                    />
                                )}
                            </PhotoFrame>
                        </div>

                        <div className="text-center">
                            <h3 className="font-bold text-[#14233D] text-sm sm:text-base md:text-lg">
                                {partner1?.firstname || partner1?.username}
                            </h3>
                            <p className="text-[10px] sm:text-xs md:text-sm text-[#8292AC]">
                                The better half
                            </p>
                        </div>
                    </div>

                    {/* Joint Couple Image */}
                    <div className="w-[105px] h-[105px] sm:w-[145px] sm:h-[145px] md:w-[195px] md:h-[195px] lg:w-[225px] lg:h-[225px] shrink-0">
                        <PhotoFrame
                            width={100}
                            height={100}
                            wscale="%"
                            hscale="%"
                            round
                        >
                            {coupleData.cover_image && (
                                <Image
                                    src={coupleData.cover_image}
                                    alt="Our together picture"
                                    fill
                                    sizes="(max-width: 640px) 105px, (max-width: 768px) 145px, (max-width: 1024px) 195px, 225px"
                                    className="object-cover"
                                />
                            )}
                        </PhotoFrame>
                    </div>

                    {/* Partner 2 */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-[85px] h-[85px] sm:w-[120px] sm:h-[120px] md:w-[160px] md:h-[160px] lg:w-[185px] lg:h-[185px]">
                            <PhotoFrame
                                width={100}
                                height={100}
                                wscale="%"
                                hscale="%"
                                round
                            >
                                {partner2?.profile_image && (
                                    <Image
                                        src={partner2.profile_image}
                                        alt={partner2.firstname || partner2.username}
                                        fill
                                        sizes="(max-width: 640px) 85px, (max-width: 768px) 120px, (max-width: 1024px) 160px, 185px"
                                        className="object-cover"
                                    />
                                )}
                            </PhotoFrame>
                        </div>

                        <div className="text-center">
                            <h3 className="font-bold text-[#14233D] text-sm sm:text-base md:text-lg">
                                {partner2?.firstname || partner2?.username}
                            </h3>
                            <p className="text-[10px] sm:text-xs md:text-sm text-[#8292AC]">
                                The brighter half
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default BioPicture;
