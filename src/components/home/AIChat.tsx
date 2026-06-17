/* AI chat with multilingual canned answers */
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaRobot, FaPaperPlane, FaUser } from "react-icons/fa";
import { useApp } from "@/context/AppContext";
import { SectionHeader } from "@/components/home/Destinations";
import type { Lang } from "@/utils/translations";

const aiData: Record<Lang, Record<string, string>> = {
  uz: {
    hotels: "Eng yaxshi mehmonxonalar: Hyatt Regency Tashkent ($120/kecha), Lotte City Hotel ($95/kecha), Registan Plaza Samarqand ($80/kecha), Orient Star Khiva ($110/kecha).",
    restaurants: "Mashhur restoranlar: Caravan (Toshkent), Afsona (Samarqand), Buxoro Arslon (Buxoro).",
    events: "Yirik tadbirlar: Sharq Taronalari (25-30 avgust), Palov sayli (15-16 may), Ipak yo'li marafoni (5-7 oktyabr).",
    time: "Eng yaxshi vaqt: bahor (aprel-may) va kuz (sentyabr-oktyabr) — 20-30°C.",
    places: "Mashhur joylar: Registon (Samarqand), Buxoro tarixiy markazi, Xiva qal'asi, Amir Temur maqbarasi.",
    mosque: "Mashhur masjidlar: Minor masjidi, Hazrati Imom, Bibi-Xonim, Buxoro jome masjidi.",
    taxi: "Taksi buyurtma uchun yuqoridagi formani to'ldiring va tugmani bosing.",
    default: "Savol bering — mehmonxonalar, restoranlar, tadbirlar, joylar, taksi va chiptalar haqida yordam beraman!",
  },
  ru: {
    hotels: "Лучшие отели: Hyatt ($120), Lotte City ($95), Registan Plaza ($80), Orient Star ($110).",
    restaurants: "Популярные: Caravan, Afsona, Bukhara Arslon.",
    events: "События: Шарк Тароналари (авг), Плов-фест (май), Марафон (окт).",
    time: "Лучшее время: весна и осень.",
    places: "Места: Регистан, Бухара, Хива, мавзолей Тимура.",
    mosque: "Мечети: Минор, Хазрати Имам, Биби-Ханым.",
    taxi: "Заполните форму выше и нажмите кнопку.",
    default: "Задайте вопрос про отели, рестораны, события, места или билеты!",
  },
  en: {
    hotels: "Best hotels: Hyatt ($120), Lotte City ($95), Registan Plaza ($80), Orient Star ($110).",
    restaurants: "Popular: Caravan, Afsona, Bukhara Arslon.",
    events: "Sharq Taronalari (Aug), Plov Fest (May), Silk Road Marathon (Oct).",
    time: "Best time: spring & autumn (20-30°C).",
    places: "Top places: Registan, Bukhara, Khiva, Amir Timur Mausoleum.",
    mosque: "Famous mosques: Minor, Hazrati Imam, Bibi-Khanym.",
    taxi: "Fill in the form above and press the button.",
    default: "Ask me about hotels, restaurants, events, places or tickets!",
  },
};

interface Msg { from: "user" | "bot"; text: string; }

export function AIChat() {
  const { lang } = useApp();
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: "👋 Salom! Men AI yordamchi. Menga mehmonxonalar, restoranlar, tadbirlar, taksi yoki chiptalar haqida savol bering!" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const send = (text: string) => {
    const value = text.trim(); if (!value) return;
    setMessages((m) => [...m, { from: "user", text: value }]); setInput(""); setTyping(true);
    setTimeout(() => {
      const q = value.toLowerCase(); const d = aiData[lang]; let answer = d.default;
      if (/mehmonxona|hotel|отель/.test(q)) answer = d.hotels;
      else if (/restoran|restaurant|ресторан|taom|food/.test(q)) answer = d.restaurants;
      else if (/tadbir|event|событие|festival/.test(q)) answer = d.events;
      else if (/vaqt|time|время|when/.test(q)) answer = d.time;
      else if (/joy|place|место/.test(q)) answer = d.places;
      else if (/masjid|mosque|мечет/.test(q)) answer = d.mosque;
      else if (/taksi|taxi|такси/.test(q)) answer = d.taxi;
      setMessages((m) => [...m, { from: "bot", text: answer }]); setTyping(false);
    }, 900);
  };

  const quick = ["🏨 Eng yaxshi mehmonxonalar", "🍽️ Milliy taomlar", "🎉 Tadbirlar", "📅 Sayohat vaqti", "🏛️ Mashhur joylar"];

  return (
    <section id="ai" className="container mx-auto max-w-4xl px-4 py-20 scroll-mt-24">
      <SectionHeader badge="07 / AI" title="🤖 AI Sayohat yordamchisi" sub="24/7 onlayn yordam — savolingizga 1 daqiqada javob" />
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-strong mt-10 overflow-hidden p-6 sm:p-8">
        <div className="mb-5 flex items-center gap-3 border-b border-border pb-4">
          <div className="relative grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-glow">
            <FaRobot className="size-5" />
            <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-card bg-emerald-500" />
          </div>
          <div className="flex-1">
            <div className="text-base font-bold">AI Yordamchi</div>
            <div className="text-xs text-muted-foreground">Online · 4 til</div>
          </div>
          <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">24/7</span>
        </div>

        <div className="h-80 space-y-3 overflow-y-auto rounded-2xl bg-muted/30 p-4">
          {messages.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-2 ${m.from === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`grid size-8 shrink-0 place-items-center rounded-full ${m.from === "user" ? "bg-purple-500 text-white" : "bg-gradient-to-br from-primary to-primary-glow text-primary-foreground"}`}>
                {m.from === "user" ? <FaUser className="size-3" /> : <FaRobot className="size-3" />}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.from === "user" ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : "bg-card shadow-soft ring-1 ring-border"}`}>{m.text}</div>
            </motion.div>
          ))}
          {typing && (
            <div className="flex items-center gap-2">
              <div className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground"><FaRobot className="size-3" /></div>
              <div className="rounded-2xl bg-card px-4 py-2.5 ring-1 ring-border">
                <div className="flex gap-1">
                  <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                  <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                  <span className="size-2 animate-bounce rounded-full bg-primary" />
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <form className="mt-4 flex gap-2" onSubmit={(e) => { e.preventDefault(); send(input); }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Savolingizni yozing..." className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
          <button type="submit" className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-glow px-5 text-sm font-bold text-primary-foreground transition hover:scale-105">
            <FaPaperPlane className="size-3.5" /> Yuborish
          </button>
        </form>

        <div className="mt-4 flex flex-wrap gap-2">
          {quick.map((q) => (
            <button key={q} onClick={() => send(q)} className="rounded-full bg-muted px-3 py-1.5 text-xs font-semibold transition hover:bg-primary hover:text-primary-foreground">{q}</button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
