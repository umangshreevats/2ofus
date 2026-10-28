"use client";

import Headings from "@/components/commons/Headings";
import { HeartPlus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import HeartBeatLoader from "@/components/commons/HeartBeatLoader";
import PlayfulInput from "@/components/commons/PlayfulInput";
import Photograph from "@/components/commons/Photograph";
import { addMorePhoto } from "@/data/images";
import Button from "@/components/commons/Button";

const Liking = () => {
    const [messagesLoading, setMessagesLoading] = useState(false);
    const [predefinedMessages, setPredefinedMessages] = useState<any[] | null>(null);
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedOptionArray, setSelectedOptionArray] = useState<string[]>([]);

    const [message, setMessage] = useState("");


    useEffect(() => {

        async function getMessages() {

            setMessagesLoading(true);
            const { data: predefinedMessagesServer, error: predefinedMessagesError } = await supabase
                .from("predefined_messages")
                .select("*")
                .eq("category", "liking");

            if (predefinedMessagesError || !predefinedMessagesServer) {
                setPredefinedMessages(null);
                setMessagesLoading(false);
                return;
            }
            setPredefinedMessages(predefinedMessagesServer);
            setSelectedOption(predefinedMessagesServer[0].id);
            setMessagesLoading(false);
        }

        getMessages();
    }, []);

    return <div className="w-full rounded-2xl p-5 border border-solid border-pink-500 bg-pink-500/5 text-pink-500">
        <div className="w-full flex gap-5 items-center">
            <div className="border border-solid border-pink-500 rounded-full p-5">
                <HeartPlus />
            </div>

            <Headings
                heading="Express What you like or appriciate"
                paragraph="Let your partner know a little(or big) things that mean a lot."
                headingColor="text-pink-500"
            />
        </div>

        <div className="w-full">

            {(messagesLoading && !predefinedMessages) ? <div className="w-full h-[200px] flex items-center justify-center">
                <HeartBeatLoader />
            </div> : (!messagesLoading && !predefinedMessages) ? <div className="w-full h-[200px] border border-dashed border-primary-text rounded-md flex items-center justify-center">
                An Error Occured!
            </div> :
                <div className="w-full flex flex-col px-5 gap-5">
                    <nav className="w-full h-10 flex gap-2 items-center overflow-scroll" style={{ scrollbarWidth: "none" }}>
                        {predefinedMessages && Array.isArray(predefinedMessages) && predefinedMessages.map((pm) =>
                            <button key={pm.id} type="button" onClick={() => {
                                setSelectedOption(pm.id);
                                setSelectedOptionArray(pm.options)
                            }} className={`p-2 shrink-0 rounded-2xl cursor-pointer text-secondary-text text-primary-text ${selectedOption === pm.id ? "bg-black" : "bg-accent"}`}>
                                {pm.emoji} {pm.title}
                            </button>)}
                    </nav>


                    {/*Options*/}
                    <div className="w-full py-5 flex flex-col gap-5">

                        <input type="text" placeholder="Search for an option... (for eg, cooking, caring, funny supportive)"
                            className="w-full p-2 outline-none rounded-lg shadow-lg bg-white text-primary-text" />

                        <div className="w-full flex flex-wrap gap-2">
                            {selectedOptionArray.map((option, i) => (
                                <button key={i} className="p-3 flex gap-3 cursor-pointer shadow-md bg-white text-primary-text rounded-2xl">
                                    {option} <Plus />
                                </button>
                            ))}
                        </div>

                        <PlayfulInput onChange={(e) => setMessage(e.target.value)} placeholder="Write a message optional" text={message} textAlign="start" backgroundColor="inherit" textColor="#EC4899" textArea={true} />

                        <div className="w-full py-5 flex gap-5 items-center">
                            <label htmlFor="add-photo" className="aspect-square cursor-pointer">
                                <Photograph url={addMorePhoto.src} alternate="Add More Image" showTitle={false} maxHeight={200} maxWidth={200} />
                            </label>

                            <input id="add-photo" type="file" className="hidden" />
                        </div>

                        <div className="w-full flex justiy-end">
                            <Button type="button" text="Add Liking" textColor="white" className="bg-pink-500" backgroundColor="" />
                        </div>
                    </div>
                </div>}
        </div>

    </div>
}


export default Liking;