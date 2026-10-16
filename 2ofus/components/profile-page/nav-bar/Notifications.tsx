"use client";

import Button from "@/components/commons/Button";



const Notifications = () => {


    return <div className="w-[300px] p-5 rounded-sm bg-background">

        <h3 className="w-full rounded-t-sm border-b border-b-solid border-b-primary-text text-lg font-bold">
            Notifications
        </h3>

        <ul className="w-full flex flex-col gap-2 max-h-[500px] rounded-b-sm overflow-scroll" style={{ scrollbarWidth: "none" }}>

        </ul>
        <Button type="button" text="Load More" />
    </div>
}

export default Notifications;