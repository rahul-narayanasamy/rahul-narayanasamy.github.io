"use client";

import { profile } from "@/content/profile";
import { copyEmail } from "@/lib/actions";
import styles from "./Misc.module.css";

/** The address itself is the big call to action: click to copy, with mailto as the fallback. */
export function CopyEmail() {
  return (
    <div className={styles.emailRow}>
      <button type="button" className={styles.email} onClick={copyEmail} aria-label={`Copy ${profile.email}`}>
        <span>{profile.email}</span>
        <span className={styles.emailHint}>Click to copy</span>
      </button>
    </div>
  );
}
