import Features from "@/components/landing-page/Features";
import Invitation from "@/components/landing-page/Invitation";
import Mid from "@/components/landing-page/Mid";
import Working from "@/components/landing-page/Working";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LandingPage() {

  const { user, userData } = await getCurrentUser();

  if (user && userData) {
    redirect("/home");
  }

  return (
    <section className="min-h-screen">
      <Mid />
      <Features />
      <Working />
      <Invitation />
    </section>
  );
}
