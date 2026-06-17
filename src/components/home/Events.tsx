import { motion } from "framer-motion";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { useApp } from "@/context/AppContext";
import { SectionHeader } from "@/components/home/Destinations";

export function Events() {
  const { events, toast } = useApp();
  const visible = events.filter((e) => e.visible).sort((a, b) => a.order - b.order);
  return (
    <section id="events" className="bg-muted/30 py-20 scroll-mt-24">
      <div className="container mx-auto px-4">
        <SectionHeader badge="04 / Tadbirlar" title="🎉 Tadbirlar va festivallar" sub="O'zbekistonda bo'lib o'tadigan eng qiziqarli tadbirlar" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((e, i) => (
            <motion.article key={e.id} initial={{ opacity: 0, rotateY: -10 }} whileInView={{ opacity: 1, rotateY: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="hover-lift glass relative overflow-hidden p-6">
              <div className="flex items-center gap-3">
                <div className={`grid size-14 place-items-center rounded-2xl bg-gradient-to-br ${e.color} text-2xl shadow-soft`}>{e.icon}</div>
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-bold">{e.title}</h3>
                  <p className="truncate text-xs text-muted-foreground">{e.subtitle}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-foreground/85">{e.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 font-semibold text-primary"><FiCalendar className="size-3" /> {e.date}</span>
                <span className="flex items-center gap-1.5 rounded-full bg-success/15 px-2.5 py-1 font-semibold text-success"><FiMapPin className="size-3" /> {e.location}</span>
              </div>
              <button onClick={() => toast({ title: "🎉 Tadbir haqida", description: "Batafsil ma'lumot tez orada", variant: "info" })} className="mt-5 w-full rounded-xl border border-border bg-muted/40 py-2.5 text-sm font-semibold transition hover:bg-primary hover:text-primary-foreground">
                Batafsil ma'lumot
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
