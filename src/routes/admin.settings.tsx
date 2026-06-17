/* Admin Settings — reset data, export/import */
import { createFileRoute } from "@tanstack/react-router";
import { useApp } from "@/context/AppContext";
import { FiDownload, FiUpload, FiRefreshCw, FiTrash2, FiInfo } from "react-icons/fi";

export const Route = createFileRoute("/admin/settings")({
  component: Settings,
});

const KEYS = ["st_destinations", "st_hotels", "st_restaurants", "st_events", "st_news", "st_monuments", "st_map_places", "st_applications", "st_nav", "st_stats", "st_bookmarks", "st_likes", "st_itinerary"];

function Settings() {
  const { toast } = useApp();

  const exportAll = () => {
    const data: Record<string, unknown> = {};
    KEYS.forEach((k) => { const v = localStorage.getItem(k); if (v) data[k] = JSON.parse(v); });
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a");
    a.href = url; a.download = `smarttour-backup-${Date.now()}.json`; a.click(); URL.revokeObjectURL(url);
    toast({ title: "Backup yuklab olindi", variant: "success" });
  };

  const importAll = (file: File) => {
    const r = new FileReader();
    r.onload = () => {
      try {
        const data = JSON.parse(String(r.result));
        Object.entries(data).forEach(([k, v]) => localStorage.setItem(k, JSON.stringify(v)));
        toast({ title: "Import muvaffaqiyatli", description: "Sahifani yangilang", variant: "success" });
        setTimeout(() => window.location.reload(), 1200);
      } catch { toast({ title: "Fayl noto'g'ri", variant: "error" }); }
    };
    r.readAsText(file);
  };

  const resetAll = () => {
    if (!confirm("Hamma ma'lumotlar boshlang'ich holatga qaytariladi. Davom etilsinmi?")) return;
    KEYS.forEach((k) => localStorage.removeItem(k));
    toast({ title: "Reset bajarildi", description: "Sahifa yangilanadi", variant: "info" });
    setTimeout(() => window.location.reload(), 800);
  };

  return (
    <div className="max-w-3xl space-y-5">
      <div>
        <h1 className="font-display text-3xl font-extrabold">Sozlamalar</h1>
        <p className="text-sm text-muted-foreground">Backup, import va boshlang'ich holatga qaytarish</p>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <h2 className="font-bold">Ma'lumotlar bazasi (LocalStorage)</h2>
        <p className="mt-1 text-sm text-muted-foreground">Barcha ma'lumotlar foydalanuvchi brauzerida saqlanadi. Backend ishlatilmaydi.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <button onClick={exportAll} className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 px-4 py-3 text-sm font-bold text-white shadow-soft transition hover:scale-[1.02]">
            <FiDownload className="size-4" /> Backup yuklash
          </button>
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-soft transition hover:scale-[1.02]">
            <FiUpload className="size-4" /> Backup yuklash
            <input type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files?.[0] && importAll(e.target.files[0])} />
          </label>
          <button onClick={resetAll} className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 px-4 py-3 text-sm font-bold text-white shadow-soft transition hover:scale-[1.02]">
            <FiRefreshCw className="size-4" /> Reset
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <h2 className="font-bold">Saqlash kalitlari</h2>
        <div className="mt-3 grid gap-1.5 text-xs font-mono">
          {KEYS.map((k) => {
            const v = typeof window !== "undefined" ? localStorage.getItem(k) : null;
            const size = v ? new Blob([v]).size : 0;
            return (
              <div key={k} className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2">
                <span>{k}</span>
                <span className="text-muted-foreground">{size > 1024 ? `${(size / 1024).toFixed(1)} KB` : `${size} B`}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-3xl border border-amber-500/30 bg-amber-500/10 p-5 text-sm text-amber-700 dark:text-amber-200">
        <div className="flex items-start gap-2">
          <FiInfo className="mt-0.5 size-4 shrink-0" />
          <div>
            <div className="font-bold">Admin parol</div>
            <div className="mt-1 opacity-90">Default parol: <span className="rounded bg-amber-500/20 px-1.5 py-0.5 font-mono">admin123</span>. Production uchun kontekstda o'zgartiring.</div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <h2 className="font-bold">Ma'lumotni o'chirish (alohida)</h2>
        <p className="mt-1 text-sm text-muted-foreground">Faqat tanlangan ma'lumot bazasini o'chirish.</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {KEYS.map((k) => (
            <button key={k} onClick={() => { if (confirm(`${k} o'chirilsinmi?`)) { localStorage.removeItem(k); toast({ title: "O'chirildi", description: k, variant: "info" }); setTimeout(() => window.location.reload(), 600); } }} className="flex items-center gap-1.5 rounded-lg border border-border bg-muted/40 px-2.5 py-1.5 text-xs font-semibold transition hover:bg-destructive hover:text-destructive-foreground">
              <FiTrash2 className="size-3" /> {k.replace("st_", "")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
