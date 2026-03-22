'use client'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import Loader from '@/components/ui/Loader'

// Lazy-load heavy 3D sections
const HeroEnvironment = dynamic(() => import('@/components/sections/HeroEnvironment'), {
   ssr: false,
   loading: () => <div className="w-full h-[200vh] bg-[#080605]" />
})
const HighlighterSection = dynamic(() => import('@/components/sections/HighlighterSection'), { ssr: false })
const DisplayArt = dynamic(() => import('@/components/sections/gallery/DisplayArt'), { ssr: false })
const BentoGrid = dynamic(() => import('@/components/sections/BentoGrid'), { ssr: false })
const GallerySneakPeek = dynamic(() => import('@/components/sections/GallerySneakPeek'), { ssr: false })
const SkillsOrbit = dynamic(() => import('@/components/sections/SkillsOrbit'), { ssr: false })
const ContactBox = dynamic(() => import('@/components/sections/ContactBox'), { ssr: false })
const SocialCardsSection = dynamic(() => import('@/components/sections/social/SocialCardsSection'), { ssr: false })

function Footer() {
   return (
      <footer className="border-t border-white/5 py-10 px-6 text-center">
         <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-display font-bold gradient-text">Nir Bahadur</div>
            <div className="text-xs text-white/30 tracking-widest uppercase">
               Baker · Bakery & Food Science
            </div>
            <div className="flex gap-4 text-xs text-white/30">
               <a href="mailto:neeraj@example.com" className="hover:text-[#FF6B35] transition-colors no-underline">Email</a>
               <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6B35] transition-colors no-underline">LinkedIn</a>
               <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6B35] transition-colors no-underline">GitHub</a>
            </div>
         </div>
         <div className="mt-6 text-[10px] text-white/15 tracking-widest uppercase">
            © 2026 · Built with React Three Fiber, GSAP & Framer Motion
         </div>
      </footer>
   )
}

export default function Home() {
   useEffect(() => {
      if ('scrollRestoration' in history) {
         history.scrollRestoration = 'manual'
      }
      window.scrollTo(0, 0)
   }, [])

   return (
      <>
         <Loader />
         {/* Hero: full 3D environment */}
         <HeroEnvironment />

         {/* Highlighter Demo Section */}
         <HighlighterSection />

         {/* DisplayArt: 5-stage baking narrative */}
         {/* <DisplayArt /> */}

         {/* Bento Grid: projects, stats, certifications */}
         <BentoGrid />

         {/* Gallery Sneak Peek */}
         <GallerySneakPeek />

         {/* Skills orbit (Disabled for now) */}
         {/* <SkillsOrbit /> */}

         {/* Divider */}
         <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,45,120,0.3), transparent)' }} />

         {/* Career timeline */}
         <SkillsOrbit />

         {/* Divider */}
         <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,210,63,0.3), transparent)' }} />

         {/* Social Cards Section */}
         <SocialCardsSection />

         {/* Divider */}
         <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,45,120,0.3), transparent)' }} />

         {/* Contact pastry box */}
         <ContactBox />

         {/* Footer */}
         <Footer />
      </>
   )
}
