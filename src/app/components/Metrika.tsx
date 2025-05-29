"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

export function Metrika() {
  const pathName = usePathname();
  const searchParams = useSearchParams();


  useEffect(() => {
  }, [pathName, searchParams]);

  return (
    <Script id="yandex-metrika">
    </Script>
  );
}
