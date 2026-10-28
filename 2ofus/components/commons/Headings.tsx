
"use client";

const Headings = ({
    className = "",
    heading,
    subheading,
    paragraph = "",
    headingColor = ""
}: {
    heading: string;
    subheading?: string;
    paragraph?: string;
    className?: string;
    headingColor?: string;
}) => {
    return (
        <div className={`px-4 py-5 flex flex-col gap-2 ${className} ${!className.split(" ").some(cls => cls.startsWith("w-")) ? "w-full" : ""}`}>

            {/* Heading */}
            <h1 className={`
                font-rubik
                text-2xl sm:text-3xl lg:text-4xl
                font-bold
                tracking-tight
                leading-tight
                ${headingColor.length > 0 ? headingColor : "text-primary-text"}
            `}>
                {heading}
            </h1>

            {paragraph && paragraph.trim().length > 0 && <h2 className="
            font-rubik
            text-md sm:text-lg
            font-bold
            tracking-tight
                leading-tight
                text-secondary-text
            ">
                {subheading}
            </h2>}

                {/* Divider */}
                {paragraph && paragraph.trim().length > 0 && <div className="
                w-full
                border-b border-dashed
                border-primary-text/30
            " />}

                {/* Description */}
                {paragraph && paragraph.trim().length > 0 && (
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
