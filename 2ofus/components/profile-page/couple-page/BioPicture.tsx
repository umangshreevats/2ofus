
"use client";

import { useAuth } from "@/app/auth-provider";
import PhotoFrame from "@/components/commons/PhotoFrame";
import Image from "next/image";

const BioPicture = () => {
    const { coupleData } = useAuth();

    if (!coupleData) return null;

    const partner1 = coupleData.partner_1;
    const partner2 = coupleData.partner_2;

    return (
        <section className="flex justify-center py-8 md:py-12">
            <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-12">

                {/* Partner 1 */}
                <div className="flex flex-col items-center gap-2">
                    <PhotoFrame
                        width={130}
                        height={130}
                        wscale="px"
                        hscale="px"
                        round
                    >
                        {partner1?.profile_image ? (
                            <Image
                                src={partner1.profile_image}
                                alt={partner1.firstname || partner1.username}
                                fill
                                sizes="130px"
                                className="object-cover"
                            />
                        ) : null}
                    </PhotoFrame>

                    <div className="text-center">
                        <h3 className="font-bold text-[#14233D] text-base md:text-lg">
                            {partner1?.firstname || partner1?.username}
                        </h3>
                        <p className="text-xs md:text-sm text-[#8292AC]">
                            The better half
                        </p>
                    </div>
                </div>

                {/* Joint Couple Image */}
                <PhotoFrame
                    width={160}
                    height={160}
                    wscale="px"
                    hscale="px"
                    round
                >
                    {coupleData.cover_image ? (
                        <Image
                            src={coupleData.cover_image}
                            alt="Our together picture"
                            fill
                            sizes="160px"
                            className="object-cover"
                        />
                    ) : null}
                </PhotoFrame>

                {/* Partner 2 */}
                <div className="flex flex-col items-center gap-2">
                    <PhotoFrame
                        width={130}
                        height={130}
                        wscale="px"
                        hscale="px"
                        round
                    >
                        {partner2?.profile_image ? (
                            <Image
                                src={partner2.profile_image}
                                alt={partner2.firstname || partner2.username}
                                fill
                                sizes="130px"
                                className="object-cover"
                            />
                        ) : null}
                    </PhotoFrame>

                    <div className="text-center">
                        <h3 className="font-bold text-[#14233D] text-base md:text-lg">
                            {partner2?.firstname || partner2?.username}
                        </h3>
                        <p className="text-xs md:text-sm text-[#8292AC]">
                            The brighter half
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default BioPicture;
