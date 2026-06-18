/* Global app context — Theme, Language, Storage (LocalStorage state), Toast, Bookmarks, Likes */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  seedDestinations, seedHotels, seedRestaurants, seedEvents,
  seedNews, seedMonuments, seedMapPlaces, seedApplications,
  seedNav, seedStats,
  type Destination, type Hotel, type Restaurant, type EventItem,
  type NewsItem, type Monument, type MapPlace, type Application,
  type NavItem, type SiteStats,
} from "@/data/seed";
import type { Lang } from "@/utils/translations";

/* ---------- Theme ---------- */
type Theme = "light" | "dark";

/* ---------- Toasts ---------- */
export type ToastVariant = "success" | "error" | "info" | "warning";
export interface ToastMsg { id: string; title: string; description?: string; variant: ToastVariant; }

interface AppContextValue {
  // i18n
  lang: Lang; setLang: (l: Lang) => void;
  // theme
  theme: Theme; toggleTheme: () => void; setTheme: (t: Theme) => void;
  // data
  destinations: Destination[]; setDestinations: (v: Destination[] | ((p: Destination[]) => Destination[])) => void;
  hotels: Hotel[]; setHotels: (v: Hotel[] | ((p: Hotel[]) => Hotel[])) => void;
  restaurants: Restaurant[]; setRestaurants: (v: Restaurant[] | ((p: Restaurant[]) => Restaurant[])) => void;
  events: EventItem[]; setEvents: (v: EventItem[] | ((p: EventItem[]) => EventItem[])) => void;
  news: NewsItem[]; setNews: (v: NewsItem[] | ((p: NewsItem[]) => NewsItem[])) => void;
  monuments: Monument[]; setMonuments: (v: Monument[] | ((p: Monument[]) => Monument[])) => void;
  mapPlaces: MapPlace[]; setMapPlaces: (v: MapPlace[] | ((p: MapPlace[]) => MapPlace[])) => void;
  applications: Application[]; setApplications: (v: Application[] | ((p: Application[]) => Application[])) => void;
  nav: NavItem[]; setNav: (v: NavItem[] | ((p: NavItem[]) => NavItem[])) => void;
  stats: SiteStats; setStats: (v: SiteStats | ((p: SiteStats) => SiteStats)) => void;
  // bookmarks / likes / itinerary
  bookmarks: string[]; toggleBookmark: (key: string) => void;
  likes: Record<string, number>; toggleLike: (key: string) => void;
  itinerary: { id: string; name: string; desc: string }[];
  addItinerary: (item: { id: string; name: string; desc: string }) => void;
  removeItinerary: (id: string) => void;
  clearItinerary: () => void;
  reorderItinerary: (items: { id: string; name: string; desc: string }[]) => void;
  // toasts
  toasts: ToastMsg[]; toast: (m: Omit<ToastMsg, "id">) => void; dismissToast: (id: string) => void;
  // admin
  isAdmin: boolean; loginAdmin: (pwd: string) => boolean; logoutAdmin: () => void;
  // notifications (admin-side)
  unreadCount: number;
  // visitor counter
  visitorCount: number;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  // theme
  const [theme, setThemeState] = useLocalStorage<Theme>("st_theme", "light");
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  const setTheme = useCallback((t: Theme) => setThemeState(t), [setThemeState]);
  const toggleTheme = useCallback(() => setThemeState((t) => (t === "light" ? "dark" : "light")), [setThemeState]);

  // language
  const [lang, setLang] = useLocalStorage<Lang>("st_lang", "uz");

  // data
  const [destinations, setDestinations] = useLocalStorage("st_destinations", seedDestinations);
  const [hotels, setHotels] = useLocalStorage("st_hotels", seedHotels);
  const [restaurants, setRestaurants] = useLocalStorage("st_restaurants", seedRestaurants);
  const [events, setEvents] = useLocalStorage("st_events", seedEvents);
  const [news, setNews] = useLocalStorage("st_news", seedNews);
  const [monuments, setMonuments] = useLocalStorage("st_monuments", seedMonuments);
  const [mapPlaces, setMapPlaces] = useLocalStorage("st_map_places", seedMapPlaces);
  const [applications, setApplications] = useLocalStorage("st_applications", seedApplications);
  const [nav, setNav] = useLocalStorage("st_nav", seedNav);
  const [stats, setStats] = useLocalStorage("st_stats", seedStats);

