import Features from "@/components/landing-page/Features";
import Mid from "@/components/landing-page/Mid";
import Working from "@/components/landing-page/Working";

export default function Home() {
  return (
    <section className="min-h-screen">
      <Mid />
      <Features />
      <Working />
    </section>
  );
}
