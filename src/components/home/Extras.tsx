/* News, FAQ, Contact, Partners */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiCalendar, FiTag, FiShare2, FiPrinter, FiBookmark } from "react-icons/fi";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useApp } from "@/context/AppContext";
import { SectionHeader } from "@/components/home/Destinations";
import { FAQ, PARTNERS } from "@/data/seed";

export function NewsSection() {
  const { news, lang, toggleBookmark, bookmarks, toast } = useApp();
  const visible = news.filter((n) => n.visible).sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
  const [active, setActive] = useState(visible[0]?.id ?? null);
  const story = visible.find((n) => n.id === active) || visible[0];

  return (
    <section id="news" className="container mx-auto px-4 py-20 scroll-mt-24">
      <SectionHeader badge="10 / Yangiliklar" title="📰 Yangiliklar va e'lonlar" sub="Eng so'nggi xabarlardan boxabar bo'ling" />
      <div className="mt-10 grid gap-6 lg:grid-cols-5">
        {story && (
          <motion.article layout className="overflow-hidden rounded-3xl bg-card shadow-strong ring-1 ring-border lg:col-span-3">
            <div className="relative h-64 overflow-hidden md:h-80">
              <img src={story.image} alt={story.title} className="size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-gold px-2.5 py-1 font-bold text-gold-foreground"><FiTag className="mr-1 inline size-3" />{story.category}</span>
                  <span className="flex items-center gap-1 opacity-80"><FiCalendar className="size-3" /> {new Date(story.publishedAt).toLocaleDateString(lang === "ru" ? "ru-RU" : "en")}</span>
                </div>
                <h3 className="mt-2 text-2xl font-extrabold leading-tight md:text-3xl">{story.title}</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-foreground/85">{story.body}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button onClick={() => { toggleBookmark(`news:${story.id}`); toast({ title: bookmarks.includes(`news:${story.id}`) ? "Bookmarkdan olib tashlandi" : "Bookmarkka qo'shildi", variant: "success" }); }} className="flex items-center gap-1.5 rounded-xl bg-muted px-3 py-2 text-sm font-semibold transition hover:bg-primary hover:text-primary-foreground">
                  <FiBookmark className="size-4" /> Bookmark
                </button>
                <button onClick={() => { navigator.clipboard?.writeText(window.location.href); toast({ title: "Havola nusxalandi", variant: "info" }); }} className="flex items-center gap-1.5 rounded-xl bg-muted px-3 py-2 text-sm font-semibold transition hover:bg-primary hover:text-primary-foreground">
                  <FiShare2 className="size-4" /> Ulashish
                </button>
                <button onClick={() => window.print()} className="flex items-center gap-1.5 rounded-xl bg-muted px-3 py-2 text-sm font-semibold transition hover:bg-primary hover:text-primary-foreground">
                  <FiPrinter className="size-4" /> Chop etish
                </button>
              </div>
            </div>
          </motion.article>
        )}

        <div className="space-y-3 lg:col-span-2">
          {visible.map((n) => (
            <button key={n.id} onClick={() => setActive(n.id)} className={`group flex w-full items-start gap-3 overflow-hidden rounded-2xl border p-3 text-left transition ${active === n.id ? "border-primary bg-primary/5 shadow-soft" : "border-border bg-card hover:bg-muted/40"}`}>
              <img src={n.image} alt="" className="size-20 shrink-0 rounded-xl object-cover" loading="lazy" />
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-[11px]">
                  {n.pinned && <span className="rounded-full bg-gold px-1.5 py-0.5 font-bold text-gold-foreground">📌 Pin</span>}
                  <span className="rounded-full bg-muted px-1.5 py-0.5 font-semibold text-muted-foreground">{n.category}</span>
                </div>
                <h4 className="mt-1 line-clamp-2 text-sm font-bold leading-snug group-hover:text-primary">{n.title}</h4>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{n.excerpt}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQSection() {
  const { lang } = useApp();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-muted/30 py-20 scroll-mt-24">
      <div className="container mx-auto max-w-3xl px-4">
        <SectionHeader badge="11 / FAQ" title="❓ Ko'p so'raladigan savollar" sub="Eng ko'p uchraydigan savollarga javoblar" />
        <div className="mt-10 space-y-3">
          {FAQ.map((f, i) => (
            <motion.div key={i} layout className="overflow-hidden rounded-2xl border border-border bg-card">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left">
                <span className="font-semibold">{f.q[lang]}</span>
                <FiChevronDown className={`size-5 shrink-0 transition ${open === i ? "rotate-180 text-primary" : "text-muted-foreground"}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="px-5 pb-4 text-sm text-muted-foreground">{f.a[lang]}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PartnersSection() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">Hamkorlar va foydali resurslar</h3>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
          {PARTNERS.map((p) => (
            <a key={p.name} href={p.url} className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-muted-foreground transition hover:scale-105 hover:border-primary hover:text-primary">
              <span className="text-xl">{p.icon}</span> {p.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="container mx-auto px-4 py-20 scroll-mt-24">
      <SectionHeader badge="12 / Aloqa" title="📞 Biz bilan bog'laning" sub="Savollaringiz bo'lsa — yozing yoki qo'ng'iroq qiling" />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          { Icon: FaPhone, title: "Telefon", value: "+998 71 200 00 00", note: "24/7 yordam", color: "from-emerald-500 to-green-600" },
          { Icon: FaEnvelope, title: "Email", value: "info@smarttour.uz", note: "Tezkor javob", color: "from-blue-500 to-indigo-600" },
          { Icon: FaMapMarkerAlt, title: "Manzil", value: "Toshkent, Mustaqillik 5", note: "Bosh ofis", color: "from-orange-500 to-red-500" },
        ].map((c) => (
          <motion.a key={c.title} href="#" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="hover-lift glass p-6 text-center">
            <div className={`mx-auto grid size-14 place-items-center rounded-2xl bg-gradient-to-br ${c.color} text-white shadow-medium`}><c.Icon className="size-5" /></div>
            <h4 className="mt-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">{c.title}</h4>
            <p className="mt-1 text-lg font-extrabold">{c.value}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{c.note}</p>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
