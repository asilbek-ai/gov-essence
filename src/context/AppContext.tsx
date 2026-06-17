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

  // admin
  const [isAdmin, setIsAdmin] = useLocalStorage<boolean>("st_is_admin", false);
  const loginAdmin = useCallback((pwd: string) => {
    if (pwd === "admin123") { setIsAdmin(true); return true; }
    return false;
  }, [setIsAdmin]);
  const logoutAdmin = useCallback(() => setIsAdmin(false), [setIsAdmin]);

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
