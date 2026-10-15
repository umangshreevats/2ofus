import { createClient } from "@/utils/supabase/server";
import UserProfile from "@/components/profile-page/UserProfile";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

interface Props {
    searchParams: Promise<{
        query?: string;
    }>;
}

const SearchPage = async ({ searchParams }: Props) => {

    const { user } = await getCurrentUser();


    if(!user) {
        redirect("/");
    }
    const { query } = await searchParams;

    const supabase = await createClient();

    if (!query?.trim()) {
        return <p>Enter a username to search.</p>;
    }

    const { data: users, error } = await supabase
        .from("users")
        .select("id, username, firstname, lastname, gender, profile_image")
        .ilike("username", `%${query.trim()}%`)
        .limit(20);

    if (error) {
        throw new Error("Failed to retrieve users");
    }

    return (
        <div className="parent-box">
            <div className="child-box flex-col justify-start items-center gap-5">
                <h1>Search results for "{query}"</h1>

                {users?.length ? (
                    users.map(user => (
                        <UserProfile
                            key={user.id}
                            profileInfo={user}
                        />
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchPage;