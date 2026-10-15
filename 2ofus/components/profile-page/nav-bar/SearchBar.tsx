'use client';

import PlayfulButton from "@/components/commons/PlayfulButton";
import PlayfulInput from "@/components/commons/PlayfulInput";
import { Search } from 'lucide-react';
import { useState } from "react";


interface SearchBarProps {
    width?: "auto" | number;
    wScale?: "%" | "rem" | "px";
    padding?: number;
    pScale?: "%" | "rem" | "px";
}
const SearchBar: React.FC<SearchBarProps> = ({ width = "auto", wScale = "px", padding = 0.5, pScale = "rem" }) => {

    const [searchQuery, setSearchQuery] = useState("");

    return <div className="rounded-full"
        style={{
            width: width === "auto" ? "auto" : `${width}${wScale}`
        }}>

        <form
            style={{
                width: width === "auto" ? "auto" : `${width}${wScale}`
            }}>
            <label htmlFor="search-input"
                style={{
                    width: width === "auto" ? "auto" : `${width}${wScale}`
                }}>
                <div className="flex items-center gap-5"
                    style={{
                        width: width === "auto" ? "auto" : `${width}${wScale}`
                    }}>
                    <PlayfulInput
                        width={width === "auto" ? "auto" : 100}
                        wScale={width === "auto" ? "px" : "%"}
                        placeholder="Search Your Partner..."
                        id="search-input"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        text={searchQuery}
                        padding={padding}
                        pScale={pScale}
                        textAlign="start"
                    />
                    <div className="relative bottom-1">
                        <PlayfulButton type="submit" icon={Search} padding={padding} pScale={pScale} />
                    </div>
                </div>
            </label>
        </form>
    </div>
}


export default SearchBar;