"use client";
import Button from "@/components/commons/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";


/*
This component is to display current user's requests received and the requests
send to connect with another user, right now it only shows the past current 3 users within the two categories
rather than showing all the requests*/
const Requests = ({ requestsSend, requestsReceived }: { requestsSend: any, requestsReceived: any }) => {

    const router = useRouter();

    const [reqSend, setReqSend] = useState(requestsSend);
    const [reqReceived, setReqReceived] = useState(requestsReceived);

    /*
    Function to do operations on the requests send or received by the user, they can be either accepting
    the request, rejecting or canceling the send request.*/
    const handleRequest = async (request: "accept" | "reject" | "cancel", requestId: string) => {

        try {

            const response = await fetch(`/api/couple/coupling-request/${requestId}/${request}`, {
                method: request === "cancel" ? "DELETE" : "PATCH",
                headers: {
                    "Content-type": "applications/json"
                }
            });

            const result = await response.json();
            if (!response.ok) {
                toast.error("An error occured!" + result.message);
                return;
            }
            toast.success("Request handled successfully");
            if (request === "accept") {
                router.push(`/home/couple-setup/${result?.couplingRequest?.couple_id}`);
                toast.success(`You have accepted to be the couple with someone!`);
            } else if(request === "reject") {

                setReqReceived((prev: any[]) => prev.filter((req) => req.id !== requestId));
            } else {
                setReqSend((prev: any[]) => prev.filter((req) => req.id !== requestId));
            }
        } catch (err) {

            if (err instanceof Error) {
                toast.error("An error occured: " + err.message);
            } else toast.error("An error occured!");
        }
    }

    return <div className="w-full grid grid-cols-1 grid-rows-[1fr_repeat(2, 2fr)] md:grid-rows-[1fr_2fr] md:grid-cols-2">

        <h3 className="w-full md:col-span-2 p-2 text-2xl font-bold">
            Check your requests status
        </h3>

        {/*Requests send to which users*/}
        <div className="w-full h-full p-2 flex gap-1 flex-col">
            <h3 className="text-md font-bold text-lg font-comfortaa">
                Requests Send
            </h3>

            {!reqSend || reqSend.length === 0 ? <div className="w-full rounded-md p-10 border-2 border-dashed
             border-primary-text flex justify-center items-center">
                You haven't send requests to anyone yet.</div> :
                <div className="w-full p-2">
                    {reqSend.map((req: any) => {

                        let finalProfileName = req.receiver.firstname && req.receiver.firstname.length > 0 ? req.receiver.firstname : "Someone Special";

                        if (req.receiver.lastname && req.receiver.lastname.length > 0) {
                            if (finalProfileName === req.receiver.firstname) {
                                finalProfileName = finalProfileName + req.receiver.lastname;
                            }
                        }
                        return <div className="relative w-full p-2 rounded-sm flex flex-wrap items-center gap-2 hover:shadow-[0px_0px_6px_var(--accent)]" key={req.id}>

                            <div className="w-10 h-10 rounded-full">
                                {(req.receiver.profile_image && req.receiver.profile_image.length > 0) ?
                                    <Image width={150}
                                        height={150} src={req.sender.profile_image} alt={`User-${req.sender_id}`} className="object-cover rounded-full" /> :
                                    <div className="w-full h-full rounded-full bg-accent text-white flex items-center justify-center">
                                        {req.receiver.username[0]}
                                    </div>}
                            </div>
                            <div className="h-full flex-flex-col">
                                <p className="font-medium">{finalProfileName}</p>
                                <p className="font-bold">@{req.receiver.username}</p>
                            </div>

                            <div className="sm:absolute relative sm:right-2">
                                <Button onClick={() => handleRequest("cancel", req.id)} type="button" text="cancel" className="ml-5" />
                            </div>
                        </div>
                    })}
                </div>}
        </div>

        {/*Requests received from which user*/}
        <div className="w-full h-full p-2 gap-1 flex-col">
            <h3 className="text-md font-bold text-lg font-comfortaa">
                Requests Received
            </h3>

            {!reqReceived || reqReceived.length === 0 ? <div className="w-full p-10 rounded-md border-2 border-dashed
             border-primary-text flex justify-center items-center">
                You haven't received requests from anyone yet.</div> : <div className="w-full p-2">
                {reqReceived.map((req: any) => {

                    let finalProfileName = req.sender.firstname && req.sender.firstname.length > 0 ? req.sender.firstname : "Someone Special";

                    if (req.sender.lastname && req.sender.lastname.length > 0) {
                        if (finalProfileName === req.sender.firstname) {
                            finalProfileName = finalProfileName + req.sender.lastname;
                        }
                    }
                    return <div className="relative w-full p-2 rounded-sm flex flex-wrap items-center gap-2 hover:shadow-[0px_0px_6px_var(--accent)]" key={req.id}>

                        <div className="w-10 h-10 rounded-full">
                            {(req.sender.profile_image && req.sender.profile_image.length > 0) ?
                                <Image width={150}
                                    height={150} src={req.sender.profile_image} alt={`User-${req.sender_id}`} className="object-cover rounded-full" /> :
                                <div className="w-full h-full rounded-full bg-accent text-white flex items-center justify-center">
                                    {req.sender.username[0]}
                                </div>}
                        </div>
                        <div className="h-full flex-flex-col">
                            <p className="font-medium">{finalProfileName}</p>
                            <p className="font-bold">@{req.sender.username}</p>
                        </div>

                        <div className="sm:absolute relative flex gap-2 sm:right-2">
                            <Button onClick={() => handleRequest("reject", req.id)} type="button" text="reject" className="ml-5" />
                            <Button onClick={() => handleRequest("accept", req.id)} type="button" text="accept" />
                        </div>
                    </div>
                })}
            </div>}
        </div>
    </div>
}

export default Requests;