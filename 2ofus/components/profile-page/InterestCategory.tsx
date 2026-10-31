'use client';
import { SetStateAction, useState } from "react";
import Button from "../commons/Button";
import { useThemeSettings } from "@/app/theme-provider";
import { toast } from "sonner";

const InterestCategory = ({ username, setPage, setOption, interestsList }: { username: string, interestsList: any, setPage: React.Dispatch<SetStateAction<number>>, setOption: React.Dispatch<SetStateAction<any>> }) => {

    const { theme } = useThemeSettings();

    const [loading, setLoading] = useState(false);

    const [interests, setInterests] = useState([
        { id: "places", name: "Favourite Places", emoji: "📍", status: interestsList["places"].length > 6 },
        { id: "hobbies", name: "Hobbies & Activities", emoji: "🎨", status: interestsList["hobbies"].length > 6 },
        { id: "food", name: "Food & Drinks", emoji: "🍕", status: interestsList["food"].length > 6 },
        { id: "entertainment", name: "Entertainment", emoji: "🎬", status: interestsList["entertainment"].length > 6 },
        { id: "music", name: "Music", emoji: "🎵", status: interestsList["music"].length > 6 },
        { id: "sports", name: "Sports & Fitness", emoji: "⚽", status: interestsList["sports"].length > 6 },
        { id: "lifestyle", name: "Lifestyle & Personality", emoji: "🌱", status: interestsList["lifestyle"].length > 6 }
    ]);


    const handleInterestSelection = async () => {

        setLoading(true);

        try {

            const response = await fetch(`/api/profile/interests/${username}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    interests: interestsList
                })
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error(`Error occurred: ${result.message}`);
                setLoading(false);
                return;
            }

            toast.success("Interests saved successfully:", result);
        } catch (err: unknown) {

            if (err instanceof Error) {
                toast.error(`Error submitting response: ${err.message}`);
            } else {
                toast.error("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    }

    const handleInterest = (option: string) => {
        setOption(option);
        setPage(3);
    }
    return <div className="parent-box">
        <div className="child-box">
            <div className="w-full p-5 flex flex-col items-center gap-5">
                <h3 className="w-full text-2xl">Select Interest From Each Category: </h3>

                <div className="w-2/3 grid grid-cols-2 gap-1">
                    {interests.map((interest, _) => (
                        <div onClick={() => handleInterest(interest.id)} key={interest.id} className="w-full cursor-pointer h-full border-2 border-solid border-accent rounded-sm p-5 gap-5 flex flex-col justify-center items-start">
                            <span className="text-2xl">{interest.emoji}</span>
                            <span>{interest.name}</span>
                            {interest.status ? <span className="p-1 rounded-full text-sm font-light bg-green-500/40 text-green-500">Completed</span> :
                                <span className="font-light text-sm">Not Selected</span>}
                        </div>
                    ))}
                </div>


                <Button type="button" onClick={handleInterestSelection} text={loading ? "Please Wait..." : "Continue"} disabled={loading} width={100} wscale="%" />
                <Button type="button" onClick={() => {

                }} text="Skip" backgroundColor="background" textColor={theme === "light" ? "black" : "white"} />
            </div>
        </div>
    </div>
}


export default InterestCategory;