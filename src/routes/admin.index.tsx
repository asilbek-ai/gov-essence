/* Admin Dashboard — premium stats + charts */
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo } from "react";
import {
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { FiUsers, FiInbox, FiCheckCircle, FiAlertCircle, FiTrendingUp, FiMapPin } from "react-icons/fi";
import { useApp } from "@/context/AppContext";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

const CHART_COLORS = ["#1e40af", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#ec4899"];

function Dashboard() {
  const { applications, visitorCount, destinations, hotels, restaurants, events, news } = useApp();

  const stats = useMemo(() => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const todayApps = applications.filter((a) => new Date(a.createdAt) >= today);
    const read = applications.filter((a) => a.read).length;
    const unread = applications.length - read;
    return {
      total: applications.length, today: todayApps.length, read, unread,
      answered: applications.filter((a) => a.status === "answered").length,
    };
  }, [applications]);

  // Category breakdown (groups duplicates: "Suv toshgan (9)")
  const byCategory = useMemo(() => {
    const map: Record<string, { name: string; count: number }> = {};
    applications.forEach((a) => {
      const key = a.category;
      map[key] = map[key] ? { name: key, count: map[key].count + 1 } : { name: key, count: 1 };
    });
    return Object.values(map).sort((a, b) => b.count - a.count);
  }, [applications]);

  // Top regions
  const byRegion = useMemo(() => {
    const map: Record<string, number> = {};
    applications.forEach((a) => { const k = a.region.split("—")[0].trim() || "Boshqa"; map[k] = (map[k] || 0) + 1; });
    return Object.entries(map).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 6);
  }, [applications]);

  // Status pie
  const byStatus = useMemo(() => {
    const groups = { new: 0, in_progress: 0, answered: 0, closed: 0 };
    applications.forEach((a) => { groups[a.status]++; });
    return [
      { name: "Yangi", value: groups.new, color: "#ef4444" },
      { name: "Jarayonda", value: groups.in_progress, color: "#f59e0b" },
      { name: "Javob berilgan", value: groups.answered, color: "#10b981" },
      { name: "Yopilgan", value: groups.closed, color: "#6b7280" },
    ];
  }, [applications]);

  // 7 day trend
  const trend = useMemo(() => {
    const days: { name: string; murojaatlar: number; tashriflar: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i); d.setHours(0, 0, 0, 0);
      const next = new Date(d); next.setDate(d.getDate() + 1);
      const c = applications.filter((a) => { const t = new Date(a.createdAt); return t >= d && t < next; }).length;
      days.push({ name: ["Yak", "Du", "Se", "Cho", "Pa", "Ju", "Sh"][d.getDay()], murojaatlar: c, tashriflar: 100 + Math.floor(Math.random() * 300) });
    }
    return days;
  }, [applications]);

  const recent = applications.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <motion.h1 initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="font-display text-3xl font-extrabold">Dashboard</motion.h1>
        <p className="text-sm text-muted-foreground">Realtime statistika va eng so'nggi murojaatlar</p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={FiUsers} label="Jami foydalanuvchilar" value={visitorCount} color="from-blue-500 to-indigo-600" delta="+12%" />
        <StatCard icon={FiInbox} label="Jami murojaatlar" value={stats.total} color="from-purple-500 to-pink-500" delta={`+${stats.today} bugun`} />
        <StatCard icon={FiAlertCircle} label="O'qilmagan" value={stats.unread} color="from-rose-500 to-red-600" delta="diqqat!" />
        <StatCard icon={FiCheckCircle} label="Javob berilgan" value={stats.answered} color="from-emerald-500 to-green-600" delta={`${Math.round((stats.answered / Math.max(1, stats.total)) * 100)}%`} />
      </div>

      {/* Charts grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Murojaatlar trendi (7 kun)" subtitle="Kunlik dinamika" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={trend} margin={{ left: -10, right: 8 }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1e40af" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#1e40af" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
              <Legend />
              <Area type="monotone" dataKey="murojaatlar" stroke="#1e40af" strokeWidth={2} fill="url(#g1)" />
              <Area type="monotone" dataKey="tashriflar" stroke="#10b981" strokeWidth={2} fill="url(#g2)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Statuslar" subtitle="Murojaatlar holati">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={byStatus} dataKey="value" innerRadius={55} outerRadius={90} paddingAngle={4}>
                {byStatus.map((s, i) => <Cell key={i} fill={s.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Murojaat turlari" subtitle="Eng ko'p uchraydigan" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={byCategory} layout="vertical" margin={{ left: 80, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis type="category" dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} width={120} />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
              <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                {byCategory.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Eng faol mahallalar" subtitle="Hududlar bo'yicha">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={byRegion} margin={{ left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={10} angle={-20} textAnchor="end" height={50} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
              <Line type="monotone" dataKey="count" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: "#8b5cf6", r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Recent + Content overview */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-border bg-card p-5 shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">So'nggi murojaatlar</h3>
            <a href="/admin/murojaatlar" className="text-xs font-semibold text-primary hover:underline">Hammasi →</a>
          </div>
          <div className="mt-4 space-y-2">
            {recent.map((a) => (
              <div key={a.id} className="flex items-center gap-3 rounded-2xl border border-border bg-muted/30 p-3">
                <div className={`size-2 rounded-full ${a.read ? "bg-emerald-500" : "bg-rose-500 animate-pulse"}`} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-bold">{a.fullName}</span>
                    <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">{a.category}</span>
                  </div>
                  <p className="line-clamp-1 text-xs text-muted-foreground">{a.message}</p>
                </div>
                <div className="text-right text-[11px] text-muted-foreground">
                  <FiMapPin className="inline size-3" /> {a.region.split("—")[0]}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
          <h3 className="font-bold">Kontent xulosasi</h3>
          <div className="mt-4 space-y-2">
            {[
              { label: "Yo'nalishlar", count: destinations.length, color: "from-blue-500 to-cyan-500" },
              { label: "Mehmonxonalar", count: hotels.length, color: "from-emerald-500 to-green-600" },
              { label: "Restoranlar", count: restaurants.length, color: "from-orange-500 to-red-500" },
              { label: "Tadbirlar", count: events.length, color: "from-purple-500 to-pink-500" },
              { label: "Yangiliklar", count: news.length, color: "from-amber-500 to-yellow-500" },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-3 rounded-2xl bg-muted/30 p-3">
                <div className={`grid size-9 place-items-center rounded-xl bg-gradient-to-br ${c.color} text-white shadow-soft`}><FiTrendingUp className="size-4" /></div>
                <div className="flex-1 text-sm font-semibold">{c.label}</div>
                <div className="font-mono text-lg font-extrabold text-primary">{c.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, delta }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string | number; color: string; delta: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="hover-lift relative overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-soft">
      <div className={`pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-gradient-to-br ${color} opacity-20 blur-2xl`} />
      <div className={`grid size-11 place-items-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-medium`}>
        <Icon className="size-5" />
      </div>
      <div className="mt-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-3xl font-extrabold tracking-tight">{value.toLocaleString()}</div>
      <div className="mt-1 text-xs font-semibold text-muted-foreground">{delta}</div>
    </motion.div>
  );
}

function ChartCard({ title, subtitle, children, className = "" }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={`rounded-3xl border border-border bg-card p-5 shadow-soft ${className}`}>
      <div className="mb-2">
        <h3 className="font-bold">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </motion.div>
  );
}
