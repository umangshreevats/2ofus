'use client';
import { useState, SetStateAction, FormEvent } from "react";
import Button from "../commons/Button";
import { X } from 'lucide-react';

const Auth = ({ setOpen, signIn: si }: { signIn: boolean, setOpen: React.Dispatch<SetStateAction<boolean>> }) => {

    const [signIn, setSign] = useState(si);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSignInSubmit = (e: FormEvent) => {

        e.preventDefault();
        alert("Email: "+email+"\nPassword: "+password);
        setUsername("");
        setEmail("");
        setPassword("");
    }

    const handleSignUpSubmit = (e: FormEvent) => {

        e.preventDefault();
        alert("Username: "+username+"\nEmail: "+email+"\nPassword: "+password);
        setUsername("");
        setEmail("");
        setPassword("");
    }


    return <>{signIn ? <form onSubmit={handleSignInSubmit} className="w-[400px] bg-background text-primary-text gap-5 h-[500px] flex flex-col items-center p-5">
        <div className="w-full flex justify-between">
            <h3 className="text-3xl font-bold">Sign In</h3>
            <button type="button" onClick={() => setOpen(false)} className="cursor-pointer">
                <X />
            </button>
        </div>
        <label htmlFor="email" className="w-full">
            <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" className="w-full p-2 outline-accent rounded-sm" placeholder="Enter Email" />
        </label>

        <label htmlFor="password" className="w-full">
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full p-2 outline-accent rounded-sm" placeholder="Enter Password" />
        </label>

        <Button text="Sign In" width={100} wscale="%" />

        <div className="w-full flex justify-center">{signIn ? "Don't have an account yet? " : "Already have an account! "} <button
            onClick={() => setSign(!signIn)}
            type="button" className="cursor-pointer text-secondary-text inline">{signIn ? "sign-up" : "sign-in"}</button></div>
    </form> : <form onSubmit={handleSignUpSubmit} className="w-[400px] bg-background text-primary-text gap-5 h-[500px] flex flex-col items-center p-5">
        <div className="w-full flex justify-between">
            <h3 className="text-3xl font-bold">Sign Up</h3>
            <button type="button" onClick={() => setOpen(false)} className="cursor-pointer">
                <X />
            </button>
        </div>

        <label htmlFor="username" className="w-full">
            <input value={username} onChange={(e) => setUsername(e.target.value)} id="username" type="text" className="w-full p-2 outline-accent rounded-sm" placeholder="Enter Username" />
        </label>

        <label htmlFor="email" className="w-full">
            <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" className="w-full p-2 outline-accent rounded-sm" placeholder="Enter Email" />
        </label>

        <label htmlFor="password" className="w-full">
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full p-2 outline-accent rounded-sm" placeholder="Enter Password" />
        </label>

        <Button text="Sign Up" width={100} wscale="%" />

        <div className="w-full flex justify-center">{signIn ? "Don't have an account yet? " : "Already have an account! "} <button
            onClick={() => setSign(!signIn)}
            type="button" className="cursor-pointer text-secondary-text inline">{signIn ? "sign-up" : "sign-in"}</button></div>
    </form>}
    </>
}

export default Auth;