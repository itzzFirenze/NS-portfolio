'use client'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

// Lazy-load heavy 3D sections
const HeroEnvironment = dynamic(() => import('@/components/sections/HeroEnvironment'), { ssr: false })
const Scrollytelling = dynamic(() => import('@/components/sections/Scrollytelling'), { ssr: false })
const BentoGrid = dynamic(() => import('@/components/sections/BentoGrid'), { ssr: false })
const SkillsOrbit = dynamic(() => import('@/components/sections/SkillsOrbit'), { ssr: false })
const Timeline = dynamic(() => import('@/components/sections/Timeline'), { ssr: false })
const ContactBox = dynamic(() => import('@/components/sections/ContactBox'), { ssr: false })

function Footer() {
   return (
      <footer className="border-t border-white/5 py-10 px-6 text-center">
         <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-display font-bold gradient-text">Joel A.</div>
            <div className="text-xs text-white/30 tracking-widest uppercase">
               Senior Process Technologist · Bakery &amp; Food Science
            </div>
            <div className="flex gap-4 text-xs text-white/30">
               <a href="mailto:joel@example.com" className="hover:text-[#FF6B35] transition-colors no-underline">Email</a>
               <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6B35] transition-colors no-underline">LinkedIn</a>
               <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6B35] transition-colors no-underline">GitHub</a>
            </div>
         </div>
         <div className="mt-6 text-[10px] text-white/15 tracking-widest uppercase">
            © 2026 · Built with React Three Fiber, GSAP &amp; Framer Motion
         </div>
      </footer>
   )
}

export default function Home() {
   return (
      <>
         {/* Hero: full 3D environment */}
         <HeroEnvironment />

         {/* Scrollytelling: 5-stage baking narrative */}
         <Scrollytelling />

         {/* Bento Grid: projects, stats, certifications */}
         <BentoGrid />

         {/* Divider */}
         <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,107,53,0.3), transparent)' }} />

         {/* Skills orbit */}
         <SkillsOrbit />

         {/* Divider */}
         <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,45,120,0.3), transparent)' }} />

         {/* Career timeline */}
         <Timeline />

         {/* Divider */}
         <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,210,63,0.3), transparent)' }} />

         {/* Contact pastry box */}
         <ContactBox />

         {/* Footer */}
         <Footer />
      </>
   )
}
