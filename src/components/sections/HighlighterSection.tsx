import { Highlighter } from "@/components/ui/highlighter"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function HighlighterSection() {
   const ref = useRef(null)
   const isInView = useInView(ref, { once: true, margin: "-100px" })

   return (
      <section ref={ref} className="relative w-full py-24 px-6 bg-[#080605] overflow-hidden flex items-center justify-center">
         {/* Subtle background glow */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-[#FF6B35]/5 blur-[100px] rounded-full pointer-events-none" />
         
         <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
               transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
               <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-8 text-white/90 leading-tight">
                  The{" "}
                  <Highlighter action="highlight" color="#FF6B35">
                     secret ingredient
                  </Highlighter>{" "}
                  to an{" "}
                  <Highlighter action="highlight" color="#FF2D78">
                     unforgettable
                  </Highlighter>{" "}
                  culinary experience.
               </h2>
               
               <p className="font-sans text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                  Precision, passion, and a touch of{" "}
                  <Highlighter action="underline" color="#FFD23F">
                     magic
                  </Highlighter>{" "}
                  make every recipe stand out effortlessly.
               </p>
            </motion.div>
         </div>
      </section>
   )
}
