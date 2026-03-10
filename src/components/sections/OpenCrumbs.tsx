'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const CRUMB_IMAGES = [
   { id: 1, title: 'Morning Prep', src: '/open-crumbs/crumb1.png', tag: 'Behind the Scenes' },
   { id: 2, title: 'Dough Hydration', src: '/open-crumbs/crumb2.png', tag: 'Technique' },
   { id: 3, title: 'Scoring', src: '/open-crumbs/crumb3.png', tag: 'Artistry' },
   { id: 4, title: 'Oven Spring', src: '/open-crumbs/crumb4.png', tag: 'The Bake' },
   { id: 5, title: 'Cooling Racks', src: '/open-crumbs/crumb5.png', tag: 'Patience' },
   { id: 6, title: 'Perfect Crumb', src: '/open-crumbs/crumb6.png', tag: 'Result' },
]

export default function OpenCrumbs() {
   const targetRef = useRef<HTMLDivElement>(null)
   const containerRef = useRef<HTMLDivElement>(null)
   const [xRange, setXRange] = useState(0)
   const [activeId, setActiveId] = useState<number | null>(null)

   const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ['start start', 'end end'],
   })

   // Smooth scroll physics
   const smoothProgress = useSpring(scrollYProgress, {
      stiffness: 60,
      damping: 25,
      restDelta: 0.001
   })

   // Recalculate track width
   useEffect(() => {
      const updateWidth = () => {
         if (containerRef.current) {
            const totalWidth = containerRef.current.scrollWidth
            const windowWidth = window.innerWidth
            setXRange(-(totalWidth - windowWidth))
         }
      }

      updateWidth()
      window.addEventListener('resize', updateWidth)
      const to = setTimeout(updateWidth, 100)

      return () => {
         window.removeEventListener('resize', updateWidth)
         clearTimeout(to)
      }
   }, [])

   const x = useTransform(smoothProgress, [0, 1], [0, xRange])

   return (
      <section
         ref={targetRef}
         className="relative h-[300vh] bg-[#0a0604] z-10"
      >
         <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
            <motion.div
               ref={containerRef}
               style={{ x }}
               className="flex h-screen items-center w-max will-change-transform"
            >
               {/* Leading gap so the title block is never flush against the left screen edge */}
               <div className="shrink-0 w-[10vw] md:w-[5vw]" />

               {/* 1. Introductory Title Block */}
               <div className="w-[80vw] md:w-[55vw] lg:w-[40vw] h-full flex flex-col items-start justify-center pr-[8vw] md:pr-[6vw] relative shrink-0">
                  <h2 className="font-display text-[4rem] md:text-[8rem] lg:text-[10rem] font-bold leading-none tracking-tighter text-[#FFF8F0] mb-6">
                     Open<br />
                     <span className="text-[#FFD23F] italic font-light">Crumbs</span>
                  </h2>
                  <p className="text-white/50 font-body text-sm md:text-lg max-w-sm leading-relaxed border-l-2 border-[#FFD23F] pl-4">
                     A scattered trail of moments, techniques, and the raw beauty of the baking process.
                  </p>

                  {/* Subtle pulsing arrow */}
                  <motion.div
                     className="absolute bottom-20 left-0 text-[#FFD23F]/60 text-3xl font-light hidden md:block"
                     animate={{ x: [0, 15, 0] }}
                     transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                     Scroll →
                  </motion.div>
               </div>

               {/* 2. Scattered "Scrapbook" Gallery */}
               <div className="flex items-center gap-12 sm:gap-20 md:gap-32 pr-[15vw] shrink-0 pl-[5vw]">
                  {CRUMB_IMAGES.map((crumb, index) => {
                     // Create an organic scattered layout
                     const isOdd = index % 2 !== 0;
                     const isEveryThird = index % 3 === 0;

                     // Varied portrait dimensions
                     const widthClass = isEveryThird ? 'w-[65vw] sm:w-[45vw] md:w-[28vw]'
                        : isOdd ? 'w-[60vw] sm:w-[40vw] md:w-[24vw]'
                           : 'w-[70vw] sm:w-[50vw] md:w-[32vw]';

                     const heightClass = isEveryThird ? 'aspect-[3/4]'
                        : isOdd ? 'aspect-[2/3]'
                           : 'aspect-[4/5]';

                     // Staggered vertical positioning
                     const yTranslate = index % 3 === 0 ? '-10vh' : index % 2 === 0 ? '15vh' : '5vh';
                     // Slight tilts for a scrapbook feel
                     const rotation = index % 3 === 0 ? '-2deg' : index % 2 === 0 ? '3deg' : '-1deg';

                     return (
                        <div
                           key={crumb.id}
                           className={`group relative ${widthClass} ${heightClass} flex-shrink-0 cursor-pointer`}
                           style={{
                              transform: `translateY(${yTranslate}) rotate(${rotation})`
                           }}
                           onClick={() => setActiveId(activeId === crumb.id ? null : crumb.id)}
                        >
                           {/* Decorative background mat/tape to enhance scrapbook look */}
                           {/* <div className="absolute -inset-3 bg-white/5 rounded-sm -z-10 rotate-1 group-hover:rotate-0 transition-transform duration-500" /> */}
                           {/* <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-4 bg-white/10 backdrop-blur-sm shadow-md -z-1 -rotate-3 rounded-sm z-20" /> */}

                           <div className="w-full h-full overflow-hidden relative shadow-2xl">
                              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500 z-10" />

                              <img
                                 src={crumb.src}
                                 alt={crumb.title}
                                 className="w-full h-full object-cover transform scale-90 group-hover:scale-100 transition-transform duration-[1s] ease-[0.16,1,0.3,1] grayscale-[0%] group-hover:grayscale-0"
                                 onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMzMzMiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9ImFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSI1NTUiIGR5PSIuM2VtIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5QbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=';
                                 }}
                              />

                              {/* Number watermark inside image */}
                              {/* <div className="absolute bottom-4 right-4 text-white/40 font-display text-4xl font-bold italic z-10 mix-blend-overlay">
                                 0{crumb.id}
                              </div> */}
                           </div>

                           {/* Text overlay - Slides up from bottom */}
                           <div className={`absolute -bottom-8 md:-bottom-12 left-0 right-0 p-4 transition-all duration-500 z-30 ${activeId === crumb.id
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'
                              }`}>
                              <div className="bg-[#FFD23F] text-black w-max px-3 py-1 text-[10px] font-bold tracking-widest uppercase mb-2">
                                 {crumb.tag}
                              </div>
                              <h3 className="text-2xl md:text-4xl font-display font-black text-[#FFF8F0] tracking-tight drop-shadow-md">
                                 {crumb.title}
                              </h3>
                           </div>
                        </div>
                     )
                  })}
               </div>

            </motion.div>
         </div>
      </section>
   )
}