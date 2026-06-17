/* Admin Content manager — CRUD + visibility + reorder for all content types */
import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { useApp } from "@/context/AppContext";
import { Modal } from "@/components/ui/Modal";

export const Route = createFileRoute("/admin/content")({
  component: AdminContent,
});

const TABS = [
  { key: "destinations", label: "Yo'nalishlar", emoji: "🗺️" },
  { key: "hotels", label: "Mehmonxonalar", emoji: "🏨" },
  { key: "restaurants", label: "Restoranlar", emoji: "🍽️" },
  { key: "events", label: "Tadbirlar", emoji: "🎉" },
  { key: "news", label: "Yangiliklar", emoji: "📰" },
  { key: "monuments", label: "Obidalar", emoji: "🏛️" },
  { key: "nav", label: "Menyu", emoji: "📑" },
] as const;
type Tab = typeof TABS[number]["key"];

function AdminContent() {
  const [tab, setTab] = useState<Tab>("destinations");
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-3xl font-extrabold">Kontent boshqaruvi</h1>
        <p className="text-sm text-muted-foreground">Saytdagi barcha bo'limlarni boshqaring</p>
      </div>
      <div className="flex flex-wrap gap-1.5 rounded-2xl border border-border bg-card p-1.5 shadow-soft">
        {TABS.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition ${tab === t.key ? "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-soft" : "text-muted-foreground hover:bg-muted"}`}>
            <span>{t.emoji}</span> {t.label}
          </button>
        ))}
      </div>
      <ContentTable tab={tab} />
    </div>
  );
}

function ContentTable({ tab }: { tab: Tab }) {
  const app = useApp();
  // map tab to data + setter
  const data = useMemo(() => {
    switch (tab) {
      case "destinations": return { list: app.destinations, set: app.setDestinations, cols: ["name", "subtitle", "rating"], titleField: "name" };
      case "hotels": return { list: app.hotels, set: app.setHotels, cols: ["name", "city", "pricePerNight"], titleField: "name" };
      case "restaurants": return { list: app.restaurants, set: app.setRestaurants, cols: ["name", "cuisine", "rating"], titleField: "name" };
      case "events": return { list: app.events, set: app.setEvents, cols: ["title", "location", "date"], titleField: "title" };
      case "news": return { list: app.news, set: app.setNews, cols: ["title", "category"], titleField: "title" };
      case "monuments": return { list: app.monuments, set: app.setMonuments, cols: ["name", "location"], titleField: "name" };
      case "nav": return { list: app.nav, set: app.setNav, cols: ["key", "href"], titleField: "key" };
    }
  }, [tab, app]);

  const [edit, setEdit] = useState<Record<string, unknown> | null>(null);
  const [adding, setAdding] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const get = (item: any, field: string) => {
    const v = item[field];
    if (v && typeof v === "object" && "uz" in v) return v.uz;
    return v ?? "—";
  };

  const toggleVisible = (id: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data.set as any)((data.list as any[]).map((x: any) => x.id === id ? { ...x, visible: !x.visible } : x));
  };
  const move = (id: string, dir: -1 | 1) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const arr = [...(data.list as any[])].sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
    const i = arr.findIndex((x) => x.id === id);
    const j = i + dir; if (j < 0 || j >= arr.length) return;
    const tmp = arr[i].order ?? i; arr[i].order = arr[j].order ?? j; arr[j].order = tmp;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data.set as any)([...arr]);
  };
  const remove = (id: string) => {
    if (!confirm("O'chirilsinmi?")) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data.set as any)((data.list as any[]).filter((x: any) => x.id !== id));
    app.toast({ title: "O'chirildi", variant: "info" });
  };
  const save = (item: Record<string, unknown>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const list = data.list as any[];
    if (adding) {
      const newItem = { id: "x" + Date.now(), visible: true, order: list.length + 1, ...item };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (data.set as any)([...list, newItem]);
      app.toast({ title: "Qo'shildi", variant: "success" });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (data.set as any)(list.map((x: any) => x.id === (item as { id: string }).id ? { ...x, ...item } : x));
      app.toast({ title: "Saqlandi", variant: "success" });
    }
    setEdit(null); setAdding(false);
  };

  const sorted = useMemo(() => [...data.list].sort((a, b) => ((a as { order?: number }).order ?? 0) - ((b as { order?: number }).order ?? 0)), [data.list]);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">{sorted.length} ta yozuv</div>
        <button onClick={() => { setEdit({}); setAdding(true); }} className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-primary to-primary-glow px-4 py-2 text-sm font-bold text-primary-foreground shadow-glow transition hover:scale-105">
          <FiPlus className="size-4" /> Qo'shish
        </button>
      </div>

      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3">#</th>
              {data.cols.map((c) => <th key={c} className="px-4 py-3">{c}</th>)}
              <th className="px-4 py-3 text-center">Holat</th>
              <th className="px-4 py-3 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((item, i) => (
              <motion.tr key={(item as { id: string }).id} layout className="border-t border-border transition hover:bg-muted/30">
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{i + 1}</td>
                {data.cols.map((c) => <td key={c} className="max-w-xs truncate px-4 py-3">{String(get(item, c))}</td>)}
                <td className="px-4 py-3 text-center">
                  <button onClick={() => toggleVisible((item as { id: string }).id)} className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${(item as { visible?: boolean }).visible ? "bg-emerald-500/15 text-emerald-600" : "bg-gray-500/15 text-gray-500"}`}>
                    {(item as { visible?: boolean }).visible ? <FiEye className="size-3" /> : <FiEyeOff className="size-3" />}
                    {(item as { visible?: boolean }).visible ? "Ko'rinadi" : "Yashirin"}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => move((item as { id: string }).id, -1)} className="grid size-7 place-items-center rounded-lg hover:bg-muted"><FiArrowUp className="size-3.5" /></button>
                    <button onClick={() => move((item as { id: string }).id, 1)} className="grid size-7 place-items-center rounded-lg hover:bg-muted"><FiArrowDown className="size-3.5" /></button>
                    <button onClick={() => { setEdit(item as unknown as Record<string, unknown>); setAdding(false); }} className="grid size-7 place-items-center rounded-lg text-primary hover:bg-primary/10"><FiEdit2 className="size-3.5" /></button>
                    <button onClick={() => remove((item as { id: string }).id)} className="grid size-7 place-items-center rounded-lg text-destructive hover:bg-destructive/10"><FiTrash2 className="size-3.5" /></button>
                  </div>
                </td>
              </motion.tr>
            ))}
            {sorted.length === 0 && <tr><td colSpan={data.cols.length + 3} className="py-12 text-center text-sm text-muted-foreground">Hozircha yozuv yo'q</td></tr>}
          </tbody>
        </table>
      </div>

      <Modal open={!!edit} onClose={() => { setEdit(null); setAdding(false); }} title={adding ? "Yangi yozuv" : "Tahrirlash"} size="lg">
        {edit && <EditorForm item={edit} cols={data.cols} titleField={data.titleField} onSave={save} />}
      </Modal>
    </>
  );
}

