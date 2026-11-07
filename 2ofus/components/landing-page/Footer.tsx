
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { headerFooterMain } from "@/data/routingBehaviors";
import { footer, footerDark } from "@/data/images";
import { useThemeSettings } from "@/app/theme-provider";
import { appName } from "@/data/info";

const Footer = () => {
    const { theme } = useThemeSettings();
    const pathname = usePathname();

    const matchedRoute = Object.entries(headerFooterMain)
        .sort(([a], [b]) => b.length - a.length)
        .find(([route]) =>
            route === "/"
                ? pathname === "/"
                : pathname === route || pathname.startsWith(`${route}/`)
        );

    const show = matchedRoute?.[1].show ?? true;

    if (!show) return null;

    const footerImage = theme === "dark" ? footerDark : footer;

    const exploreLinks = [
        { title: "Our Story", href: "/home/my-couple" },
        { title: "Tell and Get", href: "/home/my-couple/tell-and-get" },
        { title: "Albums", href: "/home/my-couple/album" },
    ];

    const connectLinks = [
        { title: "Tell & Get", href: "/home/my-couple/tell-and-get" },
        { title: "Couple Quiz", href: "/home/my-couple/tell-and-get" },
    ];

    const informationLinks = [
        { title: "About 2ofus", href: "/about" },
        { title: "Privacy Policy", href: "/privacy-policy" },
        { title: "Terms of Service", href: "/terms-of-service" },
    ];

    const FooterLinks = ({
        title,
        links,
    }: {
        title: string;
        links: { title: string; href: string }[];
    }) => (
        <div className="flex flex-col gap-4">
            <h5 className="text-base sm:text-lg font-bold text-primary-text">
                {title}
            </h5>

            <ul className="flex flex-col gap-3">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className="text-sm sm:text-base text-primary-text/75 hover:text-accent transition-colors duration-200"
                        >
                            {link.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <footer className="w-full overflow-hidden">

            {/* Curved top */}
            <div className="w-full h-16 sm:h-20 bg-surface">
                <div className="w-full h-full bg-background rounded-b-[50%]" />
            </div>

            {/* Main footer */}
            <div className="parent-box bg-surface bg-cover bg-center bg-no-repeat"
            >

                <div
                    className="child-box relative w-full min-h-[480px] px-5 sm:px-8 lg:px-10 py-10 sm:py-12"
                >

                    {/* Navigation */}
                    <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-10 sm:gap-6 lg:gap-10">

                        <div className="w-full max-sm:col-span-2 text-primary-text font-rubik text-5xl font-bold">
                            {appName}
                        </div>

                        <FooterLinks
                            title="Explore"
                            links={exploreLinks}
                        />

                        <FooterLinks
                            title="Connect"
                            links={connectLinks}
                        />

                        <FooterLinks
                            title="Information"
                            links={informationLinks}
                        />

                    </div>

                    {/* Bottom section */}
                    <div className="relative z-10 mt-24 sm:mt-32 lg:mt-36 pt-5">

                        <p className="text-center text-xs sm:text-sm text-primary-text/75">
                            Your memories are yours. Always.
                        </p>

                        <p className="text-center text-xs sm:text-sm text-primary-text/75 mt-3">
                            Made with ♥ for the moments that matter.
                        </p>

                        <p className="text-center text-xs text-primary-text/60 mt-3">
                            © {new Date().getFullYear()} {appName}. All rights reserved.
                        </p>

                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
