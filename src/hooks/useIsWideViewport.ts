import { useState, useEffect } from "react";

const MIN_WIDTH = 1280;

export function useIsWideViewport(): boolean {
  const [isWideViewport, setIsWideViewport] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(`(min-width: ${MIN_WIDTH}px)`).matches
      : true
  );

  useEffect(() => {
    const query = window.matchMedia(`(min-width: ${MIN_WIDTH}px)`);
    const handler = (e: MediaQueryListEvent) => setIsWideViewport(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return isWideViewport;
}
