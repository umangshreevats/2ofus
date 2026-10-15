import Features from "@/components/landing-page/Features";
import Invitation from "@/components/landing-page/Invitation";
import Mid from "@/components/landing-page/Mid";
import Working from "@/components/landing-page/Working";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export default async function LandingPage() {

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if(user) {
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
