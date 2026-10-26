import { createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProfileInformations from "@/features/profile-page/ProfileInformations";

interface PageProps {
    params: Promise<{
        username: string;
    }>;
}

export default async function ProfilePage({ params }: PageProps) {

    const { user, userData } = await getCurrentUser();

    if (!user || !userData) {
        redirect("/");
    }
    const { username } = await params;

    if (!username || username.length === 0) {
        redirect("/home");
    }

    const supabase = await createClient();

    const actualUsername = decodeURIComponent(username).replace(/^@/, "");

    if (!actualUsername || actualUsername.length === 0) {
        redirect("/home");
    }

    if (userData.username === actualUsername) {
        return (
            <section className="w-full">
                <ProfileInformations userInfo={userData} allowEdits={true} />
            </section>
        );
    }
    const { data: userInfo, error: userInfoError } = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .single();


    if (userInfoError || !userInfo) {
        console.error("Profile Informations failed to retrieve", userInfoError)
    }

    return (
        <section className="w-full">
            <ProfileInformations userInfo={userInfo ?? {}} allowEdits={false} />
        </section>
    );
}