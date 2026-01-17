import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { departments } from '../data';

type RadialItemConfig = {
  slug: string;
  angleDeg: number;
};

const RADIAL_ITEMS: RadialItemConfig[] = [
  { slug: 'neglinka', angleDeg: -90 },
  { slug: 'izvod', angleDeg: -45 },
  { slug: 'litprosvet', angleDeg: 0 },
  { slug: 'astronevod', angleDeg: 45 },
  { slug: 'jiva', angleDeg: 90 },
  { slug: 'prazdniki', angleDeg: 135 },
  { slug: 'yasnye-marshruty', angleDeg: 180 },
  { slug: 'yasna-shkola', angleDeg: 225 }
];

export function RadialMap() {
  const navigate = useNavigate();
  const [viewport, setViewport] = useState({ isMobile: false, isTablet: false });
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [demoKey, setDemoKey] = useState<string | null>(null);
  const [isDemoActive, setIsDemoActive] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(() => Date.now());
  const [signalKey, setSignalKey] = useState<string | null>(null);
  const [signalNonce, setSignalNonce] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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

  const radiusPercent = viewport.isMobile ? 42 : viewport.isTablet ? 45 : 48;
  const outerSize = 'clamp(72px, 9vw, 92px)';
  const outerBorder = 'clamp(1px, 0.2vw, 2px)';
  const centerSize = 'clamp(200px, 22vw, 300px)';
  const centerBorder = 'clamp(2px, 0.35vw, 3px)';
  const baseLineColor = 'rgba(30, 58, 95, 0.2)';
  const activeLineColor = 'rgba(201, 162, 39, 0.8)';

  const itemBySlug = useMemo(() => new Map(departments.map((dept) => [dept.slug, dept])), []);

  type PositionedItem = {
    key: string;
    label: string;
    icon: string;
    imageUrl?: string;
    href: string;
    description: string;
    formats: string;
    x: number;
    y: number;
  };

  const positionedItems = useMemo(() => {
    return RADIAL_ITEMS.map((config) => {
      const dept = itemBySlug.get(config.slug);
      if (!dept) return null;

      const angleRad = (config.angleDeg * Math.PI) / 180;
      const x = 50 + radiusPercent * Math.cos(angleRad);
      const y = 50 + radiusPercent * Math.sin(angleRad);

      return {
        key: dept.slug,
        label: dept.shortLabel || dept.name,
        icon: dept.icon,
        imageUrl: dept.imageUrl,
        href: dept.detailsUrl,
        description: dept.shortDescription,
        formats: dept.formats,
        x,
        y
      };
    }).filter((item): item is PositionedItem => Boolean(item));
  }, [itemBySlug, radiusPercent]);

  const mobileListItems = positionedItems.map((item) => ({
    key: item.key,
    label: item.label,
    href: item.href
  }));

  const activeItem = activeKey
    ? positionedItems.find((item) => item.key === activeKey) ?? null
    : null;
  const signalItem = signalKey
    ? positionedItems.find((item) => item.key === signalKey) ?? null
    : null;

  const highlightedKey = activeKey ?? hoveredKey ?? (isDemoActive ? demoKey : null);

  const registerInteraction = () => {
    setLastInteraction(Date.now());
    setIsDemoActive(false);
    setDemoKey(null);
  };

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (activeKey) return;

    let timeoutId: number | undefined;
    let clearId: number | undefined;

    const scheduleSignal = () => {
      const delay = 6000 + Math.random() * 3000;
      timeoutId = window.setTimeout(() => {
        if (positionedItems.length === 0) return;
        const randomItem = positionedItems[Math.floor(Math.random() * positionedItems.length)];
        if (!randomItem) return;
        setSignalKey(randomItem.key);
        setSignalNonce((prev) => prev + 1);
        clearId = window.setTimeout(() => setSignalKey(null), 2200);
        scheduleSignal();
      }, delay);
    };

    scheduleSignal();
    return () => {
      window.clearTimeout(timeoutId);
      window.clearTimeout(clearId);
    };
  }, [activeKey, positionedItems, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (activeKey || hoveredKey) return;

    const idleTimeout = window.setTimeout(() => {
      setIsDemoActive(true);
    }, 4000);

    return () => window.clearTimeout(idleTimeout);
  }, [activeKey, hoveredKey, lastInteraction, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!isDemoActive) return;
    if (activeKey) return;

    if (positionedItems.length > 0) {
      setDemoKey(positionedItems[0].key);
    }

    let index = 1;
    const interval = window.setInterval(() => {
      if (positionedItems.length === 0) return;
      const item = positionedItems[index % positionedItems.length];
      if (item) {
        setDemoKey(item.key);
      }
      index += 1;
    }, 3000);

    return () => window.clearInterval(interval);
  }, [activeKey, isDemoActive, positionedItems, prefersReducedMotion]);

  useEffect(() => {
    if (!prefersReducedMotion) return;
    setIsDemoActive(false);
    setDemoKey(null);
    setSignalKey(null);
  }, [prefersReducedMotion]);

  return (
    <div className="w-full">
      <div
        className="relative mx-auto aspect-square overflow-visible"
        style={{ width: 'min(820px, 90vw)' }}
      >
        <svg
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
        {positionedItems.map((item) => {
            const isActive = highlightedKey === item.key;

            return (
              <line
                key={`line-${item.key}`}
                x1="50"
                y1="50"
                x2={item.x}
                y2={item.y}
                stroke={isActive ? activeLineColor : baseLineColor}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{ strokeWidth: '1px', strokeOpacity: isActive ? 0.85 : 0.25 }}
              />
            );
          })}
          {!prefersReducedMotion && signalItem && (
            <circle
              key={`signal-${signalItem.key}-${signalNonce}`}
              r="0.8"
              fill="#C9A227"
              opacity="0"
              className="animate-signal-pulse"
            >
              <animateMotion
                dur="2.6s"
                repeatCount="1"
                path={`M50 50 L ${signalItem.x} ${signalItem.y}`}
                keyTimes="0;1"
                calcMode="linear"
              />
              <animate
                attributeName="opacity"
                values="0;0.9;0"
                dur="2.6s"
                repeatCount="1"
              />
            </circle>
          )}
        </svg>

        {positionedItems.map((item, index) => {
          const floatOffset = -(3 + (index % 4));
          const floatDuration = 7 + (index % 6);
          const floatDelay = index * 0.4;
          const floatStyle = {
            '--float-y': `${floatOffset}px`,
            '--float-duration': `${floatDuration}s`,
            animationDelay: `${floatDelay}s`
          } as CSSProperties;

          const isActive = activeKey === item.key;
          const isHovered = hoveredKey === item.key && !activeKey;
          const isDemo = !activeKey && !hoveredKey && isDemoActive && demoKey === item.key;
          const isDimmed = Boolean(activeKey) && !isActive;

          const transformClass = isDimmed
            ? 'scale-[0.96]'
            : isActive
              ? 'scale-[1.08]'
              : isHovered
                ? 'scale-[1.05] -translate-y-1'
                : isDemo
                  ? 'scale-[1.02]'
                  : '';

          return (
          <div
            key={item.key}
            className="absolute overflow-visible"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div
              className={`relative ${prefersReducedMotion ? '' : 'animate-float-soft'}`}
              style={prefersReducedMotion ? undefined : floatStyle}
            >
              <button
                type="button"
                onClick={() => {
                  registerInteraction();
                  setActiveKey(item.key);
                }}
                onMouseEnter={() => {
                  registerInteraction();
                  setHoveredKey(item.key);
                }}
                onMouseLeave={() => setHoveredKey(null)}
                onFocus={() => {
                  registerInteraction();
                  setHoveredKey(item.key);
                  setActiveKey(item.key);
                }}
                onBlur={() => setHoveredKey(null)}
                aria-pressed={isActive}
                className={`group relative flex items-center justify-center rounded-full border bg-white/90 shadow-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yasna-accent ${transformClass} ${isDimmed ? 'opacity-50' : 'opacity-100'} ${isActive ? 'border-yasna-accent shadow-md' : 'border-yasna-primary'} ${isHovered ? 'shadow-md' : ''}`}
                style={{
                  width: outerSize,
                  height: outerSize,
                  borderWidth: outerBorder
                }}
              >
                {item?.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.label}
                    className="max-h-[70%] max-w-[70%] object-contain"
                  />
                ) : (
                  <span
                    className="leading-none text-yasna-primary"
                    style={{ fontSize: 'clamp(24px, 4vw, 40px)' }}
                  >
                    {item.icon}
                  </span>
                )}
                <span className="sr-only">{item.label}</span>
              </button>
              <span
                className="absolute left-1/2 top-full hidden max-w-[140px] -translate-x-1/2 text-center text-yasna-textPrimary sm:block"
                style={{
                  marginTop: 'clamp(10px, 1.6vw, 14px)',
                  fontSize: 'clamp(12px, 1.6vw, 14px)',
                  lineHeight: '1.2',
                  textWrap: 'balance'
                } as CSSProperties}
              >
                {item.label}
              </span>
              <div
                className={`pointer-events-none absolute -top-12 left-1/2 hidden -translate-x-1/2 rounded-full bg-white px-3 py-1 text-xs text-yasna-primary shadow-md sm:block ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
              >
                {item.label} · Нажмите
              </div>
            </div>
          </div>
        );
        })}

        <div
          className="absolute left-1/2 top-1/2"
          style={{
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div
            className={`flex h-full w-full items-center justify-center rounded-full border border-yasna-primary bg-yasna-warmBg shadow-md ${prefersReducedMotion || activeKey ? '' : 'animate-center-breathe'} motion-reduce:animate-none`}
            style={{
              width: centerSize,
              height: centerSize,
              borderWidth: centerBorder
            }}
          >
            {!activeItem ? (
              <span
                className="font-serif text-yasna-primary leading-none tracking-[0.06em]"
                style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}
              >
                Ясна
              </span>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center">
                <h3 className="text-base font-semibold text-yasna-primary" style={{ fontSize: 'clamp(14px, 1.8vw, 18px)' }}>
                  {activeItem.label}
                </h3>
                <p className="text-xs text-yasna-textMuted" style={{ fontSize: 'clamp(12px, 1.4vw, 14px)', lineHeight: '1.4' }}>
                  {activeItem.description}
                </p>
                <p className="text-[11px] text-yasna-textMuted" style={{ fontSize: 'clamp(11px, 1.2vw, 13px)' }}>
                  {activeItem.formats}
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      registerInteraction();
                      setActiveKey(null);
                    }}
                    className="rounded-full border border-gray-200 px-4 py-2 text-xs text-gray-600 transition-colors hover:border-gray-300 hover:text-gray-800"
                  >
                    Назад
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      registerInteraction();
                      navigate(`/?department=${activeItem.key}#join`);
                    }}
                    className="rounded-full bg-yasna-primary px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-yasna-accent"
                  >
                    Оставить заявку
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 sm:hidden">
        <ul className="grid grid-cols-2 gap-3 text-sm text-yasna-textPrimary">
          {mobileListItems.map((item) => (
            <li key={`mobile-${item.key}`}>
              <button
                type="button"
                onClick={() => {
                  registerInteraction();
                  setActiveKey(item.key);
                }}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-left shadow-yasna"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
