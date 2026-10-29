"use client";

import Headings from "@/components/commons/Headings";
import { HeartPlus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import HeartBeatLoader from "@/components/commons/HeartBeatLoader";
import PlayfulInput from "@/components/commons/PlayfulInput";
import Photograph from "@/components/commons/Photograph";
import { addMorePhoto } from "@/data/images";
import PlayfulButton from "@/components/commons/PlayfulButton";
import { useThemeSettings } from "@/app/theme-provider";

const Liking = () => {

    // States and values
    const { theme } = useThemeSettings();

    const [messagesLoading, setMessagesLoading] = useState(false);
    const [predefinedMessages, setPredefinedMessages] = useState<any[] | null>(null);
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedOptionArray, setSelectedOptionArray] = useState<string[]>([]);

    const[pickedOption, setPickedOption] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState("");
    const [message, setMessage] = useState("");

    const filteredOptions = selectedOptionArray.filter((option) =>
        option.toLowerCase().includes(searchQuery.toLowerCase())
    );


    // Effects
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
            setSelectedOption(predefinedMessagesServer[0].options);
            setMessagesLoading(false);
        }

        getMessages();
    }, []);
    return <div className="w-full rounded-2xl p-5 border border-solid border-pink-500 bg-pink-500/5 text-pink-500">

        {/*Top section*/}
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

        {/*Main mid section*/}
        <div className="w-full">

            {(messagesLoading && !predefinedMessages) ? <div className="w-full h-[200px] flex items-center justify-center">
                <HeartBeatLoader />
            </div> : (!messagesLoading && !predefinedMessages) ? <div className="w-full h-[200px] border border-dashed border-primary-text rounded-md flex items-center justify-center">
                An Error Occured!
            </div> :
                <div className="w-full flex flex-col px-5 gap-5">

                    {/*Navigation through different liking and options*/}
                    <nav className="w-full h-10 flex gap-2 items-center overflow-scroll" style={{ scrollbarWidth: "none" }}>
                        {predefinedMessages && Array.isArray(predefinedMessages) && predefinedMessages.map((pm) =>
                            <button key={pm.id} type="button" onClick={() => {
                                setSelectedOption(pm.id);
                                setSelectedOptionArray(pm.options)
                            }} className={`p-2 shrink-0 rounded-2xl cursor-pointer text-white ${selectedOption === pm.id ? "bg-black" : "bg-accent"}`}>
                                {pm.emoji} {pm.title}
                            </button>)}
                    </nav>


                    {/*Options*/}
                    <div className="w-full py-5 flex flex-col gap-5">
                        {/*Search Bar*/}
                        <input type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for an option... (for eg, cooking, caring, funny supportive)"
                            className={`w-full p-2 outline-none 
                        rounded-lg shadow-lg ${theme === "light" ? "bg-white" : "bg-black"} text-primary-text`} />

                        {/*Navigation through the predefined messages through the category of liking*/}
                        <div className="w-full flex flex-wrap gap-2">
                            {filteredOptions.map((option, i) => (
                                <button key={i} 
                                onClick={() => setPickedOption(prev => {
                                    if(prev === option) return "";

                                    return option
                                })}
                                disabled={pickedOption.length > 0 && option !== pickedOption} className={`p-3 disabled:cursor-not-allowed flex gap-3 cursor-pointer 
                                shadow-md ${(pickedOption.length > 0 && option !== pickedOption) ? "trans-surface" : "bg-surface"} text-primary-text rounded-2xl`}>
                                    {option}
                                </button>
                            ))}
                        </div>

                        {/*Message box for typing personal message*/}
                        <PlayfulInput onChange={(e) => setMessage(e.target.value)} placeholder="Write a message optional" text={message} textAlign="start" backgroundColor="inherit" textColor="#EC4899" textArea={true} />


                        {/*Photograph section*/}
                        <div className="w-full py-5 flex gap-5 items-center">
                            <label htmlFor="add-photo" className="aspect-square cursor-pointer">
                                <Photograph url={addMorePhoto.src} alternate="Add More Image" showTitle={false} maxHeight={200} maxWidth={200} />
                            </label>

                            <input id="add-photo" type="file" className="hidden" />
                        </div>

                        {/*Submit button*/}
                        <div className="w-full flex justiy-end">
                            <PlayfulButton type="button" text="Add Liking" textColor="white" backgroundColor="#EC4899" borderColor="#EC4899" />
                        </div>
                    </div>
                </div>}
        </div>

    </div>
}


export default Liking;