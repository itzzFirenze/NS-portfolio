'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const works = [
   { id: 1, title: 'Artisan Bread', src: '/natural-fermentation/nf1.png', year: '2025' },
   { id: 2, title: 'Pastry Art', src: '/natural-fermentation/nf2.png', year: '2026' },
   { id: 3, title: 'Sourdough Loaf', src: '/natural-fermentation/nf3.png', year: '2025' },
   { id: 4, title: 'Dessert Plating', src: '/natural-fermentation/nf4.png', year: '2026' },
]

export default function MyWorks() {
   const targetRef = useRef<HTMLDivElement>(null)
   const containerRef = useRef<HTMLDivElement>(null)
   const [xRange, setXRange] = useState(0)
   const [activeId, setActiveId] = useState<number | null>(null)

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

   // Recalculate precisely how far the track can move so that the right edge of the track matches the screen right edge
   useEffect(() => {
      const updateWidth = () => {
         if (containerRef.current) {
            // scrollWidth gets the actual real width of everything inside the flex container combined
            const totalWidth = containerRef.current.scrollWidth
            const windowWidth = window.innerWidth
            // We want to translate negatively by the total amount minus exactly one screen size
            setXRange(-(totalWidth - windowWidth))
         }
      }

      // Calculate right away and on resize
      updateWidth()
      window.addEventListener('resize', updateWidth)

      // Since images can have lazily loaded widths, also run very briefly after mount
      const to = setTimeout(updateWidth, 100)

      return () => {
         window.removeEventListener('resize', updateWidth)
         clearTimeout(to)
      }
   }, [])

   // Instead of failing with a CSS calc string, we pass hard JS numbers
   const x = useTransform(smoothProgress, [0, 1], [0, xRange])

   return (
      <section
         ref={targetRef}
         className="relative h-[400vh] bg-black z-10"
      >
         <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">

            <motion.div
               ref={containerRef}
               style={{ x }}
               className="flex h-screen items-center w-max will-change-transform"
            >
               {/* 1. Introductory Screen-sized colored block */}
               <div className="w-[100vw] h-full flex flex-col items-start justify-center pl-[5vw] md:pl-[10vw] pr-[5vw] bg-black relative shrink-0">

                  <div className="relative z-10 w-full">
                     <h2 className="flex flex-col text-left">
                        {/* Huge background/ambient text - Outline style */}
                        <span
                           className="font-display text-[7rem] sm:text-[12rem] md:text-[16rem] font-black uppercase leading-[0.8] tracking-tighter text-transparent"
                           style={{ WebkitTextStroke: '2px rgba(255,255,255,0.25)' }}
                        >
                           Natural
                        </span>
                        {/* Foreground vivid text slightly overlapping */}
                        <span className="font-editorial text-[5rem] sm:text-[9rem] md:text-[13rem] italic leading-[0.8] text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FFD23F] ml-4 sm:ml-16 md:ml-32 mt-[-1rem] sm:mt-[-3rem] md:mt-[-5rem]">
                           Fermentation
                        </span>
                     </h2>

                     {/* Decorative element & Scroll prompt */}
                     <div className="mt-12 md:mt-24 ml-4 sm:ml-16 md:ml-32 flex items-center gap-6">
                        <div className="w-12 md:w-24 h-[1px] bg-white/30"></div>
                        <p className="text-white/70 font-display text-xs md:text-sm uppercase tracking-[0.5em] font-medium">
                           Scroll to explore
                        </p>
                     </div>
                  </div>

                  {/* Visual Indicator to scroll right */}
                  <div className="absolute bottom-12 right-12 text-[#FF6B35]/50 text-6xl font-light z-10 animate-pulse hidden md:block font-editorial italic">
                     &rarr;
                  </div>
               </div>

               {/* 2. Gallery Area */}
               {/* Adding a consistent padding to the right boundary so it stops nicely framing the last image */}
               <div className="flex items-center gap-8 sm:gap-16 md:gap-24 px-[5vw] md:pl-[10vw] pr-[5vw] md:pr-[10vw] shrink-0">
                  {works.map((work, index) => {
                     // Make all images portrait uniformly
                     const widthClass = 'w-[50vw] sm:w-[45vw] md:w-[30vw] lg:w-[20vw]';
                     const heightClass = 'h-[42vh] sm:h-[45vh] md:h-[50vh]';

                     // Varied vertical alignment
                     const yOffset = index % 2 === 0 ? '-5vh' : '5vh'

                     return (
                        <div
                           key={work.id}
                           className={`group relative ${widthClass} ${heightClass} flex-shrink-0 cursor-pointer`}
                           style={{ transform: `translateY(${yOffset})` }}
                           onClick={() => setActiveId(activeId === work.id ? null : work.id)}
                        >
                           <div className="w-full h-full relative">
                              {/* Removed the inset background overlay, borders, and hardcoded bg colors */}
                              <img
                                 src={work.src}
                                 alt={work.title}
                                 className="w-full h-full object-contain transform scale-110 group-hover:scale-100 transition-transform duration-[1.2s] ease-[0.16,1,0.3,1]"
                                 onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                 }}
                              />

                              <div className="absolute inset-0 -z-10 flex items-center justify-center">
                                 <div className="flex flex-col items-center">
                                    <span className="text-white/10 font-display text-6xl font-black uppercase tracking-widest">{work.id}</span>
                                    <span className="text-white/20 font-body text-xs mt-4 tracking-[0.2em] uppercase">Coming Soon</span>
                                 </div>
                              </div>
                           </div>

                           <div className={`absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 flex justify-between items-end transition-all duration-500 z-20 bg-black/40 backdrop-blur-md p-4 rounded-lg border border-white/10 ${activeId === work.id
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'
                              }`}>
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

               {/* Trailing empty space after the last image */}
               <div className="w-[5vw] md:w-[12vw] h-full shrink-0" />

            </motion.div>
         </div>
      </section>
   )
}
