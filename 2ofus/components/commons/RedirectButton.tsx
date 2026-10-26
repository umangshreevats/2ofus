"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "./Button";


const RedirectButton = ({ text = "", redirectLink }: { text?: string, redirectLink: string }) => {

    const router = useRouter();

    return <Button
        type="button"
        text={text}
        icon={ArrowLeft}
        onClick={() => router.replace(redirectLink)}
    />
}

export default RedirectButton;