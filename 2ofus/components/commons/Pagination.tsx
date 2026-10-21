
"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    query?: string;
    numPage: number;
    numberOfPages: number;
    numbers: number[];
    url: string;
    q?: string[];
}

const Pagination = ({
    query,
    numPage,
    numberOfPages,
    numbers,
    url,
    q = []
}: PaginationProps) => {

    const currentPage = Number(numPage) || 0;

    const getPageUrl = (page: number) => {
        const params = new URLSearchParams();

        if (query) params.set("query", query);

        q.forEach((item) => {
            const [key, value] = item.split("=");
            params.set(key, value);
        });

        params.set("page", String(page));
        return `${url}?${params.toString()}`;
    };

    return (
        <div className="flex items-center justify-center gap-2 py-6">

            {/* Previous */}
            <Link
                href={getPageUrl(Math.max(1, currentPage - 1))}
                aria-disabled={currentPage === 1}
                className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200
                    ${currentPage === 1
                        ? "pointer-events-none opacity-40"
                        : "hover:bg-accent hover:text-white hover:border-accent"
                    }`}
            >
                <ChevronLeft size={18} />
            </Link>

            {/* Page Numbers */}
            {numbers.map((num) => (
                <Link
                    key={num}
                    href={getPageUrl(num)}
                    aria-current={currentPage === num ? "page" : undefined}
                    className={`flex h-10 min-w-10 items-center justify-center rounded-xl px-3 font-medium transition-all duration-200
                        ${currentPage === num
                            ? "bg-accent text-white shadow-md shadow-accent/25"
                            : "border border-transparent hover:border-accent/30 hover:bg-accent/10"
                        }`}
                >
                    {num}
                </Link>
            ))}

            {/* Next */}
            <Link
                href={getPageUrl(
                    Math.min(numberOfPages, currentPage + 1)
                )}
                aria-disabled={currentPage >= numberOfPages}
                className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200
                    ${currentPage >= numberOfPages
                        ? "pointer-events-none opacity-40"
                        : "hover:bg-accent hover:text-white hover:border-accent"
                    }`}
            >
                <ChevronRight size={18} />
            </Link>

        </div>
    );
};

export default Pagination;
