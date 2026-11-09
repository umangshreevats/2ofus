"use client";

import Headings from "@/components/commons/Headings";
import { HeartCrack, X, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import HeartBeatLoader from "@/components/commons/HeartBeatLoader";
import PlayfulInput from "@/components/commons/PlayfulInput";
import Photograph from "@/components/commons/Photograph";
import { addMorePhoto } from "@/data/images";
import PlayfulButton from "@/components/commons/PlayfulButton";
import { useThemeSettings } from "@/app/theme-provider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const Unliking = () => {

    // States and values
    const { theme } = useThemeSettings();
    const router = useRouter();

    const [submitLoading, setSubmitLoading] = useState(false);
    const [messagesLoading, setMessagesLoading] = useState(false);
    const [predefinedMessages, setPredefinedMessages] = useState<any[] | null>(null);
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedOptionArray, setSelectedOptionArray] = useState<string[]>([]);

    const [pickedOptions, setPickedOptions] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [message, setMessage] = useState("");
    const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);

    const filteredOptions = selectedOptionArray.filter((option) =>
        option.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const handlePickedOptions = (option: string) => {
        if (pickedOptions.includes(option)) {
            setPickedOptions(prev => prev.filter(o => o != option));
            return;
        }

        if (pickedOptions.length >= 2) {
            toast.warning("You cannot pick more than 2 unlikings");
            return;
        }

        setPickedOptions(prev => ([
            ...prev,
            option
        ]));
    }

    // Submit function:
    const handleSubmit = async () => {
        setSubmitLoading(true);
        try {

            const formData = new FormData();
            formData.append("predefinedMessages", JSON.stringify(pickedOptions));
            formData.append("userMessage", message);

            if (selectedPhoto && selectedPhoto instanceof File) {
                formData.append("image", selectedPhoto);
            }

            const response = await fetch("/api/couple/tell-and-get/unliking", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error("An error occured" + result.message);
                setSubmitLoading(false);
                return;
            }
            toast.success("Un-Liking created successfully!");
            router.refresh();

        } catch (err) {

            if (err instanceof Error) {
                toast.error("An error occured: " + err.message);
            }
        } finally {
            setSubmitLoading(false);
        }
    }



    // Effects
    useEffect(() => {
        async function getMessages() {
            setMessagesLoading(true);

            const { data: predefinedMessagesServer, error } = await supabase
                .from("predefined_messages")
                .select("*")
                .eq("category", "unliking");

            if (error || !predefinedMessagesServer || predefinedMessagesServer.length === 0) {
                setPredefinedMessages(null);
                setMessagesLoading(false);
                return;
            }

            setPredefinedMessages(predefinedMessagesServer);

            // Set the first category as selected
            setSelectedOption(predefinedMessagesServer[0].id);

            // Set its options
            setSelectedOptionArray(predefinedMessagesServer[0].options);

            setMessagesLoading(false);
        }

        getMessages();
    }, []);


    return <div className="w-full rounded-2xl p-5 border border-solid border-violet-500 bg-violet-500/5 text-violet-500">

        {/*Top section*/}
        <div className="w-full flex gap-5 items-center">
            <div className="border border-solid border-violet-500 rounded-full p-5">
                <HeartCrack />
            </div>

            <Headings
                heading="Express What you're feeling or struggling with"
                paragraph="It's ok to have tough days. Share how you feel, and let your partner know."
                headingColor="text-violet-500"
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
                            placeholder="Search for an option... (for eg, lonely, overwhelmed, need attention)"
                            className={`w-full p-2 outline-none 
                        rounded-lg shadow-lg ${theme === "light" ? "bg-white" : "bg-black"} text-primary-text`} />

                        {/*Navigation through the predefined messages through the category of un-liking*/}
                        <div className="w-full flex flex-wrap gap-2">
                            {filteredOptions.map((option, i) => (
                                <button key={i}
                                    onClick={() => handlePickedOptions(option)}
                                    className={`p-3 disabled:cursor-not-allowed flex gap-3 cursor-pointer 
                                shadow-md ${(pickedOptions.includes(option)) ? "trans-accent" : "bg-surface"} text-primary-text rounded-2xl`}>
                                    {option} <Plus />
                                </button>
                            ))}
                        </div>

                        {/*Message box for typing personal message*/}
                        <PlayfulInput onChange={(e) => setMessage(e.target.value)} placeholder="Write a message optional" text={message} textAlign="start" backgroundColor="inherit" textColor="#8B5CF6" textArea={true} />


                        {/*Photograph section*/}
                        <div className="w-full py-5 flex gap-5 max-sm:flex-col items-center">
                            <label htmlFor="add-photo" className="aspect-square cursor-pointer">
                                <Photograph url={addMorePhoto.src} alternate="Add More Image" showTitle={false} maxHeight={200} maxWidth={200} />
                            </label>

                            {selectedPhoto &&
                                <div className="relative p-5">
                                    <button onClick={() => setSelectedPhoto(null)} type="button" className="cursor-pointer w-5 h-5 absolute right-0 top-0">
                                        <X />
                                    </button>
                                    <Photograph url={URL.createObjectURL(selectedPhoto)} maxWidth={200} alternate="selected photo"
                                        showTitle={false}
                                    />
                                </div>
                            }

                            <input id="add-photo" type="file" className="hidden" onChange={(e) => setSelectedPhoto(e?.target?.files?.[0] ?? null)} />
                        </div>

                        {/*Submit button*/}
                        <div className="w-full flex justiy-end">
                            <PlayfulButton onClick={handleSubmit} type="button" text={submitLoading ? "Adding..." : `Add Un-liking`} textColor="white" backgroundColor="#8B5CF6" borderColor="#8B5CF6" />
                        </div>
                    </div>
                </div>}
        </div>

    </div>
}


export default Unliking;