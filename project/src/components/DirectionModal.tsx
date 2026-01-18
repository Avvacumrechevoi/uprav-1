import { useEffect, useRef, useState } from 'react';

export type DirectionModalData = {
  slug: string;
  title: string;
  subtitle: string;
  tags: string[];
  lead: string;
  whatWeDo: string[];
  forWhom: string[];
  format: string;
  commitment: string;
  examples?: { label: string; url: string }[];
  icon?: string;
  imageUrl?: string;
};

type DirectionModalProps = {
  direction: DirectionModalData | null;
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
  onDetails: (slug: string) => void;
  onJoin: (slug: string) => void;
};

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(',');

export function DirectionModal({
  direction,
  isOpen,
  isMobile,
  onClose,
  onDetails,
  onJoin
}: DirectionModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
      const timer = window.setTimeout(() => setIsMounted(false), 240);
      return () => window.clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusables = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector));
    (focusables[0] ?? dialog).focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusables = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isMounted || !direction) return null;

  const headerId = `direction-title-${direction.slug}`;
  const subtitleId = `direction-subtitle-${direction.slug}`;

  return (
    <div
      className={`fixed inset-0 z-50 flex ${isMobile ? 'items-end' : 'items-center'} justify-center ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-200`}
      aria-hidden={!isVisible}
    >
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headerId}
        aria-describedby={subtitleId}
        tabIndex={-1}
        className={`relative mx-auto flex w-full flex-col overflow-hidden bg-white shadow-xl ${
          isMobile
            ? `max-h-[90vh] rounded-t-3xl transition-transform duration-200 ${isVisible ? 'translate-y-0' : 'translate-y-6'}`
            : `max-h-[85vh] max-w-4xl rounded-2xl transition-transform duration-200 ${isVisible ? 'translate-y-0' : 'translate-y-4'}`
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-6 border-b border-gray-100 px-6 py-5">
          <div className="flex flex-wrap gap-2">
            {direction.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600 hover:border-gray-300 hover:text-gray-900"
          >
            Закрыть
          </button>
        </div>

        <div className="flex items-start justify-between gap-6 px-6 pt-5">
          <div>
            <h3 id={headerId} className="text-2xl font-semibold text-gray-900">
              {direction.title}
            </h3>
            <p id={subtitleId} className="text-sm text-gray-600 mt-1">
              {direction.subtitle}
            </p>
          </div>
          <div className="hidden h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-sm font-semibold text-gray-500 sm:flex">
            {direction.imageUrl ? (
              <img src={direction.imageUrl} alt="" className="h-7 w-7 object-contain" />
            ) : (
              <span className="text-lg text-yasna-primary">{direction.icon ?? direction.title.slice(0, 1)}</span>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-4">
          <p className="text-sm leading-relaxed text-gray-700">
            {direction.lead}
          </p>

          <div className="mt-6 grid gap-6">
            <section>
              <h4 className="text-sm font-semibold text-gray-900">Что мы делаем</h4>
              <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 space-y-2">
                {direction.whatWeDo.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h4 className="text-sm font-semibold text-gray-900">Кому подойдёт</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {direction.forWhom.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h4 className="text-sm font-semibold text-gray-900">Как участвовать</h4>
              <p className="mt-3 text-sm text-gray-700">{direction.format}</p>
              <p className="mt-2 text-sm text-gray-700">{direction.commitment}</p>
            </section>

            {direction.examples && direction.examples.length > 0 && (
              <section>
                <h4 className="text-sm font-semibold text-gray-900">Примеры</h4>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {direction.examples.map((example) => (
                    <li key={example.url}>
                      <a
                        href={example.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yasna-primary hover:text-yasna-accent underline"
                      >
                        {example.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 flex items-center justify-between gap-4 border-t border-gray-100 bg-white/95 px-6 py-4 backdrop-blur">
          <p className="hidden text-xs text-gray-500 sm:block">
            Обычно отвечаем в течение 2–3 дней
          </p>
          <div className="ml-auto flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onDetails(direction.slug)}
              className="rounded-full border border-gray-200 px-4 py-2 text-xs text-gray-700 transition-colors hover:border-gray-300 hover:text-gray-900"
            >
              Читать подробнее
            </button>
            <button
              type="button"
              onClick={() => onJoin(direction.slug)}
              className="rounded-full bg-yasna-primary px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-yasna-accent"
            >
              Хочу присоединиться
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
