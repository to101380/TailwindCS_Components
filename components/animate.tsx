"use client"   

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Sparkles, Layers3, PanelTop, MousePointer2 } from "lucide-react";

function SectionTitle({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-white/50">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-white/65 md:text-base">{desc}</p>
    </div>
  );
}

function FadeUpCard({ title, desc, index }: { title: string; desc: string; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: false, amount: 0.35 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.15, y: 30 }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur"
    >
      <div className="mb-4 inline-flex rounded-2xl bg-white/10 p-3 text-white/80">
        <Sparkles className="h-5 w-5" />
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/65">{desc}</p>
    </motion.div>
  );
}

function HorizontalGallery() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-58%"]);

  const cards = [
    "Peek Carousel",
    "Sticky Control",
    "Scale on Scroll",
    "Masked Reveal",
    "Pinned Story",
  ];

  return (
    <section ref={wrapRef} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_38%)]" />
        <motion.div style={{ x }} className="flex gap-6 px-[10vw]">
          {cards.map((item, i) => (
            <div
              key={item}
              className="flex h-[60vh] w-[72vw] shrink-0 items-end overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/[0.02] p-8 md:w-[44vw]"
            >
              <div>
                <div className="mb-5 inline-flex rounded-2xl bg-white/10 p-3 text-white/80">
                  <Layers3 className="h-5 w-5" />
                </div>
                <p className="text-sm uppercase tracking-[0.28em] text-white/45">Example {String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-3xl font-semibold text-white md:text-5xl">{item}</h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-white/65 md:text-base">
                  這種效果很適合做產品敘事。頁面往下，內容卻像在左右滑，視覺會很有 Apple 官網那種段落推進感。
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ScaleHero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0.15, 0.6], [0.82, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.7], [0.25, 1, 1]);
  const y = useTransform(scrollYProgress, [0.1, 0.6], [70, 0]);

  return (
    <section ref={ref} className="relative px-5 py-24 md:px-10 md:py-36">
      <SectionTitle
        eyebrow="SCROLL SCALE"
        title="卡片一邊進場，一邊放大"
        desc="這是很常見也很好看的做法。當使用者往下滑時，主卡會從比較遠、比較淡的狀態慢慢走到舞台中央。"
      />
      <motion.div
        style={{ scale, opacity, y }}
        className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b10] md:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="p-8 md:p-14">
          <div className="mb-5 inline-flex rounded-2xl bg-white/10 p-3 text-white/80">
            <PanelTop className="h-5 w-5" />
          </div>
          <h3 className="text-3xl font-semibold text-white md:text-5xl">Scroll-driven hero block</h3>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/65 md:text-base">
            很適合放重點賣點、影片封面、產品主視覺。你之前那種輪播區塊前面，超適合先來一個這種大卡片過場。
          </p>
          <div className="mt-8 flex gap-3">
            <div className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black">Primary</div>
            <div className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/85">Secondary</div>
          </div>
        </div>
        <div className="relative min-h-[320px] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.16),transparent_20%),linear-gradient(180deg,#151520_0%,#0b0b10_100%)]">
          <div className="absolute left-[12%] top-[14%] h-24 w-24 rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur md:h-28 md:w-28" />
          <div className="absolute right-[12%] top-[22%] h-36 w-36 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur md:h-44 md:w-44" />
          <div className="absolute bottom-[10%] left-[18%] h-48 w-[58%] rounded-[2.2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] shadow-2xl shadow-black/30 backdrop-blur" />
        </div>
      </motion.div>
    </section>
  );
}

function ProgressSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const steps = [
    "進場淡入",
    "主卡放大",
    "Sticky 停留",
    "左右滑動敘事",
    "收尾切下一段",
  ];

  return (
    <section ref={ref} className="px-5 py-24 md:px-10">
      <SectionTitle
        eyebrow="PROGRESS"
        title="捲動進度條也很有感"
        desc="這種通常會配合 sticky 區塊一起做。使用者在看內容時，下面的進度條同步前進，會很有互動感。"
      />

      <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <div className="mb-8 h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div style={{ width }} className="h-full rounded-full bg-white" />
        </div>
        <div className="grid gap-4 md:grid-cols-5">
          {steps.map((step, i) => (
            <div key={step} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/80">
              <div className="mb-3 text-white/35">0{i + 1}</div>
              <div>{step}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PointerDemo() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <section className="px-5 py-24 md:px-10">
      <SectionTitle
        eyebrow="MOUSE + SCROLL"
        title="滾輪搭配滑鼠感應，也會很帥"
        desc="這不是只有捲動，還可以把滑鼠位置一起算進去。像背景光暈、卡片微傾斜、控制器浮動，都可以做得很細。"
      />
      <div
        ref={ref}
        onMouseMove={(e) => {
          const rect = ref.current?.getBoundingClientRect();
          if (!rect) return;
          setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
        className="relative mx-auto h-[420px] max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b10]"
      >
        <motion.div
          animate={{ x: pos.x - 120, y: pos.y - 120 }}
          transition={{ type: "spring", stiffness: 90, damping: 20, mass: 0.4 }}
          className="pointer-events-none absolute h-60 w-60 rounded-full bg-white/10 blur-3xl"
        />
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="mb-4 inline-flex rounded-2xl bg-white/10 p-3 text-white/80">
              <MousePointer2 className="h-5 w-5" />
            </div>
            <h3 className="text-3xl font-semibold text-white md:text-5xl">Hover the area</h3>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/65 md:text-base">
              這種可以拿來做你那種高級產品頁的背景層次。再配合捲動進場，整體質感會直接拉上去。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ParallaxLayers() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yBack = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const yMid = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <section ref={ref} className="px-5 py-24 md:px-10">
      <SectionTitle
        eyebrow="PARALLAX"
        title="前中後景分層，空間感立刻出來"
        desc="這種很適合山景、產品堆疊、城市夜景，讓畫面不只是平的，而是有深度。"
      />
      <div className="relative mx-auto h-[480px] max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#09090d]">
        <motion.div style={{ y: yBack }} className="absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.18),transparent_35%)]" />
        <motion.div style={{ y: yMid }} className="absolute bottom-16 left-[8%] h-56 w-56 rounded-full bg-white/8 blur-3xl" />
        <motion.div style={{ y: yMid }} className="absolute right-[10%] top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <motion.div style={{ y: yFront }} className="absolute bottom-0 left-0 right-0 h-[58%] bg-gradient-to-t from-white/10 to-transparent" />
        <motion.div style={{ y: yFront }} className="absolute bottom-10 left-[10%] h-36 w-[22%] rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur" />
        <motion.div style={{ y: yFront }} className="absolute bottom-14 left-[36%] h-48 w-[28%] rounded-[2.3rem] border border-white/10 bg-white/5 backdrop-blur" />
        <motion.div style={{ y: yFront }} className="absolute bottom-8 right-[10%] h-28 w-[18%] rounded-[1.8rem] border border-white/10 bg-white/10 backdrop-blur" />
      </div>
    </section>
  );
}

function MarqueeCards() {
  const cards = ["UI Motion", "Glass Control", "Pinned Story", "Mask Reveal", "Section Snap", "Depth Layer"];
  return (
    <section className="overflow-hidden px-5 py-24 md:px-10">
      <SectionTitle
        eyebrow="MARQUEE"
        title="自動滑動的 UI 帶，也超有未來感"
        desc="很適合拿來展示功能標籤、品牌關鍵字、技術能力，當作過場非常順。"
      />
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity }}
        className="flex w-max gap-5"
      >
        {[...cards, ...cards].map((card, i) => (
          <div key={`${card}-${i}`} className="rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm text-white/85 backdrop-blur md:px-8 md:py-5 md:text-base">
            {card}
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function RevealMask() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 40%"],
  });
  const clip = useTransform(scrollYProgress, [0, 1], ["inset(0 50% 0 50% round 2rem)", "inset(0 0% 0 0% round 2rem)"]);

  return (
    <section ref={ref} className="px-5 py-24 md:px-10">
      <SectionTitle
        eyebrow="MASK REVEAL"
        title="由中間打開的 reveal 很高級"
        desc="不是整塊直接出現，而是像簾幕一樣展開，超適合做影片封面、產品主視覺或英雄段落。"
      />
      <motion.div style={{ clipPath: clip as any }} className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#151524] via-[#0c0c12] to-black p-10 md:p-14">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-white/40">Reveal on Scroll</p>
            <h3 className="mt-4 text-3xl font-semibold text-white md:text-5xl">畫面不是出現，是被打開</h3>
            <p className="mt-5 text-sm leading-7 text-white/65 md:text-base">這種你做產品頁一定會愛，因為它比一般 fade 更有儀式感，而且很像完成度很高的品牌官網。</p>
          </div>
          <div className="relative h-[280px] rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur">
            <div className="absolute left-[10%] top-[12%] h-14 w-14 rounded-2xl bg-white/20" />
            <div className="absolute right-[14%] top-[18%] h-24 w-24 rounded-[1.6rem] bg-white/10" />
            <div className="absolute bottom-[12%] left-[18%] h-28 w-[60%] rounded-[2rem] bg-gradient-to-r from-white/20 to-white/5" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function StaggerList() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: false, amount: 0.25 });
  const items = ["Scroll trigger", "Stagger children", "Soft blur", "Micro-hover", "Sticky transitions", "Motion hierarchy"];

  return (
    <section className="px-5 py-24 md:px-10">
      <SectionTitle
        eyebrow="STAGGER"
        title="一個一個接力進場，很舒服"
        desc="比全部一起冒出來更有節奏，特別適合功能介紹、規格區塊、賣點列表。"
      />
      <div ref={ref} className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
        {items.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.1, y: 18 }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-6 text-white/85"
          >
            <div className="mb-3 text-white/35">0{i + 1}</div>
            <div className="text-lg font-medium">{item}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FloatingDock() {
  const [active, setActive] = useState(2);
  const items = ["Home", "Gallery", "Specs", "Video", "Buy"];
  return (
    <section className="px-5 py-24 md:px-10">
      <SectionTitle
        eyebrow="MICRO INTERACTION"
        title="像 Apple 那種浮動控制器，也能做"
        desc="這種不是大動畫，但超加分。滑過去會有放大、亮度、磁吸感，整個 UI 立刻活起來。"
      />
      <div className="mx-auto flex max-w-4xl justify-center rounded-[2rem] border border-white/10 bg-[#0b0b10] px-8 py-16">
        <div className="flex items-end gap-3 rounded-full border border-white/10 bg-white/5 p-3 backdrop-blur">
          {items.map((item, i) => {
            const isActive = i === active;
            return (
              <motion.button
                key={item}
                onMouseEnter={() => setActive(i)}
                animate={{ scale: isActive ? 1.18 : 1, y: isActive ? -4 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className={`rounded-full px-4 py-3 text-sm transition ${isActive ? "bg-white text-black" : "bg-white/5 text-white/80"}`}
              >
                {item}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function ScrollAnimationsShowcase() {
  const items = useMemo(
    () => [
      {
        title: "淡入上移",
        desc: "最安全也最常用。卡片進場時透明度從 0 到 1，同時往上推一點，簡單但很耐看。",
      },
      {
        title: "Scale 放大進場",
        desc: "從比較小的比例慢慢放大到正常尺寸，很適合主視覺、產品卡或影片封面。",
      },
      {
        title: "Sticky 段落停留",
        desc: "畫面停住，內容卻跟著捲動切換。這種很有官網敘事感，Apple 很常用。",
      },
      {
        title: "水平滑動敘事",
        desc: "使用者實際上在往下捲，但內容看起來像左右平移，節奏感很強。",
      },
      {
        title: "進度條同步",
        desc: "把捲動進度可視化，會讓整段互動看起來更完整，也更像成品。",
      },
      {
        title: "視差背景",
        desc: "前景、背景、文字各自用不同速度移動，就會有層次和空間感。",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-[#0a0a0e] text-white">
      <section className="relative overflow-hidden px-5 pb-20 pt-24 md:px-10 md:pb-28 md:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_30%)]" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-white/50">Scroll Animation Ideas</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-7xl">幾種很適合產品頁的滾輪動畫</h1>
          <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-white/65 md:text-lg">
            我先幫你做一個展示頁。你往下滑，就能直接看到幾種不同的捲動互動：淡入、放大、sticky、水平敘事、進度條、滑鼠光暈。
          </p>
          <div className="mt-12 flex items-center justify-center gap-3 text-white/45">
            <ChevronDown className="h-4 w-4 animate-bounce" />
            <span className="text-sm">往下滑看看</span>
          </div>
        </div>
      </section>

      <section className="px-5 py-10 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {items.map((item, i) => (
            <FadeUpCard key={item.title} index={i} title={item.title} desc={item.desc} />
          ))}
        </div>
      </section>

      <ScaleHero />
      <HorizontalGallery />
      <ProgressSection />
      <ParallaxLayers />
      <RevealMask />
      <StaggerList />
      <MarqueeCards />
      <FloatingDock />
      <PointerDemo />

      <section className="px-5 pb-24 pt-6 md:px-10 md:pb-28">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-center md:p-12">
          <h3 className="text-2xl font-semibold text-white md:text-4xl">你這些都做得出來</h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/65 md:text-base">
            你現在已經在做 carousel、sticky navbar、控制器，下一步把 scroll animation 接進去，整個產品頁質感就會直接跳一級。
          </p>
        </div>
      </section>
    </div>
  );
}
