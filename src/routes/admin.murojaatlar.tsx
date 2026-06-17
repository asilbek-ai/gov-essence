/* Admin Murojaatlar — list with grouping, filters, status mgmt, reply */
import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiFilter, FiMail, FiCheck, FiX, FiClock, FiTrash2, FiEye, FiSend, FiChevronDown } from "react-icons/fi";
import { useApp } from "@/context/AppContext";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/States";
import type { Application } from "@/data/seed";

export const Route = createFileRoute("/admin/murojaatlar")({
  component: AdminApplications,
});

const STATUS_LABELS: Record<Application["status"], { label: string; color: string }> = {
  new: { label: "Yangi", color: "bg-rose-500/15 text-rose-600 ring-rose-500/30" },
  in_progress: { label: "Jarayonda", color: "bg-amber-500/15 text-amber-600 ring-amber-500/30" },
  answered: { label: "Javob berilgan", color: "bg-emerald-500/15 text-emerald-600 ring-emerald-500/30" },
  closed: { label: "Yopilgan", color: "bg-gray-500/15 text-gray-600 ring-gray-500/30" },
};

function AdminApplications() {
  const { applications, setApplications, toast } = useApp();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Application["status"]>("all");
  const [grouped, setGrouped] = useState(true);
  const [active, setActive] = useState<Application | null>(null);
  const [reply, setReply] = useState("");

  const filtered = useMemo(() => {
    let list = [...applications];
    if (statusFilter !== "all") list = list.filter((a) => a.status === statusFilter);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((a) =>
        a.fullName.toLowerCase().includes(q) || a.message.toLowerCase().includes(q) ||
        a.phone.includes(q) || a.category.toLowerCase().includes(q) || a.region.toLowerCase().includes(q)
      );
    }
    return list;
  }, [applications, query, statusFilter]);

  const groups = useMemo(() => {
    if (!grouped) return null;
    const map: Record<string, Application[]> = {};
    filtered.forEach((a) => { (map[a.category] ||= []).push(a); });
    return Object.entries(map).map(([cat, items]) => ({ cat, items })).sort((a, b) => b.items.length - a.items.length);
  }, [filtered, grouped]);

  const updateStatus = (id: string, status: Application["status"]) => {
    setApplications(applications.map((a) => a.id === id ? { ...a, status, read: true } : a));
    toast({ title: "Status yangilandi", variant: "success" });
  };
  const markRead = (id: string) => setApplications(applications.map((a) => a.id === id ? { ...a, read: true } : a));
  const remove = (id: string) => { if (!confirm("O'chirishni tasdiqlang")) return; setApplications(applications.filter((a) => a.id !== id)); toast({ title: "O'chirildi", variant: "info" }); };
  const sendReply = () => {
    if (!active || !reply.trim()) return;
    setApplications(applications.map((a) => a.id === active.id ? { ...a, reply, status: "answered", read: true } : a));
    toast({ title: "Javob yuborildi", variant: "success" }); setActive(null); setReply("");
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold">Murojaatlar</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} ta / jami {applications.length} ta</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setGrouped((v) => !v)} className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition ${grouped ? "bg-primary text-primary-foreground" : "bg-card border border-border"}`}>
            <FiFilter className="size-3.5" /> Guruhlash
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-card p-3 shadow-soft">
        <div className="relative flex-1 min-w-64">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ism, telefon, hudud, mavzu..." className="w-full rounded-xl border border-border bg-muted/30 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(["all", "new", "in_progress", "answered", "closed"] as const).map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${statusFilter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}>
              {s === "all" ? "Hammasi" : STATUS_LABELS[s].label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="Murojaat topilmadi" description="Filtr yoki qidiruv shartlarini o'zgartiring." />
      ) : grouped && groups ? (
        <div className="space-y-4">
          {groups.map((g) => (
            <CategoryGroup key={g.cat} category={g.cat} items={g.items} onOpen={(a) => { setActive(a); markRead(a.id); }} onStatus={updateStatus} onRemove={remove} />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((a) => <Row key={a.id} app={a} onOpen={() => { setActive(a); markRead(a.id); }} onStatus={updateStatus} onRemove={remove} />)}
        </div>
      )}

      <Modal open={!!active} onClose={() => setActive(null)} title="Murojaat tafsilotlari" size="lg" footer={
        active && (
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              {(["new", "in_progress", "answered", "closed"] as const).map((s) => (
                <button key={s} onClick={() => updateStatus(active.id, s)} className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${active.status === s ? "ring-2 ring-primary " + STATUS_LABELS[s].color : STATUS_LABELS[s].color + " hover:opacity-80"}`}>
                  {STATUS_LABELS[s].label}
                </button>
              ))}
            </div>
            <button onClick={sendReply} disabled={!reply.trim()} className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-primary to-primary-glow px-4 py-2 text-sm font-bold text-primary-foreground shadow-glow transition disabled:opacity-50">
              <FiSend className="size-3.5" /> Javob yuborish
            </button>
          </div>
        )
      }>
        {active && (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <Info label="To'liq ism" value={active.fullName} />
              <Info label="Telefon" value={active.phone} />
              <Info label="Email" value={active.email || "—"} />
              <Info label="Hudud" value={active.region || "—"} />
              <Info label="Murojaat turi" value={active.category} />
              <Info label="Sana" value={new Date(active.createdAt).toLocaleString()} />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Xabar</div>
              <div className="mt-2 rounded-2xl border border-border bg-muted/40 p-4 text-sm leading-relaxed">{active.message}</div>
            </div>
            {active.reply && (
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Avvalgi javob</div>
                <div className="mt-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm leading-relaxed">{active.reply}</div>
              </div>
            )}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Javob yozish</div>
              <textarea value={reply} onChange={(e) => setReply(e.target.value)} rows={4} placeholder="Foydalanuvchiga javob yozing..." className="mt-2 w-full rounded-2xl border border-border bg-background p-3 text-sm outline-none focus:border-primary" />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function CategoryGroup({ category, items, onOpen, onStatus, onRemove }: { category: string; items: Application[]; onOpen: (a: Application) => void; onStatus: (id: string, s: Application["status"]) => void; onRemove: (id: string) => void }) {
  const [expanded, setExpanded] = useState(items.length <= 3);
  const unread = items.filter((i) => !i.read).length;
  return (
    <motion.div layout className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
      <button onClick={() => setExpanded((v) => !v)} className="flex w-full items-center gap-3 border-b border-border bg-muted/30 px-5 py-3.5 text-left">
        <FiChevronDown className={`size-5 text-muted-foreground transition ${expanded ? "rotate-0" : "-rotate-90"}`} />
        <span className="font-bold">{category}</span>
        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">{items.length}</span>
        {unread > 0 && <span className="ml-auto grid size-5 place-items-center rounded-full bg-rose-500 text-[10px] font-bold text-white">{unread}</span>}
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="space-y-2 p-3">
              {items.map((a) => <Row key={a.id} app={a} onOpen={() => onOpen(a)} onStatus={onStatus} onRemove={onRemove} />)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Row({ app, onOpen, onStatus, onRemove }: { app: Application; onOpen: () => void; onStatus: (id: string, s: Application["status"]) => void; onRemove: (id: string) => void }) {
  const s = STATUS_LABELS[app.status];
  return (
    <motion.div layout className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border p-3 transition ${app.read ? "border-border bg-card" : "border-rose-500/30 bg-rose-500/5"}`}>
      <div className={`grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${app.read ? "from-muted to-muted-foreground/20 text-muted-foreground" : "from-primary to-primary-glow text-primary-foreground"} font-bold`}>
        {app.fullName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
      </div>
      <div className="min-w-0 cursor-pointer" onClick={onOpen}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="truncate text-sm font-bold">{app.fullName}</span>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ring-1 ${s.color}`}>{s.label}</span>
          {!app.read && <span className="size-2 animate-pulse rounded-full bg-rose-500" />}
        </div>
        <p className="line-clamp-1 text-xs text-muted-foreground">{app.message}</p>
        <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
          <span>{app.phone}</span><span>•</span><span>{app.region.split("—")[0]}</span><span>•</span><span>{new Date(app.createdAt).toLocaleString()}</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <button title="Ko'rish" onClick={onOpen} className="grid size-8 place-items-center rounded-lg text-primary hover:bg-primary/10"><FiEye className="size-4" /></button>
        <button title="Bajarildi" onClick={() => onStatus(app.id, "answered")} className="grid size-8 place-items-center rounded-lg text-emerald-600 hover:bg-emerald-500/10"><FiCheck className="size-4" /></button>
        <button title="Jarayonda" onClick={() => onStatus(app.id, "in_progress")} className="grid size-8 place-items-center rounded-lg text-amber-600 hover:bg-amber-500/10"><FiClock className="size-4" /></button>
        <button title="Yopish" onClick={() => onStatus(app.id, "closed")} className="grid size-8 place-items-center rounded-lg text-gray-500 hover:bg-gray-500/10"><FiX className="size-4" /></button>
        <button title="O'chirish" onClick={() => onRemove(app.id)} className="grid size-8 place-items-center rounded-lg text-destructive hover:bg-destructive/10"><FiTrash2 className="size-4" /></button>
      </div>
    </motion.div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/40 p-3">
      <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-sm font-semibold">{value}</div>
    </div>
  );
}
