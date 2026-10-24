
"use client";

const Headings = ({
    className = "",
    heading,
    paragraph = "",
}: {
    heading: string;
    paragraph?: string;
    className?: string;
}) => {
    return (
        <div className={`px-4 py-5 flex flex-col gap-2 ${className} ${!className.split(" ").some(cls => cls.startsWith("w-")) ? "w-full" : ""}`}>

            {/* Heading */}
            <h1 className="
                font-rubik
                text-2xl sm:text-3xl lg:text-4xl
                font-bold
                tracking-tight
                leading-tight
                text-primary-text
            ">
                {heading}
            </h1>

            {/* Divider */}
            {paragraph.trim().length > 0 && <div className="
                w-full
                border-b border-dashed
                border-primary-text/30
            " />}

            {/* Description */}
            {paragraph && (
                <p className="
                    font-comfortaa
                    font-normal
                    text-xs sm:text-sm lg:text-base
                    leading-relaxed
                    tracking-wide
                    text-primary-text/70
                    max-w-3xl
                    pt-1
                ">
                    {paragraph}
                </p>
            )}
        </div>
    );
};

export default Headings;
