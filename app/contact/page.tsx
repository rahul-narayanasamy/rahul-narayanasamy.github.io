import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { ConnectCards } from "@/components/home/HomeSections";
import { CopyEmail } from "@/components/pages/CopyEmail";
import styles from "@/components/pages/Misc.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name}: email, LinkedIn or GitHub. Response within 24 hours.`,
  alternates: { canonical: "/contact/" },
};

export default function Contact() {
  return (
    <div className="wrap">
      <header className="page-head">
        <span className="sec-index" aria-hidden="true">
          09
        </span>
        <p className="eyebrow">Available for new opportunities</p>
        <h1>
          Let&apos;s build
          <br />
          something.
        </h1>
        <CopyEmail />
      </header>
      <ConnectCards />
      <ul className={styles.socials}>
        <li className="reveal">
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            <span className="label">GitHub</span>
            <b>@{profile.githubHandle}</b>
            <span aria-hidden="true">↗</span>
          </a>
        </li>
        <li className="reveal" style={{ "--d": "80ms" } as React.CSSProperties}>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <span className="label">LinkedIn</span>
            <b>/in/rahul-narayanasamy</b>
            <span aria-hidden="true">↗</span>
          </a>
        </li>
        <li className="reveal" style={{ "--d": "160ms" } as React.CSSProperties}>
          <a href={profile.medium} target="_blank" rel="noopener noreferrer">
            <span className="label">Medium</span>
            <b>@rahulkishore227</b>
            <span aria-hidden="true">↗</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
