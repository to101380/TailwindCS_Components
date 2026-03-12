"use client";

import Image, { type StaticImageData } from "next/image";
import { useMemo, useState, useRef } from "react";
import aa from "../images/slide-1.jpg"
import bb from "../images/slide-2.jpg"
import cc from "../images/slide-3.jpg"

type Slide = {
    id: number;
    title?: string;
    description?: string;
    image: StaticImageData;
};

const slides: Slide[] = [
    {
        id: 1,
        title: "熱鍛造鋁合金屬一體成型設計，打造卓絕實力。",
        image: aa,
    },
    {
        id: 2,
        title: "A19 Pro 採用蒸發冷卻技術，效能表現快如閃電。",
        image: bb
    },
    {
        id: 3,
        title: "Apple Intelligence，從影像創作到即時翻譯。",
        image: cc
    },
];

export default function PeekCarousel() {
    const [current, setCurrent] = useState(0);
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const total = slides.length;
    const canPrev = current > 0;
    const canNext = current < total - 1;

    const goTo = (index: number) => {
        if (index < 0 || index > total - 1) return;
        setCurrent(index);
    };

    const goPrev = () => {
        if (canPrev) setCurrent((prev) => prev - 1);
    };

    const goNext = () => {
        if (canNext) setCurrent((prev) => prev + 1);
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        touchStartX.current = e.touches[0].clientX;
        touchEndX.current = null;
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current === null || touchEndX.current === null) return;

        const delta = touchStartX.current - touchEndX.current;

        if (delta > 50) {
            goNext();
        } else if (delta < -50) {
            goPrev();
        }

        touchStartX.current = null;
        touchEndX.current = null;
    };

    const translateX = useMemo(() => {
        return `calc(50% - (var(--slide-w) / 2) - ${current} * (var(--slide-w) + var(--gap)))`;
    }, [current]);

    return (
        <section className="w-full bg-[#1c1c21] py-10 md:py-16">
            <div className="mx-auto w-full max-w-[1920px]">
                <div
                    className="relative overflow-hidden"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={
                        {
                            "--slide-w": "86vw",
                            "--slide-h": "96vw",
                            "--gap": "14px",
                        } as React.CSSProperties
                    }
                >
                    <style jsx>{`
              @media (min-width: 768px) {
                div[data-carousel="track-wrap"] {
                  --slide-w: min(72vw, 1180px);
                  --slide-h: min(40vw, 660px);
                  --gap: 20px;
                }
              }
            `}</style>

                    <div data-carousel="track-wrap">
                        <div
                            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                            style={{
                                gap: "var(--gap)",
                                transform: `translateX(${translateX})`,
                            }}
                        >
                            {slides.map((slide, index) => {
                                const isActive = index === current;

                                return (
                                    <article
                                        key={slide.id}
                                        className="relative shrink-0 overflow-hidden rounded-[30px] bg-black md:rounded-[34px]"
                                        style={{
                                            width: "var(--slide-w)",
                                            height: "var(--slide-h)",
                                        }}
                                    >
                                        <Image
                                            src={slide.image}
                                            alt={slide.title || `slide-${slide.id}`}
                                            fill
                                            priority={index === 0}
                                            className={`object-cover transition-all duration-700 ${isActive
                                                    ? "scale-100 opacity-100"
                                                    : "scale-[0.96] opacity-70"
                                                }`}
                                        />

                                        {!isActive && (
                                            <div className="absolute inset-0 bg-black/30" />
                                        )}

                                        <div className="absolute inset-0 bg-gradient-to-b from-black/12 via-transparent to-black/20" />

                                        {slide.title && (
                                            <div className="absolute inset-x-0 top-6 z-10 px-5 text-center md:top-10 md:px-10">
                                                <h3 className="mx-auto max-w-3xl text-[20px] font-semibold leading-snug text-white md:text-4xl">
                                                    {slide.title}
                                                </h3>

                                                {slide.description && (
                                                    <p className="mx-auto mt-3 max-w-2xl text-sm text-white/80 md:text-base">
                                                        {slide.description}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-4 md:mt-10">
                    <div className="flex items-center gap-3 rounded-full bg-white/5 px-5 py-4 backdrop-blur-md md:px-6">
                        {slides.map((_, index) => {
                            const active = index === current;

                            return (
                                <button
                                    key={index}
                                    type="button"
                                    aria-label={`前往第 ${index + 1} 張`}
                                    onClick={() => goTo(index)}
                                    className={`h-2.5 cursor-pointer rounded-full transition-all duration-500 ${active
                                            ? "w-9 bg-white"
                                            : "w-2.5 bg-white/65 hover:bg-white/90"
                                        }`}
                                />
                            );
                        })}
                    </div>

                  
                </div>
            </div>
        </section>
    );
}