import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FiMenu, FiX, FiSun, FiMoon, FiBell, FiSearch, FiUser } from "react-icons/fi";
import { FaGlobeAsia, FaBookmark } from "react-icons/fa";
import { useApp } from "@/context/AppContext";
import { LANGUAGES, tr } from "@/utils/translations";

export function Header() {
  const { lang, setLang, theme, toggleTheme, bookmarks, unreadCount, isAdmin, nav } = useApp();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const visibleNav = nav.filter((n) => n.visible).sort((a, b) => a.order - b.order);

  return (
    <>
      {/* Top gov bar */}
      <div className="hidden bg-primary text-primary-foreground md:block">
        <div className="container mx-auto flex h-9 items-center justify-between px-4 text-xs">
          <div className="flex items-center gap-4">
            <span className="opacity-90">🇺🇿 O'zbekiston Respublikasi turizm portali</span>
            <span className="opacity-60">|</span>
            <a href="tel:1011" className="opacity-90 transition hover:opacity-100">📞 1011 (24/7 yordam)</a>
          </div>
          <div className="flex items-center gap-3 opacity-90">
            <a href="#" className="transition hover:opacity-100">Maxsus imkoniyatlar</a>
            <span className="opacity-50">|</span>
            <a href="#" className="transition hover:opacity-100">Saytni baholash</a>
          </div>
        </div>
      </div>

      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled ? "color-mix(in oklab, var(--background) 80%, transparent)" : "transparent",
          borderBottomColor: scrolled ? "var(--border)" : "transparent",
        }}
        className="sticky top-0 z-50 border-b backdrop-blur-xl"
      >
        <div className="container mx-auto flex h-16 items-center justify-between gap-3 px-4 md:h-20">
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-glow">
              <FaGlobeAsia className="size-5" />
            </div>
            <div className="hidden flex-col leading-tight sm:flex">
              <span className="text-base font-extrabold tracking-tight text-gradient">SmartTour 360</span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Premium platform</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {visibleNav.map((n) => {
              const isHash = n.href.includes("#");
              const label = n.label[lang] || n.label.uz;
              return isHash ? (
                <a key={n.id} href={n.href} className="story-link rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-muted hover:text-primary">
                  {label}
                </a>
              ) : (
                <Link key={n.id} to={n.href} className="story-link rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-muted hover:text-primary">
                  {label}
                </Link>
              );
            })}
            <Link to="/admin" className="ml-2 rounded-lg bg-gradient-to-r from-primary to-primary-glow px-3 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90">
              {tr("nav_admin", lang)}
            </Link>
          </nav>

          <div className="flex items-center gap-1.5">
            <button onClick={() => setSearchOpen((v) => !v)} className="grid size-9 place-items-center rounded-lg text-foreground/80 transition hover:bg-muted hover:text-primary" aria-label="Search">
              <FiSearch className="size-4" />
            </button>

            {isAdmin && (
              <Link to="/admin" className="relative grid size-9 place-items-center rounded-lg text-foreground/80 transition hover:bg-muted hover:text-primary" aria-label="Notifications">
                <FiBell className="size-4" />
                {unreadCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Link>
            )}

            <Link to="/" hash="bookmarks" className="relative hidden size-9 place-items-center rounded-lg text-foreground/80 transition hover:bg-muted hover:text-primary md:grid" aria-label="Bookmarks">
              <FaBookmark className="size-3.5" />
              {bookmarks.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-gold text-[10px] font-bold text-gold-foreground">{bookmarks.length}</span>
              )}
            </Link>

            <button onClick={toggleTheme} className="grid size-9 place-items-center rounded-lg text-foreground/80 transition hover:bg-muted hover:text-primary" aria-label="Toggle theme">
              {theme === "dark" ? <FiSun className="size-4" /> : <FiMoon className="size-4" />}
            </button>

            <div className="ml-1 hidden items-center gap-0.5 rounded-lg bg-muted p-0.5 md:flex">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`rounded-md px-2 py-1 text-xs font-semibold transition ${
                    lang === l.code ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l.code.toUpperCase()}
                </button>
              ))}
            </div>

            <button onClick={() => setOpen((v) => !v)} className="grid size-9 place-items-center rounded-lg text-foreground/80 transition hover:bg-muted lg:hidden" aria-label="Menu">
              {open ? <FiX className="size-5" /> : <FiMenu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Search panel */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-border bg-card/80 backdrop-blur-xl">
              <div className="container mx-auto px-4 py-4">
                <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    autoFocus
                    placeholder={tr("search", lang) + "..."}
                    className="w-full rounded-2xl border border-border bg-background py-3 pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {["Registon", "Mehmonxonalar", "Restoranlar", "360° tur", "Murojaat"].map((s) => (
                    <button key={s} className="rounded-full bg-muted px-3 py-1 transition hover:bg-primary hover:text-primary-foreground">{s}</button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-border bg-card/95 backdrop-blur-xl lg:hidden">
              <div className="container mx-auto flex flex-col gap-1 px-4 py-4">
                {visibleNav.map((n) => {
                  const label = n.label[lang] || n.label.uz;
                  return n.href.includes("#") ? (
                    <a key={n.id} href={n.href} className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition hover:bg-muted">{label}</a>
                  ) : (
                    <Link key={n.id} to={n.href} className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition hover:bg-muted">{label}</Link>
                  );
                })}
                <Link to="/admin" className="mt-2 rounded-lg bg-gradient-to-r from-primary to-primary-glow px-3 py-2.5 text-center text-sm font-semibold text-primary-foreground">
                  {tr("nav_admin", lang)}
                </Link>
                <div className="mt-3 flex items-center justify-center gap-1 rounded-xl bg-muted p-1">
                  {LANGUAGES.map((l) => (
                    <button key={l.code} onClick={() => setLang(l.code)} className={`flex-1 rounded-lg px-2 py-1.5 text-xs font-semibold transition ${lang === l.code ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
                      {l.flag} {l.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
