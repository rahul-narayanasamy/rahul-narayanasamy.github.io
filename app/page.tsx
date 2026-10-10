import { Hero } from "@/components/home/Hero";
import { ConnectCards, CurrentRole, Directory } from "@/components/home/HomeSections";
import { Contributions } from "@/components/home/Contributions";
import { SessionCard } from "@/components/home/SessionCard";
import { Marquee } from "@/components/shell/Marquee";
import { ticker } from "@/content/skills";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={ticker} sep="◆" />
      <CurrentRole />
      <Directory />
      <Contributions />
      <section className="wrap section" aria-label="Contact">
        <ConnectCards />
      </section>
      <Marquee items={["Open source", "Side projects", "Always building", "Clean commits", "Ship & iterate"]} accent />
      <SessionCard />
    </>
  );
}
