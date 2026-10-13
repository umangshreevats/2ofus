'use client';
import { useState, SetStateAction, FormEvent } from "react";
import Button from "../commons/Button";
import { X } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";


// This component is very complicated, rather than dividing the sign in, and sign up pages in two different component,
// it wraps both in same, to slow up down the separate operations
const Auth = ({ setOpen, signIn: si }: { signIn: boolean, setOpen: React.Dispatch<SetStateAction<boolean>> }) => {

    const [signIn, setSign] = useState(si);

    // Body: To be send to backend for storage
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSignInSubmit = (e: FormEvent) => {

        e.preventDefault();
        alert("Email: " + email + "\nPassword: " + password);
        setUsername("");
        setEmail("");
        setPassword("");
    }

    const handleSignUpSubmit = (e: FormEvent) => {

        e.preventDefault();
        alert("Username: " + username + "\nEmail: " + email + "\nPassword: " + password);
        setUsername("");
        setEmail("");
        setPassword("");
    }


    return <>
    {signIn ? 
    
    <form 
    onSubmit={handleSignInSubmit} 
    className="w-[400px] bg-background text-primary-text 
    gap-5 h-[500px] flex flex-col items-center p-5"
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
        <Button text="Sign In" width={100} wscale="%" />

        <div className="w-full flex justify-center">{signIn ? "Don't have an account yet? " : "Already have an account! "} <button
            onClick={() => setSign(!signIn)}
            type="button" className="cursor-pointer text-secondary-text inline">{signIn ? " sign-up" : " sign-in"}</button></div>

        <div className="w-full flex gap-1 items-center">
            <div className="w-full bg-secondary-text h-0.5" />
            <span className="text-secondary-text">or</span>
            <div className="w-full bg-secondary-text h-0.5" />
        </div>

        {/*Google Oauth Button*/}
        <Button width={100} wscale="%" type="button" backgroundColor="white" textColor="black" text="Continue with Google" icon={FcGoogle} />
    </form> : 
    <form onSubmit={handleSignUpSubmit} 
    className="w-[400px] bg-background text-primary-text gap-5 
    h-[500px] flex flex-col items-center p-5">

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
        <Button text="Sign Up" width={100} wscale="%" />

        <div className="w-full flex justify-center">{signIn ? "Don't have an account yet? " : "Already have an account! "} <button
            onClick={() => setSign(!signIn)}
            type="button" className="cursor-pointer text-secondary-text inline">{signIn ? "sign-up" : "sign-in"}</button></div>

        <div className="w-full flex gap-1 items-center">
            <div className="w-full bg-secondary-text h-0.5" />
            <span className="text-secondary-text">or</span>
            <div className="w-full bg-secondary-text h-0.5" />
        </div>

        {/*Google Oauth Button*/}
        <Button width={100} wscale="%" type="button" backgroundColor="white" textColor="black" text="Continue with Google" icon={FcGoogle} />
    </form>}
    </>
}

export default Auth;