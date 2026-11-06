"use client";

import SearchBar from "@/components/profile-page/nav-bar/SearchBar";
import Requests from "./Requests";
import Headings from "@/components/commons/Headings";
import useIsMobile from "@/app/hooks/useIsMobile";

const SearchPartner = ({ requestsSend, requestsReceived }: { requestsSend: any, requestsReceived: any }) => {

    const isMobile = useIsMobile();
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
