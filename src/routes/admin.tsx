/* Admin layout — sidebar + auth gate */
import { useEffect, useState } from "react";
import { Outlet, Link, useRouterState, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  FiGrid, FiInbox, FiPackage, FiSettings, FiLogOut, FiMenu, FiX,
  FiHome, FiUser, FiSun, FiMoon, FiLock,
} from "react-icons/fi";
import { FaGlobeAsia } from "react-icons/fa";
import { useApp } from "@/context/AppContext";
import { checkRateLimit, recordFail, recordSuccess, getFailCount, formatRemaining } from "@/utils/loginRateLimit";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin Panel — SmartTour 360" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const { isAdmin, loginAdmin, logoutAdmin, theme, toggleTheme, unreadCount, applications } = useApp();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");
  const [lockMs, setLockMs] = useState(0);
  const [fails, setFails] = useState(0);
  const [busy, setBusy] = useState(false);

  // tick down lockout timer every second while locked
  useEffect(() => {
    if (isAdmin) return;
    setLockMs(checkRateLimit());
    setFails(getFailCount());
    const t = setInterval(() => {
      const r = checkRateLimit();
      setLockMs(r);
      if (r === 0) setFails(getFailCount());
    }, 1000);
    return () => clearInterval(t);
  }, [isAdmin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    const remaining = checkRateLimit();
    if (remaining > 0) {
      setLockMs(remaining);
      setErr(`Juda ko'p urinish. ${formatRemaining(remaining)} dan keyin urinib ko'ring.`);
      return;
    }
    setBusy(true);
    const ok = await loginAdmin(pwd);
    setBusy(false);
    if (ok) {
      recordSuccess();
      setErr("");
      setLockMs(0);
      setFails(0);
    } else {
      const lock = recordFail();
      const newFails = getFailCount();
      setFails(newFails);
      setPwd("");
      if (lock > 0) {
        setLockMs(lock);
        setErr(`Parol noto'g'ri. Hisob ${formatRemaining(lock)} ga bloklandi.`);
      } else {
        const left = Math.max(0, 5 - newFails);
        setErr(left > 0 ? `Parol noto'g'ri. Bloklashgacha ${left} urinish qoldi.` : "Parol noto'g'ri.");
      }
    }
  };

  if (!isAdmin) {
    const locked = lockMs > 0;
    return (
      <div className="grid min-h-screen place-items-center gradient-hero-bg px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="glass-strong w-full max-w-md p-8 text-white shadow-strong">
          <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-gold to-amber-500 text-gold-foreground shadow-gold">
            <FiLock className="size-7" />
          </div>
          <h1 className="mt-5 text-center font-display text-2xl font-extrabold">Admin Panelga kirish</h1>
          <p className="mt-2 text-center text-sm text-white/70">Faqat vakolatli xodimlar uchun. Parol talab qilinadi.</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <input
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder={locked ? "Bloklangan" : "Parol"}
              autoComplete="current-password"
              disabled={locked || busy}
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30 disabled:cursor-not-allowed disabled:opacity-60"
            />
            {err && <div className="rounded-lg bg-red-500/20 px-3 py-2 text-sm text-red-100">{err}</div>}
            {locked && (
              <div className="rounded-lg bg-amber-500/20 px-3 py-2 text-center text-xs text-amber-100">
                Brute-force himoyasi faol. Qoldi: <span className="font-mono font-bold">{formatRemaining(lockMs)}</span>
              </div>
            )}
            <button type="submit" disabled={locked || busy} className="w-full rounded-xl bg-gradient-to-r from-gold to-amber-500 py-3 text-base font-bold text-gold-foreground shadow-gold transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100">
              {busy ? "Tekshirilmoqda..." : locked ? `Kuting (${formatRemaining(lockMs)})` : "Kirish"}
            </button>
            {fails > 0 && !locked && (
              <div className="text-center text-[11px] text-white/50">Muvaffaqiyatsiz urinishlar: {fails}</div>
            )}
            <Link to="/" className="block text-center text-xs text-white/60 underline-offset-4 transition hover:text-white hover:underline">← Bosh sahifaga qaytish</Link>
          </form>
        </motion.div>
      </div>
    );
  }

  const links = [
    { to: "/admin", icon: FiGrid, label: "Dashboard", exact: true },
    { to: "/admin/murojaatlar", icon: FiInbox, label: "Murojaatlar", badge: unreadCount },
    { to: "/admin/content", icon: FiPackage, label: "Kontent" },
    { to: "/admin/settings", icon: FiSettings, label: "Sozlamalar" },
  ];

  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
              <FaGlobeAsia className="size-4" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-gradient">SmartTour 360</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Admin Panel</div>
            </div>
          </Link>
          <button onClick={() => setOpen(false)} className="grid size-8 place-items-center rounded-lg lg:hidden"><FiX /></button>
        </div>

        <nav className="space-y-1 p-3">
          {links.map((l) => {
            const active = l.exact ? pathname === l.to : pathname.startsWith(l.to);
            return (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${active ? "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-soft" : "text-sidebar-foreground/80 hover:bg-sidebar-accent"}`}>
                <l.icon className="size-4" />
                <span className="flex-1">{l.label}</span>
                {l.badge ? (
                  <span className={`grid size-5 place-items-center rounded-full text-[10px] font-bold ${active ? "bg-white/30 text-white" : "bg-destructive text-destructive-foreground"}`}>{l.badge}</span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="absolute inset-x-3 bottom-3 space-y-2">
          <div className="rounded-2xl border border-sidebar-border bg-sidebar-accent/50 p-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white"><FiUser className="size-4" /></div>
              <div className="min-w-0">
                <div className="truncate text-sm font-bold">Administrator</div>
                <div className="truncate text-xs text-muted-foreground">{applications.length} ta murojaat</div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={toggleTheme} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-sidebar-accent py-2.5 text-xs font-semibold transition hover:bg-sidebar-accent/70">
              {theme === "dark" ? <FiSun /> : <FiMoon />} {theme === "dark" ? "Light" : "Dark"}
            </button>
            <Link to="/" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-sidebar-accent py-2.5 text-xs font-semibold transition hover:bg-sidebar-accent/70">
              <FiHome /> Sayt
            </Link>
          </div>
          <button onClick={logoutAdmin} className="flex w-full items-center justify-center gap-2 rounded-xl bg-destructive/15 py-2.5 text-xs font-semibold text-destructive transition hover:bg-destructive hover:text-destructive-foreground">
            <FiLogOut /> Chiqish
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="flex flex-1 flex-col min-w-0">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-card/80 px-4 backdrop-blur-xl lg:px-8">
          <button onClick={() => setOpen(true)} className="grid size-9 place-items-center rounded-lg hover:bg-muted lg:hidden"><FiMenu className="size-5" /></button>
          <div className="text-sm font-semibold text-muted-foreground">
            <Link to="/admin" className="hover:text-primary">Admin</Link>
            {pathname !== "/admin" && <> / <span className="text-foreground">{pathname.split("/").pop()}</span></>}
          </div>
        </header>
        <div className="flex-1 p-4 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
