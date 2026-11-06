"use client";

import { SetStateAction } from "react";
import Button from "./Button";
import { toast } from "sonner";

const Delete = ({ title, message, deleteFunction, setOpen, loading }: {
    title: string,
    message: string,
    deleteFunction: (...args: any[]) => Promise<void>,
    setOpen: React.Dispatch<SetStateAction<boolean>>,
    loading?: boolean
}) => {


    const handleDelete = async () => {

        try {

            if (loading === undefined) {
                setOpen(false);
            }
            await deleteFunction();
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                toast.error("An Error occured" + err.message);
            }
        }
    }

    return <div className="w-full sm:w-[400px] rounded-2xl bg-surface p-5 flex flex-col gap-5">
        <div className="w-full flex items-center justify-between">
            <h2 className="text-2xl font-rubik text-primary-text font-bold">
                {title}
            </h2>
        </div>

        <div className="w-full font-comfortaa text-secondary-text">
            {message}
        </div>

        <div className="w-full gap-5 flex">
            <Button type="button" onClick={() => setOpen(false)} text="Cancel" textColor="red" backgroundColor="surface" />
            <Button type="button" disabled={loading} text={loading ? "Deleting..." : `Delete`} onClick={handleDelete} textColor="white" backgroundColor="red" />
        </div>
    </div>
}

export default Delete;