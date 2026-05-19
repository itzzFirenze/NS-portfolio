'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { images } from '../../../data/images'

const ALL_IMAGES = [
   { id: 1, src: images.gallery[0], alt: 'Pastry Art' },
   { id: 2, src: images.gallery[1], alt: 'Artisan Bread' },
   { id: 3, src: images.gallery[2], alt: 'Sourdough Loaf' },
   { id: 4, src: images.gallery[3], alt: 'Golden Crust' },
   { id: 5, src: images.gallery[4], alt: 'Crumb Structure' },
   { id: 6, src: images.gallery[5], alt: 'Wild Starter' },
   { id: 7, src: images.gallery[6], alt: 'Pastry Close-up' },
   { id: 8, src: images.gallery[7], alt: 'Dessert Plating' },
   { id: 9, src: images.gallery[8], alt: 'Fermented Dough' },
   { id: 10, src: images.gallery[9], alt: 'Artisan Bread' },
   { id: 11, src: images.gallery[10], alt: 'Pastry Art' },
   { id: 12, src: images.gallery[11], alt: 'Sourdough Loaf' },
   { id: 13, src: images.gallery[12], alt: 'Golden Crust' },
   { id: 14, src: images.gallery[13], alt: 'Wild Starter' },
   { id: 15, src: images.gallery[14], alt: 'Crumb Structure' },
   { id: 16, src: images.gallery[15], alt: 'Pastry Close-up' },
   { id: 17, src: images.gallery[16], alt: 'Dessert Plating' },
   { id: 18, src: images.gallery[17], alt: 'Fermented Dough' },
   { id: 19, src: images.gallery[18], alt: 'Artisan Bread' },
   { id: 20, src: images.gallery[19], alt: 'Pastry Art' },
   { id: 21, src: images.gallery[20], alt: 'Sourdough Loaf' },
   { id: 22, src: images.gallery[21], alt: 'Wild Starter' },
   { id: 23, src: images.gallery[22], alt: 'Golden Crust' },
   { id: 24, src: images.gallery[23], alt: 'Crumb Structure' },
   { id: 25, src: images.gallery[24], alt: 'Dessert Plating' },
   { id: 26, src: images.gallery[25], alt: 'Pastry Close-up' },
   { id: 27, src: images.gallery[26], alt: 'Fermented Dough' },
   { id: 28, src: images.gallery[27], alt: 'Artisan Bread' },
   { id: 29, src: images.gallery[28], alt: 'Sourdough Loaf' },
   { id: 30, src: images.gallery[29], alt: 'Pastry Art' },
   { id: 31, src: images.gallery[30], alt: 'Golden Crust' },
   { id: 32, src: images.gallery[31], alt: 'Sourdough Loaf' },
   { id: 33, src: images.gallery[32], alt: 'Wild Starter' },
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
            className="w-full rounded-2xl overflow-hidden shadow-[0_20px_56px_rgba(0,0,0,0.65)] relative"
            style={{ aspectRatio: '3 / 4', position: 'relative' }}
         >
            <Image
               src={src}
               alt={alt}
               fill
               sizes="(max-width: 768px) 100vw, 340px"
               className="object-cover"
               loading="lazy"
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
      <div ref={rowRef} className="relative h-[25vh] md:h-[60vh]">
         <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start pt-[20vh] md:justify-center md:pt-0 overflow-hidden px-6">

            {/* {isFirst && (
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
            )} */}

            {/*
               All 3 cards are absolutely positioned relative to this container's center.
               At scroll=0 they all sit at x=0 → perfectly stacked.
               On scroll they slide to their final x positions.
               DOM order: left first, right second, center last → center paints on top.
            */}
            <div
               className="scale-[0.37] md:scale-100 origin-center"
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