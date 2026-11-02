"use server";

import { createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { toast } from "sonner";

export async function toggleMemoryPin(memoryId: string) {
    try {
        const { user, coupleData } = await getCurrentUser();

        if (!user) {
            throw new Error("Unauthorized");
        }

        if (!coupleData) {
            throw new Error("Couple Data required");
        }

        const supabase = await createClient();

        const { data: memoryPinned, error: memoryError } = await supabase
            .from("memory")
            .select("is_pinned")
            .eq("id", memoryId)
            .eq("couple_id", coupleData.id)
            .single();

        if (memoryError) throw memoryError;

        if (!memoryPinned) {
            throw new Error("Memory not found");
        }

        const newPinnedState = !memoryPinned.is_pinned;

        const { error: updateError } = await supabase
            .from("memory")
            .update({
                is_pinned: newPinnedState
            })
            .eq("id", memoryId)
            .eq("couple_id", coupleData.id);

        if (updateError) throw updateError;

        return {
            success: true,
            isPinned: newPinnedState,
            message: newPinnedState
                ? "Memory pinned successfully"
                : "Memory unpinned successfully"
        };

    } catch (error) {
        console.error("Memory pinning error:", error);

        throw error instanceof Error
            ? error
            : new Error("Failed to update memory");
    }
}


export const deleteMemory = async (memoryId: string) => {


    try {

        const { coupleData } = await getCurrentUser();

        const response = await fetch(`/api/couple/album/${coupleData.id}/${memoryId}`, {
            method: "DELETE"
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to delete memory");
        }

        toast.success("Memory deleted successfully");
    } catch (err) {
        if (err instanceof Error) {
            console.error("An error occured: " + err.message);
        }
    }
}