import { motion } from "framer-motion";
import { FaStar, FaUtensils } from "react-icons/fa";
import { useApp } from "@/context/AppContext";
import { SectionHeader } from "@/components/home/Destinations";

export function Hotels() {
  const { hotels, toast } = useApp();
  const visible = hotels.filter((h) => h.visible).sort((a, b) => a.order - b.order);
  return (
    <section id="hotels" className="bg-muted/30 py-20 scroll-mt-24">
      <div className="container mx-auto px-4">
        <SectionHeader badge="02 / Mehmonxonalar" title="🌟 Eng yaxshi mehmonxonalar" sub="Qulay narxlar va yuqori sifatli xizmat" />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {visible.map((h, i) => (
            <motion.article key={h.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="hover-lift group overflow-hidden rounded-3xl bg-card shadow-soft ring-1 ring-border">
              <div className="relative h-44 overflow-hidden">
                <img src={h.image} alt={h.name} className="size-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute right-3 top-3 rounded-xl bg-black/60 px-2 py-1 text-xs font-bold text-white backdrop-blur-md">
                  {[...Array(h.stars)].map((_, k) => <FaStar key={k} className="inline size-2.5 text-gold" />)}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold leading-snug">{h.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{h.description}</p>
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-extrabold text-primary">${h.pricePerNight}<span className="text-xs font-normal text-muted-foreground">/kecha</span></div>
                  </div>
                  <button onClick={() => toast({ title: "✅ Mehmonxona bron qilindi", description: `Kod: HOTEL${Math.floor(Math.random() * 10000)}`, variant: "success" })} className="rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-primary-glow">Bron qilish</button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Restaurants() {
  const { restaurants, toast } = useApp();
  const visible = restaurants.filter((r) => r.visible).sort((a, b) => a.order - b.order);
  return (
    <section id="restaurants" className="container mx-auto px-4 py-20 scroll-mt-24">
      <SectionHeader badge="03 / Restoranlar" title="🍽️ Milliy taomlar restoranlari" sub="O'zbekistonning eng mazali taomlari va mehmondo'stligi" />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((r, i) => (
          <motion.article key={r.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="hover-lift overflow-hidden rounded-3xl bg-card shadow-soft ring-1 ring-border">
            <div className="relative h-48 overflow-hidden">
              <img src={r.image} alt={r.name} className="size-full object-cover transition duration-700 hover:scale-110" loading="lazy" />
              <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-xl bg-black/60 px-2 py-1 text-xs font-semibold text-white backdrop-blur-md">
                <FaStar className="size-3 text-gold" /> {r.rating} <span className="opacity-70">({r.reviewsCount})</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold">{r.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{r.cuisine}</p>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground"><FaUtensils className="size-3 text-primary" /> {r.address}</p>
              <button onClick={() => toast({ title: "🍽️ Stol bron qilindi", description: "Tez orada bog'lanamiz", variant: "success" })} className="mt-4 w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-3 py-2.5 text-sm font-semibold text-white transition hover:opacity-90">Stol bron qilish</button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
