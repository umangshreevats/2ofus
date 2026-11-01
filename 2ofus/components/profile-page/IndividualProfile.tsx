"use client";

import { Users } from "@/types/profiles";
import { SetStateAction } from "react";
import { useState } from "react";
import { interest } from "@/data/profile";
import { toast } from "sonner";
import Button from "../commons/Button";
import DatePicker from "../commons/DatePicker";

type InterestCategory = keyof NonNullable<Users["interests"]>;

const interestCategories: {
    key: InterestCategory;
    title: string;
    emoji: string;
    options: string[];
}[] = Object.entries(interest).map(([key, value]) => ({
    key: key as InterestCategory,
    title: value.title,
    emoji: value.emoji,
    options: value.questions.flatMap(question =>
        [...question.options]
    )
}));

const genders = ["male", "female", "other"];
const IndividualProfile = ({
    profileInfo,
    setSelectedImage,
    selectedImage,
    setEditing,
    type
}:
    {
        profileInfo: {
            profileType: "users",
            profileData: Users,
            setProfileData: React.Dispatch<SetStateAction<Users>>,
            originalProfile: React.RefObject<Users>
        },
        selectedImage: File | null,
        setSelectedImage: React.Dispatch<SetStateAction<File | null>>,
        setEditing: React.Dispatch<SetStateAction<boolean>>,
        type: "fullname"
        | "dob"
        | "gender"
        | "interests"
        | "couple_name"
        | "anniversary_date"
        | "first_meet_date"
        | "first_meet_location"
        | "relationship_status"
        | "bio";
    }) => {

    const { profileData, setProfileData, profileType, originalProfile } = profileInfo;
    const [loading, setLoading] = useState(false);
    const toggleInterest = (
        category: InterestCategory,
        value: string
    ) => {
        setProfileData(prev => {
            const currentInterests = prev.interests?.[category] ?? [];

            const updatedInterests = currentInterests.includes(value)
                ? currentInterests.filter(item => item !== value)
                : [...currentInterests, value];

            return {
                ...prev,
                interests: {
                    ...prev.interests,
                    [category]: updatedInterests
                }
            };
        });
    };


    const isSelected = (
        category: InterestCategory,
        value: string
    ) => profileData.interests?.[category]?.includes(value) ?? false;

    const handleInfoSubmit = async () => {
        setLoading(true);

        try {
            try {
                const formData = new FormData();

                const editableFields: (keyof Users)[] = [
                    "firstname",
                    "lastname",
                    "dob",
                    "gender",
                    "interests"
                ];

                // Compare original and edited profile
                editableFields.forEach((field) => {
                    const originalValue = originalProfile.current[field];
                    const editedValue = profileData[field];

                    const hasChanged =
                        JSON.stringify(originalValue ?? null) !==
                        JSON.stringify(editedValue ?? null);

                    if (hasChanged) {
                        if (field === "interests") {
                            formData.append(
                                field,
                                JSON.stringify(editedValue ?? {})
                            );
                        } else {
                            formData.append(
                                field,
                                typeof editedValue === "object"
                                    ? JSON.stringify(editedValue ?? {})
                                    : String(editedValue ?? "")
                            );
                        }
                    }
                });

                // Profile image comparison
                if (selectedImage) {
                    formData.append("removeProfileImage", "true");
                    formData.append("profile_image", selectedImage);
                } else if (
                    originalProfile.current.profile_image &&
                    !profileData.profile_image
                ) {
                    formData.append("removeProfileImage", "true");
                } else {
                    formData.append("removeProfileImage", "false");
                }

                // Check if anything changed
                if ([...formData.keys()].length === 0) {
                    toast.warning("Nothing to update");
                    return;
                }

                const response = await fetch(`/api/profile/${profileData.username}`, {
                    method: "PATCH",
                    body: formData
                });

                const result = await response.json();

                if (!response.ok) {
                    toast.error(result.message || "Update failed");
                }

                setSelectedImage(null);

                // Update original snapshot
                originalProfile.current = structuredClone(result.user);

                toast.success("Profile updated!");

            } catch (err) {

                if (err instanceof Error) {
                    toast.error("Error updating profile:" + err.message);
                }
            }
            setEditing(false);
        } catch (err) {

            if (err instanceof Error) {
                toast.error("An error occured: " + err.message);
            }
        } finally {
            setLoading(false);
        }
    };
    return <>
        {/* FULL NAME */}
        {type === "fullname" && (
            <>
                <h4 className="text-2xl font-rubik font-bold">
                    Edit Full Name
                </h4>

                <label htmlFor="first-name" className="font-medium">
                    First Name
                </label>

                <input
                    className="w-full p-3 rounded-full border-2 border-accent"
                    id="first-name"
                    type="text"
                    value={profileData.firstname ?? ""}
                    onChange={e =>
                        setProfileData(prev => ({
                            ...prev,
                            firstname: e.target.value
                        }))
                    }
                />

                <label htmlFor="last-name" className="font-medium">
                    Last Name
                </label>

                <input
                    className="w-full p-3 rounded-full border-2 border-accent"
                    id="last-name"
                    type="text"
                    value={profileData.lastname ?? ""}
                    onChange={e =>
                        setProfileData(prev => ({
                            ...prev,
                            lastname: e.target.value
                        }))
                    }
                />
            </>
        )}

        {/* DATE OF BIRTH */}
        {type === "dob" && (
            <>
                <h4 className="text-2xl font-rubik font-bold">
                    Date of Birth
                </h4>

                <DatePicker
                    id="dob"
                    placeholder="Enter your Date of Birth"
                    value={
                        profileData.dob
                            ? new Date(profileData.dob)
                            : null
                    }
                    onChange={(date) =>
                        setProfileData(prev => ({
                            ...prev,
                            dob: date ? date.toISOString() : null
                        }))
                    }
                />
            </>
        )}

        {/* GENDER */}
        {type === "gender" && (
            <>
                <h4 className="text-2xl font-rubik font-bold">
                    Select Gender
                </h4>

                <div className="flex flex-col gap-3">
                    {genders.map(gender => (
                        <label
                            key={gender}
                            className={`flex items-center gap-3 p-3 rounded-md border-2 cursor-pointer transition-colors ${profileData.gender === gender
                                ? "border-accent bg-accent/10"
                                : "border-secondary-text/30"
                                }`}
                        >
                            <input
                                type="radio"
                                name="gender"
                                value={gender}
                                checked={profileData.gender === gender}
                                onChange={() =>
                                    setProfileData(prev => ({
                                        ...prev,
                                        gender
                                    }))
                                }
                                className="accent-[var(--accent)]"
                            />

                            <span>{gender}</span>
                        </label>
                    ))}
                </div>
            </>
        )}

        {/* INTERESTS */}
        {type === "interests" && (
            <>
                <h4 className="text-2xl font-rubik font-bold">
                    Your Interests
                </h4>

                <p className="text-sm text-secondary-text">
                    Select everything you enjoy. You can choose multiple
                    options from each category.
                </p>

                <div className="flex flex-col gap-6">
                    {interestCategories.map(category => (
                        <section
                            key={category.key}
                            className="flex flex-col gap-3"
                        >
                            <h5 className="text-lg font-rubik font-semibold">
                                {category.emoji} {category.title}
                            </h5>

                            <div className="flex flex-wrap gap-2">
                                {category.options.map(option => {
                                    const selected = isSelected(
                                        category.key,
                                        option
                                    );

                                    return (
                                        <button
                                            key={option}
                                            type="button"
                                            onClick={() =>
                                                toggleInterest(
                                                    category.key,
                                                    option
                                                )
                                            }
                                            className={`px-3 py-2 rounded-full border text-sm transition-all ${selected
                                                ? "bg-accent text-white border-accent"
                                                : "border-secondary-text/30 text-primary-text hover:border-accent"
                                                }`}
                                        >
                                            {option}
                                        </button>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
                </div>
            </>
        )}

        <Button
            type="button"
            text={loading ? "Submitting..." : "Submit"}
            onClick={handleInfoSubmit}
        />
    </>;
}


export default IndividualProfile;