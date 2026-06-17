// Initial seed data for SmartTour 360 — fully editable from admin panel.

export type ID = string;
export interface Destination {
  id: ID; key: string; name: string; subtitle: string; image: string;
  rating: number; reviews: number; placesCount: number; hotelsCount: number;
  description: string; visible: boolean; order: number;
}
export interface Hotel {
  id: ID; name: string; image: string; stars: number; city: string;
  pricePerNight: number; description: string; visible: boolean; order: number;
}
export interface Restaurant {
  id: ID; name: string; image: string; cuisine: string; address: string;
  rating: number; reviewsCount: number; visible: boolean; order: number;
}
export interface EventItem {
  id: ID; title: string; subtitle: string; description: string;
  date: string; location: string; icon: string; color: string; visible: boolean; order: number;
}
export interface NewsItem {
  id: ID; title: string; excerpt: string; body: string; image: string;
  category: string; publishedAt: string; visible: boolean; pinned: boolean;
}
export interface Monument {
  id: ID; name: Record<string, string>; location: Record<string, string>;
  image: string; tags: string[]; text: Record<string, string>;
}
export interface MapPlace {
  id: ID; lat: number; lng: number; name: string; type: string; icon: string; desc: string;
}
export interface Application {
  id: ID; fullName: string; phone: string; email: string; region: string;
  category: string; categoryKey: string; message: string; createdAt: string;
  status: "new" | "in_progress" | "answered" | "closed";
  read: boolean; reply?: string;
}
export interface NavItem { id: ID; key: string; label: Record<string, string>; href: string; visible: boolean; order: number; }
export interface SiteStats {
  visitors: number; destinationsCount: number; hotelsCount: number;
  restaurantsCount: number; eventsCount: number;
}

export const seedDestinations: Destination[] = [
  { id: "d1", key: "samarkand", name: "Samarqand", subtitle: "Registon, Bibi-Xonim, Shohizinda", image: "https://st.muslim.uz/cache/e/c/3/6/0/ec36036eb552e3b2391ade919a4c00b14c7460f5.jpeg", rating: 4.9, reviews: 1254, placesCount: 15, hotelsCount: 8, description: "Buyuk ipak yo'lining yuragi — Temuriylar saltanati poytaxti.", visible: true, order: 1 },
  { id: "d2", key: "bukhara", name: "Buxoro", subtitle: "Poi Kalon, Ark, Sitorai Mohi Xosa", image: "https://www.afisha.uz/uploads/media/2024/07/726ed482558faef00c995eff8b4ba97f.jpg", rating: 4.8, reviews: 892, placesCount: 12, hotelsCount: 6, description: "Muqaddas shahar — minora va madrasalar shahari.", visible: true, order: 2 },
  { id: "d3", key: "khiva", name: "Xiva", subtitle: "Ichan qal'a, Kunya Ark, Juma masjidi", image: "https://uzbekistan.travel/storage/app/media/Otabek/asosiydagi%20rasmlar/cropped-images/2079897013-0-0-0-0-1728537570.jpg", rating: 4.7, reviews: 1012, placesCount: 10, hotelsCount: 5, description: "Ochiq osmon ostidagi muzey — Ichan qal'a.", visible: true, order: 3 },
];

export const seedHotels: Hotel[] = [
  { id: "h1", name: "Hyatt Regency Tashkent", image: "https://avatars.mds.yandex.net/get-altay/16055577/2a0000019a26af25909cf698f832f8e83159/L_height", stars: 5, city: "Toshkent", pricePerNight: 120, description: "Toshkent markazi, 5 yulduz", visible: true, order: 1 },
  { id: "h2", name: "Lotte City Hotel", image: "https://tashkent.uz/_next/image?url=https%3A%2F%2Fapi.tashkent.uz%2Fupload%2Fcity%2Fseesight%2F2025%2F%25D0%2593%25D0%25BE%25D1%2581%25D1%2582%25D0%25B8%25D0%25BD%25D0%25B8%25D1%2586%25D0%25B0_%25D0%25A3%25D0%25B7%25D0%25B1%25D0%25B5%25D0%25BA%25D0%25B8%25D1%2581%25D1%2582%25D0%25B0%25D0%25BD_Russian.jpg&w=3840&q=75", stars: 4, city: "Toshkent", pricePerNight: 95, description: "Toshkent, 4 yulduz", visible: true, order: 2 },
  { id: "h3", name: "Registan Plaza", image: "https://www.afisha.uz/uploads/media/2025/04/a09c2978e0a0e9538c65eea4e16d3ed2_l.webp", stars: 4, city: "Samarqand", pricePerNight: 80, description: "Samarqand, 4 yulduz", visible: true, order: 3 },
  { id: "h4", name: "Orient Star Khiva", image: "https://storage.kun.uz/source/1/sSWjMueYm8GevVyPuMFKEnv2w8xjtOWO.jpg", stars: 5, city: "Xiva", pricePerNight: 110, description: "Xiva, 5 yulduz", visible: true, order: 4 },
];

