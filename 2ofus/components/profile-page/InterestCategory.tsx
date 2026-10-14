'use client';
import { SetStateAction, useState } from "react";
import Button from "../commons/Button";
import { useThemeSettings } from "@/app/theme-provider";


const InterestCategory = ({ setPage, setOption }: { setPage: React.Dispatch<SetStateAction<number>>, setOption: React.Dispatch<SetStateAction<any>> }) => {

    const { theme } = useThemeSettings();

    const [interests, setInterests] = useState([
        { id: "places", name: "Favourite Places", emoji: "📍", status: false },
        { id: "hobbies", name: "Hobbies & Activities", emoji: "🎨", status: false },
        { id: "food", name: "Food & Drinks", emoji: "🍕", status: false },
        { id: "entertainment", name: "Entertainment", emoji: "🎬", status: false },
        { id: "music", name: "Music", emoji: "🎵", status: false },
        { id: "sports", name: "Sports & Fitness", emoji: "⚽", status: false },
        { id: "lifestyle", name: "Lifestyle & Personality", emoji: "🌱", status: false }
    ]);

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


                <Button type="button" text="Continue" width={100} wscale="%"/>
                <Button type="button" onClick={() => {
                }} text="Skip" backgroundColor="background" textColor={theme === "light" ? "black" : "white"} />
            </div>
        </div>
    </div>
}


export default InterestCategory;