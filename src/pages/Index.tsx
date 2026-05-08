import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// ============================================================
// DATA
// ============================================================
const CATEGORIES = [
  { id: "all", label: "Все", emoji: "🏗️" },
  { id: "bytovka", label: "Бытовки", emoji: "🏠" },
  { id: "dacha", label: "Дачные домики", emoji: "🌿" },
  { id: "hozblok", label: "Хозблоки", emoji: "🔧" },
  { id: "banya", label: "Бани", emoji: "🔥" },
];

const CITIES = [
  "Все города",
  "Казань",
  "Набережные Челны",
  "Нижнекамск",
  "Альметьевск",
  "Чистополь",
  "Елабуга",
];

const PRODUCTS = [
  {
    id: 1,
    title: "Бытовка «Стандарт»",
    category: "bytovka",
    price: 85000,
    size: "6×2.4 м",
    city: "Казань",
    badge: "Хит",
    badgeColor: "bg-orange-500",
    img: "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/b098a667-9873-4f82-951f-714ce5d9d513.jpg",
    description: "Металлический каркас, утепление 100мм, окно ПВХ, дверь металлическая",
    inStock: true,
  },
  {
    id: 2,
    title: "Баня «Рубленая»",
    category: "banya",
    price: 320000,
    size: "4×5 м",
    city: "Казань",
    badge: "Новинка",
    badgeColor: "bg-green-500",
    img: "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/179109c5-b630-405b-9c8f-8ab7e0d6804a.jpg",
    description: "Бревно ручной рубки, дровяная печь, предбанник, терраса",
    inStock: true,
  },
  {
    id: 3,
    title: "Дачный домик «Уют»",
    category: "dacha",
    price: 195000,
    size: "5×4 м",
    city: "Набережные Челны",
    badge: "Акция",
    badgeColor: "bg-red-500",
    img: "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/e520038f-7c8d-440c-adc7-5e9381507fe4.jpg",
    description: "Брус 150×150, кровля металлочерепица, крыльцо, 2 окна",
    inStock: true,
  },
  {
    id: 4,
    title: "Хозблок «Мастер»",
    category: "hozblok",
    price: 65000,
    size: "3×2 м",
    city: "Нижнекамск",
    badge: null,
    badgeColor: "",
    img: "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/b098a667-9873-4f82-951f-714ce5d9d513.jpg",
    description: "Надёжный хозблок для хранения инструмента и инвентаря",
    inStock: true,
  },
  {
    id: 5,
    title: "Бытовка «Комфорт»",
    category: "bytovka",
    price: 130000,
    size: "9×2.4 м",
    city: "Альметьевск",
    badge: "Хит",
    badgeColor: "bg-orange-500",
    img: "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/b098a667-9873-4f82-951f-714ce5d9d513.jpg",
    description: "Удлинённая бытовка с санузлом, утепление 150мм, ламинат",
    inStock: true,
  },
  {
    id: 6,
    title: "Баня «Финская»",
    category: "banya",
    price: 440000,
    size: "5×6 м",
    city: "Казань",
    badge: "Премиум",
    badgeColor: "bg-purple-500",
    img: "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/179109c5-b630-405b-9c8f-8ab7e0d6804a.jpg",
    description: "Профилированный брус, электрическая каменка, купель",
    inStock: false,
  },
];

const STATS = [
  { value: "500+", label: "Объектов продано" },
  { value: "8 лет", label: "На рынке Татарстана" },
  { value: "16", label: "Городов и районов" },
  { value: "4.9★", label: "Средняя оценка" },
];

