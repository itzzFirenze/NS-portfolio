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
const CircularGallery = dynamic(() => import('@/components/ui/CircularGallery'), { ssr: false })
const SkillsOrbit = dynamic(() => import('@/components/sections/SkillsOrbit'), { ssr: false })
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

         {/* Divider */}
         <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,210,63,0.3), transparent)' }} />

         {/* Circular Gallery — Open Crumbs */}
         <section className="py-16 px-6">
            <div className="mb-8 px-4 flex flex-col items-center">
               <h2 className="text-center font-display text-[3rem] md:text-[5rem] font-bold leading-none tracking-tighter text-[#FFF8F0]">
                  Gallery
               </h2>
               <p className="text-center text-white/40 font-body text-sm mt-2 max-w-md w-full mx-auto">
                  Drag to explore.
               </p>
            </div>
            <div style={{ height: '550px', position: 'relative' }}>
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
                  font="600 24px Poppins"
                  scrollSpeed={2}
                  scrollEase={0.04}
               />
            </div>
         </section>

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
