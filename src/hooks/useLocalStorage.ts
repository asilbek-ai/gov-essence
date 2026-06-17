import { useCallback, useEffect, useState } from "react";

const isBrowser = typeof window !== "undefined";

function read<T>(key: string, initial: T): T {
  if (!isBrowser) return initial;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return initial;
    return JSON.parse(raw) as T;
  } catch {
    return initial;
  }
}

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => read(key, initial));

  useEffect(() => {
    if (!isBrowser) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(new CustomEvent("ls:update", { detail: { key } }));
    } catch {}
  }, [key, value]);

  useEffect(() => {
    if (!isBrowser) return;
    const handler = (e: StorageEvent | CustomEvent) => {
      const k = (e as StorageEvent).key ?? (e as CustomEvent).detail?.key;
      if (k === key) setValue(read(key, initial));
    };
    window.addEventListener("storage", handler as EventListener);
    window.addEventListener("ls:update", handler as EventListener);
    return () => {
      window.removeEventListener("storage", handler as EventListener);
      window.removeEventListener("ls:update", handler as EventListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const update = useCallback((next: T | ((prev: T) => T)) => {
    setValue((prev) => (typeof next === "function" ? (next as (p: T) => T)(prev) : next));
  }, []);

  return [value, update] as const;
}
