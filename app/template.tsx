"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { pageFor } from "@/lib/pages";
import { useReveal } from "@/lib/hooks";
import { Pager } from "@/components/shell/Pager";

// The first render belongs to the boot loader; every later route change gets the curtain.
let firstRender = true;

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const page = pageFor(pathname);
  const [curtain, setCurtain] = useState(false);

  useLayoutEffect(() => {
    if (!firstRender) setCurtain(true);
    firstRender = false;
  }, []);

  useReveal(pathname);

  return (
    <>
      {curtain && page && (
        <div className="curtain" aria-hidden="true" onAnimationEnd={(e) => e.target === e.currentTarget && setCurtain(false)}>
          <span className="curtain-label">
            <span className="curtain-no">{page.no}</span> {page.no === "00" ? "Index" : page.title}
          </span>
        </div>
      )}
      <div className={curtain ? "page-enter" : undefined}>
        {children}
        <Pager />
      </div>
    </>
  );
}
