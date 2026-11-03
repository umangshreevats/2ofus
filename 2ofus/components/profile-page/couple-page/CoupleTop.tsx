"use client";
import { useAuth } from "@/app/auth-provider";
import Button from "@/components/commons/Button";
import Headings from "@/components/commons/Headings";
import { GalleryThumbnails, Settings } from "lucide-react";
import { useThemeSettings } from "@/app/theme-provider";
import { useRouter } from "next/navigation";
import BioPicture from "./BioPicture";
const CoupleTop = () => {

    const router = useRouter();
    const { theme } = useThemeSettings();
    const { coupleData } = useAuth();

    // Partner's names
    const finalCoupleOne = (coupleData.partner_1.firstname && coupleData.partner_1.firstname.length > 0) ?
        coupleData.partner_1.firstname : (coupleData.partner_1.username && coupleData.partner_1.username.length > 0) ?
            coupleData.partner_1.username : "Partner 1";

    const finalCoupleTwo = (coupleData.partner_2.firstname && coupleData.partner_2.firstname.length > 0) ?
        coupleData.partner_2.firstname : (coupleData.partner_2.username && coupleData.partner_2.username.length > 0) ?
            coupleData.partner_2.username : "Partner 2";


    // Final Heading for the page
    const finalHeading = (coupleData.couple_name && coupleData.couple_name.length > 0) ?
        coupleData.couple_name : `${finalCoupleOne}  & ${finalCoupleTwo}`;
    return (
        <div className="w-full flex flex-col-reverse justify-center p-5 border-b-2 border-b-primary-text border-dashed">

            <div className="flex flex-col gap-2">
                <Headings
                    heading={`${finalHeading} ❤️`}
                    subheading={finalHeading === coupleData.couple_name ? `${finalCoupleOne} & ${finalCoupleTwo}` : ""}
                    paragraph="A place for our memories, thoughts, and everything that makes us, us"
                />

                <div className="w-full flex gap-2">
                    <Button type="button"
                        backgroundColor="accent"
                        text="Edit our Profile"
                        icon={GalleryThumbnails}
                        hoverBackgroundColor={theme === "light" ? "white" : "black"}
                        hoverTextColor={theme === "light" ? "black" : "white"}
                        hoverEffect={true}
                        onClick={() => router.push("/home/my-couple/profile-edit")}
                    />
                    <Button type="button" backgroundColor="white" onClick={() => router.push("/home/settings")} text="Settings" textColor="black" icon={Settings} />
                </div>
            </div>

            {/*Profile Images and bio Images*/}
            <div className="p-5 max-w-full">
                <BioPicture />
            </div>
        </div>
    );
}

export default CoupleTop;