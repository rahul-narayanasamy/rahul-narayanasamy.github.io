"use client";

import { useEffect, useState } from "react";
import styles from "./Toast.module.css";

export function Toast() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let timer: number | undefined;
    const onToast = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setMessage(null), 2200);
    };
    window.addEventListener("toast", onToast);
    return () => {
      window.removeEventListener("toast", onToast);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div role="status" aria-live="polite" className={`${styles.toast} ${message ? styles.on : ""}`}>
      <span className="red">&gt;</span> {message}
    </div>
  );
}
