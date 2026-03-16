'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function GallerySneakPeek() {
   const containerRef = useRef<HTMLDivElement>(null)
   const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ['start end', 'end start'],
   })

   const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
   const y2 = useTransform(scrollYProgress, [0, 1], [0, 100])
   const y3 = useTransform(scrollYProgress, [0, 1], [0, -150])

   return (
      <section
         ref={containerRef}
         style={{ position: 'relative', overflow: 'hidden', background: '#030303', padding: '96px 24px' }}
      >
         {/* Button hover styles injected once */}
         <style>{`
        .gallery-cta {
          display: inline-block;
          position: relative;
          padding: 16px 40px;
          border-radius: 9999px;
          background: #ffffff;
          color: #000000;
          font-weight: 600;
          font-size: 0.8125rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          overflow: hidden;
          white-space: nowrap;
        }
        .gallery-cta__label {
          display: block;
          position: relative;
          z-index: 2;
          color: #000;
          transition: transform 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.32s ease;
        }
        .gallery-cta__fill {
          position: absolute;
          inset: 0;
          background: #FF6B35;
          border-radius: 9999px;
          transform: translateY(101%);
          transition: transform 0.32s cubic-bezier(0.4,0,0.2,1);
        }
        .gallery-cta__hover {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 600;
          font-size: 0.8125rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          white-space: nowrap;
          transform: translateY(101%);
          transition: transform 0.32s cubic-bezier(0.4,0,0.2,1);
          z-index: 3;
        }
        .gallery-cta:hover .gallery-cta__label {
          transform: translateY(-101%);
          opacity: 0;
        }
        .gallery-cta:hover .gallery-cta__fill {
          transform: translateY(0);
        }
        .gallery-cta:hover .gallery-cta__hover {
          transform: translateY(0);
        }
      `}</style>

         {/* Background Glow */}
         <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '800px',
            background: 'rgba(255,107,53,0.08)',
            borderRadius: '9999px',
            filter: 'blur(120px)',
            pointerEvents: 'none',
         }} />

         {/* Main layout */}
         <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '64px',
         }}>

            {/* ── Text Column ── */}
            <div style={{
               flex: '0 0 360px',
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'flex-start',
               position: 'relative',
               zIndex: 10,
            }}>
               <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  style={{
                     color: '#FF6B35',
                     fontSize: '1.875rem',
                     fontFamily: 'var(--font-caveat, cursive)',
                     marginBottom: '16px',
                     display: 'block',
                  }}
               >
                  Sneak Peek
               </motion.span>

               <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  style={{
                     color: '#FFF8F0',
                     fontSize: 'clamp(3rem, 4.5vw, 5rem)',
                     fontWeight: 700,
                     lineHeight: 1,
                     letterSpacing: '-0.04em',
                     margin: '0 0 24px 0',
                     fontFamily: 'var(--font-display, serif)',
                  }}
               >
                  The Gallery
               </motion.h2>

               <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  style={{
                     color: 'rgba(255,255,255,0.6)',
                     fontSize: '1rem',
                     lineHeight: 1.75,
                     margin: '0 0 40px 0',
                     fontFamily: 'var(--font-body, sans-serif)',
                  }}
               >
                  A visual journey through the art and science of baking. Explore
                  detailed processes, perfect crumbs, and finished masterpieces.
               </motion.p>

               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
               >
                  <Link href="/gallery" className="gallery-cta">
                     <span className="gallery-cta__label">Explore Full Gallery</span>
                     <span className="gallery-cta__fill" />
                     <span className="gallery-cta__hover">Explore Full Gallery</span>
                  </Link>
               </motion.div>
            </div>

            {/* ── Images Grid — animations untouched ── */}
            <div style={{
               flex: '1 1 0',
               height: '600px',
               display: 'flex',
               gap: '24px',
               justifyContent: 'center',
               alignItems: 'center',
            }}>
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