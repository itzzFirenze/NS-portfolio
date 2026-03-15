'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'

const MyWorks = dynamic(() => import('@/components/sections/MyWorks'), { ssr: false })
const OpenCrumbs = dynamic(() => import('@/components/sections/OpenCrumbs'), { ssr: false })
const CircularGallery = dynamic(() => import('@/components/ui/CircularGallery'), { ssr: false })

export default function GalleryPage() {
   return (
      <main className="min-h-screen pt-32 pb-16 bg-[#030303] flex flex-col items-center">
         {/* Page Header */}
         <div className="w-full max-w-7xl px-6 mb-16 flex justify-between items-end gap-6">
            <div>
               <h1 className="font-display text-[4rem] md:text-[6rem] font-bold leading-none tracking-tighter text-[#FFF8F0]">
                  Gallery
               </h1>
               <p className="text-white/40 font-body text-lg mt-4 max-w-xl">
                  A comprehensive look at our baking process, finished products, and the science behind the perfect crumb.
               </p>
            </div>
            <Link 
               href="/" 
               className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all text-sm uppercase tracking-widest text-[#FFF8F0] font-medium hidden md:block"
            >
               Back to Home
            </Link>
         </div>
         
         {/* Mobile Back Button */}
         <div className="w-full max-w-7xl px-6 mb-12 md:hidden">
            <Link 
               href="/" 
               className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all text-sm uppercase tracking-widest text-[#FFF8F0] font-medium inline-block w-full text-center"
            >
               Back to Home
            </Link>
         </div>

         {/* My Works Gallery */}
         <div className="w-full">
            <MyWorks />
         </div>

         {/* Divider */}
         <div className="w-full h-px my-16 max-w-7xl mx-auto" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,210,63,0.3), transparent)' }} />

         {/* Open Crumbs Gallery */}
         <div className="w-full">
            <OpenCrumbs />
         </div>

         {/* Divider */}
         <div className="w-full h-px my-16 max-w-7xl mx-auto" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,210,63,0.3), transparent)' }} />

         {/* Circular Gallery — Open Crumbs */}
         <section className="w-full py-16 px-0 md:px-6">
            <div className="mb-12 px-4 flex flex-col items-center">
               <h2 className="text-center font-display text-[3rem] md:text-[4.5rem] font-bold leading-none tracking-tighter text-[#FFF8F0]">
                  Circular View
               </h2>
               <p className="text-center text-white/40 font-body text-sm mt-4 max-w-md w-full mx-auto">
                  Drag to explore the crumb structures from different angles.
               </p>
            </div>
            <div className="w-full relative" style={{ height: '600px' }}>
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
         </section>
      </main>
   )
}
