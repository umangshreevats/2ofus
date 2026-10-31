import { appName } from "@/data/info";
import ProfileSetup from "@/features/profile-page/ProfileSetup";
import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";


export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {

    const { username } = await params;

    const cleanUsername = decodeURIComponent(username)
        .replace(/^@/, "")
        .trim();

    const supabase = await createClient();

    const { data: profile, error } = await supabase.from("users").select("*").eq("username", cleanUsername).single();

    if (error || !profile) {
        notFound();
    }

    if(profile.is_profile_completed) {
        redirect("/home");
    }
    
    const { error: profileUpdateError } = await supabase.from("users").update({ is_profile_completed: true }).eq("username", cleanUsername).single();

    if(profileUpdateError) {
        throw profileUpdateError;
    }

    return <div className="parent-box flex-col justify-start items-center">
        <div className="child-box p-10 flex flex-col gap-5">
            <h1 className="w-full text-3xl text-center font-bold">
                Get Started with {appName}
            </h1>

            <ProfileSetup username={cleanUsername} />
        </div>
    </div>
}