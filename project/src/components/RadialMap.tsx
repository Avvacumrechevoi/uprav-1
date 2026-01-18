import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties
} from 'react';
import { useNavigate } from 'react-router-dom';
import { departments } from '../data';
import { DirectionModal, type DirectionModalData } from './DirectionModal';

type RadialItem = {
  slug: string;
  angleDeg: number;
  title: string;
  subtitle: string;
  tooltip: string;
  tags: string[];
  lead: string;
  whatWeDo: string[];
  forWhom: string[];
  format: string;
  commitment: string;
  examples?: { label: string; url: string }[];
};

const DIRECTIONS: RadialItem[] = [
  {
    slug: 'neglinka',
    angleDeg: -90,
    title: 'Неглинка',
    subtitle: 'История и география',
    tooltip: 'Неглинка · Нажмите',
    tags: ['Исследования', 'История', 'Картография'],
    lead: 'Исследуем географию и историю через язык, чтобы восстановить целостную картину прошлого.',
    whatWeDo: [
      'Работаем с источниками и картами',
      'Разбираем названия рек, земель, народов',
      'Публикуем находки и разборы',
      'Проводим закрытые обсуждения'
    ],
    forWhom: ['Историки', 'Лингвисты', 'Картографы'],
    format: 'Еженедельные разборы и исследовательские сессии.',
    commitment: '2–4 часа в неделю, дистанционно.'
  },
  {
    slug: 'izvod',
    angleDeg: -45,
    title: 'Извод',
    subtitle: 'Смыслы и первоосновы',
    tooltip: 'Извод · Нажмите',
    tags: ['Тексты', 'Смысл', 'Разборы'],
    lead: 'Углубляемся в слова и события, чтобы раскрывать забытые смыслы и связи.',
    whatWeDo: [
      'Готовим смысловые разборы',
      'Пишем статьи-исследования',
      'Собираем длинные тексты',
      'Формируем базу источников'
    ],
    forWhom: ['Исследователи', 'Авторов', 'Редакторов'],
    format: 'Письменные разборы и совместные обсуждения.',
    commitment: '2–3 часа в неделю.'
  },
  {
    slug: 'litprosvet',
    angleDeg: 0,
    title: 'ЛитПроСвет',
    subtitle: 'Литература и письмо',
    tooltip: 'ЛитПроСвет · Нажмите',
    tags: ['Литература', 'Письмо', 'Игры'],
    lead: 'Учим видеть композицию, ценности и язык в текстах — и писать свои.',
    whatWeDo: [
      'Читательский клуб',
      'Курсы письма',
      'Литературные игры',
      'Разборы текстов'
    ],
    forWhom: ['Писатели', 'Читатели', 'Педагоги'],
    format: 'Очные и онлайн встречи, разборы текстов.',
    commitment: '1–2 встречи в месяц.'
  },
  {
    slug: 'astronevod',
    angleDeg: 45,
    title: 'Астроневод',
    subtitle: 'Космос и циклы',
    tooltip: 'Астроневод · Нажмите',
    tags: ['Астрономия', 'Циклы', 'Наблюдения'],
    lead: 'Смотрим на небо осмысленно: соединяем астрономию, время и логику циклов.',
    whatWeDo: [
      'Наблюдения и разборы',
      'Исследования небесных циклов',
      'Статьи и заметки',
      'Совместные обсуждения'
    ],
    forWhom: ['Любителей космоса', 'Исследователей', 'Наблюдателей'],
    format: 'Регулярные наблюдения и разборы.',
    commitment: '2–3 часа в неделю.'
  },
  {
    slug: 'jiva',
    angleDeg: 90,
    title: 'Джива',
    subtitle: 'Здоровье и практика',
    tooltip: 'Джива · Нажмите',
    tags: ['Здоровье', 'Практики', 'Ритмы'],
    lead: 'Смотрим на здоровье как на живую систему: ритмы, дыхание, сила жизни.',
    whatWeDo: [
      'Практики и методики',
      'Исследования состояния',
      'Просветительские встречи',
      'Материалы для участников'
    ],
    forWhom: ['Практиков', 'Наставников', 'Ищущих баланс'],
    format: 'Практические встречи и материалы.',
    commitment: '1–2 часа в неделю.'
  },
  {
    slug: 'prazdniki',
    angleDeg: 135,
    title: 'Праздники',
    subtitle: 'Обряды и встречи',
    tooltip: 'Праздники · Нажмите',
    tags: ['Праздники', 'Обряды', 'События'],
    lead: 'Возвращаем праздники и обряды как живую ткань года и общины.',
    whatWeDo: [
      'Сценарии праздников',
      'Организация встреч',
      'Ритуалы и традиции',
      'Годовой круг'
    ],
    forWhom: ['Организаторов', 'Ведущих', 'Участников'],
    format: 'Сезонные события и подготовка.',
    commitment: 'По календарю встреч.'
  },
  {
    slug: 'yasnye-marshruty',
    angleDeg: 180,
    title: 'Маршруты',
    subtitle: 'Путешествия и экскурсии',
    tooltip: 'Маршруты · Нажмите',
    tags: ['Путешествия', 'Маршруты', 'Пространство'],
    lead: 'Путешествия, где пространство становится учителем и раскрывает смысл.',
    whatWeDo: [
      'Готовим маршруты',
      'Организуем экскурсии',
      'Полевые исследования',
      'Обратная связь и заметки'
    ],
    forWhom: ['Путешественников', 'Гидов', 'Исследователей'],
    format: 'Выездные встречи и подготовка.',
    commitment: 'По расписанию поездок.'
  },
  {
    slug: 'yasna-shkola',
    angleDeg: 225,
    title: 'Школа',
    subtitle: 'Обучение и метод',
    tooltip: 'Ясна-Школа · Нажмите',
    tags: ['Обучение', 'Метод', 'Практикумы'],
    lead: 'Системное обучение методам Ясны и подготовка к работе в направлениях.',
    whatWeDo: [
      'Курсы и семинары',
      'Практикумы и встречи',
      'Учебные материалы',
      'Наставничество'
    ],
    forWhom: ['Слушателей', 'Наставников', 'Будущих участников'],
    format: 'Курсы и регулярные занятия.',
    commitment: '1–2 часа в неделю.'
  }
];

