import { createClient } from "@/utils/supabase/server";
import UserProfile from "@/components/profile-page/UserProfile";
import { getCurrentUser } from "@/lib/auth";
import Pagination from "@/components/commons/Pagination";
import { redirect } from "next/navigation";


interface Props {
    searchParams: Promise<{
        query?: string;
        page?: string;
    }>;
}

const SearchPage = async ({ searchParams }: Props) => {

    const { user } = await getCurrentUser();


    if (!user) {
        redirect("/");
    }
    const { query, page } = await searchParams;

    const supabase = await createClient();

    if (!query?.trim()) {
        return <p>Enter a username to search.</p>;
    }

    let numPage;
    if (!page?.trim()) {
        numPage = 1;
    } else {
        numPage = Number(page);
    }

    const { data: users, error } = await supabase
        .from("users")
        .select("id, username, firstname, lastname, gender, profile_image")
        .or(`username.ilike.%${query.trim()}%,firstname.ilike.%${query.trim()}%,lastname.ilike.%${query.trim()}%`)
        .range((numPage - 1) * 20, 20);

    if (error) {
        throw new Error("Failed to retrieve users");
    }

    const { count, error: countError } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true })
        .or(
            `username.ilike.%${query.trim()}%,firstname.ilike.%${query.trim()}%,lastname.ilike.%${query.trim()}%`
        )
        .neq("id", user.id);

    if (countError || !count) {
        throw new Error("No. of users failed to retrieve");
    }
    const numberOfPages = Math.ceil((count ?? 0) / 20);

    const numbers = Array.from(
        { length: numberOfPages },
        (_, i) => i + 1
    );
    return (
        <div className="parent-box">
            <div className="child-box flex flex-col justify-start gap-5 min-h-screen">
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

                <Pagination url="/home/search" numPage={numPage} numberOfPages={numberOfPages} query={query} numbers={numbers} />
            </div>
        </div>
    );
};

export default SearchPage;