import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────
const LOGO_URL =
  "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/bucket/66dfe931-3178-44b4-9e57-7cdecea02f79.png";

const HERO_IMG =
  "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/4fe33c00-7262-4cf3-bce5-34d8de728549.jpg";

const IMG_BANYA =
  "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/179109c5-b630-405b-9c8f-8ab7e0d6804a.jpg";
const IMG_BYTOVKA =
  "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/b098a667-9873-4f82-951f-714ce5d9d513.jpg";
const IMG_DACHA =
  "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/61a3efa8-70d2-4be6-a7bd-9897a1f75a1c.jpg";
const IMG_HOZBLOK =
  "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/e520038f-7c8d-440c-adc7-5e9381507fe4.jpg";

// ─────────────────────────────────────────────
// SCROLL REVEAL HOOK
// ─────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, on };
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const STATS = [
  { num: "500+", label: "объектов продано", sub: "за 8 лет работы" },
  { num: "98%", label: "клиентов довольны", sub: "рекомендуют друзьям" },
  { num: "3–7", label: "дней доставка", sub: "по всему Татарстану" },
  { num: "12 мес", label: "гарантия", sub: "на каждое строение" },
];

const WHY = [
  { n: "01", title: "Доставка за 3–7 дней", body: "Собственный парк спецтехники. Привезём и установим в любую точку Татарстана без посредников." },
  { n: "02", title: "Гарантия 12 месяцев", body: "Каждое строение проходит ОТК перед отгрузкой. Устраним любой дефект за наш счёт." },
  { n: "03", title: "Цена без накруток", body: "Работаем напрямую с производителями. Цена на сайте — финальная. Никаких «уточним при звонке»." },
  { n: "04", title: "Проверенные продавцы", body: "Все поставщики верифицированы и имеют сертификаты. Только реальные производители." },
  { n: "05", title: "Поддержка 7 дней", body: "Менеджеры с 8:00 до 22:00. Помогаем с выбором размера, комплектации и условий оплаты." },
  { n: "06", title: "Рассрочка без %", body: "Оплата частями на 6 месяцев без переплат. Работаем с физлицами, ИП и юрлицами." },
];

const CATEGORIES = [
  { id: "all", label: "Все" },
  { id: "bytovka", label: "Бытовки" },
  { id: "dacha", label: "Дачные домики" },
  { id: "hozblok", label: "Хозблоки" },
  { id: "banya", label: "Бани" },
];

const SIZE_F = [
  { id: "all", label: "Любой" },
  { id: "small", label: "до 12 м²" },
  { id: "medium", label: "12–25 м²" },
  { id: "large", label: "25+ м²" },
];

const INS_F = [
  { id: "all", label: "Любое" },
  { id: "none", label: "Без утепл." },
  { id: "100mm", label: "100 мм" },
  { id: "150mm", label: "150 мм" },
  { id: "200mm", label: "200 мм" },
];

const PRODUCTS = [
  { id: 1, title: "Бытовка «Стандарт»", cat: "bytovka", price: 85000, size: "6×2.4 м", area: 14.4, ins: "100mm", insL: "100 мм", badge: "Хит", img: IMG_BYTOVKA, inStock: true },
  { id: 2, title: "Баня «Рубленая»", cat: "banya", price: 320000, size: "4×5 м", area: 20, ins: "150mm", insL: "150 мм", badge: "Новинка", img: IMG_BANYA, inStock: true },
  { id: 3, title: "Дачный домик «Уют»", cat: "dacha", price: 195000, size: "5×4 м", area: 20, ins: "150mm", insL: "150 мм", badge: "Акция", img: IMG_DACHA, inStock: true },
  { id: 4, title: "Хозблок «Мастер»", cat: "hozblok", price: 65000, size: "3×2 м", area: 6, ins: "none", insL: "Без утепл.", badge: null, img: IMG_HOZBLOK, inStock: true },
  { id: 5, title: "Бытовка «Комфорт»", cat: "bytovka", price: 130000, size: "9×2.4 м", area: 21.6, ins: "150mm", insL: "150 мм", badge: "Хит", img: IMG_BYTOVKA, inStock: true },
  { id: 6, title: "Баня «Финская»", cat: "banya", price: 440000, size: "5×6 м", area: 30, ins: "200mm", insL: "200 мм", badge: "Премиум", img: IMG_BANYA, inStock: false },
  { id: 7, title: "Хозблок с навесом", cat: "hozblok", price: 95000, size: "4×3 м", area: 12, ins: "100mm", insL: "100 мм", badge: null, img: IMG_HOZBLOK, inStock: true },
  { id: 8, title: "Дачный домик «Садко»", cat: "dacha", price: 285000, size: "6×5 м", area: 30, ins: "200mm", insL: "200 мм", badge: "Новинка", img: IMG_DACHA, inStock: true },
];

