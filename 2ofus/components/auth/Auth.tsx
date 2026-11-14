'use client';
import React, { useState, SetStateAction, FormEvent } from "react";
import Button from "../commons/Button";
import { X } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


// This component is very complicated, rather than dividing the sign in, and sign up pages in two different component,
// it wraps both in same, to slow up down the separate operations
const Auth = ({ setOpen, signIn: si }: { signIn: boolean, setOpen: React.Dispatch<SetStateAction<boolean>> }) => {

    const router = useRouter();
    const supabase = createClient();

    const [signIn, setSign] = useState(si);

    // Body: To be send to backend for storage
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        setLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setLoading(false);
            alert(error.message);
            return;
        }

        const userId = data.user.id;
        // Fetching username for the user

        const { data: profile, error: profileError } = await supabase
            .from("users")
            .select("username, is_profile_completed")
            .eq("id", userId)
            .single();

        setLoading(false);
        if (profileError || !profile) {
            toast.error("Something went wrong: " + profileError.message);
            return;
        }

        if (profile.is_profile_completed) {
            router.push("/home");
        }

        router.push(`/profile/@${profile.username}`);
        router.refresh();

        toast.success("You signed in successfully!");
    }



    const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        setLoading(true);

        if (username.length === 0 || email.length === 0 || password.length === 0) {
            toast.error("Some or all entries are empty");
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username
                },
                emailRedirectTo: 'https://2ofus-drab.vercel.app/'
            }
        });

        setLoading(false);

        if (error) {
            toast.error("Something went wrong: " + error.message);
            return;
        }

        if (data.session) {
            // User is authenticated immediately.
            router.push(`/profile/@${username}`);
        } else {
            // Email confirmation is enabled.
            toast("Please check your email to verify your account, then sign in with same credentials.");
        }

        router.refresh();
    }


    return <>
        {signIn ?

            <form
                onSubmit={handleSignInSubmit}
                className="w-full sm:w-[400px] bg-background text-primary-text 
    gap-5 flex flex-col items-center p-5"
            >
                {/*Form to handle the Sign In*/}
                <div className="w-full flex justify-between">
                    <h3 className="text-3xl font-bold">Sign In</h3>
                    <button type="button" onClick={() => setOpen(false)} className="cursor-pointer">
                        <X />
                    </button>
                </div>

                {/*User Email*/}
                <label htmlFor="email" className="w-full">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" className="w-full p-2 outline-accent rounded-sm" placeholder="Enter Email" />
                </label>

                {/*User Password*/}
                <label htmlFor="password" className="w-full">
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full p-2 outline-accent rounded-sm" placeholder="Enter Password" />
                </label>

                {/*Submit Button*/}
                <Button text={loading ? "Signning In..." : "Sign In"} disabled={loading} width={100} wscale="%" />

                <div className="w-full flex justify-center">{signIn ? "Don't have an account yet? " : "Already have an account! "} <button
                    onClick={() => setSign(!signIn)}
                    disabled={loading}
                    type="button" className="ml-2 cursor-pointer text-secondary-text inline">{signIn ? " sign-up" : " sign-in"}</button></div>
            </form> :
            <form onSubmit={handleSignUpSubmit}
                className="w-full sm:w-[400px] bg-background text-primary-text gap-5 flex flex-col items-center p-5">

                {/*Form to handle Sign up*/}
                <div className="w-full flex justify-between">
                    <h3 className="text-3xl font-bold">Sign Up</h3>
                    <button type="button" onClick={() => setOpen(false)} className="cursor-pointer">
                        <X />
                    </button>
                </div>

                {/*User Username*/}
                <label htmlFor="username" className="w-full">
                    <input value={username} onChange={(e) => setUsername(e.target.value)} id="username" type="text" className="w-full p-2 outline-accent rounded-sm" placeholder="Enter Username" />
                </label>

                {/*User Email*/}
                <label htmlFor="email" className="w-full">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" className="w-full p-2 outline-accent rounded-sm" placeholder="Enter Email" />
                </label>

                {/*User Password*/}
                <label htmlFor="password" className="w-full">
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full p-2 outline-accent rounded-sm" placeholder="Enter Password" />
                </label>

                {/*Submit Button*/}
                <Button text={loading ? "Signning up..." : `Sign Up`} disabled={loading} width={100} wscale="%" />

                <div className="w-full flex justify-center">{signIn ? "Don't have an account yet?" : "Already have an account!"}
                    <button
                        onClick={() => setSign(!signIn)}
                        disabled={loading}
                        type="button" className="ml-2 cursor-pointer text-secondary-text inline"> {signIn ? "sign-up" : "sign-in"}</button>
                </div>

            </form>}
    </>
}

export default Auth;