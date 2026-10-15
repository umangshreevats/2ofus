'use client';
import { interest } from "@/data/profile";
import PlayfulButton from "../commons/PlayfulButton";
import { useThemeSettings } from "@/app/theme-provider";
import { SetStateAction, useEffect } from "react";
import Button from "../commons/Button";

interface IntersetProps {
    option: "places" | "hobbies" | "food" | "entertainment" | "music" | "sports" | "lifestyle" | null;
    setPage: React.Dispatch<SetStateAction<number>>;
    setOption: React.Dispatch<SetStateAction<any>>;
    setInterests: React.Dispatch<SetStateAction<any>>;
}

const Interest = ({ option, setPage, setOption, setInterests }: IntersetProps) => {

    useEffect(() => {
        if (!option) {
            setPage(2);
        }
    }, [option, setPage]);

    if (!option) return null;

    const { theme } = useThemeSettings();

    const interestDetails = interest[option];

    return <div className="parent-box">
        <div className="child-box flex flex-col p-5 gap-10">
            <div>
                <h2 className="w-full text-3xl font-bold">
                    {interestDetails.title}
                </h2>
                <p className="w-full text-md font-light">{interestDetails.emoji} Select at least 2-3 options from each category: </p>
            </div>

            <div className="w-full flex flex-col gap-5">
                {interestDetails.questions.map((question, i) => (
                    <div key={question.id} className="w-full gap-5">
                        <h3 className="w-full text-lg">Q.{i + 1} {question.question}</h3>
                        <div className="w-full flex flex-wrap gap-2">
                            {question.options.map((option, index) => (
                                <div key={index}>
                                    <PlayfulButton
                                        text={option}
                                        onClick={() => { }}
                                        onlyOnce={true}
                                        clickBackColor={theme === "light" ? "white" : "black"}
                                        clickTextColor={theme === "light" ? "black" : "white"}
                                        clickBorderColor={theme === "light" ? "black" : "white"}
                                        pressUp={true}
                                    /></div>
                            ))}
                            <p className="mt-5 w-full h-0 border-2 border-dashed border-secondary-text" />
                        </div>
                    </div>
                ))}
            </div>

            <Button text="Done" type="button" onClick={() => setOption(null)} />
        </div>
    </div>
}


export default Interest;