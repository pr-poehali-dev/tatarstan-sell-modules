import { useState, useEffect, useRef, useCallback } from "react";
import Icon from "@/components/ui/icon";

// ============================================================
// BRAND COLORS (from logo)
// Red: #CC1F1F  Dark: #2D2D2D  White: #FFFFFF
// ============================================================

const LOGO_URL = "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/bucket/66dfe931-3178-44b4-9e57-7cdecea02f79.png";

// ============================================================
// DATA
// ============================================================
const BANNERS = [
  {
    id: 1,
    title: "Бытовки и бани\nбыстрой сборки",
    sub: "Доставка и монтаж по всему Татарстану за 3–7 дней",
    cta: "Смотреть каталог",
    badge: "ХИТ СЕЗОНА",
    bg: "#1a1a1a",
    img: "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/179109c5-b630-405b-9c8f-8ab7e0d6804a.jpg",
  },
  {
    id: 2,
    title: "Скидка 10%\nна бытовки до 1 июня",
    sub: "Успей заказать — цены растут вместе с летним сезоном",
    cta: "Получить скидку",
    badge: "АКЦИЯ",
    bg: "#CC1F1F",
    img: "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/76a6e64c-a45d-4a19-90db-c03aca20a3db.jpg",
  },
  {
    id: 3,
    title: "Бани «под ключ»\nот 320 000 ₽",
    sub: "Сруб, брус, каркас — любой тип под ваш участок и бюджет",
    cta: "Выбрать баню",
    badge: "ПРЕМИУМ",
    bg: "#2D2D2D",
    img: "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/1e69d67d-9b36-4dbf-ac03-bd65f063a772.jpg",
  },
];

const CATEGORIES = [
  { id: "all",      label: "Все" },
  { id: "bytovka",  label: "Бытовки" },
  { id: "dacha",    label: "Дачные домики" },
  { id: "hozblok",  label: "Хозблоки" },
  { id: "banya",    label: "Бани" },
];

const SIZE_FILTERS = [
  { id: "all",    label: "Любой размер" },
  { id: "small",  label: "до 12 м²" },
  { id: "medium", label: "12–25 м²" },
  { id: "large",  label: "25+ м²" },
];

const INSULATION_FILTERS = [
  { id: "all",      label: "Любое" },
  { id: "none",     label: "Без утепления" },
  { id: "100mm",    label: "Утеплитель 100 мм" },
  { id: "150mm",    label: "Утеплитель 150 мм" },
  { id: "200mm",    label: "Утеплитель 200 мм" },
];

