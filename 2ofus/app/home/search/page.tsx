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

    const { user, coupleData } = await getCurrentUser();

    if(!user) {
        redirect("/");
    }

    if (coupleData) {
        redirect("/home/my-couple");
    }
    const { query, page } = await searchParams;


    const supabase = await createClient();

    if (!query?.trim()) {
        return <p>Enter a username to search.</p>;
    }

    // Validate pagination
    const numPage = Math.max(1, Number(page) || 1);
    const limit = 20;
    const from = (numPage - 1) * limit;

    // 1. Fetch all pending requests involving the current user
    const { data: pendingRequests, error: requestError } = await supabase
        .from("coupling_requests")
        .select("sender_id, receiver_id")
        .eq("status", "pending")
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`);

    if (requestError) {
        throw new Error("Error fetching pending requests: " + requestError.message);
    }

    // 2. Get IDs of users who already have a pending request with you
    const excludedUserIds = pendingRequests.map(request =>
        request.sender_id === user.id
            ? request.receiver_id
            : request.sender_id
    );

    // 3. Search users
    const searchTerm = query.trim();

    let usersQuery = supabase
        .from("users")
        .select("id, username, firstname, lastname, gender, profile_image, interests")
        .or(
            `username.ilike.%${searchTerm}%,firstname.ilike.%${searchTerm}%,lastname.ilike.%${searchTerm}%`
        )
        .neq("id", user.id);

    // Exclude users with pending requests
    if (excludedUserIds.length > 0) {
        usersQuery = usersQuery.not(
            "id",
            "in",
            `(${excludedUserIds.join(",")})`
        );
    }

    const { data: users, error } = await usersQuery
        .range(from, from + limit - 1);

    if (error) {
        throw new Error("Some error occurred: " + error.message);
    }

    // 4. Get the count using exactly the same filters
    let countQuery = supabase
        .from("users")
        .select("*", { count: "exact", head: true })
        .or(
            `username.ilike.%${searchTerm}%,firstname.ilike.%${searchTerm}%,lastname.ilike.%${searchTerm}%`
        )
        .neq("id", user.id);

    if (excludedUserIds.length > 0) {
        countQuery = countQuery.not(
            "id",
            "in",
            `(${excludedUserIds.join(",")})`
        );
    }

    const { count, error: countError } = await countQuery;

    if (countError) {
        throw new Error("Error counting users: " + countError.message);
    }

    const numberOfPages = Math.ceil((count ?? 0) / limit);

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
                    <p className="font-bold">No users found.</p>
                )}

                <Pagination url="/home/search" numPage={numPage} numberOfPages={numberOfPages} query={query} numbers={numbers} />
            </div>
        </div>
    );
};

export default SearchPage;