function EditorForm({ item, cols, titleField, onSave }: { item: Record<string, unknown>; cols: string[]; titleField: string; onSave: (i: Record<string, unknown>) => void }) {
  const [form, setForm] = useState<Record<string, unknown>>(item);
  const allFields = new Set([titleField, ...cols, "image", "description", "subtitle"]);
  Object.keys(item).forEach((k) => k !== "id" && allFields.add(k));
  const fields = Array.from(allFields);

  const setField = (k: string, v: unknown) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="space-y-3">
      {fields.map((f) => {
        const cur = form[f];
        if (cur && typeof cur === "object" && "uz" in (cur as Record<string, unknown>)) {
          const obj = cur as { uz?: string; ru?: string; en?: string };
          return (
            <div key={f}>
              <div className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">{f}</div>
              <div className="grid gap-2 sm:grid-cols-3">
                {(["uz", "ru", "en"] as const).map((l) => (
                  <input key={l} placeholder={l.toUpperCase()} value={obj[l] ?? ""} onChange={(e) => setField(f, { ...obj, [l]: e.target.value })} className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
                ))}
              </div>
            </div>
          );
        }
        if (typeof cur === "boolean") {
          return (
            <label key={f} className="flex items-center gap-2 rounded-xl border border-border bg-muted/30 p-3 text-sm">
              <input type="checkbox" checked={cur} onChange={(e) => setField(f, e.target.checked)} /> {f}
            </label>
          );
        }
        if (typeof cur === "number") {
          return (
            <label key={f} className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-muted-foreground">{f}</span>
              <input type="number" value={cur} onChange={(e) => setField(f, Number(e.target.value))} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
            </label>
          );
        }
        if (Array.isArray(cur)) {
          return (
            <label key={f} className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-muted-foreground">{f} (vergul bilan)</span>
              <input value={(cur as unknown[]).join(", ")} onChange={(e) => setField(f, e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
            </label>
          );
        }
        if (f === "description" || f === "message" || f === "body") {
          return (
            <label key={f} className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-muted-foreground">{f}</span>
              <textarea rows={3} value={String(cur ?? "")} onChange={(e) => setField(f, e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
            </label>
          );
        }
        return (
          <label key={f} className="block">
            <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-muted-foreground">{f}</span>
            <input value={String(cur ?? "")} onChange={(e) => setField(f, e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
          </label>
        );
      })}
      <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-primary to-primary-glow py-3 text-sm font-bold text-primary-foreground shadow-glow transition hover:scale-[1.01]">Saqlash</button>
    </form>
  );
}
