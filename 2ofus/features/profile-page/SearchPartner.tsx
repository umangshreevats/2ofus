"use client";

import SearchBar from "@/components/profile-page/nav-bar/SearchBar";
import Requests from "./Requests";
import Headings from "@/components/commons/Headings";
import useIsMobile from "@/app/hooks/useIsMobile";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/app/notification-provider";
import { useEffect } from "react";
import { toast } from "sonner";

const SearchPartner = ({ requestsSend, requestsReceived }: { requestsSend: any, requestsReceived: any }) => {

    const isMobile = useIsMobile();
    const router = useRouter();
    const { newCouple, setNewCouple } = useNotifications();

    useEffect(() => {
        if (!newCouple) return;

        toast.info("Your coupling request have been accepted!");
        router.replace("/home/my-couple");
        router.refresh();
        setNewCouple(false);

    }, [newCouple, router, setNewCouple]);


    return <div className="parent-box">
        <div className="child-box p-10 flex flex-col items-center gap-10">

            <Headings
                heading="Your story starts with two"
                paragraph="Find your person and create your own little world together."
            />

            <SearchBar width={100} padding={isMobile ? 0.5 : 1.5} wScale="%" />
            <Requests requestsSend={requestsSend} requestsReceived={requestsReceived} />
        </div>
    </div>
}


export default SearchPartner;