export const seedRestaurants: Restaurant[] = [
  { id: "r1", name: "Caravan Restaurant", image: "https://oqila.uz/wp-content/uploads/2022/12/photo_2022-12-06_15-34-08.jpg", cuisine: "Milliy palov, somsa, shashlik", address: "Toshkent, Amir Temur ko'chasi", rating: 4.8, reviewsCount: 450, visible: true, order: 1 },
  { id: "r2", name: "Afsona Restaurant", image: "https://avatars.mds.yandex.net/get-altay/4336337/2a0000017a57cc6684afa61607b50b0562d3/L_height", cuisine: "An'anaviy o'zbek oshxonasi", address: "Samarqand, Registon yaqinida", rating: 4.9, reviewsCount: 620, visible: true, order: 2 },
  { id: "r3", name: "Buxoro Arslon", image: "https://www.afisha.uz/uploads/media/2025/08/6f120c79c491b9d60394ee80537830d7_m.webp", cuisine: "Buxoro uslubidagi taomlar", address: "Buxoro, Labi Xovuz", rating: 4.7, reviewsCount: 380, visible: true, order: 3 },
];

export const seedEvents: EventItem[] = [
  { id: "e1", title: "Sharq Taronalari", subtitle: "Xalqaro musiqa festivali", description: "Samarqandda har yili o'tkaziladigan buyuk musiqiy tadbir", date: "25-30 avgust", location: "Samarqand", icon: "🎵", color: "from-purple-500 to-pink-500", visible: true, order: 1 },
  { id: "e2", title: "Palov sayli", subtitle: "Milliy taomlar festivali", description: "O'zbekistonning eng mazali palovi tanlovi", date: "15-16 may", location: "Toshkent", icon: "🍛", color: "from-orange-500 to-red-500", visible: true, order: 2 },
  { id: "e3", title: "Ipak yo'li marafoni", subtitle: "Xalqaro sport tadbiri", description: "Samarqand va Buxoro shaharlari bo'ylab marafon", date: "5-7 oktyabr", location: "Samarqand–Buxoro", icon: "🏃", color: "from-green-500 to-teal-500", visible: true, order: 3 },
];

