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

  const radiusPercent = viewport.isMobile ? 42 : viewport.isTablet ? 44 : 48;
  const outerSize = 'clamp(70px, 9vw, 92px)';
  const outerBorder = 'clamp(1px, 0.2vw, 2px)';
  const centerSize = 'clamp(200px, 22vw, 300px)';
  const centerBorder = 'clamp(2px, 0.35vw, 3px)';
  const baseLineColor = 'rgba(30, 58, 95, 0.2)';
  const activeLineColor = 'rgba(201, 162, 39, 0.8)';

  const itemBySlug = useMemo(() => new Map(departments.map((dept) => [dept.slug, dept])), []);

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
        x,
        y
      };
    }).filter(Boolean);
  }, [itemBySlug, radiusPercent]);

  const mobileListItems = positionedItems as Array<{
    key: string;
    label: string;
    href: string;
  }>;

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
            const isActive = hoveredKey === item?.key;

            return (
              <line
                key={`line-${item?.key}`}
                x1="50"
                y1="50"
                x2={item?.x}
                y2={item?.y}
                stroke={isActive ? activeLineColor : baseLineColor}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{ strokeWidth: '1px', strokeOpacity: isActive ? 1 : 0.6 }}
              />
            );
          })}
        </svg>

        {positionedItems.map((item, index) => {
          const floatOffset = -(3 + (index % 4));
          const floatDuration = 7 + (index % 4);
          const floatDelay = index * 0.35;
          const floatStyle = {
            '--float-y': `${floatOffset}px`,
            '--float-duration': `${floatDuration}s`,
            animationDelay: `${floatDelay}s`
          } as CSSProperties;

          return (
          <div
            key={item?.key}
            className="absolute overflow-visible"
            style={{
              left: `${item?.x}%`,
              top: `${item?.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div
              className="relative animate-float-soft motion-reduce:animate-none"
              style={floatStyle}
            >
              <button
                type="button"
                onClick={() => item?.href && navigate(item.href)}
                onMouseEnter={() => setHoveredKey(item?.key ?? null)}
                onMouseLeave={() => setHoveredKey(null)}
                onFocus={() => setHoveredKey(item?.key ?? null)}
                onBlur={() => setHoveredKey(null)}
                className="group relative flex items-center justify-center rounded-full border border-yasna-primary bg-white shadow-sm transition-transform duration-300 hover:scale-[1.05] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yasna-accent"
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
                    {item?.icon}
                  </span>
                )}
                <span className="sr-only">{item?.label}</span>
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
                {item?.label}
              </span>
            </div>
          </div>
        );
        })}

        <div
          className="absolute left-1/2 top-1/2 flex items-center justify-center rounded-full border border-yasna-primary bg-white shadow-md"
          style={{
            width: centerSize,
            height: centerSize,
            borderWidth: centerBorder,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <span
            className="font-serif text-yasna-primary leading-none tracking-[0.04em]"
            style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}
          >
            Ясна
          </span>
        </div>
      </div>

      <div className="mt-6 sm:hidden">
        <ul className="grid grid-cols-2 gap-3 text-sm text-yasna-textPrimary">
          {mobileListItems.map((item) => (
            <li key={`mobile-${item.key}`}>
              <button
                type="button"
                onClick={() => navigate(item.href)}
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
