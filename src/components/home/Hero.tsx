import { motion } from "framer-motion";
import { FaStar, FaPlay } from "react-icons/fa";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { useApp } from "@/context/AppContext";
import { tr } from "@/utils/translations";

export function Hero() {
  const { lang, stats } = useApp();
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 gradient-hero-bg" />
      <div
        className="absolute inset-0 -z-10 opacity-25 mix-blend-overlay"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1548013146-72479768bada?w=1600')", backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-background" />

      {/* Decorative blobs */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-20 top-20 -z-10 size-72 rounded-full bg-gold/30 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-20 bottom-10 -z-10 size-72 rounded-full bg-primary-glow/40 blur-3xl"
      />

      <div className="container mx-auto grid items-center gap-12 px-4 py-20 md:py-28 lg:grid-cols-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="lg:col-span-7 text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-md"
          >
            {tr("hero_badge", lang)}
          </motion.div>

          <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            <span className="block">{tr("hero_title", lang)}</span>
            <span className="mt-1 block">
              <span className="text-gradient-gold">{tr("hero_360", lang)}</span>{" "}
              {tr("hero_title2", lang)}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">{tr("hero_sub", lang)}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#destinations" className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-amber-500 px-7 py-3.5 text-base font-bold text-gold-foreground shadow-gold transition hover:scale-105">
              {tr("hero_cta", lang)}
              <FiArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#tour360" className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-base font-bold text-white backdrop-blur-md transition hover:bg-white/20">
              <FaPlay className="size-3.5" /> {tr("hero_video", lang)}
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((i) => <FaStar key={i} className="size-4 text-gold" />)}
              <span className="ml-1.5 font-semibold">4.9</span>
              <span className="text-white/70">(12,000+ sharh)</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/80"><FiCheckCircle className="size-4 text-emerald-300" /> UNESCO obidalar</div>
            <div className="flex items-center gap-1.5 text-white/80"><FiCheckCircle className="size-4 text-emerald-300" /> 24/7 yordam</div>
          </div>
        </motion.div>

        {/* Stats card */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="lg:col-span-5">
          <div className="glass-strong relative overflow-hidden rounded-3xl p-6 shadow-strong">
            <div className="absolute -right-10 -top-10 size-40 rounded-full bg-gradient-to-br from-gold/40 to-primary/40 blur-3xl" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/70">Platforma raqamlari</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { v: `${stats.destinationsCount}+`, l: "Turistik joylar", c: "from-blue-500 to-cyan-500" },
                { v: `${stats.hotelsCount}+`, l: "Mehmonxonalar", c: "from-emerald-500 to-green-600" },
                { v: `${stats.restaurantsCount}+`, l: "Restoranlar", c: "from-orange-500 to-red-500" },
                { v: `${stats.eventsCount}+`, l: "Tadbirlar", c: "from-purple-500 to-pink-500" },
              ].map((s, i) => (
                <motion.div key={s.l} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05 }} className="rounded-2xl bg-white/10 p-4 backdrop-blur-md ring-1 ring-white/15">
                  <div className={`text-3xl font-extrabold bg-gradient-to-r ${s.c} bg-clip-text text-transparent`}>{s.v}</div>
                  <div className="mt-1 text-xs text-white/75">{s.l}</div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-emerald-500/15 p-3 text-xs text-white ring-1 ring-emerald-400/30">
              <div className="size-2 animate-pulse rounded-full bg-emerald-400" />
              <span suppressHydrationWarning>Live: {stats.visitors.toLocaleString("en-US")} tashriflar bugun</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
