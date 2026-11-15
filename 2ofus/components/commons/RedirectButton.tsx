"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "./Button";


const RedirectButton = ({ text = "", redirectLink }: { text?: string, redirectLink?: string }) => {

    const router = useRouter();
    const handleClick = () => {
        if (redirectLink) {
            router.replace(redirectLink);
            router.refresh();
        } else {
            router.back();
            router.refresh();
        }
    };
    return <Button
        type="button"
        text={text}
        icon={ArrowLeft}
        onClick={handleClick}
    />
}

export default RedirectButton;