
'use client';

import { ShieldCheck, Shield, Bell, HeartHandshake } from "lucide-react";

const features = [
    {
        name: "Security",
        icon: Shield,
        description: "Your conversations and shared moments are protected with secure access, keeping your personal interactions safe."
    },
    {
        name: "Notifications",
        icon: Bell,
        description: "Stay updated with real-time notifications whenever your partner shares something new or interacts with you."
    },
    {
        name: "Couple Profile",
        icon: HeartHandshake,
        description: "Create a shared couple profile to bring your memories, personal details, and special moments together."
    },
    {
        name: "Privacy",
        icon: ShieldCheck,
        description: "Your personal information and shared content remain private, giving you a comfortable space to connect."
    }
];

const Features = () => {
    return (
        <div className="parent-box">
            <div className="child-box grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => {
                    const Icon = feature.icon;

                    return (
                        <div
                            key={index}
                            className="w-full min-w-0 flex flex-col items-center text-center gap-4 p-6 rounded-2xl"
                        >
                            <Icon
                                className="w-14 h-14 text-primary-text"
                                strokeWidth={1.6}
                            />

                            <h4 className="text-xl font-bold text-primary-text">
                                {feature.name}
                            </h4>

                            <p className="text-sm leading-relaxed text-secondary-text">
                                {feature.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Features;