const clamp = (min: number, value: number, max: number) => Math.min(max, Math.max(min, value));

export function RadialMap() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState({ isMobile: false, isTablet: false });
  const [mapScale, setMapScale] = useState(1);
  const [desiredSize, setDesiredSize] = useState(560);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [demoSlug, setDemoSlug] = useState<string | null>(null);
  const [isDemoActive, setIsDemoActive] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [signalSlug, setSignalSlug] = useState<string | null>(null);
  const [signalNonce, setSignalNonce] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const registerInteraction = useCallback(() => {
    setLastInteraction(Date.now());
    setIsDemoActive(false);
    setDemoSlug(null);
  }, []);

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      setViewport({
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024
      });
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setPrefersReducedMotion(media.matches);
    updateMotion();
    if (media.addEventListener) {
      media.addEventListener('change', updateMotion);
      return () => media.removeEventListener('change', updateMotion);
    }
    media.addListener(updateMotion);
    return () => media.removeListener(updateMotion);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      const desired = clamp(420, window.innerHeight * 0.58, 640);
      const scale = Math.min(1, width / desired, height / desired);
      setDesiredSize(desired);
      setMapScale(scale);
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || activeSlug) return;

    let timeoutId: number | undefined;
    let clearId: number | undefined;
    const scheduleSignal = () => {
      const delay = 7000 + Math.random() * 3000;
      timeoutId = window.setTimeout(() => {
        const random = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
        if (random) {
          setSignalSlug(random.slug);
          setSignalNonce((prev) => prev + 1);
          clearId = window.setTimeout(() => setSignalSlug(null), 2200);
        }
        scheduleSignal();
      }, delay);
    };

    scheduleSignal();
    return () => {
      window.clearTimeout(timeoutId);
      window.clearTimeout(clearId);
    };
  }, [activeSlug, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || activeSlug || hoveredSlug) return;

    const idleTimeout = window.setTimeout(() => {
      setIsDemoActive(true);
    }, 4000);

    return () => window.clearTimeout(idleTimeout);
  }, [activeSlug, hoveredSlug, lastInteraction, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || !isDemoActive || activeSlug) return;

    let index = 0;
    const interval = window.setInterval(() => {
      setDemoSlug(DIRECTIONS[index % DIRECTIONS.length]?.slug ?? null);
      index += 1;
    }, 3000);

    return () => window.clearInterval(interval);
  }, [activeSlug, isDemoActive, prefersReducedMotion]);

  useEffect(() => {
    if (!prefersReducedMotion) return;
    setIsDemoActive(false);
    setDemoSlug(null);
    setSignalSlug(null);
  }, [prefersReducedMotion]);

  const radiusPercent = viewport.isMobile ? 30 : viewport.isTablet ? 32 : 34;
  const centerDiameter = desiredSize * 0.42;
  const outerDiameter = desiredSize * 0.15;
  const outerBorder = 2;
  const centerBorder = 3;

  const departmentMap = useMemo(
    () => new Map(departments.map((dept) => [dept.slug, dept])),
    []
  );

  const items = useMemo(() => {
    return DIRECTIONS.map((direction) => {
      const dept = departmentMap.get(direction.slug);
      const angleRad = (direction.angleDeg * Math.PI) / 180;
      const x = 50 + radiusPercent * Math.cos(angleRad);
      const y = 50 + radiusPercent * Math.sin(angleRad);

      return {
        ...direction,
        label: dept?.shortLabel ?? direction.title,
        icon: dept?.icon ?? '○',
        imageUrl: dept?.imageUrl,
        detailsUrl: dept?.detailsUrl ?? `/napravleniya/${direction.slug}`,
        modalData: {
          slug: direction.slug,
          title: direction.title,
          subtitle: direction.subtitle,
          tags: direction.tags,
          lead: direction.lead,
          whatWeDo: direction.whatWeDo,
          forWhom: direction.forWhom,
          format: direction.format,
          commitment: direction.commitment,
          examples: direction.examples,
          icon: dept?.icon ?? '○',
          imageUrl: dept?.imageUrl
        } as DirectionModalData,
        x,
        y
      };
    });
  }, [departmentMap, radiusPercent]);

  const activeItem = activeSlug ? items.find((item) => item.slug === activeSlug)?.modalData ?? null : null;
  const highlightSlug = activeSlug ?? hoveredSlug ?? (isDemoActive ? demoSlug : null);
  const signalItem = signalSlug ? items.find((item) => item.slug === signalSlug) ?? null : null;

  const mapStyle: CSSProperties = {
    width: `${desiredSize}px`,
    height: `${desiredSize}px`,
    transform: `translate(-50%, -50%) scale(${mapScale})`,
    transformOrigin: 'center'
  };

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="relative mx-auto w-[min(820px,90vw)] overflow-visible"
        style={{ height: 'min(62vh, 640px)', minHeight: '420px', maxWidth: '860px' }}
      >
        <div className="absolute left-1/2 top-1/2" style={mapStyle}>
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="signal-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C9A227" stopOpacity="0" />
                <stop offset="50%" stopColor="#C9A227" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#C9A227" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r={radiusPercent}
              fill="none"
              stroke="rgba(30, 58, 95, 0.12)"
              strokeWidth="1"
            />
            {items.map((item) => {
              const isActive = highlightSlug === item.slug;
              return (
                <g key={`line-${item.slug}`}>
                  <line
                    x1="50"
                    y1="50"
                    x2={item.x}
                    y2={item.y}
                    stroke={isActive ? 'rgba(201, 162, 39, 0.85)' : 'rgba(30, 58, 95, 0.22)'}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    style={{ strokeWidth: isActive ? 1.5 : 1 }}
                  />
                  <circle
                    cx={item.x}
                    cy={item.y}
                    r="0.6"
                    fill={isActive ? 'rgba(201, 162, 39, 0.9)' : 'rgba(30, 58, 95, 0.35)'}
                  />
                </g>
              );
            })}
            {signalItem && !prefersReducedMotion && (
              <line
                key={`signal-${signalItem.slug}-${signalNonce}`}
                x1="50"
                y1="50"
                x2={signalItem.x}
                y2={signalItem.y}
                stroke="url(#signal-gradient)"
                strokeWidth="1"
                strokeLinecap="round"
                pathLength="100"
                className="animate-signal-sweep"
              />
            )}
          </svg>

          {items.map((item, index) => {
            const isActive = activeSlug === item.slug;
            const isHovered = hoveredSlug === item.slug && !activeSlug;
            const isDemo = !activeSlug && isDemoActive && demoSlug === item.slug;
            const isDimmed = Boolean(activeSlug) && !isActive;
            const floatOffset = -(3 + (index % 3));
            const floatDuration = 8 + (index % 5);
            const floatDelay = index * 0.4;
            const floatStyle: CSSProperties = {
              '--float-y': `${floatOffset}px`,
              '--float-duration': `${floatDuration}s`,
              animationDelay: `${floatDelay}s`
            };
            const buttonTransform = isActive
              ? 'scale(1.08)'
              : isHovered
                ? 'translateY(-4px) scale(1.05)'
                : isDemo
                  ? 'scale(1.02)'
                  : 'scale(1)';

            return (
              <div
                key={item.slug}
                className="absolute overflow-visible"
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div
                  className={`${prefersReducedMotion ? '' : 'animate-float-premium motion-reduce:animate-none'} relative`}
                  style={prefersReducedMotion ? undefined : floatStyle}
                >
                  <button
                    type="button"
                    onPointerDown={registerInteraction}
                    onMouseEnter={() => {
                      registerInteraction();
                      setHoveredSlug(item.slug);
                    }}
                    onMouseLeave={() => setHoveredSlug(null)}
                    onFocus={() => {
                      registerInteraction();
                      setHoveredSlug(item.slug);
                    }}
                    onBlur={() => setHoveredSlug(null)}
                    onClick={() => {
                      registerInteraction();
                      setHoveredSlug(null);
                      setActiveSlug(item.slug);
                    }}
                    className={`group relative flex items-center justify-center rounded-full border bg-white shadow-sm transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yasna-accent ${
                      isDimmed ? 'opacity-55' : 'opacity-100'
                    } ${isActive ? 'border-yasna-accent shadow-md' : 'border-yasna-primary'} ${
                      isHovered ? 'shadow-md' : ''
                    }`}
                    style={{
                      width: `${outerDiameter}px`,
                      height: `${outerDiameter}px`,
                      borderWidth: `${outerBorder}px`,
                      transform: buttonTransform
                    }}
                  >
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.label}
                        className="max-h-[70%] max-w-[70%] object-contain"
                      />
                    ) : (
                      <span className="text-yasna-primary" style={{ fontSize: 'clamp(22px, 4vw, 38px)' }}>
                        {item.icon}
                      </span>
                    )}
                    <span className="sr-only">{item.title}</span>
                  </button>
                  <div
                    className={`absolute left-1/2 hidden -translate-x-1/2 rounded-full bg-white px-3 py-1 text-xs text-yasna-primary shadow-md transition-opacity duration-200 sm:block ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ top: '-42px' }}
                  >
                    {item.tooltip}
                  </div>
                  <span
                    className="absolute left-1/2 top-full hidden max-w-[140px] -translate-x-1/2 text-center text-yasna-textPrimary sm:block"
                    style={{
                      marginTop: 'clamp(10px, 1.6vw, 12px)',
                      fontSize: 'clamp(12px, 1.2vw, 14px)',
                      lineHeight: '1.3',
                      textWrap: 'balance'
                    } as CSSProperties}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}

          <div
            className={`absolute left-1/2 top-1/2 flex items-center justify-center rounded-full border bg-white shadow-md ${
              prefersReducedMotion ? '' : 'animate-center-breathe motion-reduce:animate-none'
            }`}
            style={{
              width: `${centerDiameter}px`,
              height: `${centerDiameter}px`,
              borderWidth: `${centerBorder}px`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <span className="font-serif text-yasna-primary tracking-[0.08em]" style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}>
              Ясна
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 sm:hidden">
        <ul className="grid grid-cols-2 gap-3 text-sm text-yasna-textPrimary">
          {items.map((item) => (
            <li key={`mobile-${item.slug}`}>
              <button
                type="button"
                onClick={() => {
                  registerInteraction();
                  setActiveSlug(item.slug);
                }}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-left shadow-sm"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <DirectionModal
        direction={activeItem}
        isOpen={Boolean(activeItem)}
        isMobile={viewport.isMobile}
        onClose={() => {
          setActiveSlug(null);
          setHoveredSlug(null);
        }}
        onDetails={(slug) => navigate(`/napravleniya/${slug}`)}
        onJoin={(slug) => navigate(`/?department=${slug}#join`)}
      />
    </div>
  );
}
