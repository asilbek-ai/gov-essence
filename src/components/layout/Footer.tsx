import { Link } from "@tanstack/react-router";
import { FaGlobeAsia, FaFacebook, FaInstagram, FaTelegram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useApp } from "@/context/AppContext";
import { tr } from "@/utils/translations";

export function Footer() {
  const { lang, visitorCount } = useApp();
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border bg-card">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary-glow to-gold" />
      <div className="container mx-auto grid gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
              <FaGlobeAsia className="size-5" />
            </div>
            <div>
              <div className="text-base font-extrabold text-gradient">SmartTour 360</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Premium portal</div>
            </div>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{tr("footer_about", lang)}</p>
          <div className="mt-5 flex gap-2">
            {[FaFacebook, FaInstagram, FaTelegram, FaYoutube].map((Icon, i) => (
              <a key={i} href="#" className="grid size-9 place-items-center rounded-xl bg-muted text-foreground/70 transition hover:bg-primary hover:text-primary-foreground">
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">{tr("footer_quick", lang)}</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { label: tr("nav_destinations", lang), href: "/#destinations" },
              { label: tr("nav_tour360", lang), href: "/#tour360" },
              { label: tr("nav_map", lang), href: "/#map" },
              { label: tr("nav_booking", lang), href: "/#booking" },
              { label: tr("nav_news", lang), href: "/#news" },
            ].map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-muted-foreground transition hover:text-primary">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Foydali havolalar</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { label: "gov.uz", href: "https://gov.uz" },
              { label: "uzbekistan.travel", href: "https://uzbekistan.travel" },
              { label: "Vazirliklar portali", href: "#" },
              { label: "Maxsus xizmatlar", href: "#" },
              { label: "Murojaat ", href: "/murojaat" },
            ].map((l) => (
              <li key={l.label}><a href={l.href} className="text-muted-foreground transition hover:text-primary">{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">{tr("footer_contact", lang)}</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2 text-muted-foreground"><FaMapMarkerAlt className="mt-0.5 size-4 text-primary" /> Toshkent, Mustaqillik maydoni, 5</li>
            <li className="flex items-center gap-2 text-muted-foreground"><FaPhone className="size-4 text-primary" /> +998 71 200 00 00</li>
            <li className="flex items-center gap-2 text-muted-foreground"><FaEnvelope className="size-4 text-primary" /> info@smarttour.uz</li>
          </ul>
          <div className="mt-5 rounded-2xl border border-border bg-muted/40 p-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Bugungi tashriflar</span>
              <span className="font-mono font-bold text-primary">{visitorCount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground md:flex-row">
          <div>{tr("footer_legal", lang)}</div>
          <div className="flex items-center gap-3">
            <a href="#" className="transition hover:text-primary">Maxfiylik siyosati</a>
            <span>•</span>
            <a href="#" className="transition hover:text-primary">Foydalanish shartlari</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
