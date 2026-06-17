/* Taxi & Tickets booking */
import { useState } from "react";
import { motion } from "framer-motion";
import { FaTaxi, FaTicketAlt } from "react-icons/fa";
import { useApp } from "@/context/AppContext";
import { SectionHeader } from "@/components/home/Destinations";

const TICKET_TYPES = [
  { v: "flight", l: "✈️ Samolyot", p: 45 },
  { v: "train", l: "🚆 Poyezd", p: 25 },
  { v: "bus", l: "🚌 Avtobus", p: 15 },
];

export function Booking() {
  const { toast } = useApp();
  const [pickup, setPickup] = useState(""); const [dropoff, setDropoff] = useState("");
  const [taxiBusy, setTaxiBusy] = useState(false); const [taxiResp, setTaxiResp] = useState<string | null>(null);

  const [tType, setTType] = useState("flight");
  const [from, setFrom] = useState("Toshkent"); const [to, setTo] = useState("Samarqand");
  const [date, setDate] = useState(""); const [tBusy, setTBusy] = useState(false); const [tResp, setTResp] = useState<string | null>(null);

  const bookTaxi = () => {
    setTaxiBusy(true); setTaxiResp(null);
    setTimeout(() => {
      setTaxiResp(`✅ Taksi topildi! ${pickup || "Joriy joy"} → ${dropoff || "Markaz"}. Narx: 15 000–25 000 so'm. Tel: +998 90 123 45 67`);
      setTaxiBusy(false);
      toast({ title: "Taksi tasdiqlandi", variant: "success" });
    }, 1400);
  };
  const searchTickets = () => {
    setTBusy(true); setTResp(null);
    setTimeout(() => {
      const found = TICKET_TYPES.find((t) => t.v === tType)!;
      setTResp(`✅ ${found.l} chiptasi topildi! ${from} → ${to}, sana: ${date || "2026-06-25"}. Narx: $${found.p}. Bron qilindi!`);
      setTBusy(false);
      toast({ title: "Chipta bron qilindi", variant: "success" });
    }, 1200);
  };

  return (
    <section id="booking" className="bg-muted/30 py-20 scroll-mt-24">
      <div className="container mx-auto px-4">
        <SectionHeader badge="06 / Bron qilish" title="📅 Tezkor bron qilish" sub="Taksi va chiptalarni bir necha daqiqada bron qiling" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-strong p-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-gold"><FaTaxi className="size-5" /></div>
              <h3 className="text-xl font-bold">Taksi buyurtma</h3>
            </div>
            <input value={pickup} onChange={(e) => setPickup(e.target.value)} placeholder="📍 Qayerdan?" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
            <input value={dropoff} onChange={(e) => setDropoff(e.target.value)} placeholder="🏁 Qayerga?" className="mt-3 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
            <button onClick={bookTaxi} disabled={taxiBusy} className="mt-4 w-full rounded-xl bg-gradient-to-r from-primary to-primary-glow py-3.5 text-base font-bold text-primary-foreground shadow-glow transition hover:scale-[1.02] disabled:opacity-60">
              {taxiBusy ? "Qidirilmoqda..." : "Taksi chaqirish"}
            </button>
            {taxiResp && <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-3 rounded-xl bg-success/15 p-3 text-sm text-success">{taxiResp}</motion.div>}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-strong p-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-soft"><FaTicketAlt className="size-5" /></div>
              <h3 className="text-xl font-bold">Chipta bron qilish</h3>
            </div>
            <select value={tType} onChange={(e) => setTType(e.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary">
              {TICKET_TYPES.map((t) => <option key={t.v} value={t.v}>{t.l}</option>)}
            </select>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Qayerdan" className="rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none focus:border-primary" />
              <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="Qayerga" className="rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none focus:border-primary" />
            </div>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-3 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
            <button onClick={searchTickets} disabled={tBusy} className="mt-4 w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 py-3.5 text-base font-bold text-white shadow-soft transition hover:scale-[1.02] disabled:opacity-60">
              {tBusy ? "Qidirilmoqda..." : "Qidirish va bron qilish"}
            </button>
            {tResp && <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-3 rounded-xl bg-success/15 p-3 text-sm text-success">{tResp}</motion.div>}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
