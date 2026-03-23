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
            .gallery-cta:hover .gallery-cta__label { transform: translateY(-101%); opacity: 0; }
            .gallery-cta:hover .gallery-cta__fill  { transform: translateY(0); }
            .gallery-cta:hover .gallery-cta__hover { transform: translateY(0); }

            /* ── Layout ── */
            .gallery-layout {
               max-width: 1280px;
               margin: 0 auto;
               display: flex;
               flex-direction: row;
               align-items: center;
               gap: 64px;
            }
            .gallery-text-col {
               flex: 0 0 360px;
               display: flex;
               flex-direction: column;
               align-items: flex-start;
               position: relative;
               z-index: 10;
            }
            .gallery-images-col {
               flex: 1 1 0;
               height: 600px;
               display: flex;
               gap: 24px;
               justify-content: center;
               align-items: center;
            }
            .gallery-img-col {
               display: flex;
               flex-direction: column;
               gap: 24px;
               width: 33.333%;
            }
            .gallery-img-col--mid {
               margin-top: 128px;
            }

            /* ── Tablet (≤ 768px) ── */
            @media (max-width: 768px) {
               .gallery-layout {
                  flex-direction: column;
                  gap: 48px;
                  align-items: stretch;
               }
               .gallery-text-col {
                  flex: unset;
                  align-items: center;
                  text-align: center;
               }
               .gallery-images-col {
                  height: 520px;
                  gap: 12px;
               }
               .gallery-img-col {
                  gap: 12px;
               }
               .gallery-img-col--mid {
                  margin-top: 48px;
               }
            }

            /* ── Mobile (≤ 480px) ── */
            @media (max-width: 480px) {
               section {
                  padding: 64px 16px !important;
               }
               .gallery-images-col {
                  height: 440px;
                  gap: 8px;
               }
               .gallery-img-col {
                  gap: 8px;
               }
               .gallery-img-col--mid {
                  margin-top: 32px;
               }
               .gallery-text-col h2 {
                  font-size: 3rem !important;
               }
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

         <div className="gallery-layout">

            {/* ── Text Column ── */}
            <div className="gallery-text-col">

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

            {/* ── Images Grid ── */}
            <div className="gallery-images-col">

               {/* Column 1 */}
               <motion.div style={{ y: y1 }} className="gallery-img-col">
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', borderRadius: '1rem', overflow: 'hidden' }}
                     className="group">
                     <Image src="/sneak-peek/christmas-striped-pastries.jpg" alt="Gallery preview" fill
                        sizes="(max-width: 480px) 33vw, (max-width: 768px) 33vw, 20vw"
                        style={{ objectFit: 'cover', transition: 'transform 0.7s' }}
                     />
                     <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', transition: 'background 0.5s' }}
                        className="group-hover:bg-transparent" />
                  </div>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: '1rem', overflow: 'hidden' }}
                     className="group">
                     <Image src="/sneak-peek/decorative-bread-art-loaf.jpeg" alt="Gallery preview" fill
                        sizes="(max-width: 768px) 33vw, 20vw"
                        style={{ objectFit: 'cover', transition: 'transform 0.7s' }}
                     />
                     <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', transition: 'background 0.5s' }}
                        className="group-hover:bg-transparent" />
                  </div>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', borderRadius: '1rem', overflow: 'hidden' }}
                     className="group">
                     <Image src="/sneak-peek/savory-vegetable-danish-pastries.jpg" alt="Gallery preview" fill
                        sizes="(max-width: 480px) 33vw, (max-width: 768px) 33vw, 20vw"
                        style={{ objectFit: 'cover', transition: 'transform 0.7s' }}
                     />
                     <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', transition: 'background 0.5s' }}
                        className="group-hover:bg-transparent" />
                  </div>
               </motion.div>

               {/* Column 2 */}
               <motion.div style={{ y: y2 }} className="gallery-img-col gallery-img-col--mid">
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', borderRadius: '1rem', overflow: 'hidden' }}
                     className="group">
                     <Image src="/sneak-peek/artisan-bread-chefs-presentation.jpg" alt="Gallery preview" fill
                        sizes="(max-width: 480px) 33vw, (max-width: 768px) 33vw, 20vw"
                        style={{ objectFit: 'cover', transition: 'transform 0.7s' }}
                     />
                     <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', transition: 'background 0.5s' }}
                        className="group-hover:bg-transparent" />
                  </div>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', borderRadius: '1rem', overflow: 'hidden' }}
                     className="group">
                     <Image src="/sneak-peek/chocolate-caramel-dessert-cake.jpg" alt="Gallery preview" fill
                        sizes="(max-width: 480px) 33vw, (max-width: 768px) 33vw, 20vw"
                        style={{ objectFit: 'cover', transition: 'transform 0.7s' }}
                     />
                     <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', transition: 'background 0.5s' }}
                        className="group-hover:bg-transparent" />
                  </div>
               </motion.div>

               {/* Column 3 */}
               <motion.div style={{ y: y3 }} className="gallery-img-col">
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', borderRadius: '1rem', overflow: 'hidden' }}
                     className="group">
                     <Image src="/sneak-peek/purple-artisan-sourdough-bread.png" alt="Gallery preview" fill
                        sizes="(max-width: 480px) 33vw, (max-width: 768px) 33vw, 20vw"
                        style={{ objectFit: 'cover', transition: 'transform 0.7s' }}
                     />
                     <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', transition: 'background 0.5s' }}
                        className="group-hover:bg-transparent" />
                  </div>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '4/4', borderRadius: '1rem', overflow: 'hidden' }}
                     className="group">
                     <Image src="/sneak-peek/seeded-artisan-bread-loaves.png" alt="Gallery preview" fill
                        sizes="(max-width: 768px) 33vw, 20vw"
                        style={{ objectFit: 'cover', transition: 'transform 0.7s' }}
                     />
                     <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', transition: 'background 0.5s' }}
                        className="group-hover:bg-transparent" />
                  </div>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', borderRadius: '1rem', overflow: 'hidden' }}
                     className="group">
                     <Image src="/sneak-peek/decorative-artisan-bread-display.jpg" alt="Gallery preview" fill
                        sizes="(max-width: 480px) 33vw, (max-width: 768px) 33vw, 20vw"
                        style={{ objectFit: 'cover', transition: 'transform 0.7s' }}
                     />
                     <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', transition: 'background 0.5s' }}
                        className="group-hover:bg-transparent" />
                  </div>
               </motion.div>

            </div>
         </div>
      </section>
   )
}