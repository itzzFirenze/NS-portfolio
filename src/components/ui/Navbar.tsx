'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
   { label: 'About', href: '#about' },
   { label: 'Process', href: '#process' },
   { label: 'Skills', href: '#skills' },
   { label: 'Timeline', href: '#timeline' },
   { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
   const [scrolled, setScrolled] = useState(false)
   const [mobileOpen, setMobileOpen] = useState(false)

   useEffect(() => {
      const handler = () => setScrolled(window.scrollY > 60)
      window.addEventListener('scroll', handler, { passive: true })
      return () => window.removeEventListener('scroll', handler)
   }, [])

   return (
      <motion.nav
         style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            transition: 'all 0.5s ease',
            background: scrolled ? 'rgba(8,6,5,0.85)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
            padding: scrolled ? '12px 0' : '20px 0',
         }}
         initial={{ y: -80, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
         {/* Inner container — fixed max-width, perfectly centred */}
         <div style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
         }}>
            {/* Logo */}
            <motion.a
               href="#"
               className="gradient-text"
               style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 20,
                  fontWeight: 800,
                  textDecoration: 'none',
                  flexShrink: 0,
               }}
               whileHover={{ scale: 1.05 }}
            >
               J.A. <span style={{ color: '#FF6B35' }}>●</span>
            </motion.a>

            {/* Desktop links */}
            <div style={{
               display: 'flex',
               alignItems: 'center',
               gap: 36,
               position: 'absolute',
               left: '50%',
               transform: 'translateX(-50%)',
            }}
               className="hidden-mobile"
            >
               {NAV_LINKS.map((link, i) => (
                  <motion.a
                     key={link.label}
                     href={link.href}
                     style={{
                        fontSize: 13,
                        fontWeight: 500,
                        letterSpacing: '0.05em',
                        color: 'rgba(255,248,240,0.7)',
                        textDecoration: 'none',
                        position: 'relative',
                        fontFamily: 'Inter, sans-serif',
                        whiteSpace: 'nowrap',
                     }}
                     initial={{ opacity: 0, y: -10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.1 * i + 0.3 }}
                     whileHover={{ color: '#FF6B35' } as never}
                  >
                     {link.label}
                     <span style={{
                        position: 'absolute',
                        bottom: -4,
                        left: 0,
                        height: 1,
                        width: '0%',
                        background: '#FF6B35',
                        transition: 'width 0.3s ease',
                     }} className="nav-underline" />
                  </motion.a>
               ))}
            </div>

            {/* CTA — right aligned */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
               <motion.a
                  href="#contact"
                  className="desktop-cta"
                  style={{
                     padding: '8px 20px',
                     borderRadius: 999,
                     background: 'rgba(255,107,53,0.10)',
                     border: '1px solid rgba(255,107,53,0.25)',
                     color: '#FF6B35',
                     fontSize: 13,
                     fontWeight: 600,
                     textDecoration: 'none',
                     fontFamily: 'Inter, sans-serif',
                     whiteSpace: 'nowrap',
                  }}
                  whileHover={{ scale: 1.05, background: 'rgba(255,107,53,0.18)' } as never}
                  whileTap={{ scale: 0.95 }}
               >
                  Let&apos;s Talk
               </motion.a>

               {/* Mobile hamburger */}
               <button
                  className="hamburger"
                  onClick={() => setMobileOpen(!mobileOpen)}
                  aria-label="Menu"
                  style={{
                     display: 'none',
                     flexDirection: 'column',
                     gap: 5,
                     cursor: 'pointer',
                     background: 'none',
                     border: 'none',
                     padding: 4,
                  }}
               >
                  <motion.span style={{ display: 'block', width: 24, height: 2, background: '#FF6B35', borderRadius: 2 }} animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 7 : 0 }} />
                  <motion.span style={{ display: 'block', width: 24, height: 2, background: '#FF6B35', borderRadius: 2 }} animate={{ opacity: mobileOpen ? 0 : 1 }} />
                  <motion.span style={{ display: 'block', width: 24, height: 2, background: '#FF6B35', borderRadius: 2 }} animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -7 : 0 }} />
               </button>
            </div>
         </div>

         {/* Mobile menu */}
         <AnimatePresence>
            {mobileOpen && (
               <motion.div
                  style={{
                     background: 'rgba(8,6,5,0.95)',
                     backdropFilter: 'blur(20px)',
                     borderTop: '1px solid rgba(255,255,255,0.08)',
                     padding: '16px 32px 24px',
                  }}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
               >
                  {NAV_LINKS.map(link => (
                     <a
                        key={link.label}
                        href={link.href}
                        style={{
                           display: 'block',
                           padding: '14px 0',
                           color: 'rgba(255,248,240,0.8)',
                           fontSize: 18,
                           fontFamily: 'Outfit, sans-serif',
                           fontWeight: 500,
                           textDecoration: 'none',
                           borderBottom: '1px solid rgba(255,255,255,0.05)',
                        }}
                        onClick={() => setMobileOpen(false)}
                     >
                        {link.label}
                     </a>
                  ))}
               </motion.div>
            )}
         </AnimatePresence>
      </motion.nav>
   )
}
