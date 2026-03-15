'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function GallerySneakPeek() {
   const containerRef = useRef<HTMLDivElement>(null)
   const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start end", "end start"]
   })

   const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
   const y2 = useTransform(scrollYProgress, [0, 1], [0, 100])
   const y3 = useTransform(scrollYProgress, [0, 1], [0, -150])

   return (
      <section ref={containerRef} className="py-24 md:py-32 px-6 relative overflow-hidden bg-[#030303]">
         {/* Background Glow */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-[#FF6B35]/10 rounded-full blur-[100px] md:blur-[120px] pointer-events-none" />

         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
            <div className="w-[40px] bg-[#FFD23F]"></div>
            {/* Text Content */}
            <div className="w-full lg:w-1/3 flex flex-col items-start z-10">
               <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-[#FF6B35] font-caveat text-3xl mb-4"
               >
                  Sneak Peek
               </motion.span>
               <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="font-display text-[3.5rem] md:text-[5rem] font-bold leading-none tracking-tighter text-[#FFF8F0] mb-6"
               >
                  The Gallery
               </motion.h2>
               <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-white/60 font-body text-base mb-10 max-w-md"
               >
                  A visual journey through the art and science of baking. Explore detailed processes, perfect crumbs, and finished masterpieces.
               </motion.p>

               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
               >
                  <Link
                     href="/gallery"
                     className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-black font-semibold text-sm uppercase tracking-widest overflow-hidden"
                  >
                     <span className="relative z-10">Explore Full Gallery</span>
                     <div className="absolute inset-0 bg-[#FF6B35] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                     <span className="absolute inset-0 z-10 flex items-center justify-center text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out uppercase tracking-widest font-semibold flex-nowrap whitespace-nowrap">
                        Explore Full Gallery
                     </span>
                  </Link>
               </motion.div>
            </div>


            {/* Images Grid */}
            <div className="w-full lg:w-2/3 h-[500px] md:h-[600px] flex gap-4 md:gap-6 justify-center items-center">
               <motion.div style={{ y: y1 }} className="flex flex-col gap-4 md:gap-6 w-1/3">
                  <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden group">
                     <Image src="/open-crumbs/crumb1.png" alt="Gallery preview" fill sizes="(max-width: 768px) 33vw, 20vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden group hidden md:block">
                     <Image src="/1.jpg" alt="Gallery preview" fill sizes="(max-width: 768px) 33vw, 20vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
               </motion.div>

               <motion.div style={{ y: y2 }} className="flex flex-col gap-4 md:gap-6 w-1/3 mt-16 md:mt-32">
                  <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden group">
                     <Image src="/2.jpg" alt="Gallery preview" fill sizes="(max-width: 768px) 33vw, 20vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden group">
                     <Image src="/open-crumbs/crumb3.png" alt="Gallery preview" fill sizes="(max-width: 768px) 33vw, 20vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
               </motion.div>

               <motion.div style={{ y: y3 }} className="flex flex-col gap-4 md:gap-6 w-1/3">
                  <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden group">
                     <Image src="/open-crumbs/crumb6.png" alt="Gallery preview" fill sizes="(max-width: 768px) 33vw, 20vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden group hidden md:block">
                     <Image src="/5.jpg" alt="Gallery preview" fill sizes="(max-width: 768px) 33vw, 20vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
               </motion.div>
            </div>
         </div>
      </section>
   )
}
