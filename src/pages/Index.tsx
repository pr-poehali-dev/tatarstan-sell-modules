import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// ──────────────────────────────────────────────────
// ASSETS & CONSTANTS
// ──────────────────────────────────────────────────
const LOGO_URL = "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/bucket/66dfe931-3178-44b4-9e57-7cdecea02f79.png";
const HERO_IMG = "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/dbaaf8e0-0994-44f6-be0e-b1c45ace8466.jpg";

const IMG = {
  p1: "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/179109c5-b630-405b-9c8f-8ab7e0d6804a.jpg",
  p2: "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/07c48682-4459-4388-bf2b-6581dde99b9b.jpg",
  p3: "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/b5f5c1c9-6de2-48b1-85b4-318a7f4c0dd2.jpg",
  p4: "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/61a3efa8-70d2-4be6-a7bd-9897a1f75a1c.jpg",
  p5: "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/4fe33c00-7262-4cf3-bce5-34d8de728549.jpg",
  p6: "https://cdn.poehali.dev/projects/ae84adcf-3042-47db-a625-8e600228c8fb/files/e520038f-7c8d-440c-adc7-5e9381507fe4.jpg",
};

const NAV_LINKS = ["Главная", "О нас", "Каталог", "Отзывы", "Контакты"];

const ABOUT_STATS = [
  { num: "8 лет", label: "создаём строения", sub: "с 2016 года" },
  { num: "500+", label: "проданных\nобъектов" },
  { num: "40+", label: "проверенных\nпроизводителей" },
  { num: "16", label: "городов и\nрайонов РТ" },
];

const WHY_ITEMS = [
  { n: "01", title: "Доставка 3–7 дней", body: "Собственный парк спецтехники по всему Татарстану без посредников" },
  { n: "02", title: "Гарантия 12 месяцев", body: "ОТК перед отгрузкой, устраним дефект за наш счёт" },
  { n: "03", title: "Цена без накруток", body: "Прямые договоры с производителями — финальная цена на сайте" },
  { n: "04", title: "Рассрочка без %", body: "6 месяцев без переплат, физлица, ИП и юрлица" },
];

const PRODUCTS = [
  { id: 1, title: "Бытовка «Стандарт»", cat: "bytovka", size: "6×2.4 м", area: 14.4, ins: "100mm", ins_label: "100 мм", price: 85000, badge: "Хит", img: IMG.p2, tags: ["14 м²", "100 мм"], inStock: true },
  { id: 2, title: "Баня «Рубленая»", cat: "banya", size: "4×5 м", area: 20, ins: "150mm", ins_label: "150 мм", price: 320000, badge: "Новинка", img: IMG.p1, tags: ["20 м²", "150 мм"], inStock: true },
  { id: 3, title: "Дачный домик «Уют»", cat: "dacha", size: "5×4 м", area: 20, ins: "150mm", ins_label: "150 мм", price: 195000, badge: "Акция", img: IMG.p4, tags: ["20 м²", "150 мм"], inStock: true },
  { id: 4, title: "Хозблок «Мастер»", cat: "hozblok", size: "3×2 м", area: 6, ins: "none", ins_label: "Без утепл.", price: 65000, badge: null, img: IMG.p3, tags: ["6 м²", "Без утепл."], inStock: true },
  { id: 5, title: "Бытовка «Комфорт»", cat: "bytovka", size: "9×2.4 м", area: 21.6, ins: "150mm", ins_label: "150 мм", price: 130000, badge: "Хит", img: IMG.p2, tags: ["22 м²", "150 мм"], inStock: true },
  { id: 6, title: "Баня «Финская»", cat: "banya", size: "5×6 м", area: 30, ins: "200mm", ins_label: "200 мм", price: 440000, badge: "Премиум", img: IMG.p1, tags: ["30 м²", "200 мм"], inStock: false },
  { id: 7, title: "Хозблок с навесом", cat: "hozblok", size: "4×3 м", area: 12, ins: "100mm", ins_label: "100 мм", price: 95000, badge: null, img: IMG.p3, tags: ["12 м²", "100 мм"], inStock: true },
  { id: 8, title: "Дачный домик «Садко»", cat: "dacha", size: "6×5 м", area: 30, ins: "200mm", ins_label: "200 мм", price: 285000, badge: "Новинка", img: IMG.p6, tags: ["30 м²", "200 мм"], inStock: true },
];

