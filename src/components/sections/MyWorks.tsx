'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const works = [
   { id: 1, title: 'Artisan Bread', src: '/1.jpg', year: '2025' },
   { id: 2, title: 'Pastry Art', src: '/2.jpg', year: '2026' },
   { id: 3, title: 'Cake Design', src: '/3.jpg', year: '2024' },
   { id: 4, title: 'Croissant Bake', src: '/4.jpg', year: '2026' },
   { id: 5, title: 'Sourdough Loaf', src: '/5.jpg', year: '2025' },
   { id: 6, title: 'Dessert Plating', src: '/6.jpg', year: '2026' },
]

export default function MyWorks() {
   const targetRef = useRef<HTMLDivElement>(null)

   const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ['start start', 'end end'],
   })

   // Spring physics for a butter-smooth, heavy scroll feel like premium sites
   const smoothProgress = useSpring(scrollYProgress, {
      stiffness: 70,
      damping: 20,
      restDelta: 0.001
   })

   // To fix the clipping/breaking: We shift the translation back to a safe percentage
   // The problem with `calc(-100% + 100vw)` is that it requires the parent to accurately know the width
   // of all absolute/flex items. A percentage-based approach on a flex container is safer.
   // -80% usually works perfectly for 6 items + an intro screen. You can tweak this up to -90% if needed.
   const x = useTransform(smoothProgress, [0, 1], ['0%', '-85%'])

   return (
      <section
         ref={targetRef}
         className="relative h-[400vh] bg-black z-10"
      >
         <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
            
            <motion.div
               style={{ x }}
               className="flex h-screen items-center w-max will-change-transform"
            >
               {/* 1. Introductory Screen-sized colored block */}
               <div className="w-[100vw] h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FF6B35] to-[#FF2D78] relative shrink-0">
                  <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                  
                  <h2 className="font-display text-[5rem] sm:text-[8rem] md:text-[12rem] font-black leading-[0.85] text-white uppercase tracking-tighter drop-shadow-2xl z-10 text-center">
                     Selected<br />Works
                  </h2>
                  <p className="mt-8 text-white/90 font-body text-sm md:text-xl uppercase tracking-[0.3em] font-bold z-10 tracking-widest">
                     Keep scrolling
                  </p>
                  
                  {/* Visual Indicator to scroll right */}
                  <div className="absolute bottom-12 right-12 text-white/50 text-6xl font-black z-10 animate-pulse hidden md:block">
                     →
                  </div>
               </div>

               {/* 2. Gallery Area */}
               <div className="flex items-center gap-8 sm:gap-16 md:gap-24 px-[5vw] md:px-[10vw] shrink-0">
                  {works.map((work, index) => {
                     // Varied aspect ratios and sizes to make it non-repetitive
                     const isPortrait = index % 3 === 0;
                     const isLargeSquare = index % 3 === 1;
                     
                     const widthClass = isPortrait ? 'w-[75vw] sm:w-[50vw] md:w-[35vw] lg:w-[25vw]' 
                                     : isLargeSquare ? 'w-[85vw] sm:w-[65vw] md:w-[45vw] lg:w-[32vw]' 
                                     : 'w-[80vw] sm:w-[60vw] md:w-[40vw] lg:w-[28vw]';

                     const heightClass = isPortrait ? 'h-[60vh] sm:h-[65vh] md:h-[70vh]' 
                                      : isLargeSquare ? 'h-[50vh] sm:h-[55vh] md:h-[60vh]' 
                                      : 'h-[45vh] sm:h-[50vh] md:h-[55vh]';

                     // Varied vertical alignment
                     const yOffset = index % 2 === 0 ? '-5vh' : '5vh'

                     return (
                        <div
                           key={work.id}
                           className={`group relative ${widthClass} ${heightClass} flex-shrink-0 cursor-pointer`}
                           style={{ transform: `translateY(${yOffset})` }}
                        >
                           <div className="w-full h-full overflow-hidden relative rounded-xl border border-white/5">
                              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors duration-700 ease-out z-10" />

                              <img
                                 src={work.src}
                                 alt={work.title}
                                 className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-[1.2s] ease-[0.16,1,0.3,1]"
                                 onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                 }}
                              />

                              <div className="absolute inset-0 bg-[#0f0f0f] -z-10 flex items-center justify-center border border-white/5">
                                 <div className="flex flex-col items-center">
                                    <span className="text-white/10 font-display text-6xl font-black uppercase tracking-widest">{work.id}</span>
                                    <span className="text-white/20 font-body text-xs mt-4 tracking-[0.2em] uppercase">Coming Soon</span>
                                 </div>
                              </div>
                           </div>

                           <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-20 bg-black/40 backdrop-blur-md p-4 rounded-lg border border-white/10">
                              <h3 className="text-xl md:text-3xl font-display font-bold text-white uppercase tracking-tighter drop-shadow-lg">
                                 {work.title}
                              </h3>
                              <span className="text-[#FF6B35] font-body text-xs md:text-sm font-bold tracking-[0.15em] drop-shadow-md">
                                 {work.year}
                              </span>
                           </div>
                        </div>
                     )
                  })}
               </div>

               {/* Trailing spacer to give the last image a little padding from the edge */}
               <div className="w-[30vw] h-full shrink-0" />

            </motion.div>
         </div>
      </section>
   )
}
