'use client'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

// Lazy-load heavy 3D sections
const HeroEnvironment = dynamic(() => import('@/components/sections/HeroEnvironment'), { ssr: false })
const Scrollytelling = dynamic(() => import('@/components/sections/Scrollytelling'), { ssr: false })
const BentoGrid = dynamic(() => import('@/components/sections/BentoGrid'), { ssr: false })
// const SkillsOrbit = dynamic(() => import('@/components/sections/SkillsOrbit'), { ssr: false })
const MyWorks = dynamic(() => import('@/components/sections/MyWorks'), { ssr: false })
const OpenCrumbs = dynamic(() => import('@/components/sections/OpenCrumbs'), { ssr: false })
const Timeline = dynamic(() => import('@/components/sections/Timeline'), { ssr: false })
const ContactBox = dynamic(() => import('@/components/sections/ContactBox'), { ssr: false })
const SocialCardsSection = dynamic(() => import('@/components/sections/social/SocialCardsSection'), { ssr: false })

function Footer() {
   return (
      <footer className="border-t border-white/5 py-10 px-6 text-center">
         <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-display font-bold gradient-text">Neeraj S.</div>
            <div className="text-xs text-white/30 tracking-widest uppercase">
               Senior Process Technologist · Bakery & Food Science
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

         {/* My Works Gallery */}
         <MyWorks />

         {/* Divider */}
         <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,210,63,0.3), transparent)' }} />

         {/* Open Crumbs Gallery */}
         <OpenCrumbs />

         {/* Skills orbit (Disabled for now) */}
         {/* <SkillsOrbit /> */}

         {/* Divider */}
         <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,45,120,0.3), transparent)' }} />

         {/* Career timeline */}
         <Timeline />

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
