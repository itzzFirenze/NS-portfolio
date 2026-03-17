import { Highlighter } from "@/components/ui/highlighter"
import { motion, useInView } from "framer-motion"
import { useRef, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import FlourParticles from "@/components/3d/FlourParticles"

export default function HighlighterSection() {
   const ref = useRef(null)
   const isInView = useInView(ref, { once: true, margin: "-100px" })

   return (
      <section ref={ref} className="relative w-full h-[100vh] px-6 bg-[#080605] overflow-hidden flex items-center justify-center">
         {/* Subtle background glow */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-[#FF6B35]/5 blur-[100px] rounded-full pointer-events-none" />

         {/* Flour Particle Effect */}
         <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas
               camera={{ position: [0, 0, 5], fov: 50 }}
               dpr={[1, 1.5]}
               frameloop={isInView ? "always" : "never"}
               gl={{ antialias: true, alpha: true }}
            >
               <Suspense fallback={null}>
                  <FlourParticles count={150} spread={10} color="#FFF8F0" />
               </Suspense>
            </Canvas>
         </div>

         <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
               transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            >
               <div className="flex justify-center items-center w-full mb-10">
                  <img src="/logos/baker-logo.png" alt="Logo Placeholder" className="w-50 h-50 object-contain opacity-80" />
               </div>
               <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white/90 leading-tight">
                  Refining {" "}
                  <Highlighter action="highlight" color="#FF6B35" isView={true}>
                     RECIPES,
                  </Highlighter> Perfecting {" "}
                  <Highlighter action="highlight" color="#18adcbff" isView={true}>
                     PROCESS.
                  </Highlighter>{" "}
                  From simple ingredients to remarkable creations. Building a{" "}
                  <Highlighter action="highlight" color="#FF2D78" isView={true}>
                     LEGACY
                  </Highlighter> in baking—one {" "}
                  <Highlighter action="highlight" color="#3ab748ff" isView={true}>
                     PERFECT LOAF
                  </Highlighter> at a time.{" "}

               </h2>

            </motion.div>
         </div>
      </section>
   )
}