export const seedNews: NewsItem[] = [
  { id: "n1", title: "O'zbekiston turizm rivojiga 500 mln dollar yo'naltiriladi", excerpt: "Hukumat 2026-yilda turizm infratuzilmasini yangilash uchun katta investitsiya ajratdi.", body: "Hukumat 2026-yilda turizm infratuzilmasini yangilash uchun 500 million AQSh dollari miqdorida investitsiya ajratdi. Mablag' yangi mehmonxonalar, yo'llar va xizmatlarga sarflanadi.", image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200", category: "Yangilik", publishedAt: new Date().toISOString(), visible: true, pinned: true },
  { id: "n2", title: "Samarqand UNESCO sammitiga tayyorlanmoqda", excerpt: "Shahar yangi muzey va madaniy markazlar bilan boyitilmoqda.", body: "Samarqand shahri 2026 UNESCO sammitini qabul qilishga tayyorlanmoqda. Yangi muzeylar, ko'chalar va madaniy markazlar ochilishi rejalashtirilgan.", image: "https://images.unsplash.com/photo-1532974297617-c0f05fe6bff4?w=1200", category: "Madaniyat", publishedAt: new Date(Date.now() - 86400000).toISOString(), visible: true, pinned: false },
  { id: "n3", title: "Yangi 360° virtual tur platformasi ishga tushdi", excerpt: "Endi siz uydan turib O'zbekistonni 360 darajada kashf qilishingiz mumkin.", body: "SmartTour 360 platformasida 50 dan ortiq tarixiy joy uchun virtual sayohatlar mavjud.", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200", category: "Texnologiya", publishedAt: new Date(Date.now() - 172800000).toISOString(), visible: true, pinned: false },
];

export const seedMonuments: Monument[] = [
  { id: "m1", name: { uz: "Registon", ru: "Регистан", en: "Registan" }, location: { uz: "Samarqand", ru: "Самарканд", en: "Samarkand" }, image: "https://st.muslim.uz/cache/e/c/3/6/0/ec36036eb552e3b2391ade919a4c00b14c7460f5.jpeg", tags: ["UNESCO", "XV asr", "Temuriylar", "Madrasalar"], text: { uz: "Registon — Samarqandning yuragi. Uchta buyuk madrasa bilan o'ralgan ulkan maydon: Ulug'bek (1420), Sher-Dor (1636) va Tillakori (1660). UNESCO Jahon merosi ro'yxatida.", ru: "Регистан — сердце Самарканда. Три великих медресе: Улугбека (1420), Шер-Дор (1636) и Тилля-Кари (1660). Внесён в список ЮНЕСКО.", en: "Registan is the heart of Samarkand — a grand square with three madrasas: Ulugbek (1420), Sher-Dor (1636) and Tillya-Kari (1660). UNESCO World Heritage." } },
  { id: "m2", name: { uz: "Minorai Kalon", ru: "Минарет Калян", en: "Kalon Minaret" }, location: { uz: "Buxoro", ru: "Бухара", en: "Bukhara" }, image: "https://www.afisha.uz/uploads/media/2024/07/726ed482558faef00c995eff8b4ba97f.jpg", tags: ["XII asr", "46 metr", "Buxoro"], text: { uz: "Buxoroning ramzi. 1127-yilda qurilgan, balandligi 46 metr. Chingizxon Buxoroni vayron qilganda bu minorani saqlashga buyurgan.", ru: "Символ Бухары, построен в 1127 году, высота 46 м. Чингисхан приказал не трогать его.", en: "The symbol of Bukhara, built in 1127, 46 meters tall. Genghis Khan ordered it spared." } },
  { id: "m3", name: { uz: "Ichan Qal'a", ru: "Ичан-Кала", en: "Itchan Kala" }, location: { uz: "Xiva", ru: "Хива", en: "Khiva" }, image: "https://uzbekistan.travel/storage/app/media/Otabek/asosiydagi%20rasmlar/cropped-images/2079897013-0-0-0-0-1728537570.jpg", tags: ["UNESCO", "XVII asr", "Shahar-muzey"], text: { uz: "Xivaning ichki shahri — butun saqlanib qolgan ochiq osmon ostidagi muzey. 50+ tarixiy inshoot.", ru: "Внутренний город Хивы, музей под открытым небом. 50+ памятников.", en: "Inner city of Khiva, a perfectly preserved museum-city with 50+ monuments." } },
  { id: "m4", name: { uz: "Bibi-Xonim", ru: "Биби-Ханым", en: "Bibi-Khanym" }, location: { uz: "Samarqand", ru: "Самарканд", en: "Samarkand" }, image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800", tags: ["1404-yil", "Amir Temur", "UNESCO"], text: { uz: "Amir Temur tomonidan 1404-yilda qurilgan, asosiy gumbazi 41 m.", ru: "Построена Тимуром в 1404 году, главный купол 41 м.", en: "Built by Amir Timur in 1404, main dome 41 m tall." } },
  { id: "m5", name: { uz: "Ark Qal'asi", ru: "Крепость Арк", en: "Ark Fortress" }, location: { uz: "Buxoro", ru: "Бухара", en: "Bukhara" }, image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800", tags: ["IV asr", "Qal'a", "Muzey"], text: { uz: "Buxoroning eng qadimiy inshooti. 1500 yil davomida amirlar qarorgohi.", ru: "Древнейшее сооружение Бухары, 1500 лет служила резиденцией.", en: "Bukhara's oldest structure, 1,500 years as ruler's residence." } },
];

export const seedMapPlaces: MapPlace[] = [
  { id: "p1", lat: 41.311, lng: 69.279, name: "Toshkent", type: "city", icon: "🏙️", desc: "Poytaxt, zamonaviy va tarixiy joylar" },
  { id: "p2", lat: 39.654, lng: 66.975, name: "Samarqand — Registon", type: "attraction", icon: "🏛️", desc: "Samarqand yuragi, UNESCO" },
  { id: "p3", lat: 39.774, lng: 64.428, name: "Buxoro tarixiy markazi", type: "attraction", icon: "🏛️", desc: "Poi Kalon, Ark qal'asi" },
  { id: "p4", lat: 41.378, lng: 60.358, name: "Xiva — Ichan qal'a", type: "attraction", icon: "🏰", desc: "Ochiq osmon ostidagi muzey" },
  { id: "p5", lat: 41.323, lng: 69.267, name: "Minor masjidi", type: "mosque", icon: "🕌", desc: "Toshkentning eng chiroyli masjidi" },
  { id: "p6", lat: 41.302, lng: 69.279, name: "Hazrati Imom majmuasi", type: "mosque", icon: "🕌", desc: "Eski shahar yuragi" },
  { id: "p7", lat: 41.312, lng: 69.295, name: "Hyatt Regency", type: "hotel", icon: "🏨", desc: "5 yulduzli mehmonxona" },
  { id: "p8", lat: 41.311, lng: 69.250, name: "Lotte City Hotel", type: "hotel", icon: "🏨", desc: "4 yulduzli mehmonxona" },
  { id: "p9", lat: 41.314, lng: 69.285, name: "Caravan Restaurant", type: "restaurant", icon: "🍽️", desc: "Milliy taomlar" },
  { id: "p10", lat: 41.300, lng: 69.255, name: "Afsona Restaurant", type: "restaurant", icon: "🍛", desc: "An'anaviy oshxona" },
  { id: "p11", lat: 41.308, lng: 69.271, name: "Amir Temur maydoni", type: "attraction", icon: "🗿", desc: "Toshkent markazi" },
  { id: "p12", lat: 41.330, lng: 69.290, name: "Botanika bog'i", type: "attraction", icon: "🌿", desc: "Yashil bog'" },
  { id: "p13", lat: 40.783, lng: 72.344, name: "Farg'ona", type: "city", icon: "🌆", desc: "Yashil shahar" },
  { id: "p14", lat: 37.224, lng: 67.278, name: "Termiz", type: "city", icon: "🏜️", desc: "Qadimiy buddaviy yodgorliklar" },
];

export const seedNav: NavItem[] = [
  { id: "nv1", key: "home", label: { uz: "Bosh sahifa", ru: "Главная", en: "Home" }, href: "/", visible: true, order: 1 },
  { id: "nv2", key: "destinations", label: { uz: "Yo'nalishlar", ru: "Направления", en: "Destinations" }, href: "/#destinations", visible: true, order: 2 },
  { id: "nv3", key: "tour", label: { uz: "360° Tur", ru: "360° Тур", en: "360° Tour" }, href: "/#tour360", visible: true, order: 3 },
  { id: "nv4", key: "map", label: { uz: "Xarita", ru: "Карта", en: "Map" }, href: "/#map", visible: true, order: 4 },
  { id: "nv5", key: "news", label: { uz: "Yangiliklar", ru: "Новости", en: "News" }, href: "/#news", visible: true, order: 5 },
  { id: "nv6", key: "murojaat", label: { uz: "Murojaat", ru: "Обращение", en: "Application" }, href: "/murojaat", visible: true, order: 6 },
  { id: "nv7", key: "contact", label: { uz: "Aloqa", ru: "Контакты", en: "Contact" }, href: "/#contact", visible: true, order: 7 },
];

export const APPLICATION_CATEGORIES = [
  { key: "water", uz: "Suv toshgan", ru: "Прорыв воды", en: "Water issue" },
  { key: "road", uz: "Yo'l muammosi", ru: "Дорожная проблема", en: "Road issue" },
  { key: "electric", uz: "Elektr uzilishi", ru: "Отключение света", en: "Electricity outage" },
  { key: "gas", uz: "Gaz muammosi", ru: "Проблема с газом", en: "Gas issue" },
  { key: "garbage", uz: "Chiqindi yig'imi", ru: "Вывоз мусора", en: "Garbage collection" },
  { key: "tourism", uz: "Turizm xizmati", ru: "Туристические услуги", en: "Tourism service" },
  { key: "complaint", uz: "Shikoyat", ru: "Жалоба", en: "Complaint" },
  { key: "suggestion", uz: "Taklif", ru: "Предложение", en: "Suggestion" },
  { key: "other", uz: "Boshqa", ru: "Другое", en: "Other" },
];

export const seedApplications: Application[] = [
  { id: "a1", fullName: "Ali Karimov", phone: "+998 90 111 22 33", email: "ali@example.com", region: "Toshkent — Yunusobod", category: "Suv toshgan", categoryKey: "water", message: "Ko'chamizda suv quvuri yorilgan, 3 kundan beri suv yo'q.", createdAt: new Date(Date.now() - 3600000).toISOString(), status: "new", read: false },
  { id: "a2", fullName: "Dilshod Toshev", phone: "+998 91 222 33 44", email: "dilshod@example.com", region: "Samarqand — Registon mahallasi", category: "Yo'l muammosi", categoryKey: "road", message: "Yo'lda katta o'ralar paydo bo'lgan.", createdAt: new Date(Date.now() - 7200000).toISOString(), status: "in_progress", read: true },
  { id: "a3", fullName: "Madina Yusupova", phone: "+998 93 555 66 77", email: "madina@example.com", region: "Buxoro — Markaz", category: "Suv toshgan", categoryKey: "water", message: "Kechqurun suv bosib chiqdi.", createdAt: new Date(Date.now() - 10800000).toISOString(), status: "new", read: false },
  { id: "a4", fullName: "Rustam Nazarov", phone: "+998 94 333 22 11", email: "rustam@example.com", region: "Xiva — Ichan qal'a", category: "Turizm xizmati", categoryKey: "tourism", message: "Sayyohlarga gidlik xizmati taklif qilmoqchiman.", createdAt: new Date(Date.now() - 14400000).toISOString(), status: "answered", read: true, reply: "Murojaatingiz qabul qilindi. Tez orada bog'lanamiz." },
  { id: "a5", fullName: "Zarina Hamidova", phone: "+998 97 888 99 00", email: "zarina@example.com", region: "Toshkent — Chilonzor", category: "Suv toshgan", categoryKey: "water", message: "Suv bosgan ko'chada o'tib bo'lmayapti.", createdAt: new Date(Date.now() - 18000000).toISOString(), status: "new", read: false },
  { id: "a6", fullName: "Bekzod Olimov", phone: "+998 99 444 55 66", email: "bekzod@example.com", region: "Andijon — Bobur ko'chasi", category: "Elektr uzilishi", categoryKey: "electric", message: "2 kundan beri elektr yo'q.", createdAt: new Date(Date.now() - 21600000).toISOString(), status: "in_progress", read: true },
  { id: "a7", fullName: "Nilufar Ergasheva", phone: "+998 88 777 66 55", email: "nilufar@example.com", region: "Toshkent — Yashnobod", category: "Chiqindi yig'imi", categoryKey: "garbage", message: "Chiqindi haftada bir marta yig'ilsa yaxshi bo'lardi.", createdAt: new Date(Date.now() - 25200000).toISOString(), status: "new", read: false },
  { id: "a8", fullName: "Aziz Sharipov", phone: "+998 90 123 45 67", email: "aziz@example.com", region: "Samarqand", category: "Taklif", categoryKey: "suggestion", message: "Ko'proq bog'lar bo'lsa yaxshi bo'lardi.", createdAt: new Date(Date.now() - 28800000).toISOString(), status: "new", read: false },
];

export const seedStats: SiteStats = {
  visitors: 12483, destinationsCount: 50, hotelsCount: 30, restaurantsCount: 45, eventsCount: 20,
};

export const FAQ = [
  { q: { uz: "Saytda chipta qanday bron qilinadi?", ru: "Как забронировать билет на сайте?", en: "How to book tickets?" }, a: { uz: "'Bron qilish' bo'limiga o'tib, yo'nalish va sanani tanlang.", ru: "Перейдите в 'Бронирование', выберите направление и дату.", en: "Open 'Booking', select route and date." } },
  { q: { uz: "360° tur qanday ishlaydi?", ru: "Как работает 360° тур?", en: "How does 360° tour work?" }, a: { uz: "Bo'limga kirib, joyni tanlang va sichqoncha bilan suring.", ru: "Откройте раздел, выберите место и используйте мышь.", en: "Open the section, pick a place and drag with mouse." } },
  { q: { uz: "Murojaatga qachon javob beriladi?", ru: "Когда отвечают на обращение?", en: "When do you reply to applications?" }, a: { uz: "Odatda 24-48 soat ichida.", ru: "Обычно в течение 24-48 часов.", en: "Usually within 24-48 hours." } },
  { q: { uz: "Ma'lumotlar qayerda saqlanadi?", ru: "Где хранятся данные?", en: "Where is data stored?" }, a: { uz: "Brauzeringizning xavfsiz xotirasida — LocalStorage.", ru: "В безопасной памяти браузера — LocalStorage.", en: "In your browser's secure storage — LocalStorage." } },
];

export const PARTNERS = [
  { name: "uzbekistan.travel", icon: "🌐", url: "https://uzbekistan.travel" },
  { name: "Uzbekistan Airways", icon: "✈️", url: "#" },
  { name: "Uzbekistan Railways", icon: "🚆", url: "#" },
  { name: "Yandex Taxi", icon: "🚕", url: "#" },
  { name: "Booking.com", icon: "🏨", url: "#" },
];
