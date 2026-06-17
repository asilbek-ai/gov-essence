/* Interactive Leaflet map with filters */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { SectionHeader } from "@/components/home/Destinations";

const FILTERS = [
  { key: "all", label: "Hammasi", emoji: "🌍" },
  { key: "city", label: "Shaharlar", emoji: "🏙️" },
  { key: "attraction", label: "Tarixiy", emoji: "🏛️" },
  { key: "mosque", label: "Masjidlar", emoji: "🕌" },
  { key: "restaurant", label: "Restoranlar", emoji: "🍽️" },
  { key: "hotel", label: "Mehmonxonalar", emoji: "🏨" },
];

const COLORS: Record<string, string> = {
  city: "#1e40af", mosque: "#10b981", attraction: "#7c3aed", hotel: "#f59e0b",
  restaurant: "#ef4444", historical: "#7c3aed", park: "#16a34a", market: "#db2777",
  mall: "#0891b2", transport: "#475569",
};

export function MapSection() {
  const { mapPlaces, theme } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);
  const markersRef = useRef<unknown[]>([]);
  const [filter, setFilter] = useState("all");
  const [LRef, setLRef] = useState<typeof import("leaflet") | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");
      if (cancelled || !containerRef.current || mapRef.current) return;
      const map = L.map(containerRef.current).setView([41.311081, 69.279562], 6);
      const tileUrl = theme === "dark"
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
      L.tileLayer(tileUrl, { attribution: "© OpenStreetMap, CartoDB", subdomains: "abcd" }).addTo(map);
      mapRef.current = map;
      setLRef(L);
    })();
    return () => { cancelled = true; };
  }, [theme]);

  // refresh markers
  useEffect(() => {
    const L = LRef; const map = mapRef.current as { removeLayer: (m: unknown) => void } | null;
    if (!L || !map) return;
    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];
    mapPlaces
      .filter((p) => filter === "all" || p.type === filter)
      .forEach((p) => {
        const color = COLORS[p.type] || "#6b7280";
        const html = `<div style="background:${color};width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;border:2px solid white;box-shadow:0 4px 12px rgba(0,0,0,.35);">${p.icon}</div>`;
        const icon = L.divIcon({ html, className: "custom-marker", iconSize: [38, 38] });
        const marker = L.marker([p.lat, p.lng], { icon }).addTo(map as L.Map).bindPopup(`<b>${p.name}</b><br><span style="opacity:.7;font-size:12px">${p.desc}</span>`);
        markersRef.current.push(marker);
      });
  }, [LRef, mapPlaces, filter]);

  return (
    <section id="map" className="container mx-auto px-4 py-20 scroll-mt-24">
      <SectionHeader badge="05 / Xarita" title="🗺️ Interaktiv sayohat xaritasi" sub="Mehmonxonalar, restoranlar va turistik joylarni xaritada toping" />
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button key={f.key} onClick={() => setFilter(f.key)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${filter === f.key ? "bg-primary text-primary-foreground shadow-soft" : "bg-muted text-foreground/70 hover:bg-muted/70"}`}>
            <span className="mr-1.5">{f.emoji}</span>{f.label}
          </button>
        ))}
      </div>
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-6 overflow-hidden rounded-3xl border border-border shadow-strong">
        <div ref={containerRef} className="h-[500px] w-full" />
      </motion.div>
    </section>
  );
}
