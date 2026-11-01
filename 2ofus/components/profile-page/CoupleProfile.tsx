
"use client";

import { Couples, RelationshipStatus } from "@/types/profiles";
import { SetStateAction, useState } from "react";
import { toast } from "sonner";
import Button from "../commons/Button";
import DatePicker from "../commons/DatePicker";
import PlayfulInput from "../commons/PlayfulInput";

type CoupleProfileType =
    "fullname"
    | "dob"
    | "gender"
    | "interests"
    | "couple_name"
    | "anniversary_date"
    | "first_meet_date"
    | "first_meet_location"
    | "relationship_status"
    | "bio";

const relationshipStatuses: RelationshipStatus[] = [
    "Talking",
    "Dating",
    "Engaged",
    "Married"
];

const CoupleProfile = ({
    profileInfo,
    setEditing,
    type,
    selectedImage,
    setSelectedImage
}: {
    profileInfo: {
        profileType: "couples";
        profileData: Couples;
        setCoupleData: React.Dispatch<SetStateAction<Couples>>;
        originalCouple: React.RefObject<Couples>;
    };
    setSelectedImage: React.Dispatch<SetStateAction<File | null>>;
    selectedImage: File | null;
    setEditing: React.Dispatch<SetStateAction<boolean>>;
    type: CoupleProfileType;
}) => {
    const {
        profileData,
        setCoupleData,
        originalCouple
    } = profileInfo;

    const [loading, setLoading] = useState(false);

    const handleInfoSubmit = async () => {
        setLoading(true);

        try {
            const formData = new FormData();

            const editableFields: (keyof Couples)[] = [
                "couple_name",
                "anniversary_date",
                "first_meet_date",
                "first_meet_location",
                "relationship_status",
                "bio"
            ];

            // Detect changed fields
            editableFields.forEach((field) => {
                const originalValue = originalCouple.current[field];
                const editedValue = profileData[field];

                const hasChanged =
                    JSON.stringify(originalValue ?? null) !==
                    JSON.stringify(editedValue ?? null);

                if (hasChanged) {
                    formData.append(
                        field,
                        String(editedValue ?? "")
                    );
                }
            });

            if (originalCouple.current.cover_image && !profileData.cover_image) {
                formData.append("removeCoverImage", "true");
            } else {
                formData.append("removeCoverImage", "false");
            }

            // Include selected cover image
            if (selectedImage) {
                formData.append("removeCoverImage", "true");
                formData.append("cover_image", selectedImage);
            }

            // Check whether anything changed
            if ([...formData.keys()].length === 0) {
                toast.warning("Nothing to update");
                return;
            }

            // TODO: Add your PATCH API call here.
            // Example:
            //
            const response = await fetch(`/api/profile/couple-profile/${profileData.id}`, {
                method: "PATCH",
                body: formData
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error("Error occured while updating the profile informations: " + result.message);
                setLoading(false);
                return;
            }

            toast.success("Profile Informations updated successfully.");

        } catch (err) {
            if (err instanceof Error) {
                toast.error("Error updating couple profile: " + err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* COUPLE NAME */}
            {type === "couple_name" && (
                <>
                    <h4 className="text-2xl font-rubik font-bold">
                        Edit Couple Name
                    </h4>

                    <label htmlFor="couple-name" className="font-medium">
                        Couple Name
                    </label>

                    <input
                        className="w-full p-3 rounded-full border-2 border-accent"
                        id="couple-name"
                        type="text"
                        placeholder="Enter couple name"
                        value={profileData.couple_name ?? ""}
                        onChange={(e) =>
                            setCoupleData(prev => ({
                                ...prev,
                                couple_name: e.target.value
                            }))
                        }
                    />
                </>
            )}

            {/* ANNIVERSARY DATE */}
            {type === "anniversary_date" && (
                <>
                    <h4 className="text-2xl font-rubik font-bold">
                        Anniversary Date
                    </h4>

                    <DatePicker
                        id="anniversary-date"
                        placeholder="Enter your anniversary date"
                        value={
                            profileData.anniversary_date
                                ? new Date(profileData.anniversary_date)
                                : null
                        }
                        onChange={(date) =>
                            setCoupleData(prev => ({
                                ...prev,
                                anniversary_date: date
                                    ? date.toISOString()
                                    : null
                            }))
                        }
                    />
                </>
            )}

            {/* FIRST MEET DATE */}
            {type === "first_meet_date" && (
                <>
                    <h4 className="text-2xl font-rubik font-bold">
                        First Meet Date
                    </h4>

                    <DatePicker
                        id="first-meet-date"
                        placeholder="When did you first meet?"
                        value={
                            profileData.first_meet_date
                                ? new Date(profileData.first_meet_date)
                                : null
                        }
                        onChange={(date) =>
                            setCoupleData(prev => ({
                                ...prev,
                                first_meet_date: date
                                    ? date.toISOString()
                                    : null
                            }))
                        }
                    />
                </>
            )}

            {/* FIRST MEET LOCATION */}
            {type === "first_meet_location" && (
                <>
                    <h4 className="text-2xl font-rubik font-bold">
                        First Meet Location
                    </h4>

                    <label
                        htmlFor="first-meet-location"
                        className="font-medium"
                    >
                        Where did you first meet?
                    </label>

                    <input
                        className="w-full p-3 rounded-full border-2 border-accent"
                        id="first-meet-location"
                        type="text"
                        placeholder="Enter the location"
                        value={profileData.first_meet_location ?? ""}
                        onChange={(e) =>
                            setCoupleData(prev => ({
                                ...prev,
                                first_meet_location: e.target.value
                            }))
                        }
                    />
                </>
            )}

            {/* RELATIONSHIP STATUS */}
            {type === "relationship_status" && (
                <>
                    <h4 className="text-2xl font-rubik font-bold">
                        Relationship Status
                    </h4>

                    <label
                        htmlFor="relationship-status"
                        className="font-medium"
                    >
                        Current Relationship Status
                    </label>

                    <select
                        id="relationship-status"
                        className="w-full p-3 rounded-full border-2 border-accent bg-background"
                        value={profileData.relationship_status}
                        onChange={(e) =>
                            setCoupleData(prev => ({
                                ...prev,
                                relationship_status: e.target.value as RelationshipStatus
                            }))
                        }
                    >
                        {relationshipStatuses.map(status => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </>
            )}


            {type === "bio" && (
                <>
                    <h4 className="text-2xl font-rubik font-bold">
                        Edit Couple Bio
                    </h4>

                    <PlayfulInput
                        id="couple-bio"
                        text={profileData.bio ?? ""}
                        placeholder="Tell your love story..."
                        textArea
                        width={100}
                        wScale="%"
                        height={150}
                        maxLength={500}
                        textAlign="left"
                        padding={1}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            setCoupleData(prev => ({
                                ...prev,
                                bio: e.target.value
                            }))
                        }
                    />

                    <p className="text-sm text-gray-500 text-right">
                        {(profileData.bio ?? "").length}/500
                    </p>
                </>
            )}

            <Button
                type="button"
                text={loading ? "Submitting..." : "Submit"}
                onClick={handleInfoSubmit}
            />
        </>
    );
};

export default CoupleProfile;
