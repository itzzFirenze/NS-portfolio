'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { images } from '../../data/images'

const NaturalFermentation = dynamic(() => import('@/components/sections/gallery/NaturalFermentation'), { ssr: false })
const LayersOfLamination = dynamic(() => import('@/components/sections/gallery/LayersOfLamination'), { ssr: false })
const DisplayArt = dynamic(() => import('@/components/ui/DisplayArt'), { ssr: false })

const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: {
         staggerChildren: 0.15,
         delayChildren: 0.1,
      }
   }
}

const itemVariants = {
   hidden: { opacity: 0, y: 60 },
   visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as any }
   }
}

export default function GalleryPage() {
   return (
      <motion.main
         variants={containerVariants}
         initial="hidden"
         animate="visible"
         style={{
            minHeight: '100vh',
            background: '#030303',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '120px',
            paddingBottom: '80px',
         }}
      >

         {/* ── Floating Back Button ── */}
         <div style={{
            position: 'fixed',
            top: '100px',
            width: '100%',
            maxWidth: '1280px',
            padding: '0 24px',
            pointerEvents: 'none',
            zIndex: 110,
            display: 'flex',
            justifyContent: 'flex-end',
         }}>
            <Link href="/" style={{
               pointerEvents: 'auto',
               display: 'inline-block',
               padding: '10px 24px',
               borderRadius: '9999px',
               border: '1px solid rgba(255,255,255,0.2)',
               background: 'rgba(3,3,3,0.6)',
               backdropFilter: 'blur(8px)',
               color: '#FFF8F0',
               fontWeight: 500,
               fontSize: '0.75rem',
               letterSpacing: '0.12em',
               textTransform: 'uppercase',
               textDecoration: 'none',
               whiteSpace: 'nowrap',
               transition: 'background 0.2s ease, border-color 0.2s ease',
            }}
               onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.08)'
                     ; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.4)'
               }}
               onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(3,3,3,0.6)'
                     ; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.2)'
               }}
            >
               ← Home
            </Link>
         </div>

         {/* ── Page Header ── */}
         <motion.div variants={itemVariants} style={{
            width: '100%',
            maxWidth: '1280px',
            padding: '0 24px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '24px',
         }}>
            <div>
               <h1 style={{
                  fontFamily: 'var(--font-display, serif)',
                  fontSize: 'clamp(3.5rem, 8vw, 6rem)',
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  color: '#FFF8F0',
                  margin: 0,
               }}>
                  Gallery
               </h1>
               <p style={{
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: 'var(--font-body, sans-serif)',
                  fontSize: '1.0625rem',
                  lineHeight: 1.7,
                  marginTop: '16px',
                  maxWidth: '480px',
               }}>
                  A comprehensive look at my baking process, finished products,
                  and the science behind the perfect crumb.
               </p>
            </div>
         </motion.div>

         {/* ── My Works Gallery ── */}
         <motion.div variants={itemVariants} style={{ width: '100%' }}>
            <NaturalFermentation />
         </motion.div>

         {/* ── Divider ── */}
         <motion.div variants={itemVariants} style={{ width: '100%' }}>
            <Divider />
         </motion.div>

         {/* ── Layers of Lamination Gallery ── */}
         {/* <motion.div variants={itemVariants} style={{ width: '100%' }}>
            <LayersOfLamination />
         </motion.div> */}

         {/* ── Divider ── */}
         <motion.div variants={itemVariants} style={{ width: '100%' }}>
            <Divider />
         </motion.div>

         {/* ── Display Art Gallery ── */}
         <motion.section variants={itemVariants} style={{ width: '100%', padding: '64px 0' }}>
            <div style={{
               marginBottom: '48px',
               padding: '0 24px',
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
            }}>
               <h2 style={{
                  fontFamily: 'var(--font-display, serif)',
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  color: '#FFF8F0',
                  margin: 0,
                  textAlign: 'center',
               }}>
                  Display Art
               </h2>
               <p style={{
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: 'var(--font-body, sans-serif)',
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  marginTop: '16px',
                  maxWidth: '400px',
                  textAlign: 'center',
               }}>
                  Drag to explore
               </p>
            </div>

            <div style={{ width: '100%', height: '600px', position: 'relative' }}>
               <DisplayArt
                  items={[
                     { image: images.displayArt[0], text: 'Morning Prep' },
                     { image: images.displayArt[1], text: 'Dough Hydration' },
                     { image: images.displayArt[2], text: 'Scoring' },
                     { image: images.displayArt[3], text: 'Oven Spring' },
                     { image: images.displayArt[4], text: 'Cooling Racks' },
                     { image: images.displayArt[5], text: 'Perfect Crumb' },
                     { image: images.displayArt[6], text: 'Morning Prep' },
                     { image: images.displayArt[7], text: 'Dough Hydration' },
                     { image: images.displayArt[8], text: 'Scoring' },
                     { image: images.displayArt[9], text: 'Oven Spring' },
                     { image: images.displayArt[10], text: 'Perfect Crumb' },
                     { image: images.displayArt[11], text: 'Morning Prep' },
                     { image: images.displayArt[12], text: 'Dough Hydration' },
                     { image: images.displayArt[13], text: 'Scoring' },
                     { image: images.displayArt[14], text: 'Oven Spring' },
                     { image: images.displayArt[15], text: 'Oven Spring' },
                     { image: images.displayArt[16], text: 'Oven Spring' },
                     { image: images.displayArt[17], text: 'Oven Spring' },
                     { image: images.displayArt[18], text: 'Dough Hydration' },
                     { image: images.displayArt[19], text: 'Scoring' },
                     { image: images.displayArt[20], text: 'Oven Spring' },
                  ]}
                  bend={3}
                  textColor="#ffffff"
                  borderRadius={0.15}
                  font="600 24px var(--font-poppins, sans-serif)"
                  scrollSpeed={2}
                  scrollEase={0.04}
               />
            </div>
         </motion.section>

      </motion.main>
   )
}

function Divider() {
   return (
      <div style={{
         width: '100%',
         maxWidth: '1280px',
         height: '1px',
         margin: '64px auto',
         background: 'linear-gradient(90deg, transparent, rgba(255,210,63,0.3), transparent)',
      }} />
   )
}