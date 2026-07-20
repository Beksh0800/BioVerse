"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { presentationDeck } from "@/content/portfolio";

/**
 * Листалка слайдов защиты.
 *
 * Заменила постер видео с кнопкой «play», которая ничего не воспроизводила:
 * на защите жюри нажимает такую кнопку первой, и заглушка сразу выдаёт себя.
 * Здесь листается по-настоящему, а содержимое — то же, что было бы в
 * презентации.
 */
export function SlideDeck() {
  const [index, setIndex] = useState(0);
  // Направление нужно анимации: назад слайд должен уезжать в другую сторону.
  const [direction, setDirection] = useState(1);
  const slide = presentationDeck[index];

  function go(step: number) {
    setDirection(step);
    setIndex((prev) => {
      const next = prev + step;
      if (next < 0) return presentationDeck.length - 1;
      if (next >= presentationDeck.length) return 0;
      return next;
    });
  }

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl bg-navy-900 px-6 py-8 text-white sm:px-10 sm:py-10">
        {/* Высота фиксирована, иначе карточка прыгает от длины текста слайда. */}
        <div className="flex min-h-[190px] flex-col justify-center sm:min-h-[170px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ opacity: 0, x: direction * 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -28 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <p className="text-xs font-semibold tracking-[0.18em] text-navy-100 uppercase">
                Слайд {index + 1} / {presentationDeck.length}
              </p>
              <h3 className="mt-3 text-xl font-bold sm:text-2xl">{slide.title}</h3>
              <p className="mt-3 max-w-2xl leading-relaxed text-navy-100">
                {slide.body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Алдыңғы слайд"
          className="flex size-10 items-center justify-center rounded-full text-brand ring-1 ring-hairline transition hover:bg-navy-50"
        >
          <ChevronLeft className="size-5" />
        </button>

        {/* Точки — и индикатор, и быстрый переход к нужному слайду. */}
        <div className="flex items-center gap-2">
          {presentationDeck.map((item, i) => (
            <button
              key={item.title}
              type="button"
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              aria-label={`${i + 1}-слайд: ${item.title}`}
              aria-current={i === index}
              className={
                i === index
                  ? "h-2 w-7 rounded-full bg-brand transition-all"
                  : "size-2 rounded-full bg-slate-300 transition-all hover:bg-slate-400"
              }
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Келесі слайд"
          className="flex size-10 items-center justify-center rounded-full text-brand ring-1 ring-hairline transition hover:bg-navy-50"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
