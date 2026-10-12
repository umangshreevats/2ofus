'use client';
import { ShieldCheck, Shield, Bell, HeartHandshake } from "lucide-react";


const features = [
    {
        name: "Security",
        icon: Shield,
        description: "The app provide the amount of security, among the couples for them to securely text each other"
    },
    {
        name: "Notifications",
        icon: Bell,
        description: "Real-time notifications for different users, from their couples!"
    },
    {
        name: "Couple Profile",
        icon: HeartHandshake,
        description: "Build couple profile with one another for sharing data among each other"
    },
    {
        name: "Privacy",
        icon: ShieldCheck,
        description: "Privacy is also being provided by the application"
    }
]
const Features = () => {


    return <div className="parent-box"><div className="child-box grid grid-cols-2 sm:grid-cols-4">
        {features.map((feature, index) => {

            const Icon = feature.icon;
            return <div key={index} className="w-full h-full aspect-square flex flex-col items-center gap-5 p-2">
                <Icon size={100} className="text-primary-text" />
                <h4 className="text-lg font-bold">{feature.name}</h4>
                <p className="text-sm">{feature.description}</p>
            </div>
        })}
    </div></div>
}

export default Features;