'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

const ALL_IMAGES = [
   { id: 1, src: '/natural-fermentation/nf15.jpeg', alt: 'Artisan Bread' },
   { id: 2, src: '/natural-fermentation/nf13.jpg', alt: 'Pastry Art' },
   { id: 3, src: '/natural-fermentation/nf5.jpg', alt: 'Sourdough Loaf' },
   { id: 4, src: '/natural-fermentation/nf9.png', alt: 'Golden Crust' },
   { id: 5, src: '/natural-fermentation/nf12.jpg', alt: 'Wild Starter' },
   { id: 6, src: '/natural-fermentation/nf11.jpg', alt: 'Crumb Structure' },
   { id: 7, src: '/natural-fermentation/nf10.png', alt: 'Dessert Plating' },
   { id: 8, src: '/natural-fermentation/nf16.jpeg', alt: 'Pastry Close-up' },
   { id: 9, src: '/natural-fermentation/nf14.png', alt: 'Fermented Dough' },
]

const CARDS_PER_ROW = 3
const ROW_COUNT = ALL_IMAGES.length / CARDS_PER_ROW

// Card dimensions (px)
const CARD_W = 340
const CARD_H = CARD_W * (4 / 3)

// Distance from center to side card centers when fully spread
const SPREAD = CARD_W + 24

// Per-slot config: where each card ends up and its initial stacking rotation
const SLOTS = [
   { finalX: -SPREAD, initRotate: 6, zIndex: 10 }, // Left  – behind
   { finalX: 0, initRotate: 0, zIndex: 20 }, // Center – on top
   { finalX: SPREAD, initRotate: -6, zIndex: 10 }, // Right – behind
]

const ENTRY_END = 0.5

// ─── Single Card ──────────────────────────────────────────────────────────────
function Card({
   src,
   alt,
   slotIndex,
   scrollYProgress,
}: {
   src: string
   alt: string
   slotIndex: number
   scrollYProgress: MotionValue<number>
}) {
   const slot = SLOTS[slotIndex]

   // Side cards trail center slightly
   const stagger = slotIndex === 1 ? 0 : 0.07
   const entryStart = stagger
   const entryEnd = ENTRY_END + stagger

   // Phase 1 – REVEAL: all start at x=0 (stacked), spread out to final x
   const x = useTransform(scrollYProgress, [entryStart, entryEnd], [0, slot.finalX])
   const rotate = useTransform(scrollYProgress, [entryStart, entryEnd], [slot.initRotate, 0])
   const scale = useTransform(scrollYProgress, [entryStart, entryEnd], [0.88, 1])

   // Phase 2 – EXIT: drift upward as user scrolls past
   const exitY = useTransform(scrollYProgress, [ENTRY_END, 1], [0, -200])
   const exitScale = useTransform(scrollYProgress, [ENTRY_END, 1], [1, 0.93])

   const finalScale = useTransform(
      [scale, exitScale] as const,
      ([s, es]: number[]) => s * es
   )

   return (
      <motion.div
         style={{
            x,
            y: exitY,
            rotate,
            scale: finalScale,
            zIndex: slot.zIndex,
            position: 'absolute',
            // All cards share the same origin: center of the container
            left: '50%',
            top: '50%',
            marginLeft: -(CARD_W / 2),
            marginTop: -(CARD_H / 2),
            width: CARD_W,
         }}
         className="will-change-transform"
      >
         <div
            className="w-full rounded-2xl overflow-hidden shadow-[0_20px_56px_rgba(0,0,0,0.65)]"
            style={{ aspectRatio: '3 / 4' }}
         >
            <img
               src={src}
               alt={alt}
               className="w-full h-full object-cover"
               onError={(e) => {
                  ; (e.target as HTMLImageElement).style.display = 'none'
               }}
            />
         </div>
      </motion.div>
   )
}

// ─── Row Section ──────────────────────────────────────────────────────────────
function RowSection({
   images,
   isFirst,
}: {
   images: typeof ALL_IMAGES
   isFirst: boolean
}) {
   const rowRef = useRef<HTMLDivElement>(null)

   const { scrollYProgress } = useScroll({
      target: rowRef,
      offset: ['start end', 'end start'],
   })

   return (
      <div ref={rowRef} className="relative" style={{ height: '60vh' }}>
         <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6">

            {isFirst && (
               <div className="z-50 text-center pointer-events-none select-none pb-12 md:pb-16">
                  <h2 className="flex flex-col items-center leading-none">
                     <span
                        className="font-caveat text-[4rem] sm:text-[5.5rem] md:text-[7rem] font-bold leading-[0.85]"
                        style={{
                           color: '#92d55f',
                           textShadow: '0 0 60px rgba(39,161,51,0.45), 0 0 120px rgba(255,107,53,0.2)',
                        }}
                     >
                        Natural
                     </span>
                     <span
                        className="font-display text-[1.8rem] sm:text-[3rem] md:text-[4rem] font-black uppercase leading-[0.85] tracking-[-0.03em] mt-1"
                        style={{ color: '#FFF8F0' }}
                     >
                        Fermentation
                     </span>
                  </h2>
               </div>
            )}

            {/*
               All 3 cards are absolutely positioned relative to this container's center.
               At scroll=0 they all sit at x=0 → perfectly stacked.
               On scroll they slide to their final x positions.
               DOM order: left first, right second, center last → center paints on top.
            */}
            <div
               style={{
                  position: 'relative',
                  width: CARD_W * 3 + 80,
                  height: CARD_H,
               }}
            >
               {[0, 2, 1].map((slotIdx) => (
                  <Card
                     key={images[slotIdx].id}
                     src={images[slotIdx].src}
                     alt={images[slotIdx].alt}
                     slotIndex={slotIdx}
                     scrollYProgress={scrollYProgress}
                  />
               ))}
            </div>
         </div>
      </div>
   )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function NaturalFermentation() {
   const rows = Array.from({ length: ROW_COUNT }, (_, i) =>
      ALL_IMAGES.slice(i * CARDS_PER_ROW, i * CARDS_PER_ROW + CARDS_PER_ROW)
   )

   return (
      <section className="w-full bg-black">
         {rows.map((rowImages, rowIdx) => (
            <RowSection
               key={rowIdx}
               images={rowImages}
               isFirst={rowIdx === 0}
            />
         ))}
      </section>
   )
}