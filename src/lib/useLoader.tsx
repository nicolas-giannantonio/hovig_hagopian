"use client";

import { useEffect, useState } from "react";

export function useLoaded(): boolean {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (typeof window !== "undefined" && window.appLoaded) {
      setLoaded(true);
      return;
    }

    const handleLoaded = () => {
      setLoaded(true);
    };

    window.addEventListener("app-loaded", handleLoaded);

    return () => {
      window.removeEventListener("app-loaded", handleLoaded);
    };
  }, []);

  return loaded;
}