const PRODUCTS = [
  {
    id: 1,
    title: "Бытовка «Стандарт»",
    category: "bytovka",
    price: 85000,
    size: "6×2.4 м",
    area: 14.4,
    insulation: "100mm",
    insulationLabel: "100 мм",
    badge: "Хит",
    badgeColor: "#CC1F1F",
    img: "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/b098a667-9873-4f82-951f-714ce5d9d513.jpg",
    inStock: true,
  },
  {
    id: 2,
    title: "Баня «Рубленая»",
    category: "banya",
    price: 320000,
    size: "4×5 м",
    area: 20,
    insulation: "150mm",
    insulationLabel: "150 мм",
    badge: "Новинка",
    badgeColor: "#2D7D32",
    img: "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/179109c5-b630-405b-9c8f-8ab7e0d6804a.jpg",
    inStock: true,
  },
  {
    id: 3,
    title: "Дачный домик «Уют»",
    category: "dacha",
    price: 195000,
    size: "5×4 м",
    area: 20,
    insulation: "150mm",
    insulationLabel: "150 мм",
    badge: "Акция",
    badgeColor: "#CC1F1F",
    img: "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/e520038f-7c8d-440c-adc7-5e9381507fe4.jpg",
    inStock: true,
  },
  {
    id: 4,
    title: "Хозблок «Мастер»",
    category: "hozblok",
    price: 65000,
    size: "3×2 м",
    area: 6,
    insulation: "none",
    insulationLabel: "Без утепления",
    badge: null,
    badgeColor: "",
    img: "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/b098a667-9873-4f82-951f-714ce5d9d513.jpg",
    inStock: true,
  },
  {
    id: 5,
    title: "Бытовка «Комфорт»",
    category: "bytovka",
    price: 130000,
    size: "9×2.4 м",
    area: 21.6,
    insulation: "150mm",
    insulationLabel: "150 мм",
    badge: "Хит",
    badgeColor: "#CC1F1F",
    img: "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/b098a667-9873-4f82-951f-714ce5d9d513.jpg",
    inStock: true,
  },
  {
    id: 6,
    title: "Баня «Финская»",
    category: "banya",
    price: 440000,
    size: "5×6 м",
    area: 30,
    insulation: "200mm",
    insulationLabel: "200 мм",
    badge: "Премиум",
    badgeColor: "#6A1A8A",
    img: "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/179109c5-b630-405b-9c8f-8ab7e0d6804a.jpg",
    inStock: false,
  },
  {
    id: 7,
    title: "Хозблок с навесом",
    category: "hozblok",
    price: 95000,
    size: "4×3 м",
    area: 12,
    insulation: "100mm",
    insulationLabel: "100 мм",
    badge: null,
    badgeColor: "",
    img: "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/b098a667-9873-4f82-951f-714ce5d9d513.jpg",
    inStock: true,
  },
  {
    id: 8,
    title: "Дачный домик «Садко»",
    category: "dacha",
    price: 285000,
    size: "6×5 м",
    area: 30,
    insulation: "200mm",
    insulationLabel: "200 мм",
    badge: "Новинка",
    badgeColor: "#2D7D32",
    img: "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/e520038f-7c8d-440c-adc7-5e9381507fe4.jpg",
    inStock: true,
  },
];

const WHY_US = [
  {
    icon: "Truck",
    title: "Доставка за 3–7 дней",
    body: "Собственный парк спецтехники. Привезём и установим в любую точку Татарстана — без посредников и наценок.",
    accent: true,
  },
  {
    icon: "Shield",
    title: "Гарантия 12 месяцев",
    body: "Каждое строение проходит ОТК перед отгрузкой. Устраним любой дефект за наш счёт в течение года.",
    accent: false,
  },
  {
    icon: "Wallet",
    title: "Цена без накруток",
    body: "Работаем напрямую с производителями. Цена на сайте — финальная. Никаких «уточним при звонке».",
    accent: false,
  },
  {
    icon: "BadgeCheck",
    title: "Только сертифицированные",
    body: "Все поставщики верифицированы и имеют сертификаты. Сомнительных объявлений нет — только реальные производители.",
    accent: false,
  },
  {
    icon: "Headphones",
    title: "Поддержка 7/7",
    body: "Менеджеры отвечают с 8:00 до 22:00. Помогаем с выбором размера, комплектации и условий оплаты.",
    accent: false,
  },
  {
    icon: "CreditCard",
    title: "Рассрочка без %",
    body: "Оплата частями на 6 месяцев без переплат. Работаем с физлицами, ИП и юридическими лицами.",
    accent: false,
  },
];

