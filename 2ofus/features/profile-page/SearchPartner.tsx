"use client";

import SearchBar from "@/components/profile-page/nav-bar/SearchBar";
import Link from "next/link";

const SearchPartner = () => {


    return <div className="parent-box">
        <div className="child-box p-10 flex flex-col items-center gap-10">

            <div className="flex flex-col w-full gap-5">
                <h1 className="w-full text-3xl font-bold">Your Story starts with two!</h1>
                <p className="w-full text-md font-medium">Find your person and create your own little world together.</p>
            </div>
            <SearchBar width={100} padding={1.5} wScale="%" />

            <div className="flex flex-col items-center gap-5">
                <p className="text-md font-medium text-secondary-text">Already received an invitation?</p>
                <Link href="/home" className="text-accent">View invitations →</Link>
            </div>
        </div>
    </div>
}


export default SearchPartner;
