"use client";
import Button from "@/components/commons/Button";
import { useEffect } from "react";
import { toast } from "sonner";


export default function HomeErrorPage({
    error,
    reset
}: {
    error: Error & { digest?: string },
    reset: () => void
}) {

    useEffect(() => {
        toast.error(error.message);
    }, []);
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <h1 className="text-3xl font-bold font-rubik">
                Something went wrong!
            </h1>

            <p className="text-secondary-text font-comfortaa">
                {error.message}
            </p>

            <Button type="submit" onClick={() => reset()} text="Try Again" />
        </div>
    );
}