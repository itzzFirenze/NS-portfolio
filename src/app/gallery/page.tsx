'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'

const MyWorks = dynamic(() => import('@/components/sections/MyWorks'), { ssr: false })
const OpenCrumbs = dynamic(() => import('@/components/sections/OpenCrumbs'), { ssr: false })
const CircularGallery = dynamic(() => import('@/components/ui/CircularGallery'), { ssr: false })

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

         {/* ── Page Header ── */}
         <motion.div variants={itemVariants} style={{
            width: '100%',
            maxWidth: '1280px',
            padding: '0 24px',
            marginBottom: '80px',
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
                  A comprehensive look at our baking process, finished products,
                  and the science behind the perfect crumb.
               </p>
            </div>

            <Link href="/" style={{
               display: 'inline-block',
               padding: '12px 32px',
               borderRadius: '9999px',
               border: '1px solid rgba(255,255,255,0.2)',
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
                  (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
                     ; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.2)'
               }}
            >
               ← Back to Home
            </Link>
         </motion.div>

         {/* ── My Works Gallery ── */}
         <motion.div variants={itemVariants} style={{ width: '100%' }}>
            <MyWorks />
         </motion.div>

         {/* ── Divider ── */}
         <motion.div variants={itemVariants} style={{ width: '100%' }}>
            <Divider />
         </motion.div>

         {/* ── Open Crumbs Gallery ── */}
         <motion.div variants={itemVariants} style={{ width: '100%' }}>
            <OpenCrumbs />
         </motion.div>

         {/* ── Divider ── */}
         <motion.div variants={itemVariants} style={{ width: '100%' }}>
            <Divider />
         </motion.div>

         {/* ── Circular Gallery ── */}
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
                  Circular View
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
                  Drag to explore the crumb structures from different angles.
               </p>
            </div>

            <div style={{ width: '100%', height: '600px', position: 'relative' }}>
               <CircularGallery
                  items={[
                     { image: '/open-crumbs/crumb1.png', text: 'Morning Prep' },
                     { image: '/open-crumbs/crumb2.png', text: 'Dough Hydration' },
                     { image: '/open-crumbs/crumb3.png', text: 'Scoring' },
                     { image: '/open-crumbs/crumb4.png', text: 'Oven Spring' },
                     { image: '/open-crumbs/crumb5.png', text: 'Cooling Racks' },
                     { image: '/open-crumbs/crumb6.png', text: 'Perfect Crumb' },
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