// ============================================================
// SCROLL HOOK
// ============================================================
function useVisible(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { id: "home", label: "Главная" },
    { id: "catalog", label: "Каталог" },
    { id: "about", label: "О нас" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-sm" : "bg-white/95 backdrop-blur-sm"}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-[60px]">
          {/* Logo */}
          <button onClick={() => setPage("home")} className="flex items-center gap-3">
            <img src={LOGO_URL} alt="НА УЧАСТКЕ" className="h-9 w-auto" />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => setPage(l.id)}
                className={`px-4 py-2 rounded text-sm font-semibold transition-all duration-150 ${
                  page === l.id
                    ? "text-[#CC1F1F] border-b-2 border-[#CC1F1F]"
                    : "text-[#2D2D2D] hover:text-[#CC1F1F]"
                }`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+78432000000" className="text-sm font-bold text-[#2D2D2D] flex items-center gap-1.5 hover:text-[#CC1F1F] transition-colors">
              <Icon name="Phone" size={14} />
              +7 (843) 200-00-00
            </a>
            <button
              onClick={() => setPage("catalog")}
              className="bg-[#CC1F1F] hover:bg-[#a81919] text-white text-sm font-bold px-5 py-2 rounded transition-colors"
            >
              Каталог
            </button>
          </div>

          <button className="md:hidden text-[#2D2D2D]" onClick={() => setOpen(!open)}>
            <Icon name={open ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-gray-100 py-3 animate-fade-in-up">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => { setPage(l.id); setOpen(false); }}
                className={`block w-full text-left px-3 py-3 text-sm font-semibold rounded transition-colors ${
                  page === l.id ? "text-[#CC1F1F]" : "text-[#2D2D2D] hover:text-[#CC1F1F]"
                }`}
              >
                {l.label}
              </button>
            ))}
            <a href="tel:+78432000000" className="block px-3 py-3 text-sm font-bold text-[#CC1F1F]">
              +7 (843) 200-00-00
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

// ============================================================
// HERO SLIDER
// ============================================================
function HeroSlider({ onCatalog }: { onCatalog: () => void }) {
  const [current, setCurrent] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => setCurrent((c) => (c + 1) % BANNERS.length), []);
  const prev = () => setCurrent((c) => (c - 1 + BANNERS.length) % BANNERS.length);

  useEffect(() => {
    timer.current = setInterval(next, 5000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [next]);

  const restart = (idx: number) => {
    if (timer.current) clearInterval(timer.current);
    setCurrent(idx);
    timer.current = setInterval(next, 5000);
  };

  const b = BANNERS[current];

  return (
    <section className="relative h-[520px] md:h-[600px] overflow-hidden select-none" style={{ background: b.bg, transition: "background 0.6s ease" }}>
      {/* Background image */}
      <div
        key={b.id}
        className="absolute inset-0 animate-fade-in"
        style={{
          backgroundImage: `url(${b.img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${b.bg}e8 0%, ${b.bg}99 50%, ${b.bg}44 100%)` }} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center max-w-6xl mx-auto px-4">
        <div className="max-w-xl">
          <span
            key={`badge-${b.id}`}
            className="inline-block text-xs font-bold px-3 py-1 rounded mb-5 animate-fade-in-up opacity-0-init"
            style={{ background: "#CC1F1F", color: "#fff", letterSpacing: "0.08em" }}
          >
            {b.badge}
          </span>
          <h1
            key={`title-${b.id}`}
            className="text-4xl md:text-5xl font-black text-white leading-tight mb-4 animate-fade-in-up delay-100 opacity-0-init whitespace-pre-line"
          >
            {b.title}
          </h1>
          <p
            key={`sub-${b.id}`}
            className="text-white/80 text-base md:text-lg mb-8 animate-fade-in-up delay-200 opacity-0-init"
          >
            {b.sub}
          </p>
          <button
            key={`cta-${b.id}`}
            onClick={onCatalog}
            className="animate-fade-in-up delay-300 opacity-0-init inline-flex items-center gap-2 bg-[#CC1F1F] hover:bg-[#a81919] text-white font-bold text-base px-7 py-3.5 rounded transition-colors"
          >
            {b.cta}
            <Icon name="ArrowRight" size={18} />
          </button>
        </div>
      </div>

      {/* Prev/Next arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors"
      >
        <Icon name="ChevronLeft" size={20} />
      </button>
      <button
        onClick={() => { if (timer.current) clearInterval(timer.current); next(); timer.current = setInterval(next, 5000); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors"
      >
        <Icon name="ChevronRight" size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {BANNERS.map((_, i) => (
          <button key={i} onClick={() => restart(i)} className={`dot ${i === current ? "active" : ""}`} />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-6 right-6 z-20 text-white/50 text-xs font-bold">
        {current + 1} / {BANNERS.length}
      </div>
    </section>
  );
}

// ============================================================
// WHY US SECTION
// ============================================================
function WhyUs() {
  const { ref, visible } = useVisible();
  return (
    <section className="py-16 md:py-20 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        <div className={`mb-12 ${visible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl md:text-4xl font-black text-[#2D2D2D] section-accent pl-4 border-l-4 border-[#CC1F1F]">
            Почему выбирают нас?
          </h2>
          <p className="text-[#737373] mt-3 text-base">8 лет на рынке Татарстана — и всё это время без скрытых условий</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_US.map((w, i) => (
            <div
              key={i}
              className={`group relative p-6 rounded border transition-all duration-200 card-hover ${
                w.accent
                  ? "bg-[#CC1F1F] border-[#CC1F1F] text-white"
                  : "bg-white border-gray-200 hover:border-[#CC1F1F]"
              } ${visible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className={`w-10 h-10 rounded flex items-center justify-center mb-4 ${w.accent ? "bg-white/20" : "bg-[#CC1F1F]/10"}`}>
                <Icon name={w.icon} size={20} className={w.accent ? "text-white" : "text-[#CC1F1F]"} />
              </div>
              <h3 className={`font-bold text-base mb-2 ${w.accent ? "text-white" : "text-[#2D2D2D]"}`}>{w.title}</h3>
              <p className={`text-sm leading-relaxed ${w.accent ? "text-white/80" : "text-[#737373]"}`}>{w.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CATALOG SECTION
// ============================================================
function CatalogSection() {
  const { ref, visible } = useVisible();
  const [category, setCategory] = useState("all");
  const [sizeF, setSizeF] = useState("all");
  const [insulationF, setInsulationF] = useState("all");
  const [maxPrice, setMaxPrice] = useState(500000);
  const [sortBy, setSortBy] = useState("default");

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = category === "all" || p.category === category;
    const matchIns = insulationF === "all" || p.insulation === insulationF;
    const matchPrice = p.price <= maxPrice;
    let matchSize = true;
    if (sizeF === "small")  matchSize = p.area < 12;
    if (sizeF === "medium") matchSize = p.area >= 12 && p.area <= 25;
    if (sizeF === "large")  matchSize = p.area > 25;
    return matchCat && matchIns && matchPrice && matchSize;
  }).sort((a, b) => {
    if (sortBy === "asc")  return a.price - b.price;
    if (sortBy === "desc") return b.price - a.price;
    return 0;
  });

  return (
    <section className="py-16 md:py-20 bg-[#F7F7F7]" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className={`flex flex-wrap items-end justify-between gap-4 mb-10 ${visible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-[#2D2D2D] pl-4 border-l-4 border-[#CC1F1F]">
              Каталог
            </h2>
            <p className="text-[#737373] mt-2 text-sm">{filtered.length} объектов</p>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-200 bg-white text-sm text-[#2D2D2D] font-semibold px-3 py-2 rounded focus:outline-none focus:border-[#CC1F1F]"
          >
            <option value="default">По умолчанию</option>
            <option value="asc">Сначала дешевле</option>
            <option value="desc">Сначала дороже</option>
          </select>
        </div>

        {/* Category tabs */}
        <div className={`flex flex-wrap gap-2 mb-6 ${visible ? "animate-fade-in-up delay-100" : "opacity-0"}`}>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`filter-btn px-4 py-2 rounded border text-sm font-semibold ${category === c.id ? "active" : "border-gray-200 bg-white text-[#2D2D2D]"}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Filters row */}
        <div className={`flex flex-wrap gap-4 items-center mb-8 p-4 bg-white rounded border border-gray-100 ${visible ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
          {/* Size */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-[#737373] uppercase tracking-wider">Размер</span>
            <div className="flex gap-1.5 flex-wrap">
              {SIZE_FILTERS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSizeF(s.id)}
                  className={`filter-btn px-3 py-1.5 rounded border text-xs font-semibold ${sizeF === s.id ? "active" : "border-gray-200 bg-white text-[#2D2D2D]"}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Insulation */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-[#737373] uppercase tracking-wider">Утепление</span>
            <div className="flex gap-1.5 flex-wrap">
              {INSULATION_FILTERS.map((ins) => (
                <button
                  key={ins.id}
                  onClick={() => setInsulationF(ins.id)}
                  className={`filter-btn px-3 py-1.5 rounded border text-xs font-semibold ${insulationF === ins.id ? "active" : "border-gray-200 bg-white text-[#2D2D2D]"}`}
                >
                  {ins.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1 min-w-[180px]">
            <span className="text-xs font-bold text-[#737373] uppercase tracking-wider">
              Цена до: <span className="text-[#2D2D2D]">{maxPrice.toLocaleString("ru")} ₽</span>
            </span>
            <input
              type="range"
              min={50000}
              max={500000}
              step={5000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(+e.target.value)}
              className="accent-[#CC1F1F] w-full"
            />
          </div>

          <button
            onClick={() => { setCategory("all"); setSizeF("all"); setInsulationF("all"); setMaxPrice(500000); setSortBy("default"); }}
            className="text-xs text-[#737373] hover:text-[#CC1F1F] font-semibold transition-colors ml-auto flex items-center gap-1"
          >
            <Icon name="X" size={13} /> Сбросить
          </button>
        </div>

        {/* Products grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="font-bold text-[#2D2D2D] text-lg">Ничего не найдено</p>
            <p className="text-[#737373] text-sm mt-1">Попробуйте изменить фильтры</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} p={p} i={i} visible={visible} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({ p, i, visible }: { p: typeof PRODUCTS[0]; i: number; visible: boolean }) {
  const [liked, setLiked] = useState(false);

  return (
    <div
      className={`bg-white rounded overflow-hidden border border-gray-100 card-hover group ${visible ? "animate-fade-in-up" : "opacity-0"}`}
      style={{ animationDelay: `${0.2 + i * 0.05}s` }}
    >
      <div className="relative h-44 overflow-hidden bg-gray-100">
        <img
          src={p.img}
          alt={p.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />

        {p.badge && (
          <span
            className="absolute top-2.5 left-2.5 text-white text-[11px] font-bold px-2 py-0.5 rounded"
            style={{ background: p.badgeColor }}
          >
            {p.badge}
          </span>
        )}

        {!p.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-[#2D2D2D] font-bold text-xs px-3 py-1.5 rounded">Под заказ</span>
          </div>
        )}

        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-2.5 right-2.5 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <Icon name="Heart" size={14} className={liked ? "text-[#CC1F1F]" : "text-gray-400"} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-[#2D2D2D] text-sm mb-3 leading-tight">{p.title}</h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="inline-flex items-center gap-1 bg-gray-100 text-[#737373] text-[11px] font-semibold px-2 py-1 rounded">
            <Icon name="Maximize2" size={10} /> {p.size}
          </span>
          <span className="inline-flex items-center gap-1 bg-gray-100 text-[#737373] text-[11px] font-semibold px-2 py-1 rounded">
            🏠 {p.insulationLabel}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="font-black text-lg text-[#2D2D2D]">{p.price.toLocaleString("ru")} ₽</div>
          </div>
          <button className="bg-[#CC1F1F] hover:bg-[#a81919] text-white font-bold text-xs px-3.5 py-2 rounded transition-colors">
            Узнать цену
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer({ setPage }: { setPage: (p: string) => void }) {
  return (
    <footer className="bg-[#2D2D2D] text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <img src={LOGO_URL} alt="НА УЧАСТКЕ" className="h-10 w-auto mb-4 brightness-0 invert" />
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Маркетплейс строений в Республике Татарстан. Бытовки, дачные домики, хозблоки и бани.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white/40 mb-4">Разделы</h4>
            <div className="flex flex-col gap-2">
              {[{id: "home", l: "Главная"}, {id: "catalog", l: "Каталог"}, {id: "about", l: "О нас"}].map(n => (
                <button key={n.id} onClick={() => setPage(n.id)} className="text-white/70 hover:text-white text-sm font-medium text-left transition-colors">
                  {n.l}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white/40 mb-4">Контакты</h4>
            <a href="tel:+78432000000" className="text-white font-bold text-base flex items-center gap-2 mb-2 hover:text-[#CC1F1F] transition-colors">
              <Icon name="Phone" size={16} /> +7 (843) 200-00-00
            </a>
            <p className="text-white/50 text-xs">Пн–Вс, 8:00–22:00</p>
            <a href="mailto:info@nauchastke.ru" className="text-white/60 hover:text-white text-sm mt-3 block transition-colors">
              info@nauchastke.ru
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/30 text-xs">© 2024 НА УЧАСТКЕ. Все права защищены.</p>
          <p className="text-white/30 text-xs">Республика Татарстан</p>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// ABOUT PAGE (lightweight)
// ============================================================
function AboutPage({ setPage }: { setPage: (p: string) => void }) {
  const { ref, visible } = useVisible();
  return (
    <div className="min-h-screen pt-[60px] bg-[#F7F7F7]">
      <div className="bg-[#2D2D2D] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-black text-white mb-3">О компании</h1>
          <p className="text-white/60 text-lg">8 лет строим доверие в Татарстане</p>
        </div>
      </div>

      <div ref={ref} className="max-w-4xl mx-auto px-4 py-16">
        <div className={`grid md:grid-cols-2 gap-12 items-center mb-16 ${visible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div>
            <h2 className="text-2xl font-black text-[#2D2D2D] mb-5 pl-4 border-l-4 border-[#CC1F1F]">Наша история</h2>
            <p className="text-[#737373] text-sm leading-relaxed mb-4">
              НА УЧАСТКЕ начинался в 2016 году как небольшое агентство по подбору бытовок для строительных компаний Казани.
              Мы видели, как тяжело покупателям искать нужное строение.
            </p>
            <p className="text-[#737373] text-sm leading-relaxed mb-4">
              В 2020 году запустили цифровой маркетплейс, объединив лучших производителей Татарстана в одном месте.
              Теперь покупатель видит реальные цены и характеристики — и делает выбор за минуты.
            </p>
            <p className="text-[#737373] text-sm leading-relaxed">
              Сегодня мы — крупнейшая площадка строений в Республике Татарстан. Более 500 объектов продано, 40+ проверенных поставщиков.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/e520038f-7c8d-440c-adc7-5e9381507fe4.jpg"
              alt="О нас"
              className="w-full h-72 object-cover rounded"
            />
            <div className="absolute -bottom-4 -right-4 bg-[#CC1F1F] text-white px-5 py-4 rounded shadow-xl">
              <div className="font-black text-3xl">8+</div>
              <div className="text-xs font-bold text-white/80">лет опыта</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { v: "500+", l: "Объектов продано" },
            { v: "40+", l: "Поставщиков" },
            { v: "16", l: "Городов" },
            { v: "4.9★", l: "Рейтинг" },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded p-5 text-center border border-gray-100">
              <div className="font-black text-2xl text-[#CC1F1F]">{s.v}</div>
              <div className="text-xs text-[#737373] font-semibold mt-1">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => setPage("catalog")}
            className="bg-[#CC1F1F] hover:bg-[#a81919] text-white font-bold text-base px-8 py-3.5 rounded inline-flex items-center gap-2 transition-colors"
          >
            Смотреть каталог <Icon name="ArrowRight" size={18} />
          </button>
        </div>
      </div>
      <Footer setPage={setPage} />
    </div>
  );
}

// ============================================================
// HOME PAGE
// ============================================================
function HomePage({ setPage }: { setPage: (p: string) => void }) {
  return (
    <div>
      <HeroSlider onCatalog={() => setPage("catalog")} />
      <WhyUs />
      <CatalogSection />
      <Footer setPage={setPage} />
    </div>
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
      <div className="pt-[60px]">
        {page === "home" && <HomePage setPage={setPage} />}
        {page === "catalog" && (
          <div className="min-h-screen">
            <div className="bg-[#2D2D2D] py-12 px-4">
              <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-black text-white">Каталог строений</h1>
                <p className="text-white/60 mt-2">Татарстан — бытовки, домики, хозблоки, бани</p>
              </div>
            </div>
            <CatalogSection />
            <Footer setPage={setPage} />
          </div>
        )}
        {page === "about" && <AboutPage setPage={setPage} />}
      </div>
    </div>
  );
}