// ─────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────
function Navbar({ page, setPage }: { page: string; setPage: (p: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navLinks = [
    { id: "home", label: "Главная" },
    { id: "catalog", label: "Каталог" },
    { id: "about", label: "О нас" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white border-b border-gray-100 shadow-sm" : "bg-white/90 backdrop-blur"
      }`}
    >
      <div className="max-w-[1160px] mx-auto px-5 flex items-center justify-between h-14">
        <button onClick={() => setPage("home")} className="flex-shrink-0">
          <img src={LOGO_URL} alt="НА УЧАСТКЕ" className="h-8 w-auto" />
        </button>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => setPage(l.id)}
              className={`text-sm font-semibold transition-colors ${
                page === l.id ? "text-[#CC1F1F]" : "text-[#2D2D2D] hover:text-[#CC1F1F]"
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a href="tel:+78432000000" className="text-sm font-bold text-[#2D2D2D] hover:text-[#CC1F1F] transition-colors flex items-center gap-1.5">
            <Icon name="Phone" size={14} />
            +7 (843) 200-00-00
          </a>
          <button
            onClick={() => setPage("catalog")}
            className="bg-[#CC1F1F] text-white text-sm font-bold px-5 py-2 hover:bg-[#a81919] transition-colors"
          >
            Оставить заявку
          </button>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <Icon name={open ? "X" : "Menu"} size={22} className="text-[#2D2D2D]" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-5 py-4 flex flex-col gap-3">
          {navLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => { setPage(l.id); setOpen(false); }}
              className={`text-left text-sm font-semibold py-1 ${page === l.id ? "text-[#CC1F1F]" : "text-[#2D2D2D]"}`}
            >
              {l.label}
            </button>
          ))}
          <a href="tel:+78432000000" className="text-sm font-bold text-[#CC1F1F]">+7 (843) 200-00-00</a>
        </div>
      )}
    </header>
  );
}

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────
function Hero({ onCatalog, onLead }: { onCatalog: () => void; onLead: () => void }) {
  return (
    <section className="relative min-h-[92vh] flex items-end overflow-hidden bg-[#1a1a1a]">
      {/* full-bleed image */}
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="hero" className="w-full h-full object-cover opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/90 via-[#1a1a1a]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1160px] mx-auto px-5 pb-20 pt-32 w-full">
        <div className="max-w-[580px]">
          {/* eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-8 h-[2px] bg-[#CC1F1F]" />
            <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Маркетплейс строений · Татарстан</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.0] mb-6 tracking-tight">
            СТРОЕНИЯ<br />
            <span className="text-[#CC1F1F]">НА УЧАСТКЕ</span><br />
            <span className="text-white/90">ПОД КЛЮЧ</span>
          </h1>

          <p className="text-white/65 text-base md:text-lg leading-relaxed mb-10 max-w-md">
            Бытовки, дачные домики, хозблоки и бани от проверенных производителей.
            Доставка и монтаж за 3–7 дней по всему Татарстану.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={onCatalog}
              className="bg-[#CC1F1F] hover:bg-[#a81919] text-white font-bold text-sm px-8 py-3.5 transition-colors flex items-center gap-2"
            >
              Смотреть каталог
              <Icon name="ArrowRight" size={16} />
            </button>
            <button
              onClick={onLead}
              className="border border-white/40 hover:border-white text-white font-bold text-sm px-8 py-3.5 transition-colors"
            >
              Получить консультацию
            </button>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10">
        <div className="max-w-[1160px] mx-auto px-5 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {STATS.map((s) => (
            <div key={s.num} className="py-5 px-6 first:pl-0">
              <div className="text-2xl font-black text-white leading-none mb-1">{s.num}</div>
              <div className="text-white/70 text-xs font-semibold">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// WHY US
// ─────────────────────────────────────────────
function WhySection() {
  const { ref, on } = useReveal();
  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="max-w-[1160px] mx-auto px-5">
        {/* header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 ${on ? "animate-fade-in-up" : "opacity-0"}`}>
          <div>
            <p className="text-[#CC1F1F] text-xs font-bold uppercase tracking-widest mb-3">Почему выбирают нас</p>
            <h2 className="text-4xl md:text-5xl font-black text-[#2D2D2D] leading-tight">
              8 лет строим доверие<br className="hidden md:block" /> в Татарстане
            </h2>
          </div>
          <p className="text-[#737373] text-sm max-w-xs md:text-right leading-relaxed">
            Без скрытых условий, без посредников — только честная работа напрямую с производителями
          </p>
        </div>

        {/* grid 2×3 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100">
          {WHY.map((w, i) => (
            <div
              key={w.n}
              className={`bg-white p-8 hover:bg-[#fafafa] transition-colors group ${on ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <span className="block text-5xl font-black text-gray-100 group-hover:text-[#CC1F1F]/15 transition-colors leading-none mb-5 select-none">
                {w.n}
              </span>
              <h3 className="text-base font-bold text-[#2D2D2D] mb-2">{w.title}</h3>
              <p className="text-sm text-[#737373] leading-relaxed">{w.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// CATALOG SECTION
// ─────────────────────────────────────────────
function CatalogSection({ standalone = false }: { standalone?: boolean }) {
  const { ref, on } = useReveal();
  const [cat, setCat] = useState("all");
  const [sizeF, setSizeF] = useState("all");
  const [insF, setInsF] = useState("all");
  const [maxP, setMaxP] = useState(500000);
  const [sort, setSort] = useState("default");

  const filtered = PRODUCTS.filter((p) => {
    const mc = cat === "all" || p.cat === cat;
    const mi = insF === "all" || p.ins === insF;
    const mp = p.price <= maxP;
    let ms = true;
    if (sizeF === "small")  ms = p.area < 12;
    if (sizeF === "medium") ms = p.area >= 12 && p.area <= 25;
    if (sizeF === "large")  ms = p.area > 25;
    return mc && mi && mp && ms;
  }).sort((a, b) => sort === "asc" ? a.price - b.price : sort === "desc" ? b.price - a.price : 0);

  const FilterBtn = ({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) => (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 text-xs font-bold border transition-all ${
        active
          ? "bg-[#CC1F1F] border-[#CC1F1F] text-white"
          : "border-gray-200 text-[#2D2D2D] hover:border-[#CC1F1F] hover:text-[#CC1F1F] bg-white"
      }`}
    >
      {label}
    </button>
  );

  return (
    <section className={`py-20 ${standalone ? "bg-white" : "bg-[#F5F5F5]"}`} ref={ref}>
      <div className="max-w-[1160px] mx-auto px-5">
        {/* header */}
        <div className={`flex flex-wrap items-end justify-between gap-5 mb-10 ${on ? "animate-fade-in-up" : "opacity-0"}`}>
          <div>
            <p className="text-[#CC1F1F] text-xs font-bold uppercase tracking-widest mb-2">Каталог</p>
            <h2 className="text-4xl font-black text-[#2D2D2D]">Строения</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#737373] text-sm">{filtered.length} объектов</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-gray-200 text-xs font-bold text-[#2D2D2D] px-3 py-2 bg-white focus:outline-none focus:border-[#CC1F1F]"
            >
              <option value="default">По умолчанию</option>
              <option value="asc">Сначала дешевле</option>
              <option value="desc">Сначала дороже</option>
            </select>
          </div>
        </div>

        {/* category tabs */}
        <div className={`flex flex-wrap gap-2 mb-5 ${on ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.05s" }}>
          {CATEGORIES.map((c) => (
            <FilterBtn key={c.id} active={cat === c.id} onClick={() => setCat(c.id)} label={c.label} />
          ))}
        </div>

        {/* filter strip */}
        <div
          className={`flex flex-wrap gap-x-8 gap-y-4 items-start py-5 px-6 bg-white border border-gray-100 mb-8 ${on ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.1s" }}
        >
          {/* size */}
          <div>
            <p className="text-[10px] font-bold text-[#737373] uppercase tracking-wider mb-2">Размер</p>
            <div className="flex flex-wrap gap-1.5">
              {SIZE_F.map((s) => (
                <FilterBtn key={s.id} active={sizeF === s.id} onClick={() => setSizeF(s.id)} label={s.label} />
              ))}
            </div>
          </div>

          {/* insulation */}
          <div>
            <p className="text-[10px] font-bold text-[#737373] uppercase tracking-wider mb-2">Утепление</p>
            <div className="flex flex-wrap gap-1.5">
              {INS_F.map((s) => (
                <FilterBtn key={s.id} active={insF === s.id} onClick={() => setInsF(s.id)} label={s.label} />
              ))}
            </div>
          </div>

          {/* price */}
          <div className="min-w-[200px]">
            <p className="text-[10px] font-bold text-[#737373] uppercase tracking-wider mb-2">
              До {maxP.toLocaleString("ru")} ₽
            </p>
            <input
              type="range" min={50000} max={500000} step={5000}
              value={maxP} onChange={(e) => setMaxP(+e.target.value)}
              className="w-full accent-[#CC1F1F]"
            />
          </div>

          <button
            onClick={() => { setCat("all"); setSizeF("all"); setInsF("all"); setMaxP(500000); setSort("default"); }}
            className="ml-auto text-xs text-[#737373] hover:text-[#CC1F1F] font-bold flex items-center gap-1 self-center transition-colors"
          >
            <Icon name="RotateCcw" size={12} /> Сбросить
          </button>
        </div>

        {/* products */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-bold text-[#2D2D2D]">Ничего не найдено</p>
            <p className="text-[#737373] text-sm mt-1">Измените фильтры</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} p={p} i={i} on={on} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({ p, i, on }: { p: typeof PRODUCTS[0]; i: number; on: boolean }) {
  const [liked, setLiked] = useState(false);
  return (
    <div
      className={`bg-white group overflow-hidden border border-gray-100 hover:border-[#CC1F1F]/30 hover:shadow-xl transition-all duration-300 ${on ? "animate-fade-in-up" : "opacity-0"}`}
      style={{ animationDelay: `${0.12 + i * 0.04}s` }}
    >
      {/* image */}
      <div className="relative h-44 overflow-hidden bg-gray-50">
        <img
          src={p.img} alt={p.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {p.badge && (
          <span className="absolute top-3 left-3 bg-[#CC1F1F] text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-wider">
            {p.badge}
          </span>
        )}
        {!p.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-[#2D2D2D] font-bold text-xs px-3 py-1">Под заказ</span>
          </div>
        )}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 w-7 h-7 bg-white flex items-center justify-center shadow transition-transform hover:scale-110"
        >
          <Icon name="Heart" size={13} className={liked ? "text-[#CC1F1F]" : "text-gray-300"} />
        </button>
      </div>

      {/* body */}
      <div className="p-4">
        <h3 className="font-bold text-[#2D2D2D] text-sm mb-3">{p.title}</h3>

        {/* tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="text-[11px] font-semibold text-[#737373] bg-gray-100 px-2 py-1 flex items-center gap-1">
            <Icon name="Move" size={10} /> {p.size}
          </span>
          <span className="text-[11px] font-semibold text-[#737373] bg-gray-100 px-2 py-1">
            🏠 {p.insL}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-black text-lg text-[#2D2D2D]">{p.price.toLocaleString("ru")} ₽</span>
          <button className="bg-[#CC1F1F] hover:bg-[#a81919] text-white font-bold text-[11px] px-3.5 py-2 transition-colors">
            Узнать цену
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// LEAD SECTION
// ─────────────────────────────────────────────
function LeadSection() {
  const { ref, on } = useReveal();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  const submit = () => {
    if (!name || !phone) return;
    setSent(true);
  };

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-[1160px] mx-auto px-5">
        <div
          className={`grid md:grid-cols-2 overflow-hidden ${on ? "animate-scale-in" : "opacity-0"}`}
        >
          {/* left — image */}
          <div className="relative h-72 md:h-auto">
            <img
              src={IMG_DACHA}
              alt="Дача"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2D]/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#CC1F1F]/10" />
            <div className="absolute bottom-6 left-6">
              <p className="text-white font-black text-3xl leading-tight">
                Строение<br />на участке<br />за 7 дней
              </p>
            </div>
          </div>

          {/* right — form */}
          <div className="bg-[#CC1F1F] p-8 md:p-12 flex flex-col justify-center">
            {sent ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-white font-black text-2xl mb-2">Заявка отправлена!</h3>
                <p className="text-white/80 text-sm">Перезвоним в течение 30 минут</p>
              </div>
            ) : (
              <>
                <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-3">Специальное предложение</p>
                <h3 className="text-white font-black text-3xl md:text-4xl leading-tight mb-2">
                  СКИДКА<br />ДО 10%
                </h3>
                <p className="text-white/80 text-sm mb-8 leading-relaxed">
                  Оставь заявку — рассчитаем стоимость и подберём подходящее строение
                </p>

                <div className="flex flex-col gap-3 mb-4">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ваше имя"
                    className="bg-white/10 border border-white/30 text-white placeholder-white/50 font-semibold text-sm px-4 py-3 focus:outline-none focus:border-white transition-colors"
                  />
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Телефон"
                    type="tel"
                    className="bg-white/10 border border-white/30 text-white placeholder-white/50 font-semibold text-sm px-4 py-3 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <button
                  onClick={submit}
                  className="bg-white text-[#CC1F1F] font-black text-sm py-3.5 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                >
                  Получить скидку
                  <Icon name="ArrowRight" size={16} />
                </button>
                <p className="text-white/40 text-[11px] mt-3 text-center">
                  Нажимая, вы соглашаетесь с политикой конфиденциальности
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// TICKER
// ─────────────────────────────────────────────
function Ticker() {
  const items = ["БЫТОВКИ", "БАНИ", "ХОЗБЛОКИ", "ДАЧНЫЕ ДОМИКИ", "ДОСТАВКА ПО ТАТАРСТАНУ", "ГАРАНТИЯ 12 МЕС"];
  const doubled = [...items, ...items];
  return (
    <div className="bg-[#CC1F1F] py-3 overflow-hidden">
      <div className="animate-ticker flex gap-0 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="text-white font-black text-xs uppercase tracking-widest px-8 flex items-center gap-8">
            {item}
            <span className="inline-block w-1 h-1 bg-white/50 rounded-full" />
          </span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
function Footer({ setPage }: { setPage: (p: string) => void }) {
  return (
    <footer className="bg-[#2D2D2D] pt-14 pb-8">
      <div className="max-w-[1160px] mx-auto px-5">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <img src={LOGO_URL} alt="НА УЧАСТКЕ" className="h-9 w-auto mb-4 brightness-0 invert" />
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              Маркетплейс строений в Республике Татарстан. Бытовки, дачные домики, хозблоки и бани.
            </p>
            <a href="tel:+78432000000" className="text-white font-black text-lg hover:text-[#CC1F1F] transition-colors flex items-center gap-2">
              <Icon name="Phone" size={18} />
              +7 (843) 200-00-00
            </a>
            <p className="text-white/30 text-xs mt-1.5 ml-7">Пн–Вс, 8:00–22:00</p>
          </div>

          <div>
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-wider mb-5">Навигация</p>
            <div className="flex flex-col gap-3">
              {[{ id: "home", l: "Главная" }, { id: "catalog", l: "Каталог" }, { id: "about", l: "О нас" }].map((n) => (
                <button key={n.id} onClick={() => setPage(n.id)} className="text-white/70 hover:text-white text-sm font-semibold text-left transition-colors">
                  {n.l}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-wider mb-5">Категории</p>
            <div className="flex flex-col gap-3">
              {["Бытовки", "Бани", "Дачные домики", "Хозблоки"].map((c) => (
                <span key={c} className="text-white/70 text-sm font-semibold">{c}</span>
              ))}
            </div>
          </div>
        </div>

        {/* big brand ticker */}
        <div className="border-t border-white/10 pt-8 overflow-hidden">
          <div className="flex gap-0 animate-ticker whitespace-nowrap opacity-10 select-none">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="text-white font-black text-5xl md:text-7xl uppercase tracking-tight px-6">НА УЧАСТКЕ</span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/25 text-xs">© 2024 НА УЧАСТКЕ. Все права защищены.</p>
          <p className="text-white/25 text-xs">Республика Татарстан</p>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────
// ABOUT PAGE
// ─────────────────────────────────────────────
function AboutPage({ setPage }: { setPage: (p: string) => void }) {
  const { ref, on } = useReveal();
  return (
    <div className="min-h-screen bg-white">
      {/* dark hero strip */}
      <div className="bg-[#2D2D2D] pt-24 pb-16 px-5">
        <div className="max-w-[1160px] mx-auto">
          <p className="text-[#CC1F1F] text-xs font-bold uppercase tracking-widest mb-4">О компании</p>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-none">
            НА<br />УЧАСТКЕ
          </h1>
          <p className="text-white/50 mt-4 text-lg max-w-sm">8 лет строим доверие в Татарстане</p>
        </div>
      </div>

      <Ticker />

      <div ref={ref} className="max-w-[1160px] mx-auto px-5 py-20">
        <div className={`grid md:grid-cols-2 gap-16 items-center mb-20 ${on ? "animate-fade-in-up" : "opacity-0"}`}>
          <div>
            <p className="text-[#CC1F1F] text-xs font-bold uppercase tracking-widest mb-4">История</p>
            <h2 className="text-3xl font-black text-[#2D2D2D] mb-6 leading-tight">
              Начинали с одной бытовки,<br />стали маркетплейсом
            </h2>
            {[
              "НА УЧАСТКЕ начинался в 2016 году как небольшое агентство по подбору бытовок для строительных компаний Казани.",
              "В 2020 году запустили цифровой маркетплейс, объединив лучших производителей Татарстана в одном месте. Теперь покупатель видит реальные цены и характеристики — и делает выбор за минуты.",
              "Сегодня мы — крупнейшая площадка строений в Республике Татарстан. Более 500 объектов продано, 40+ проверенных поставщиков.",
            ].map((t, i) => (
              <p key={i} className="text-[#737373] text-sm leading-relaxed mb-3">{t}</p>
            ))}
          </div>
          <div className="relative">
            <img src={IMG_DACHA} alt="О нас" className="w-full h-80 object-cover" />
            <div className="absolute -bottom-5 -right-5 bg-[#CC1F1F] text-white p-5">
              <div className="font-black text-4xl">8+</div>
              <div className="text-white/80 text-xs font-bold mt-1">лет опыта</div>
            </div>
          </div>
        </div>

        {/* stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100">
          {STATS.map((s) => (
            <div key={s.num} className="bg-white p-8 text-center">
              <div className="text-4xl font-black text-[#CC1F1F] mb-1">{s.num}</div>
              <div className="text-xs font-bold text-[#2D2D2D] mb-1">{s.label}</div>
              <div className="text-xs text-[#737373]">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => setPage("catalog")}
            className="bg-[#CC1F1F] hover:bg-[#a81919] text-white font-black text-sm px-10 py-4 transition-colors inline-flex items-center gap-2"
          >
            Смотреть каталог <Icon name="ArrowRight" size={16} />
          </button>
        </div>
      </div>
      <Footer setPage={setPage} />
    </div>
  );
}

// ─────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────
function HomePage({ setPage }: { setPage: (p: string) => void }) {
  const scrollToCatalog = () => {
    const el = document.getElementById("catalog-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else setPage("catalog");
  };

  const scrollToLead = () => {
    const el = document.getElementById("lead-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Hero onCatalog={scrollToCatalog} onLead={scrollToLead} />
      <Ticker />
      <WhySection />
      <div id="catalog-section">
        <CatalogSection />
      </div>
      <div id="lead-section">
        <LeadSection />
      </div>
      <Footer setPage={setPage} />
    </div>
  );
}

// ─────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────
export default function Index() {
  const [page, setPage] = useState("home");

  const handlePage = (p: string) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Navbar page={page} setPage={handlePage} />
      <div className="pt-14">
        {page === "home" && <HomePage setPage={handlePage} />}
        {page === "catalog" && (
          <div>
            <div className="bg-[#2D2D2D] py-14 px-5">
              <div className="max-w-[1160px] mx-auto">
                <p className="text-[#CC1F1F] text-xs font-bold uppercase tracking-widest mb-3">Каталог</p>
                <h1 className="text-5xl font-black text-white">Строения</h1>
                <p className="text-white/50 mt-2">Татарстан — бытовки, домики, хозблоки, бани</p>
              </div>
            </div>
            <Ticker />
            <CatalogSection standalone />
            <LeadSection />
            <Footer setPage={handlePage} />
          </div>
        )}
        {page === "about" && <AboutPage setPage={handlePage} />}
      </div>
    </div>
  );
}
