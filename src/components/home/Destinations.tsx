import { motion } from "framer-motion";
import { FaStar, FaMapMarkerAlt, FaHotel, FaBookmark, FaRegBookmark, FaHeart, FaShareAlt, FaPlus } from "react-icons/fa";
import { useApp } from "@/context/AppContext";

export function Destinations() {
  const { destinations, bookmarks, toggleBookmark, likes, toggleLike, addItinerary, toast } = useApp();
  const visible = destinations.filter((d) => d.visible).sort((a, b) => a.order - b.order);

  return (
    <section id="destinations" className="container mx-auto px-4 py-20 scroll-mt-24">
      <SectionHeader badge="01 / Yo'nalishlar" title="Mashhur yo'nalishlar" sub="O'zbekistonning eng go'zal shaharlari va diqqatga sazovor joylari" />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((d, i) => {
          const isBm = bookmarks.includes(`dest:${d.id}`);
          const likeCount = likes[`dest:${d.id}`] || 0;
          return (
            <motion.article
              key={d.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group hover-lift relative overflow-hidden rounded-3xl bg-card shadow-soft ring-1 ring-border"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={d.image} alt={d.name} className="size-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute right-3 top-3 flex gap-1.5">
                  <button onClick={() => toggleBookmark(`dest:${d.id}`)} className={`grid size-9 place-items-center rounded-xl backdrop-blur-md transition ${isBm ? "bg-gold text-gold-foreground" : "bg-white/20 text-white hover:bg-white/40"}`}>
                    {isBm ? <FaBookmark className="size-3.5" /> : <FaRegBookmark className="size-3.5" />}
                  </button>
                  <button onClick={() => { toggleLike(`dest:${d.id}`); toast({ title: "Sevimlilar ro'yxatiga qo'shildi", variant: "success" }); }} className="relative grid size-9 place-items-center rounded-xl bg-white/20 text-white backdrop-blur-md transition hover:bg-rose-500">
                    <FaHeart className="size-3.5" />
                    {likeCount > 0 && <span className="absolute -bottom-1 -right-1 grid size-4 place-items-center rounded-full bg-rose-500 text-[9px] font-bold text-white">{likeCount}</span>}
                  </button>
                  <button onClick={() => { navigator.clipboard?.writeText(`${location.origin}/#destinations`); toast({ title: "Havola nusxalandi", variant: "info" }); }} className="grid size-9 place-items-center rounded-xl bg-white/20 text-white backdrop-blur-md transition hover:bg-white/40">
                    <FaShareAlt className="size-3.5" />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 text-white">
                  <div className="min-w-0">
                    <h3 className="truncate text-2xl font-extrabold">{d.name}</h3>
                    <p className="truncate text-sm opacity-90">{d.subtitle}</p>
                  </div>
                  <div className="shrink-0 rounded-xl bg-gold px-2.5 py-1 text-xs font-bold text-gold-foreground">
                    <FaStar className="mr-1 inline-block size-3" /> {d.rating}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-muted-foreground line-clamp-2">{d.description}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><FaMapMarkerAlt className="size-3 text-primary" /> {d.placesCount} joy</span>
                  <span className="flex items-center gap-1.5"><FaHotel className="size-3 text-primary" /> {d.hotelsCount} mehmonxona</span>
                  <span className="ml-auto">⭐ {d.reviews.toLocaleString()} sharh</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => { addItinerary({ id: `dest:${d.id}`, name: d.name, desc: d.subtitle }); toast({ title: "Marshrutga qo'shildi", description: d.name, variant: "success" }); }}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-primary to-primary-glow px-3 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition hover:shadow-glow"
                  >
                    <FaPlus className="size-3" /> Marshrutga
                  </button>
                  <a href="#tour360" className="rounded-xl border border-border bg-muted px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-primary hover:text-primary-foreground">360° →</a>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

export function SectionHeader({ badge, title, sub, gradient = false }: { badge?: string; title: string; sub?: string; gradient?: boolean }) {
  return (
    <div className="text-center">
      {badge && (
        <motion.span initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
          {badge}
        </motion.span>
      )}
      <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className={`mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl ${gradient ? "text-gradient" : "text-foreground"}`}>
        {title}
      </motion.h2>
      {sub && <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">{sub}</motion.p>}
    </div>
  );
}
