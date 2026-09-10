"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/content/projects";

type LightboxProps = {
  project: Project | null;
  onClose: () => void;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const ICON_BUTTON =
  "flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink hover:text-on-accent focus-visible:bg-ink focus-visible:text-on-accent focus-visible:outline-none";

export default function Lightbox({ project, onClose }: LightboxProps) {
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const count = project?.images.length ?? 0;

  const go = useCallback(
    (delta: number) => {
      setIndex((current) => (current + delta + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (!project) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        go(-1);
        return;
      }
      if (event.key === "ArrowRight") {
        go(1);
        return;
      }
      if (event.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          FOCUSABLE,
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [project, go, onClose]);

  if (!project) return null;

  const counter = `${String(index + 1).padStart(2, "0")} / ${String(
    count,
  ).padStart(2, "0")}`;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} — project photos`}
      tabIndex={-1}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null || count < 2) return;
        const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
        if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
        touchStartX.current = null;
      }}
      className="fixed inset-0 z-[600] flex flex-col bg-[oklch(9%_0.006_75/0.97)] text-ink outline-none"
    >
      <div className="flex items-start justify-between gap-4 px-6 py-5 md:px-12 md:py-7">
        <h2 className="font-display text-xl md:text-2xl">{project.name}</h2>
        <div className="flex shrink-0 items-center gap-5 md:gap-6">
          <span
            aria-live="polite"
            className="text-[13px] tracking-[0.04em] text-muted tabular-nums"
          >
            {counter}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className={ICON_BUTTON}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 5 L19 19 M19 5 L5 19"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center gap-2 px-3 md:gap-7 md:px-12">
        {count > 1 && (
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className={`${ICON_BUTTON} shrink-0`}
          >
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="11.5" stroke="currentColor" strokeOpacity="0.25" />
              <path
                d="M14 7 L9 12 L14 17"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        <div className="relative aspect-[4/3] max-h-[68vh] w-full max-w-[920px] min-w-0 overflow-hidden rounded-[2px] bg-black/20 md:aspect-[16/10] md:max-w-[62vw]">
          {project.images.map((image, i) => {
            if (Math.abs(i - index) > 1) return null;
            return (
              <Image
                key={image.src}
                src={image.src}
                alt={`${project.name}, photo ${i + 1} of ${count}`}
                fill
                sizes="(min-width: 768px) 62vw, 92vw"
                priority={i === index}
                className={`object-contain transition-opacity duration-200 ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              />
            );
          })}
        </div>

        {count > 1 && (
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next photo"
            className={`${ICON_BUTTON} shrink-0`}
          >
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="11.5" stroke="currentColor" strokeOpacity="0.25" />
              <path
                d="M10 7 L15 12 L10 17"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      {count > 1 && (
        <div className="flex flex-wrap justify-center gap-1 px-6 pt-9 pb-8">
          {project.images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to photo ${i + 1}`}
              aria-current={i === index}
              className="flex h-11 w-6 items-center justify-center focus-visible:outline-none focus-visible:[&>span]:scale-150 focus-visible:[&>span]:bg-white/60"
            >
              <span
                className={`block h-2.5 w-2.5 rounded-full transition-transform ${
                  i === index ? "bg-accent" : "bg-white/20"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
