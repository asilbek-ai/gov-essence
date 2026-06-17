export type Lang = "uz" | "ru" | "en";

export const LANGUAGES: { code: Lang; label: string; flag: string }[] = [
  { code: "uz", label: "O'zbek", flag: "🇺🇿" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

type Dict = Record<string, { uz: string; ru: string; en: string }>;

export const t: Dict = {
  // Nav
  nav_home: { uz: "Bosh sahifa", ru: "Главная", en: "Home" },
  nav_destinations: { uz: "Yo'nalishlar", ru: "Направления", en: "Destinations" },
  nav_hotels: { uz: "Mehmonxonalar", ru: "Отели", en: "Hotels" },
  nav_restaurants: { uz: "Restoranlar", ru: "Рестораны", en: "Restaurants" },
  nav_events: { uz: "Tadbirlar", ru: "События", en: "Events" },
  nav_tour360: { uz: "360° Tur", ru: "360° Тур", en: "360° Tour" },
  nav_map: { uz: "Xarita", ru: "Карта", en: "Map" },
  nav_booking: { uz: "Bron qilish", ru: "Бронирование", en: "Booking" },
  nav_ai: { uz: "AI Yordamchi", ru: "AI Помощник", en: "AI Assistant" },
  nav_news: { uz: "Yangiliklar", ru: "Новости", en: "News" },
  nav_murojaat: { uz: "Murojaat", ru: "Обращение", en: "Application" },
  nav_faq: { uz: "Savol-javob", ru: "FAQ", en: "FAQ" },
  nav_contact: { uz: "Aloqa", ru: "Контакты", en: "Contact" },
  nav_admin: { uz: "Admin panel", ru: "Админ панель", en: "Admin panel" },

  // Hero
  hero_badge: { uz: "✨ Rasmiy turizm platformasi", ru: "✨ Официальная туристическая платформа", en: "✨ Official tourism platform" },
  hero_title: { uz: "O'zbekistonni", ru: "Открой", en: "Discover" },
  hero_title2: { uz: "kashf eting", ru: "Узбекистан", en: "Uzbekistan" },
  hero_360: { uz: "360°", ru: "360°", en: "360°" },
  hero_sub: { uz: "Virtual sayohatlar, aqlli xarita, mehmonxonalar, taksi va chipta bron qilish — barchasi bir joyda", ru: "Виртуальные туры, умная карта, отели, такси и билеты — всё в одном месте", en: "Virtual tours, smart map, hotels, taxi and tickets — all in one place" },
  hero_cta: { uz: "Sayohatni boshlash", ru: "Начать путешествие", en: "Start the journey" },
  hero_video: { uz: "Video ko'rish", ru: "Смотреть видео", en: "Watch video" },

  // Sections
  sec_destinations_title: { uz: "Mashhur yo'nalishlar", ru: "Популярные направления", en: "Popular destinations" },
  sec_destinations_sub: { uz: "O'zbekistonning eng go'zal shaharlari va diqqatga sazovor joylari", ru: "Самые красивые города и достопримечательности Узбекистана", en: "Most beautiful cities and landmarks of Uzbekistan" },
  sec_hotels_title: { uz: "Eng yaxshi mehmonxonalar", ru: "Лучшие отели", en: "Top hotels" },
  sec_hotels_sub: { uz: "Qulay narxlar va yuqori sifatli xizmat", ru: "Удобные цены и качественный сервис", en: "Comfortable prices and quality service" },
  sec_rest_title: { uz: "Milliy taomlar restoranlari", ru: "Рестораны национальной кухни", en: "National cuisine restaurants" },
  sec_rest_sub: { uz: "O'zbekistonning eng mazali taomlari va mehmondo'stligi", ru: "Самые вкусные блюда и гостеприимство Узбекистана", en: "Most delicious food and hospitality" },
  sec_events_title: { uz: "Tadbirlar va festivallar", ru: "События и фестивали", en: "Events & festivals" },
  sec_events_sub: { uz: "O'zbekistonda bo'lib o'tadigan eng qiziqarli tadbirlar", ru: "Самые интересные события Узбекистана", en: "Most interesting events in Uzbekistan" },
  sec_360_title: { uz: "360° Virtual tur", ru: "360° Виртуальный тур", en: "360° Virtual tour" },
  sec_360_sub: { uz: "Sichqoncha yoki barmoq bilan surang — to'liq 360° dunyo", ru: "Перетаскивайте мышью или пальцем — мир 360°", en: "Drag with mouse or finger — full 360° world" },
  sec_map_title: { uz: "Interaktiv xarita", ru: "Интерактивная карта", en: "Interactive map" },
  sec_map_sub: { uz: "Masjidlar, mehmonxonalar, restoranlar va diqqatga sazovor joylar", ru: "Мечети, отели, рестораны и достопримечательности", en: "Mosques, hotels, restaurants and landmarks" },
  sec_booking_title: { uz: "Tezkor bron qilish", ru: "Быстрое бронирование", en: "Quick booking" },
  sec_booking_sub: { uz: "Taksi va chiptalarni bir necha daqiqada bron qiling", ru: "Бронируйте такси и билеты за минуты", en: "Book taxi and tickets in minutes" },
  sec_news_title: { uz: "Yangiliklar va e'lonlar", ru: "Новости и объявления", en: "News & announcements" },
  sec_news_sub: { uz: "Eng so'nggi xabarlardan boxabar bo'ling", ru: "Будьте в курсе последних новостей", en: "Stay up to date with the latest news" },
  sec_faq_title: { uz: "Ko'p so'raladigan savollar", ru: "Часто задаваемые вопросы", en: "Frequently asked questions" },
  sec_contact_title: { uz: "Biz bilan bog'laning", ru: "Свяжитесь с нами", en: "Get in touch" },

  // Buttons / generic
  view_more: { uz: "Batafsil", ru: "Подробнее", en: "View more" },
  book_now: { uz: "Bron qilish", ru: "Забронировать", en: "Book now" },
  read_more: { uz: "O'qish", ru: "Читать", en: "Read more" },
  send: { uz: "Yuborish", ru: "Отправить", en: "Send" },
  save: { uz: "Saqlash", ru: "Сохранить", en: "Save" },
  cancel: { uz: "Bekor qilish", ru: "Отмена", en: "Cancel" },
  delete: { uz: "O'chirish", ru: "Удалить", en: "Delete" },
  edit: { uz: "Tahrirlash", ru: "Редактировать", en: "Edit" },
  add: { uz: "Qo'shish", ru: "Добавить", en: "Add" },
  close: { uz: "Yopish", ru: "Закрыть", en: "Close" },
  search: { uz: "Qidirish", ru: "Поиск", en: "Search" },

  // Murojaat
  murojaat_title: { uz: "Murojaat yuborish", ru: "Отправить обращение", en: "Send application" },
  murojaat_sub: { uz: "Bizga murojaat yuboring — har bir xabarga javob beramiz", ru: "Отправьте нам обращение — ответим на каждое", en: "Send us your application — we respond to every message" },
  full_name: { uz: "To'liq ism", ru: "Полное имя", en: "Full name" },
  phone: { uz: "Telefon", ru: "Телефон", en: "Phone" },
  email: { uz: "Email", ru: "Email", en: "Email" },
  region: { uz: "Hudud / mahalla", ru: "Регион / махалля", en: "Region / mahalla" },
  category: { uz: "Murojaat turi", ru: "Тип обращения", en: "Category" },
  message: { uz: "Xabar matni", ru: "Текст сообщения", en: "Message" },
  submit: { uz: "Murojaatni yuborish", ru: "Отправить обращение", en: "Submit application" },

  // Stats / footer
  footer_about: { uz: "O'zbekistonning rasmiy turizm va xizmatlar portali. Barcha imkoniyatlar bir joyda.", ru: "Официальный туристический и сервисный портал Узбекистана. Все возможности в одном месте.", en: "Official tourism and services portal of Uzbekistan. All possibilities in one place." },
  footer_contact: { uz: "Aloqa", ru: "Контакты", en: "Contact" },
  footer_quick: { uz: "Tezkor havolalar", ru: "Быстрые ссылки", en: "Quick links" },
  footer_legal: { uz: "© 2026 SmartTour 360 — Barcha huquqlar himoyalangan", ru: "© 2026 SmartTour 360 — Все права защищены", en: "© 2026 SmartTour 360 — All rights reserved" },
};

export function tr(key: keyof typeof t | string, lang: Lang): string {
  const entry = (t as Dict)[key as string];
  if (!entry) return key as string;
  return entry[lang] || entry.uz;
}
