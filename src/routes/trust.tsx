import { createFileRoute, Link } from "@tanstack/react-router";
import { FiShield, FiLock, FiDatabase, FiUser, FiMail, FiInfo, FiServer, FiEye } from "react-icons/fi";

export const Route = createFileRoute("/trust")({
  head: () => ({
    meta: [
      { title: "Ishonch va xavfsizlik — SmartTour 360" },
      { name: "description", content: "SmartTour 360 platformasi qanday ma'lumotlarni yig'ishi, qayta ishlashi va himoyalashi haqida ochiq ma'lumot." },
      { property: "og:title", content: "Ishonch va xavfsizlik — SmartTour 360" },
      { property: "og:description", content: "Ma'lumotlaringiz qanday himoyalanadi, qaysi xizmatlardan foydalanamiz va so'rovlarni qanday yuborish mumkin." },
    ],
  }),
  component: TrustPage,
});

function Section({ icon: Icon, title, children }: { icon: React.ComponentType<{ className?: string }>; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
      <div className="flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
          <Icon className="size-5" />
        </div>
        <h2 className="font-display text-xl font-extrabold">{title}</h2>
      </div>
      <div className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

function TrustPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-10 text-center">
        <div className="mx-auto mb-4 grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-glow">
          <FiShield className="size-7" />
        </div>
        <h1 className="font-display text-4xl font-extrabold text-gradient">Ishonch va xavfsizlik</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
          Ushbu sahifa SmartTour 360 sayt egasi tomonidan ma'lumotlar bilan ishlash, xavfsizlik nazoratlari va maxfiylik amaliyotini tushuntirish uchun yuritiladi. Bu sahifa mustaqil sertifikat emas — sayt egasi tomonidan tahrirlanadigan kontent.
        </p>
      </div>

      <div className="space-y-5">
        <Section icon={FiInfo} title="Ushbu sayt haqida">
          <p>
            SmartTour 360 — bu O'zbekiston turizmiga oid ma'lumotlarni (yo'nalishlar, mehmonxonalar, restoranlar, tadbirlar, virtual sayohatlar) jamlovchi axborot portali. Sayt prototip/demo sifatida ishlaydi va Lovable platformasida joylashtirilgan.
          </p>
        </Section>

        <Section icon={FiDatabase} title="Qanday ma'lumotlarni saqlaymiz">
          <p>
            Joriy versiyada deyarli barcha sayt holati (sevimlilar, marshrutlar, til/tema sozlamasi, demo murojaatlar) <span className="font-semibold text-foreground">faqat sizning brauzeringizning LocalStorage'ida</span> saqlanadi. Bu ma'lumotlar serverga yuborilmaydi. Brauzer ma'lumotlarini tozalash orqali ularni istalgan vaqtda o'chirib tashlashingiz mumkin.
          </p>
          <p>
            Agar siz "Murojaat" formasi orqali so'rov yuborsangiz, kiritilgan ma'lumotlar (ism, telefon, email, xabar) shu brauzer ichida saqlanadi va admin panelidan ko'rinadi. Real ishlab chiqarish muhitiga o'tishda bu ma'lumotlar himoyalangan server bilan almashtirilishi rejalashtirilgan.
          </p>
        </Section>

        <Section icon={FiLock} title="Kirish nazorati va admin panel">
          <p>
            Admin panel sessiya asosida ishlaydi: parol SHA-256 algoritmi yordamida tekshiriladi va seans tokeni faqat <span className="font-semibold text-foreground">sessionStorage</span>'da saqlanadi (brauzer yopilganda avtomatik o'chadi). Admin parolining ochiq matni manba kodda saqlanmaydi.
          </p>
          <p>
            Eslatma: to'liq xavfsizlik uchun (rolga asoslangan kirish, audit jurnali, multi-faktor autentifikatsiya) server tomonidagi autentifikatsiyaga (masalan, Lovable Cloud / Supabase Auth) o'tish tavsiya etiladi.
          </p>
        </Section>

        <Section icon={FiServer} title="Platforma va hosting">
          <p>
            Sayt Lovable platformasida joylashtirilgan. Trafik HTTPS orqali shifrlangan holda uzatiladi. Statik kontent va SSR Cloudflare Workers muhitida ishlaydi.
          </p>
        </Section>

        <Section icon={FiEye} title="Cookies va analitika">
          <p>
            Sayt o'z funksiyasi uchun zarur bo'lgan minimal brauzer xotirasidan (LocalStorage/sessionStorage) foydalanadi. Uchinchi tomon reklama tracker'lari ishlatilmaydi. Agar kelajakda analitika qo'shilsa, ushbu sahifa va maxfiylik siyosati yangilanadi.
          </p>
        </Section>

        <Section icon={FiUser} title="Sizning huquqlaringiz">
          <p>
            Brauzer xotirasidagi har qanday ma'lumotni istalgan vaqtda o'chirib tashlashingiz mumkin (brauzer sozlamalari → sayt ma'lumotlari). Murojaatlaringiz bo'yicha so'rov yuborish uchun quyidagi aloqa kanalidan foydalaning.
          </p>
        </Section>

        <Section icon={FiMail} title="Xavfsizlik bo'yicha bog'lanish">
          <p>
            Xavfsizlik zaifligi yoki maxfiylik bilan bog'liq savol bo'lsa: <a href="mailto:info@smarttour.uz" className="font-semibold text-primary hover:underline">info@smarttour.uz</a> manziliga yozing. Iltimos, ommaviy joyda zaiflikni e'lon qilishdan oldin javob kutib turing.
          </p>
        </Section>

        <div className="rounded-3xl border border-dashed border-border bg-muted/40 p-5 text-xs text-muted-foreground">
          Ushbu sahifa sayt egasi tomonidan tahrirlanadi va mustaqil audit/sertifikat hisoblanmaydi. Konkret talablar (masalan, GDPR, ISO 27001) yoki shartnomaviy majburiyatlar uchun yozma so'rov yuboring.
        </div>

        <div className="text-center">
          <Link to="/" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-primary-glow px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-105">← Bosh sahifaga</Link>
        </div>
      </div>
    </div>
  );
}
