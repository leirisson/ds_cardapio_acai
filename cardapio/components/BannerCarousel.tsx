"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

type Banner = {
  src: string;
  alt: string;
  objectPosition?: string;
};

type BannerCarouselProps = {
  banners: Banner[];
  intervalMs?: number;
};

export function BannerCarousel({ banners, intervalMs = 6000 }: BannerCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % banners.length) + banners.length) % banners.length);
    },
    [banners.length]
  );

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (banners.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % banners.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [banners.length, intervalMs, isPaused]);

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  if (banners.length === 0) return null;

  return (
    <div
      className="group relative mb-8 aspect-3/2 w-full overflow-hidden rounded-2xl shadow-[0px_8px_28px_rgba(50,7,41,0.15)] sm:aspect-16/9 md:aspect-21/9"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {banners.map((banner, i) => (
        <div
          key={banner.src}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === index ? 1 : 0, pointerEvents: i === index ? "auto" : "none" }}
          aria-hidden={i !== index}
        >
          <Image
            src={banner.src}
            alt={banner.alt}
            fill
            priority={i === 0}
            className="object-cover"
            style={{ objectPosition: banner.objectPosition ?? "center" }}
            sizes="(max-width: 768px) 100vw, 900px"
          />
        </div>
      ))}

      {banners.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Banner anterior"
            className="absolute top-1/2 left-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-surface-container-lowest/80 text-primary opacity-0 shadow-md backdrop-blur-sm transition-opacity group-hover:opacity-100 focus-visible:opacity-100 sm:h-9 sm:w-9"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Próximo banner"
            className="absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-surface-container-lowest/80 text-primary opacity-0 shadow-md backdrop-blur-sm transition-opacity group-hover:opacity-100 focus-visible:opacity-100 sm:h-9 sm:w-9"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div className="absolute right-0 bottom-3 left-0 flex items-center justify-center gap-2">
            {banners.map((banner, i) => (
              <button
                key={banner.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ir para banner ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-surface-container-lowest" : "w-1.5 bg-surface-container-lowest/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