// ============================================================
// HOOKS
// ============================================================
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ============================================================
// NAVBAR
// ============================================================
function Navbar({ page, setPage }: { page: string; setPage: (p: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { id: "home", label: "Главная" },
    { id: "catalog", label: "Каталог" },
    { id: "about", label: "О компании" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => setPage("home")} className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="text-white text-lg font-black font-display">С</span>
            </div>
            <span className={`font-display font-bold text-xl tracking-wide ${scrolled ? "text-gray-900" : "text-white"}`}>
              Строй<span className="text-orange-500">Дом</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => setPage(l.id)}
                className={`px-4 py-2 rounded-lg font-body font-medium text-sm transition-all duration-200 ${
                  page === l.id
                    ? "bg-orange-500 text-white shadow-md"
                    : scrolled
                    ? "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    : "text-white/90 hover:bg-white/10"
                }`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+78432000000"
              className={`font-body font-semibold text-sm flex items-center gap-1.5 ${scrolled ? "text-gray-700" : "text-white"}`}
            >
              <Icon name="Phone" size={14} />
              +7 (843) 200-00-00
            </a>
            <button
              onClick={() => setPage("catalog")}
              className="bg-orange-500 hover:bg-orange-600 text-white font-body font-semibold text-sm px-4 py-2 rounded-xl transition-all duration-200 hover:shadow-lg btn-glow"
            >
              Выбрать строение
            </button>
          </div>

          <button
            className={`md:hidden p-2 rounded-lg ${scrolled ? "text-gray-700" : "text-white"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white rounded-2xl shadow-xl mb-3 p-4 animate-fade-in">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => { setPage(l.id); setMobileOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-xl font-body font-medium text-sm transition-all ${
                  page === l.id ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-orange-50"
                }`}
              >
                {l.label}
              </button>
            ))}
            <a href="tel:+78432000000" className="flex items-center gap-2 px-4 py-3 text-orange-600 font-semibold font-body text-sm">
              <Icon name="Phone" size={14} /> +7 (843) 200-00-00
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

