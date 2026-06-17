/* 360° Tour panel + Monuments AI presenter (combines tour from index.html + monument speaker from index1.html) */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaStop, FaMapMarkerAlt } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { useApp } from "@/context/AppContext";
import { SectionHeader } from "@/components/home/Destinations";

const SCENES = [
  { key: "registan", title: "Registon maydoni", city: "Samarqand", url: "https://uzbekistan360.uz/ru?city=23", color: "from-blue-500 to-cyan-500" },
  { key: "bukhara", title: "Buxoro tarixiy markazi", city: "Buxoro", url: "https://uzbekistan360.uz/ru?city=9", color: "from-emerald-500 to-green-600" },
  { key: "khiva", title: "Xiva — Ichan qal'a", city: "Xiva", url: "https://uzbekistan360.uz/ru?city=10", color: "from-purple-500 to-pink-500" },
  { key: "tashkent", title: "Toshkent shahri", city: "Toshkent", url: "https://uzbekistan360.uz/ru", color: "from-orange-500 to-red-500" },
];

export function Tour360() {
  const [scene, setScene] = useState(SCENES[0]);
  return (
    <section id="tour360" className="container mx-auto px-4 py-20 scroll-mt-24">
      <SectionHeader badge="08 / 360°" title="360° Interaktiv virtual tur" sub="Sichqoncha yoki barmoq bilan surang — to'liq 360° dunyo" />
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/20 to-primary-glow/10 shadow-strong lg:col-span-2">
          <div className="relative aspect-video w-full">
            <AnimatePresence mode="wait">
              <motion.iframe
                key={scene.key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src={scene.url}
                className="size-full"
                title={scene.title}
                allow="fullscreen"
              />
            </AnimatePresence>
            <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-xl bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
              <span className="size-2 animate-pulse rounded-full bg-emerald-400" /> LIVE 360°
            </div>
            <a href={scene.url} target="_blank" rel="noreferrer" className="absolute right-4 top-4 flex items-center gap-1.5 rounded-xl bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-black/80">
              Yangi oynada <FiExternalLink className="size-3" />
            </a>
          </div>
        </motion.div>

        <div className="glass-strong p-6">
          <h3 className="text-lg font-bold">Navigatsiya</h3>
          <p className="mt-1 text-sm text-muted-foreground">Quyidagi sahnalarni tanlang va 360° dunyoga sayohat qiling.</p>
          <div className="mt-4 grid gap-2">
            {SCENES.map((s) => (
              <button
                key={s.key}
                onClick={() => setScene(s)}
                className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition ${
                  scene.key === s.key ? "border-primary bg-primary/10 shadow-soft" : "border-border bg-muted/40 hover:bg-muted/70"
                }`}
              >
                <div className={`grid size-10 place-items-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-soft`}>
                  <FaMapMarkerAlt className="size-4" />
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-bold">{s.title}</div>
                  <div className="text-xs text-muted-foreground">{s.city}</div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-2xl bg-primary/10 p-3 text-xs text-primary">
            💡 Rasmni sudrab, atrofni 360° ko'ring!
          </div>
        </div>
      </div>
    </section>
  );
}

export function MonumentsPresenter() {
  const { monuments, lang } = useApp();
  const [idx, setIdx] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const m = monuments[idx];
  if (!m) return null;

  const speak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (speaking) { window.speechSynthesis.cancel(); setSpeaking(false); return; }
    const u = new SpeechSynthesisUtterance(m.text[lang] || m.text.uz);
    u.lang = lang === "uz" ? "uz" : lang === "ru" ? "ru-RU" : "en-US";
    u.onend = () => setSpeaking(false); u.onerror = () => setSpeaking(false);
    window.speechSynthesis.cancel(); window.speechSynthesis.speak(u); setSpeaking(true);
  };

  return (
    <section id="monuments" className="bg-muted/30 py-20 scroll-mt-24">
      <div className="container mx-auto px-4">
        <SectionHeader badge="09 / Obidalar" title="🏛️ Tarixiy obidalar AI gid" sub="Har bir obida haqida ovozli tarjima va batafsil ma'lumot" />
        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="space-y-2 lg:col-span-3">
            {monuments.map((mon, i) => (
              <button key={mon.id} onClick={() => { setIdx(i); if (speaking) { window.speechSynthesis?.cancel(); setSpeaking(false); } }} className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition ${idx === i ? "border-primary bg-primary/10" : "border-border bg-card hover:bg-muted/50"}`}>
                <img src={mon.image} alt="" className="size-12 shrink-0 rounded-xl object-cover" loading="lazy" />
                <div className="min-w-0">
                  <div className="truncate text-sm font-bold">{mon.name[lang] || mon.name.uz}</div>
                  <div className="truncate text-xs text-muted-foreground">{mon.location[lang] || mon.location.uz}</div>
                </div>
              </button>
            ))}
          </div>

          <motion.div key={m.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-strong p-6 lg:col-span-9">
            <div className="grid gap-6 md:grid-cols-2">
              <img src={m.image} alt={m.name[lang]} className="aspect-[4/3] w-full rounded-2xl object-cover shadow-medium" />
              <div className="flex flex-col">
                <h3 className="font-display text-3xl font-extrabold">{m.name[lang] || m.name.uz}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground"><FaMapMarkerAlt className="size-3 text-primary" /> {m.location[lang] || m.location.uz}, O'zbekiston</p>
                <p className="mt-4 text-sm leading-relaxed text-foreground/85">{m.text[lang] || m.text.uz}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {m.tags.map((t) => <span key={t} className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary ring-1 ring-primary/20">{t}</span>)}
                </div>
                <button onClick={speak} className={`mt-auto inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition ${speaking ? "bg-destructive text-destructive-foreground animate-pulse-glow" : "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-glow hover:scale-[1.02]"}`}>
                  {speaking ? <><FaStop /> To'xtatish</> : <><FaPlay /> AI bilan tinglash</>}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
