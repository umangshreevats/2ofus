"use client";

import DropDown from "@/components/commons/DropDown";
import PlayfulInput from "@/components/commons/PlayfulInput";
import { useState } from "react";
import DatePicker from "@/components/commons/DatePicker";
import PhotoFrame from "@/components/commons/PhotoFrame";
import Image from "next/image";
import Button from "@/components/commons/Button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Dropdown } from "@/types/dropdown";

const CoupleSetup = ({ profileId }: { profileId: string }) => {

    const router = useRouter();
    const [coupleName, setCoupleName] = useState("");
    const [relationshipStatus, setRelationShipStatus] = useState("");
    const [aniversaryDate, setAniversaryDate] = useState<Date | null>(null);
    const [bioImage, setBioImage] = useState<File | null>(null);
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("coupleName", coupleName);
            if (bioImage instanceof File) {
                formData.append("bioImage", bioImage);
            }

            if (aniversaryDate instanceof Date) {
                formData.append("aniversaryDate", aniversaryDate.toISOString());
            }
            formData.append("description", description);
            formData.append("relationShipStatus", relationshipStatus.toLowerCase());

            const response = await fetch(`/api/profile/couple-profile/${profileId}`, {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error("Something went wrong: " + result.message);
                setLoading(false);
                return;
            }

            router.replace("/home/my-couple");
            router.refresh();
        } catch (err) {
            if (err instanceof Error) {
                toast.error("Something went wrong: " + err.message);
                return;
            }

            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    }

    const dropDownOptions: Dropdown[] = [
        {
            id: 1,
            name: "Talking",
            onClick: async () => setRelationShipStatus("Talking"),
        },
        {
            id: 2,
            name: "Dating",
            onClick: async () => setRelationShipStatus("Dating"),
        },
        {
            id: 3,
            name: "Engaged",
            onClick: async () => setRelationShipStatus("Engaged"),
        },
        {
            id: 4,
            name: "Married",
            onClick: async () => setRelationShipStatus("Married"),
        },
    ];

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return <section>
        <div className="parent-box">
            <div className="child-box">
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 items-center p-10">


                    <h2 className="w-full text-3xl font-bold text-primary-text">
                        Tell Us Your Love Story 💕
                    </h2>
                    <p className="text-md text-secondary-text border-b border-b-dashed border-b-primary-text font-medium w-full">
                        Give your little world a name, share your story, and upload your favourite pictures and precious memories. Let's create a beautiful space that belongs to both of you! 🥰✨
                    </p>

                    <label htmlFor="couple-name" className="w-full flex gap-2 flex-col">

                        <label className="w-full text-lg font-bold">Enter a beautiful Name you like to call your relationship: </label>
                        <PlayfulInput id="couple-name" width={100} textAlign="start" wScale="%" placeholder="Enter Name" text={coupleName} onChange={(e) => setCoupleName(e.target.value)} />
                    </label>

                    <label htmlFor="relationship-status" className="w-full flex gap-2 flex-col">
                        <label className="w-full text-lg font-bold">What's your relationship status? </label>

                        <DropDown
                            dropDownOptions={dropDownOptions}
                            open={isDropdownOpen}
                            setOpen={setIsDropdownOpen}
                            width={100}
                            wScale="%"
                            left={0}
                            top={5}
                        >
                            <PlayfulInput
                                id="relationship-status"
                                width={100}
                                textAlign="start"
                                wScale="%"
                                placeholder="Select Relationship Status"
                                text={relationshipStatus}
                                onChange={() => { }}
                            />
                        </DropDown>
                    </label>

                    <label htmlFor="aniversary" className="w-full">
                        <label className="w-full text-lg font-bold">Aniversary Date: </label>
                        <DatePicker
                            placeholder="Pick an aniversary date"
                            id="aniversary"
                            value={aniversaryDate}
                            onChange={(date) =>
                                setAniversaryDate(date)}
                        />
                        <p className="w-full text-secondary-text font-light">Your aniversary is the special date of your life! 🎂</p>

                    </label>


                    <label htmlFor="bio" className="w-full flex flex-col gap-3 items-center">

                        <label className="w-full text-lg font-bold">
                            Pick a photograph you both enjoy:
                        </label>

                        <PhotoFrame
                            width={300}
                            height={300}
                            wscale="px"
                            hscale="px"
                            round={true}
                        >
                            {bioImage ? (
                                <Image
                                    src={URL.createObjectURL(bioImage)}
                                    alt="Couple photograph"
                                    fill
                                    sizes="(max-width: 640px) 85px, (max-width: 768px) 120px, (max-width: 1024px) 160px, 185px"
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-secondary-text gap-2">
                                    <span className="text-4xl">💕</span>
                                    <span className="text-sm">Your photograph goes here</span>
                                </div>
                            )}
                        </PhotoFrame>

                        <input
                            className="hidden"
                            type="file"
                            id="bio"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0] ?? null;
                                setBioImage(file);
                            }}
                        />

                        <label
                            htmlFor="bio"
                            className="cursor-pointer text-center border border-dashed p-3 rounded-lg hover:opacity-70 w-full"
                        >
                            📸 Choose Photograph
                        </label>

                        <Button
                            type="button"
                            className={`${!bioImage ? "hidden" : ""}`}
                            onClick={() => setBioImage(null)}
                            text="Remove Image"
                            backgroundColor="background"
                            textColor="red"
                        />

                    </label>


                    <label htmlFor="description" className="w-full flex flex-col gap-2">
                        <label className="w-full text-lg font-bold">
                            Write a short description about your relationship:
                        </label>

                        <PlayfulInput placeholder="Description about your relationship..." text={description} onChange={(e) => setDescription(e.target.value)}
                            textArea={true} width={100} height={200} wScale="%" id="description" textAlign="start" />
                    </label>


                    <Button text={loading ? "Processing..." : "Continue"} disabled={loading} width={100} wscale="%" />
                    <Button text="Skip" onClick={() => {
                        router.replace("/home/my-couple");
                        router.refresh();
                    }} type="button" backgroundColor="background" textColor="primary-text" width={100} wscale="%" />
                </form>
            </div>
        </div>
    </section>
}

export default CoupleSetup;