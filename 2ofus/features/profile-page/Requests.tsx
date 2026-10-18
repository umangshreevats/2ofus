"use client";
import Button from "@/components/commons/Button";
import Image from "next/image";

const Requests = ({ requestsSend, requestsReceived }: { requestsSend: any, requestsReceived: any }) => {



    return <div className="w-full grid grid-cols-1 grid-rows-[1fr_repeat(2, 2fr)] md:grid-rows-[1fr_2fr] md:grid-cols-2">

        <h3 className="w-full md:col-span-2 p-2 text-lg font-bold">
            Check your requests status
        </h3>

        <div className="w-full h-full p-2 flex gap-1 flex-col">
            <h3 className="text-md font-bold">
                Requests Send
            </h3>

            {requestsSend.map((req: any) => (
                <div className="w-full p-1 rounded-sm flex items-center gap-2 hover:shadow-[0px_0px_6px_var(--accent)]" key={req.id}>

                    <div className="w-10 h-10 rounded-full">
                        {(req.receiver.profile_image && req.receiver.profile_image.length > 0) ?
                            <Image src={req.receiver.profile_image} alt={`User-${req.receiver_id}`} className="object-cover rounded-full" /> :
                            <div className="w-full h-full rounded-full bg-accent text-white flex items-center justify-center">
                                {req.receiver.username[0]}
                            </div>}
                    </div>
                    <div className="h-full flex-flex-col">
                        <span className="font-medium">{req.receiver.firstname ?? ""} {req.receiver.lastname ?? ""}</span>
                        <span className="font-bold">@{req.receiver.username}</span>
                    </div>

                    <Button type="button" text="cancel" className="ml-5"/>
                </div>
            ))}
        </div>

        <div className="w-full h-full p-2 gap-1 flex-col">
            <h3 className="text-md font-bold">
                Requests Received
            </h3>

            {requestsReceived.map((req: any) => (
                <div className="w-full p-1 rounded-sm flex items-center gap-2 hover:shadow-[0px_0px_6px_var(--accent)]" key={req.id}>

                    <div className="w-10 h-10 rounded-full">
                        {(req.sender.profile_image && req.sender.profile_image.length > 0) ?
                            <Image src={req.sender.profile_image} alt={`User-${req.sender_id}`} className="object-cover rounded-full" /> :
                            <div className="w-full h-full rounded-full bg-accent text-white flex items-center justify-center">
                                {req.sender.username[0]}
                            </div>}
                    </div>
                    <div className="h-full flex-flex-col">
                        <span className="font-medium">{req.sender.firstname ?? ""} {req.sender.lastname ?? ""}</span>
                        <span className="font-bold">@{req.sender.username}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
}

export default Requests;