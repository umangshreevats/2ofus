"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "./Button";


const RedirectButton = ({ text = "", redirectLink }: { text?: string, redirectLink?: string }) => {

    const router = useRouter();

    return <Button
        type="button"
        text={text}
        icon={ArrowLeft}
        onClick={() => {
            redirectLink && redirectLink.length > 0 ? router.replace(redirectLink) : router.back();
            router.refresh();
        }}
    />
}

export default RedirectButton;