  // bookmarks / likes / itinerary
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>("st_bookmarks", []);
  const toggleBookmark = useCallback((key: string) => {
    setBookmarks((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  }, [setBookmarks]);

  const [likes, setLikes] = useLocalStorage<Record<string, number>>("st_likes", {});
  const toggleLike = useCallback((key: string) => {
    setLikes((prev) => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
  }, [setLikes]);

  const [itinerary, setItinerary] = useLocalStorage<{ id: string; name: string; desc: string }[]>("st_itinerary", []);
  const addItinerary = useCallback((item: { id: string; name: string; desc: string }) => {
    setItinerary((prev) => (prev.find((i) => i.id === item.id) ? prev : [...prev, item]));
  }, [setItinerary]);
  const removeItinerary = useCallback((id: string) => setItinerary((prev) => prev.filter((i) => i.id !== id)), [setItinerary]);
  const clearItinerary = useCallback(() => setItinerary([]), [setItinerary]);
  const reorderItinerary = useCallback((items: { id: string; name: string; desc: string }[]) => setItinerary(items), [setItinerary]);

  // toasts
  const [toasts, setToasts] = useState<ToastMsg[]>([]);
  const dismissToast = useCallback((id: string) => setToasts((p) => p.filter((t) => t.id !== id)), []);
  const toast = useCallback((m: Omit<ToastMsg, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((p) => [...p, { ...m, id }]);
    setTimeout(() => dismissToast(id), 4500);
  }, [dismissToast]);

  // admin — sessionStorage only (cleared on tab close); password is SHA-256 compared
  // Default password hash corresponds to a secret that must be configured via
  // VITE_ADMIN_PASSWORD_HASH at deploy time. The literal password is NOT in source.
  const ADMIN_HASH = (import.meta.env.VITE_ADMIN_PASSWORD_HASH as string | undefined)
    || "614802f3ef19fb017be5599a7869269b7aa5ed2ba234ffa881eb2c4a85c43da2";
  const SESSION_SECRET = "st_admin_session_v1";
  const [isAdmin, setIsAdminState] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const tok = window.sessionStorage.getItem("st_admin_token");
      if (tok && tok.length >= 32) setIsAdminState(true);
    } catch {}
  }, []);
  const sha256 = async (s: string) => {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
  };
  const loginAdmin = useCallback((pwd: string) => {
    // Synchronous wrapper — schedules async verification and returns optimistic boolean.
    // We perform real verification synchronously via a sync hash isn't possible; use a small
    // async IIFE and return a Promise-like by writing the token only on success.
    void (async () => {
      try {
        const h = await sha256(pwd);
        if (h === ADMIN_HASH) {
          const token = (crypto.getRandomValues(new Uint8Array(24)) as Uint8Array)
            .reduce((acc, b) => acc + b.toString(16).padStart(2, "0"), "");
          window.sessionStorage.setItem("st_admin_token", token);
          window.sessionStorage.setItem("st_admin_secret_v", SESSION_SECRET);
          setIsAdminState(true);
        }
      } catch {}
    })();
    return true; // UI handles error feedback via post-check of isAdmin
  }, [ADMIN_HASH]);
  const logoutAdmin = useCallback(() => {
    try {
      window.sessionStorage.removeItem("st_admin_token");
      window.sessionStorage.removeItem("st_admin_secret_v");
    } catch {}
    setIsAdminState(false);
  }, []);
  // Clean up any legacy localStorage flag from earlier versions
  useEffect(() => {
    try { window.localStorage.removeItem("st_is_admin"); } catch {}
  }, []);

  // visitor
  const [visitorCount, setVisitorCount] = useLocalStorage<number>("st_visitors", 12483);
  useEffect(() => {
    setVisitorCount((c) => c + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unreadCount = useMemo(() => applications.filter((a) => !a.read).length, [applications]);

  const value: AppContextValue = {
    lang, setLang, theme, toggleTheme, setTheme,
    destinations, setDestinations, hotels, setHotels, restaurants, setRestaurants,
    events, setEvents, news, setNews, monuments, setMonuments,
    mapPlaces, setMapPlaces, applications, setApplications, nav, setNav, stats, setStats,
    bookmarks, toggleBookmark, likes, toggleLike,
    itinerary, addItinerary, removeItinerary, clearItinerary, reorderItinerary,
    toasts, toast, dismissToast,
    isAdmin, loginAdmin, logoutAdmin,
    unreadCount, visitorCount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
