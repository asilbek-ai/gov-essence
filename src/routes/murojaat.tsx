import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FiSend, FiCheckCircle, FiPhone, FiMail, FiUser, FiMapPin, FiMessageCircle } from "react-icons/fi";
import { useApp } from "@/context/AppContext";
import { APPLICATION_CATEGORIES } from "@/data/seed";

export const Route = createFileRoute("/murojaat")({
  head: () => ({
    meta: [
      { title: "Murojaat yuborish — SmartTour 360" },
      { name: "description", content: "Bizga murojaat yuboring — har bir xabarga 24-48 soat ichida javob beramiz." },
    ],
  }),
  component: MurojaatPage,
});

function MurojaatPage() {
  const { applications, setApplications, toast } = useApp();
  const [form, setForm] = useState({ fullName: "", phone: "", email: "", region: "", categoryKey: "water", message: "" });
  const [done, setDone] = useState<string | null>(null);

  const handle = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.message) {
      toast({ title: "Iltimos, majburiy maydonlarni to'ldiring", variant: "warning" });
      return;
    }
    const cat = APPLICATION_CATEGORIES.find((c) => c.key === form.categoryKey);
    const id = "a" + Date.now();
    const newApp = {
      id, ...form,
      category: cat?.uz || "Boshqa",
      createdAt: new Date().toISOString(),
      status: "new" as const, read: false,
    };
    setApplications([newApp, ...applications]);
    setDone(id);
    toast({ title: "✅ Murojaatingiz qabul qilindi", description: `ID: ${id.slice(1)} · 24-48 soat ichida javob beramiz`, variant: "success" });
    setForm({ fullName: "", phone: "", email: "", region: "", categoryKey: "water", message: "" });
  };

  return (
    <div className="relative isolate overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-72 gradient-hero-bg" />
      <div className="container mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl text-center text-white">
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-white/20 backdrop-blur-md">Onlayn murojaat</span>
          <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">Bizga murojaat yuboring</h1>
          <p className="mt-3 text-white/85">Har bir murojaatingizga 24-48 soat ichida javob beramiz. Bir xil mavzudagi murojaatlar avtomatik guruhlanadi.</p>
        </motion.div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-3">
          <motion.form initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} onSubmit={submit} className="glass-strong space-y-4 p-6 sm:p-8 lg:col-span-2">
            <Field label="To'liq ism *" icon={<FiUser className="size-4" />}>
              <input required value={form.fullName} onChange={handle("fullName")} placeholder="Ali Karimov" className="input" />
            </Field>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Telefon *" icon={<FiPhone className="size-4" />}>
                <input required value={form.phone} onChange={handle("phone")} placeholder="+998 90 ..." className="input" />
              </Field>
              <Field label="Email" icon={<FiMail className="size-4" />}>
                <input type="email" value={form.email} onChange={handle("email")} placeholder="email@example.com" className="input" />
              </Field>
            </div>
            <Field label="Hudud / mahalla" icon={<FiMapPin className="size-4" />}>
              <input value={form.region} onChange={handle("region")} placeholder="Toshkent — Yunusobod" className="input" />
            </Field>
            <Field label="Murojaat turi" icon={<FiMessageCircle className="size-4" />}>
              <select value={form.categoryKey} onChange={handle("categoryKey")} className="input">
                {APPLICATION_CATEGORIES.map((c) => <option key={c.key} value={c.key}>{c.uz}</option>)}
              </select>
            </Field>
            <Field label="Xabar matni *">
              <textarea required rows={5} value={form.message} onChange={handle("message")} placeholder="Murojaatingizni batafsil yozing..." className="input min-h-32 resize-y" />
            </Field>
            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary-glow py-4 text-base font-bold text-primary-foreground shadow-glow transition hover:scale-[1.01]">
              <FiSend className="size-4" /> Murojaatni yuborish
            </button>
            {done && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-start gap-3 rounded-2xl bg-success/10 p-4 text-sm text-success ring-1 ring-success/30">
                <FiCheckCircle className="mt-0.5 size-5 shrink-0" />
                <div>
                  <div className="font-bold">Murojaatingiz qabul qilindi!</div>
                  <div className="mt-1 opacity-90">Murojaat ID: <span className="font-mono font-bold">{done.slice(1)}</span></div>
                </div>
              </motion.div>
            )}
          </motion.form>

          <motion.aside initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="space-y-4">
            <div className="glass-strong p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Statistika</h3>
              <div className="mt-4 grid gap-3 text-sm">
                <Stat label="Jami murojaatlar" value={applications.length} />
                <Stat label="Hozirgi javob vaqti" value="24-48 soat" />
                <Stat label="Javob berilgan" value={applications.filter((a) => a.status === "answered").length} />
              </div>
            </div>
            <div className="glass-strong p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Tezkor aloqa</h3>
              <ul className="mt-3 space-y-3 text-sm">
                <li className="flex items-center gap-2"><FiPhone className="size-4 text-primary" /> 1011 (24/7)</li>
                <li className="flex items-center gap-2"><FiMail className="size-4 text-primary" /> info@smarttour.uz</li>
                <li className="flex items-center gap-2"><FiMapPin className="size-4 text-primary" /> Toshkent, Mustaqillik 5</li>
              </ul>
            </div>
          </motion.aside>
        </div>
      </div>

      <style>{`
        .input { width: 100%; border-radius: 0.875rem; border: 1px solid var(--color-border); background: var(--color-background); padding: 0.75rem 1rem; font-size: 0.875rem; outline: none; transition: all 200ms; }
        .input:focus { border-color: var(--color-primary); box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary) 20%, transparent); }
      `}</style>
    </div>
  );
}

function Field({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">{icon}{label}</span>
      {children}
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-muted/40 px-3 py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono font-bold text-primary">{value}</span>
    </div>
  );
}