const CATS_MAP: Record<string, string> = { all: "Все", bytovka: "Бытовки", dacha: "Домики", hozblok: "Хозблоки", banya: "Бани" };

// ──────────────────────────────────────────────────
// SCROLL REVEAL HOOK
// ──────────────────────────────────────────────────
function useReveal(threshold = 0.1) {
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

// ──────────────────────────────────────────────────
// NAVBAR  — лого слева, ссылки по центру, город справа
// ──────────────────────────────────────────────────
function Navbar({ activePage, setPage }: { activePage: string; setPage: (p: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mOpen, setMOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-shadow duration-200 bg-white ${scrolled ? "shadow-sm" : ""}`}>
      <div className="max-w-[1160px] mx-auto px-5 flex items-center h-[52px]">
        {/* Logo */}
        <button onClick={() => setPage("home")} className="flex-shrink-0 mr-8">
          <img src={LOGO_URL} alt="НА УЧАСТКЕ" className="h-7 w-auto" />
        </button>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
          {NAV_LINKS.map((l) => {
            const id = l === "Главная" ? "home" : l === "Каталог" ? "catalog" : l === "О нас" ? "about" : "home";
            return (
              <button
                key={l}
                onClick={() => setPage(id)}
                className={`text-sm transition-colors border-b-2 pb-0.5 ${
                  (activePage === id)
                    ? "text-[#1a1a1a] border-[#1a1a1a] font-semibold"
                    : "text-[#555] border-transparent hover:text-[#1a1a1a] font-medium"
                }`}
              >
                {l}
              </button>
            );
          })}
        </nav>

        {/* Right — city + phone */}
        <div className="hidden md:flex items-center gap-5 ml-8">
          <span className="text-sm text-[#555]">Республика Татарстан</span>
          <a href="tel:+78432000000" className="text-sm font-semibold text-[#1a1a1a] hover:text-brand-orange transition-colors">
            +7 (843) 200-00-00
          </a>
        </div>

        <button className="ml-auto md:hidden" onClick={() => setMOpen(!mOpen)}>
          <Icon name={mOpen ? "X" : "Menu"} size={20} className="text-[#1a1a1a]" />
        </button>
      </div>

      {mOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-5 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((l) => {
            const id = l === "Главная" ? "home" : l === "Каталог" ? "catalog" : l === "О нас" ? "about" : "home";
            return (
              <button key={l} onClick={() => { setPage(id); setMOpen(false); }}
                className={`text-left text-sm font-medium py-1 ${activePage === id ? "text-[#1a1a1a] font-semibold" : "text-[#555]"}`}
              >{l}</button>
            );
          })}
          <a href="tel:+78432000000" className="text-sm font-bold text-brand-orange">+7 (843) 200-00-00</a>
        </div>
      )}
    </header>
  );
}

// ──────────────────────────────────────────────────
// HERO  — текст НАД фото, подпись + кнопка ВНУТРИ фото
// ──────────────────────────────────────────────────
function Hero({ onLead }: { onLead: () => void }) {
  return (
    <section className="pt-[52px]">
      {/* Big headline ABOVE the photo */}
      <div className="max-w-[1160px] mx-auto px-5 pt-10 pb-3">
        <h1 className="text-[clamp(44px,8vw,96px)] font-black leading-[0.93] tracking-tight text-[#1a1a1a] uppercase">
          СТРОЕНИЯ<br />НА&nbsp;УЧАСТКЕ
        </h1>
      </div>

      {/* Full-width photo block */}
      <div className="relative overflow-hidden" style={{ height: "clamp(320px, 48vw, 560px)" }}>
        <img
          src={HERO_IMG}
          alt="Строения на участке"
          className="w-full h-full object-cover object-center anim-in"
        />
        {/* Dark gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/50" />

        {/* Bottom-center: subtitle + CTA */}
        <div className="absolute bottom-0 inset-x-0 flex flex-col items-center pb-10 gap-4">
          <p className="text-white/85 text-sm md:text-base text-center max-w-sm leading-relaxed px-4">
            Прозрачные сметы, чёткие сроки, честные отношения —<br className="hidden md:block" />
            наш рецепт успешного строительства
          </p>
          <button
            onClick={onLead}
            className="bg-white/95 hover:bg-white text-[#1a1a1a] font-semibold text-sm px-8 py-3 rounded-full transition-all shadow-lg hover:shadow-xl"
          >
            Оставить заявку
          </button>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────
// ABOUT SECTION  — точно как на референсе
// ──────────────────────────────────────────────────
function AboutSection() {
  const { ref, on } = useReveal();
  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-[1160px] mx-auto px-5">

        {/* Eyebrow */}
        <p className={`text-sm text-[#999] mb-6 ${on ? "anim-up" : "hidden-init"}`}>(1) О компании</p>

        {/* Two-column header */}
        <div className={`grid md:grid-cols-2 gap-8 mb-14 ${on ? "anim-up d1" : "hidden-init"}`}>
          <div>
            <h2 className="text-[clamp(28px,4vw,42px)] font-bold text-[#1a1a1a] leading-tight">
              Почему выбирают<br />именно нас?
            </h2>
          </div>
          <div className="flex flex-col gap-4 justify-center">
            <p className="text-[#555] text-sm leading-relaxed">
              Только лучшие материалы и проверенные технологии,
              потому что мы стремимся создавать качественные
              и надёжные объекты, которые прослужат долгие годы
            </p>
            <p className="text-[#555] text-sm leading-relaxed">
              Честность, открытость и ответственность во всём,
              что мы делаем
            </p>
          </div>
        </div>

        {/* Stats grid — 4 cells with light borders */}
        <div className={`grid grid-cols-2 md:grid-cols-4 border border-[#e8e8e8] mb-16 ${on ? "anim-up d2" : "hidden-init"}`}>
          {ABOUT_STATS.map((s, i) => (
            <div
              key={i}
              className={`p-6 md:p-8 ${i < 3 ? "border-r border-[#e8e8e8]" : ""}`}
            >
              <div className="text-[clamp(26px,4vw,40px)] font-bold text-[#1a1a1a] leading-none mb-2">
                {s.num}
              </div>
              <div className="text-xs text-[#888] leading-relaxed whitespace-pre-line">{s.label}</div>
              {s.sub && <div className="text-xs text-[#bbb] mt-1">{s.sub}</div>}
            </div>
          ))}
        </div>

        {/* Giant decorative numbers row — as in ref */}
        <div className={`grid grid-cols-4 overflow-hidden ${on ? "anim-up d3" : "hidden-init"}`}>
          {WHY_ITEMS.map((w) => (
            <div key={w.n} className="relative group overflow-hidden">
              {/* Big number */}
              <div
                className="text-[clamp(80px,10vw,140px)] font-black leading-none select-none transition-colors duration-300"
                style={{ color: "hsl(var(--brand-orange))", opacity: 0.18 }}
              >
                {w.n}
              </div>
              {/* Content on hover */}
              <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90">
                <p className="text-xs font-bold text-[#1a1a1a] mb-1">{w.title}</p>
                <p className="text-[11px] text-[#888] leading-relaxed">{w.body}</p>
              </div>
              {/* Always-visible title */}
              <p className="text-xs font-semibold text-[#555] mt-1 px-1">{w.title}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────
// CATALOG SECTION  — фильтры слева, карточки 2×N справа
// ──────────────────────────────────────────────────
function CatalogSection({ standalone = false }: { standalone?: boolean }) {
  const { ref, on } = useReveal(0.05);

  // Filter state
  const [cat, setCat] = useState<string[]>([]);         // multi-cat
  const [sizeMin, setSizeMin] = useState("");
  const [sizeMax, setSizeMax] = useState("");
  const [insul, setInsul] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [visCount, setVisCount] = useState(4);

  const INS_OPTIONS = [
    { id: "none", label: "Без утепления" },
    { id: "100mm", label: "100 мм" },
    { id: "150mm", label: "150 мм" },
    { id: "200mm", label: "200 мм" },
  ];

  const CAT_OPTIONS = [
    { id: "bytovka", label: "Бытовки" },
    { id: "dacha", label: "Дачные домики" },
    { id: "hozblok", label: "Хозблоки" },
    { id: "banya", label: "Бани" },
  ];

  const toggleArr = (arr: string[], val: string, set: (a: string[]) => void) => {
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  const reset = () => {
    setCat([]); setInsul([]);
    setSizeMin(""); setSizeMax("");
    setPriceMin(""); setPriceMax("");
    setVisCount(4);
  };

  const filtered = PRODUCTS.filter((p) => {
    if (cat.length && !cat.includes(p.cat)) return false;
    if (insul.length && !insul.includes(p.ins)) return false;
    if (sizeMin && p.area < parseFloat(sizeMin)) return false;
    if (sizeMax && p.area > parseFloat(sizeMax)) return false;
    if (priceMin && p.price < parseInt(priceMin)) return false;
    if (priceMax && p.price > parseInt(priceMax)) return false;
    return true;
  });

  const visible = filtered.slice(0, visCount);
  const hasMore = filtered.length > visCount;

  return (
    <section className={`py-20 ${standalone ? "bg-white" : "bg-[#f9f9f9]"}`} ref={ref}>
      <div className="max-w-[1160px] mx-auto px-5">

        {/* Eyebrow */}
        <p className={`text-sm text-[#999] mb-6 ${on ? "anim-up" : "hidden-init"}`}>(2) Каталог</p>

        {/* Two-column header */}
        <div className={`grid md:grid-cols-2 gap-6 mb-12 ${on ? "anim-up d1" : "hidden-init"}`}>
          <h2 className="text-[clamp(26px,4vw,40px)] font-bold text-[#1a1a1a] leading-tight">
            Строение вашей мечты<br />найдётся здесь
          </h2>
          <div className="flex items-center">
            <p className="text-sm text-[#888] leading-relaxed max-w-xs">
              <span className="text-brand-orange font-semibold">НА УЧАСТКЕ</span> — с заботой о вашем комфорте,
              с любовью к вашим воспоминаниям
            </p>
          </div>
        </div>

        {/* Sidebar + Grid layout */}
        <div className={`flex gap-8 items-start ${on ? "anim-up d2" : "hidden-init"}`}>

          {/* ── LEFT SIDEBAR FILTERS ── */}
          <aside className="hidden md:flex flex-col gap-5 w-[220px] flex-shrink-0 bg-white border border-[#e8e8e8] p-5">

            {/* Category */}
            <div>
              <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-2">Тип строения</p>
              <div className="flex flex-col gap-1.5">
                {CAT_OPTIONS.map((o) => (
                  <label key={o.id} className="cb-label">
                    <input type="checkbox" checked={cat.includes(o.id)} onChange={() => toggleArr(cat, o.id, setCat)} />
                    {o.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-2">Площадь (м²)</p>
              <div className="flex items-center gap-1.5">
                <input
                  type="number" placeholder="От" value={sizeMin}
                  onChange={(e) => setSizeMin(e.target.value)}
                  className="w-full border border-[#ddd] text-xs px-2 py-1.5 focus:outline-none focus:border-[#1a1a1a]"
                />
                <span className="text-[#ccc] text-xs">—</span>
                <input
                  type="number" placeholder="до" value={sizeMax}
                  onChange={(e) => setSizeMax(e.target.value)}
                  className="w-full border border-[#ddd] text-xs px-2 py-1.5 focus:outline-none focus:border-[#1a1a1a]"
                />
              </div>
            </div>

            {/* Insulation */}
            <div>
              <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-2">Утепление</p>
              <div className="flex flex-col gap-1.5">
                {INS_OPTIONS.map((o) => (
                  <label key={o.id} className="cb-label">
                    <input type="checkbox" checked={insul.includes(o.id)} onChange={() => toggleArr(insul, o.id, setInsul)} />
                    {o.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-2">Цена (руб.)</p>
              <div className="flex items-center gap-1.5">
                <input
                  type="number" placeholder="От" value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  className="w-full border border-[#ddd] text-xs px-2 py-1.5 focus:outline-none focus:border-[#1a1a1a]"
                />
                <span className="text-[#ccc] text-xs">—</span>
                <input
                  type="number" placeholder="до" value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="w-full border border-[#ddd] text-xs px-2 py-1.5 focus:outline-none focus:border-[#1a1a1a]"
                />
              </div>
            </div>

            {/* Apply */}
            <button className="w-full bg-[#1a1a1a] text-white text-sm font-semibold py-2.5 hover:bg-[#333] transition-colors">
              Применить
            </button>
            <button onClick={reset} className="text-xs text-[#999] hover:text-[#1a1a1a] transition-colors text-center">
              Сбросить настройки
            </button>
          </aside>

          {/* ── RIGHT — PRODUCT CARDS 2×N ── */}
          <div className="flex-1 min-w-0">
            {visible.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-4xl mb-3">🔍</p>
                <p className="font-semibold text-[#1a1a1a]">Ничего не найдено</p>
                <p className="text-[#888] text-sm mt-1">Измените параметры фильтра</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {visible.map((p, i) => (
                  <ProductCard key={p.id} p={p} i={i} />
                ))}
              </div>
            )}

            {/* Show more button — as in ref */}
            {hasMore && (
              <div className="mt-6">
                <button
                  onClick={() => setVisCount((c) => c + 4)}
                  className="w-full border border-[#ddd] text-sm font-medium text-[#1a1a1a] py-3.5 hover:border-[#1a1a1a] transition-colors bg-white"
                >
                  Показать больше
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────
// PRODUCT CARD  — точно как на референсе
// ──────────────────────────────────────────────────
function ProductCard({ p, i }: { p: typeof PRODUCTS[0]; i: number }) {
  return (
    <div
      className={`bg-white border border-[#e8e8e8] overflow-hidden group card-lift anim-up hidden-init`}
      style={{ animationDelay: `${0.04 * i}s` }}
    >
      {/* Photo */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <img
          src={p.img} alt={p.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {/* Tags row at bottom of image */}
        <div className="absolute bottom-0 inset-x-0 flex gap-1.5 p-2.5">
          {p.tags.map((t) => (
            <span key={t} className="bg-black/55 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5">
              {t}
            </span>
          ))}
        </div>
        {!p.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-[#1a1a1a] font-semibold text-xs px-3 py-1">Под заказ</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-[#888] mb-0.5">{CATS_MAP[p.cat]}, {p.size}</p>
        <h3 className="font-semibold text-[#1a1a1a] text-sm mb-2 leading-snug">
          "{p.title.split("«")[1]?.replace("»", "") || p.title}"
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-brand-orange font-bold text-base">
            {(p.price / 1000).toFixed(0)} тыс. ₽
          </span>
          {p.badge && (
            <span className="text-[10px] font-bold text-brand-orange bg-orange-50 px-2 py-0.5 border border-orange-200">
              {p.badge}
            </span>
          )}
        </div>
        <button className="mt-3 w-full text-center text-xs font-medium text-[#555] border-b border-[#ddd] pb-0.5 hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition-colors text-left">
          Подробнее
        </button>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────
// LEAD SECTION  — форма заявки
// ──────────────────────────────────────────────────
function LeadSection() {
  const { ref, on } = useReveal();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="py-20 bg-white" ref={ref} id="lead-section">
      <div className="max-w-[1160px] mx-auto px-5">
        <div className={`grid md:grid-cols-2 gap-0 overflow-hidden border border-[#e8e8e8] ${on ? "anim-up" : "hidden-init"}`}>
          <div className="relative">
            <img src={IMG.p5} alt="Строение" className="w-full h-full object-cover min-h-[320px]" />
          </div>
          <div className="bg-[#1a1a1a] p-10 md:p-12 flex flex-col justify-center">
            {sent ? (
              <div className="text-center">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-white font-bold text-2xl mb-2">Заявка принята!</h3>
                <p className="text-white/60 text-sm">Перезвоним в течение 30 минут</p>
              </div>
            ) : (
              <>
                <p className="text-white/50 text-xs uppercase tracking-widest mb-3">Специальное предложение</p>
                <h3 className="text-white font-black text-3xl leading-tight mb-2">СКИДКА<br />ДО 10%</h3>
                <p className="text-white/60 text-sm mb-8 leading-relaxed">
                  Оставь заявку на подбор строения,<br />чтобы получить скидку
                </p>
                <div className="flex flex-col gap-3 mb-4">
                  <input
                    value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Имя"
                    className="bg-transparent border border-white/20 text-white placeholder-white/35 text-sm px-4 py-3 focus:outline-none focus:border-white/60 transition-colors"
                  />
                  <input
                    value={phone} onChange={(e) => setPhone(e.target.value)}
                    placeholder="Почта / Телефон"
                    className="bg-transparent border border-white/20 text-white placeholder-white/35 text-sm px-4 py-3 focus:outline-none focus:border-white/60 transition-colors"
                  />
                </div>
                <button
                  onClick={() => { if (name && phone) setSent(true); }}
                  className="bg-white text-[#1a1a1a] font-semibold text-sm py-3.5 hover:bg-gray-100 transition-colors"
                >
                  Отправить
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────
// FOOTER
// ──────────────────────────────────────────────────
function Footer({ setPage }: { setPage: (p: string) => void }) {
  const footerLinks = [
    { label: "КАТАЛОГ", id: "catalog" },
    { label: "О НАС", id: "about" },
    { label: "КАК ЗАКАЗАТЬ", id: "home" },
    { label: "КОНТАКТЫ", id: "home" },
  ];

  return (
    <footer className="bg-white border-t border-[#e8e8e8]">
      {/* Main footer row */}
      <div className="max-w-[1160px] mx-auto px-5 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <img src={LOGO_URL} alt="НА УЧАСТКЕ" className="h-7 w-auto" />
          <p className="text-xs text-[#999]">Маркетплейс строений Татарстана</p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-2">
          {footerLinks.map((l) => (
            <button key={l.label} onClick={() => setPage(l.id)}
              className="text-xs font-semibold text-[#555] hover:text-[#1a1a1a] transition-colors uppercase tracking-wider">
              {l.label}
            </button>
          ))}
        </nav>

        <div className="text-right">
          <a href="tel:+78432000000" className="text-sm font-bold text-[#1a1a1a] hover:text-brand-orange transition-colors">
            +7 (843) 200-00-00
          </a>
          <p className="text-xs text-[#999] mt-0.5">Пн–Вс, 8:00–22:00</p>
        </div>
      </div>

      {/* Big marquee brand row — like mizle ref */}
      <div className="border-t border-[#f0f0f0] overflow-hidden py-2">
        <div className="flex anim-ticker whitespace-nowrap">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="text-[clamp(48px,8vw,96px)] font-black text-[#f0f0f0] uppercase select-none px-8 tracking-tight">
              НА УЧАСТКЕ
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1160px] mx-auto px-5 py-4">
        <p className="text-xs text-[#ccc]">© 2024 НА УЧАСТКЕ. Все права защищены. Республика Татарстан.</p>
      </div>
    </footer>
  );
}

// ──────────────────────────────────────────────────
// ABOUT PAGE (full page)
// ──────────────────────────────────────────────────
function AboutPage({ setPage }: { setPage: (p: string) => void }) {
  const { ref, on } = useReveal();
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1160px] mx-auto px-5 pt-24 pb-16">
        <p className="text-sm text-[#999] mb-6">(1) О компании</p>
        <div ref={ref} className={`grid md:grid-cols-2 gap-12 mb-16 ${on ? "anim-up" : "hidden-init"}`}>
          <h1 className="text-[clamp(28px,5vw,52px)] font-bold text-[#1a1a1a] leading-tight">
            Почему выбирают<br />именно нас?
          </h1>
          <div className="flex flex-col gap-4 justify-center">
            <p className="text-[#555] text-sm leading-relaxed">
              Только лучшие материалы и проверенные технологии — создаём качественные
              и надёжные объекты, которые прослужат долгие годы.
            </p>
            <p className="text-[#555] text-sm leading-relaxed">
              Честность, открытость и ответственность во всём, что мы делаем.
              8 лет на рынке Татарстана, 500+ довольных клиентов.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 border border-[#e8e8e8] mb-16">
          {ABOUT_STATS.map((s, i) => (
            <div key={i} className={`p-6 md:p-8 ${i < 3 ? "border-r border-[#e8e8e8]" : ""}`}>
              <div className="text-3xl font-bold text-[#1a1a1a] mb-1">{s.num}</div>
              <div className="text-xs text-[#888] whitespace-pre-line">{s.label}</div>
              {s.sub && <div className="text-xs text-[#ccc] mt-0.5">{s.sub}</div>}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setPage("catalog")}
            className="bg-[#1a1a1a] text-white font-semibold text-sm px-10 py-3.5 hover:bg-[#333] transition-colors inline-flex items-center gap-2"
          >
            Смотреть каталог <Icon name="ArrowRight" size={16} />
          </button>
        </div>
      </div>
      <LeadSection />
      <Footer setPage={setPage} />
    </div>
  );
}

// ──────────────────────────────────────────────────
// HOME PAGE
// ──────────────────────────────────────────────────
function HomePage({ setPage }: { setPage: (p: string) => void }) {
  const scrollToLead = () => {
    document.getElementById("lead-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Hero onLead={scrollToLead} />
      <AboutSection />
      <CatalogSection />
      <LeadSection />
      <Footer setPage={setPage} />
    </div>
  );
}

// ──────────────────────────────────────────────────
// CATALOG PAGE (standalone)
// ──────────────────────────────────────────────────
function CatalogPage({ setPage }: { setPage: (p: string) => void }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1160px] mx-auto px-5 pt-20 pb-4">
        <h1 className="text-4xl font-bold text-[#1a1a1a] mb-1">Каталог строений</h1>
        <p className="text-[#888] text-sm">Республика Татарстан — бытовки, домики, хозблоки, бани</p>
      </div>
      <CatalogSection standalone />
      <LeadSection />
      <Footer setPage={setPage} />
    </div>
  );
}

// ──────────────────────────────────────────────────
// ROOT
// ──────────────────────────────────────────────────
export default function Index() {
  const [page, setPage] = useState("home");

  const handlePage = (p: string) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Navbar activePage={page} setPage={handlePage} />
      <div className="pt-[52px]">
        {page === "home" && <HomePage setPage={handlePage} />}
        {page === "catalog" && <CatalogPage setPage={handlePage} />}
        {page === "about" && <AboutPage setPage={handlePage} />}
      </div>
    </div>
  );
}