// ============================================================
// HOME PAGE
// ============================================================
function HomePage({ setPage }: { setPage: (p: string) => void }) {
  const statsRef = useScrollAnimation();
  const featuresRef = useScrollAnimation();
  const promoRef = useScrollAnimation();

  return (
    <div>
      {/* HERO */}
      <section className="hero-bg relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-orange-500/8 blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-orange-600/6 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 max-w-6xl pt-24 pb-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-body font-semibold px-3 py-1.5 rounded-full mb-6 animate-fade-in-up">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse inline-block" />
                Маркетплейс строений Татарстана
              </div>

              <h1 className="font-display font-bold text-5xl md:text-6xl text-white leading-tight mb-6 animate-fade-in-up delay-100 opacity-0-init">
                Найди своё{" "}
                <span className="text-gradient-orange">строение</span>{" "}
                за 5 минут
              </h1>

              <p className="text-white/70 font-body text-lg leading-relaxed mb-8 animate-fade-in-up delay-200 opacity-0-init">
                Бытовки, дачные домики, хозблоки и бани от проверенных производителей.
                Доставка по всему Татарстану, гарантия качества.
              </p>

              <div className="flex flex-wrap gap-3 mb-8 animate-fade-in-up delay-300 opacity-0-init">
                {CATEGORIES.slice(1).map((cat) => (
                  <span
                    key={cat.id}
                    className="bg-white/10 border border-white/20 text-white/80 font-body text-sm px-3 py-1.5 rounded-full backdrop-blur-sm"
                  >
                    {cat.emoji} {cat.label}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 animate-fade-in-up delay-400 opacity-0-init">
                <button
                  onClick={() => setPage("catalog")}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-display font-semibold text-base px-7 py-3.5 rounded-xl transition-all duration-200 hover:shadow-2xl btn-glow flex items-center gap-2"
                >
                  Смотреть каталог
                  <Icon name="ArrowRight" size={18} />
                </button>
                <a
                  href="tel:+78432000000"
                  className="border border-white/30 text-white hover:bg-white/10 font-body font-semibold text-base px-6 py-3.5 rounded-xl transition-all duration-200 flex items-center gap-2"
                >
                  <Icon name="Phone" size={16} />
                  Позвонить
                </a>
              </div>
            </div>

            <div className="relative hidden lg:block animate-scale-in delay-300 opacity-0-init">
              <div className="w-full h-[420px] rounded-3xl overflow-hidden shadow-2xl relative">
                <img
                  src="https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/179109c5-b630-405b-9c8f-8ab7e0d6804a.jpg"
                  alt="Баня"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              <div className="absolute -bottom-6 -left-8 bg-white rounded-2xl p-4 shadow-2xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Icon name="CheckCircle" size={20} className="text-green-600" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-gray-900 text-sm">500+ объектов</div>
                    <div className="font-body text-gray-500 text-xs">Продано в этом году</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-6 bg-white rounded-2xl p-4 shadow-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <div className="font-display font-bold text-gray-900 text-sm">4.9 / 5.0</div>
                    <div className="font-body text-gray-500 text-xs">248 отзывов</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-2 animate-bounce">
          <Icon name="ChevronDown" size={20} />
        </div>
      </section>

      {/* STATS */}
      <section className="bg-orange-500 py-14">
        <div
          ref={statsRef.ref}
          className="container mx-auto px-4 max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              className={`text-center ${statsRef.visible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="font-display font-black text-4xl text-white mb-1">{s.value}</div>
              <div className="font-body text-white/80 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-white">
        <div ref={featuresRef.ref} className="container mx-auto px-4 max-w-6xl">
          <div className={`text-center mb-14 ${featuresRef.visible ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="font-display font-bold text-4xl text-gray-900 mb-3">
              Почему выбирают нас
            </h2>
            <p className="font-body text-gray-500 text-lg max-w-xl mx-auto">
              8 лет строим доверие в Татарстане — через качество, честность и сервис
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "Shield", title: "Гарантия качества", desc: "Все строения проходят контроль перед отгрузкой. Гарантия 12 месяцев на каждый объект.", color: "orange" },
              { icon: "Truck", title: "Доставка по Татарстану", desc: "Доставляем и устанавливаем строение «под ключ» в любой город и район республики.", color: "blue" },
              { icon: "BadgeCheck", title: "Только проверенные продавцы", desc: "Все поставщики верифицированы и имеют действующие сертификаты производства.", color: "green" },
              { icon: "Wallet", title: "Честные цены", desc: "Никаких скрытых платежей. Цена в каталоге — финальная стоимость.", color: "purple" },
              { icon: "Headphones", title: "Поддержка 7 дней в неделю", desc: "Менеджеры отвечают с 8:00 до 22:00. Помогаем с выбором и замерами.", color: "red" },
              { icon: "CreditCard", title: "Удобная оплата", desc: "Наличные, карта, рассрочка без переплат. Работаем с юридическими лицами.", color: "teal" },
            ].map((f, i) => {
              const colors: Record<string, string> = {
                orange: "bg-orange-100 text-orange-600",
                blue: "bg-blue-100 text-blue-600",
                green: "bg-green-100 text-green-600",
                purple: "bg-purple-100 text-purple-600",
                red: "bg-red-100 text-red-600",
                teal: "bg-teal-100 text-teal-600",
              };
              return (
                <div
                  key={i}
                  className={`p-6 rounded-2xl bg-gray-50 border border-gray-100 card-hover ${featuresRef.visible ? "animate-fade-in-up" : "opacity-0"}`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colors[f.color]}`}>
                    <Icon name={f.icon} size={22} />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-gray-900 mb-2">{f.title}</h3>
                  <p className="font-body text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROMO */}
      <section className="py-20 bg-[hsl(30,30%,95%)]">
        <div ref={promoRef.ref} className="container mx-auto px-4 max-w-6xl">
          <div
            className={`relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 p-10 md:p-16 ${promoRef.visible ? "animate-scale-in" : "opacity-0"}`}
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl" />
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="tag-badge text-xs font-display font-bold px-3 py-1 rounded-full inline-block mb-4">
                  🔥 АКЦИЯ
                </span>
                <h2 className="font-display font-bold text-4xl text-white mb-4">
                  Скидка 10% на бытовки при заказе до 1 июня
                </h2>
                <p className="font-body text-white/70 text-base mb-8">
                  Успей заказать до конца мая и получи скидку 10% на любую бытовку из нашего каталога. Доставка включена.
                </p>
                <button
                  onClick={() => setPage("catalog")}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-display font-semibold text-base px-7 py-3.5 rounded-xl transition-all duration-200 hover:shadow-2xl btn-glow inline-flex items-center gap-2"
                >
                  Выбрать бытовку
                  <Icon name="ArrowRight" size={18} />
                </button>
              </div>
              <div className="hidden md:flex justify-end">
                <img
                  src="https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/b098a667-9873-4f82-951f-714ce5d9d513.jpg"
                  alt="Бытовка акция"
                  className="w-80 h-52 object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer setPage={setPage} />
    </div>
  );
}

// ============================================================
// CATALOG PAGE
// ============================================================
function CatalogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeCity, setActiveCity] = useState("Все города");
  const [maxPrice, setMaxPrice] = useState(600000);
  const [sizeFilter, setSizeFilter] = useState("any");
  const [sortBy, setSortBy] = useState("default");
  const heroRef = useScrollAnimation();

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchCity = activeCity === "Все города" || p.city === activeCity;
    const matchPrice = p.price <= maxPrice;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchCity && matchPrice && matchSearch;
  }).sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className="min-h-screen bg-background pt-16">
      <div ref={heroRef.ref} className="hero-bg py-14 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className={`font-display font-bold text-4xl md:text-5xl text-white mb-3 ${heroRef.visible ? "animate-fade-in-up" : "opacity-0"}`}>
            Каталог строений
          </h1>
          <p className={`font-body text-white/70 text-lg ${heroRef.visible ? "animate-fade-in-up delay-100" : "opacity-0"}`}>
            {PRODUCTS.length} объектов в Татарстане — бытовки, домики, хозблоки, бани
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl py-10">
        <div className="relative mb-6">
          <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск по названию или описанию..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white font-body text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-20">
              <h3 className="font-display font-semibold text-gray-900 text-base mb-5 flex items-center gap-2">
                <Icon name="SlidersHorizontal" size={16} /> Фильтры
              </h3>

              <div className="mb-6">
                <p className="font-body font-semibold text-gray-700 text-xs uppercase tracking-wider mb-3">Тип строения</p>
                <div className="flex flex-col gap-1.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-body text-sm transition-all duration-200 text-left ${
                        activeCategory === cat.id
                          ? "bg-orange-500 text-white font-semibold shadow-md"
                          : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                      }`}
                    >
                      <span>{cat.emoji}</span> {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="font-body font-semibold text-gray-700 text-xs uppercase tracking-wider mb-3">Город</p>
                <select
                  value={activeCity}
                  onChange={(e) => setActiveCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 font-body text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  {CITIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div className="mb-6">
                <p className="font-body font-semibold text-gray-700 text-xs uppercase tracking-wider mb-3">
                  Цена: до {maxPrice.toLocaleString("ru")} ₽
                </p>
                <input
                  type="range"
                  min={0}
                  max={600000}
                  step={10000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(+e.target.value)}
                  className="w-full accent-orange-500"
                />
                <div className="flex justify-between font-body text-xs text-gray-400 mt-1">
                  <span>0 ₽</span><span>600 000 ₽</span>
                </div>
              </div>

              <button
                onClick={() => { setActiveCategory("all"); setActiveCity("Все города"); setMaxPrice(600000); setSizeFilter("any"); setSearch(""); }}
                className="w-full py-2.5 rounded-xl border border-gray-200 font-body text-sm text-gray-500 hover:text-orange-600 hover:border-orange-300 transition-all"
              >
                Сбросить фильтры
              </button>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-5">
              <p className="font-body text-gray-500 text-sm">
                Найдено: <span className="font-semibold text-gray-900">{filtered.length}</span> объектов
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-xl border border-gray-200 bg-white font-body text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="default">По умолчанию</option>
                <option value="price_asc">Сначала дешевле</option>
                <option value="price_desc">Сначала дороже</option>
              </select>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-display font-bold text-xl text-gray-700 mb-2">Ничего не найдено</h3>
                <p className="font-body text-gray-400 text-sm">Попробуйте изменить фильтры</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product: p, index }: { product: typeof PRODUCTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-hover group ${visible ? "animate-fade-in-up" : "opacity-0"}`}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={p.img}
          alt={p.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {p.badge && (
          <span className={`absolute top-3 left-3 ${p.badgeColor} text-white font-display font-bold text-xs px-2.5 py-1 rounded-full shadow-md`}>
            {p.badge}
          </span>
        )}

        {!p.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white/90 text-gray-800 font-display font-bold text-sm px-4 py-2 rounded-full">
              Под заказ
            </span>
          </div>
        )}

        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110"
        >
          <Icon name="Heart" size={16} className={liked ? "text-red-500" : "text-gray-400"} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-display font-semibold text-gray-900 text-base leading-tight mb-2">{p.title}</h3>
        <p className="font-body text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">{p.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 font-body text-xs px-2.5 py-1 rounded-full">
            <Icon name="Maximize2" size={11} /> {p.size}
          </span>
          <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 font-body text-xs px-2.5 py-1 rounded-full">
            <Icon name="MapPin" size={11} /> {p.city}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="font-display font-bold text-xl text-gray-900">
            {p.price.toLocaleString("ru")} ₽
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-body font-semibold text-xs px-4 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg flex items-center gap-1.5">
            Узнать цену
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ABOUT PAGE
// ============================================================
function AboutPage({ setPage }: { setPage: (p: string) => void }) {
  const heroRef = useScrollAnimation();
  const valuesRef = useScrollAnimation();
  const ctaRef = useScrollAnimation();

  return (
    <div className="min-h-screen pt-16">
      <div ref={heroRef.ref} className="hero-bg py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className={`${heroRef.visible ? "animate-fade-in-up" : "opacity-0"}`}>
            <span className="tag-badge text-xs font-display font-bold px-3 py-1.5 rounded-full inline-block mb-6">
              8 лет на рынке Татарстана
            </span>
            <h1 className="font-display font-bold text-5xl text-white mb-5">О компании СтройДом</h1>
            <p className="font-body text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Первый специализированный маркетплейс строений для Татарстана — место, где
              покупатели находят качественные строения, а продавцы получают надёжных клиентов.
            </p>
          </div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display font-bold text-3xl text-gray-900 mb-6">Наша история</h2>
              <p className="font-body text-gray-600 text-base leading-relaxed mb-5">
                СтройДом начинался в 2016 году как небольшое агентство по подбору бытовок для строительных
                компаний Казани. Мы видели, как тяжело покупателям искать нужное строение — звонить по
                десяткам объявлений, ехать на просмотры, разбираться в технических характеристиках.
              </p>
              <p className="font-body text-gray-600 text-base leading-relaxed mb-5">
                В 2020 году запустили цифровой маркетплейс, объединив лучших производителей и поставщиков
                Татарстана в одном месте. Теперь покупатель видит реальные цены, фотографии и
                характеристики — и делает выбор за минуты.
              </p>
              <p className="font-body text-gray-600 text-base leading-relaxed">
                Сегодня мы — крупнейшая площадка строений в Республике Татарстан. Более 500 объектов
                продано, более 40 проверенных поставщиков в базе.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/e520038f-7c8d-440c-adc7-5e9381507fe4.jpg"
                alt="О компании"
                className="w-full h-80 object-cover rounded-3xl shadow-xl"
              />
              <div className="absolute -bottom-5 -right-5 bg-orange-500 text-white rounded-2xl p-5 shadow-2xl">
                <div className="font-display font-black text-3xl">8+</div>
                <div className="font-body text-white/90 text-xs">лет опыта</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[hsl(30,30%,95%)]">
        <div ref={valuesRef.ref} className="container mx-auto px-4 max-w-6xl">
          <div className={`text-center mb-14 ${valuesRef.visible ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="font-display font-bold text-4xl text-gray-900 mb-3">Наши ценности</h2>
            <p className="font-body text-gray-500 text-lg">То, что определяет каждое наше решение</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: "🤝", title: "Доверие", desc: "Работаем честно с покупателями и продавцами. Без накруток и скрытых комиссий." },
              { emoji: "🏗️", title: "Качество", desc: "Проверяем каждого поставщика и каждый объект перед публикацией в каталоге." },
              { emoji: "⚡", title: "Скорость", desc: "Помогаем найти и оформить строение за один день — от выбора до договора." },
              { emoji: "🌍", title: "Татарстан", desc: "Мы местные. Понимаем специфику региона, климат и потребности клиентов." },
            ].map((v, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 card-hover ${valuesRef.visible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{v.emoji}</div>
                <h3 className="font-display font-bold text-gray-900 text-lg mb-2">{v.title}</h3>
                <p className="font-body text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-4xl text-gray-900 mb-3">Контакты</h2>
            <p className="font-body text-gray-500 text-lg">Мы всегда рады помочь</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: "Phone", title: "Телефон", value: "+7 (843) 200-00-00", sub: "Пн–Вс, 8:00–22:00" },
              { icon: "Mail", title: "Email", value: "info@stroidom.ru", sub: "Ответим за 2 часа" },
              { icon: "MapPin", title: "Офис", value: "Казань, ул. Пушкина, 1", sub: "Пн–Пт, 9:00–18:00" },
            ].map((c, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon name={c.icon} size={22} />
                </div>
                <h3 className="font-display font-semibold text-gray-900 text-base mb-1">{c.title}</h3>
                <p className="font-body font-semibold text-gray-800 text-sm">{c.value}</p>
                <p className="font-body text-gray-400 text-xs mt-1">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={ctaRef.ref} className="py-20 bg-orange-500">
        <div className={`container mx-auto px-4 max-w-3xl text-center ${ctaRef.visible ? "animate-scale-in" : "opacity-0"}`}>
          <h2 className="font-display font-bold text-4xl text-white mb-4">Готовы выбрать строение?</h2>
          <p className="font-body text-white/80 text-lg mb-8">
            Загляни в каталог — найдём подходящий вариант под твой бюджет и задачи
          </p>
          <button
            onClick={() => setPage("catalog")}
            className="bg-white text-orange-600 font-display font-bold text-base px-8 py-4 rounded-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 inline-flex items-center gap-2"
          >
            Смотреть каталог
            <Icon name="ArrowRight" size={18} />
          </button>
        </div>
      </section>

      <Footer setPage={setPage} />
    </div>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer({ setPage }: { setPage: (p: string) => void }) {
  return (
    <footer className="bg-gray-900 text-white pt-14 pb-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center">
                <span className="text-white text-lg font-black font-display">С</span>
              </div>
              <span className="font-display font-bold text-xl">
                Строй<span className="text-orange-500">Дом</span>
              </span>
            </div>
            <p className="font-body text-gray-400 text-sm leading-relaxed max-w-xs mb-5">
              Маркетплейс строений в Республике Татарстан. Бытовки, дачные домики, хозблоки и бани.
            </p>
            <a href="tel:+78432000000" className="flex items-center gap-2 text-orange-400 font-body font-semibold text-sm hover:text-orange-300 transition-colors">
              <Icon name="Phone" size={14} /> +7 (843) 200-00-00
            </a>
          </div>
          <div>
            <h4 className="font-display font-semibold text-sm text-gray-300 uppercase tracking-wider mb-4">Навигация</h4>
            <div className="flex flex-col gap-2">
              {[{id: "home", l: "Главная"}, {id: "catalog", l: "Каталог"}, {id: "about", l: "О компании"}].map(n => (
                <button key={n.id} onClick={() => setPage(n.id)} className="font-body text-gray-400 text-sm hover:text-orange-400 transition-colors text-left">
                  {n.l}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold text-sm text-gray-300 uppercase tracking-wider mb-4">Категории</h4>
            <div className="flex flex-col gap-2">
              {CATEGORIES.slice(1).map(c => (
                <span key={c.id} className="font-body text-gray-400 text-sm">
                  {c.emoji} {c.label}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-body text-gray-500 text-xs">© 2024 СтройДом. Все права защищены.</p>
          <p className="font-body text-gray-500 text-xs">Татарстан — все города и районы</p>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// ROOT
// ============================================================
export default function Index() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="min-h-screen">
      <Navbar page={page} setPage={setPage} />
      {page === "home" && <HomePage setPage={setPage} />}
      {page === "catalog" && <CatalogPage />}
      {page === "about" && <AboutPage setPage={setPage} />}
    </div>
  );
}