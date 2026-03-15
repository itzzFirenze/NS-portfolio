'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BlurText from './BlurText'

gsap.registerPlugin(ScrollTrigger)

export default function SignatureText() {
   const containerRef = useRef<HTMLDivElement>(null)
   const svgRef = useRef<SVGSVGElement>(null)
   const [showText, setShowText] = useState(false)

   useEffect(() => {
      let trigger: ScrollTrigger

      fetch('/typo.svg')
         .then(res => res.text())
         .then(svgText => {
            const parser = new DOMParser()
            const doc = parser.parseFromString(svgText, 'image/svg+xml')
            const sourceSvg = doc.querySelector('svg')
            const svg = svgRef.current

            if (!sourceSvg || !svg) return

            // Copy viewBox
            if (sourceSvg.getAttribute('viewBox')) {
               svg.setAttribute('viewBox', sourceSvg.getAttribute('viewBox')!)
            } else {
               svg.setAttribute('viewBox', "221.596 251.674 1289.232 195.842")
            }

            const sourcePaths = Array.from(sourceSvg.querySelectorAll('path'))
            const paths: SVGPathElement[] = []

            sourcePaths.forEach((sourcePath) => {
               const el = document.createElementNS('http://www.w3.org/2000/svg', 'path')
               el.setAttribute('d', sourcePath.getAttribute('d') || '')

               el.style.fill = 'transparent'
               el.style.stroke = '#FF6B35'
               el.style.strokeWidth = '3'
               el.style.strokeLinecap = 'round'
               el.style.strokeLinejoin = 'round'

               svg.appendChild(el)

               const len = el.getTotalLength() || 1000
               el.style.strokeDasharray = `${len + 5} ${len + 5}`

               paths.push(el)
            })

            const tl = gsap.timeline()

            trigger = ScrollTrigger.create({
               animation: tl,
               trigger: '#hero',
               start: 'top top',
               end: 'bottom bottom',
               scrub: 1,
               onUpdate: (self) => {
                  setShowText(self.progress > 0.8)
               }
            })

            // Draw paths
            tl.fromTo(paths,
               {
                  strokeDashoffset: (i, el) => (el.getTotalLength() || 1000) + 5,
                  opacity: 0,
                  fill: 'transparent'
               },
               {
                  strokeDashoffset: 0,
                  opacity: 1,
                  ease: 'none',
                  stagger: 0.1,
               }
            )

            // Fill them in and remove stroke
            tl.to(paths, { fill: '#FF6B35', stroke: 'transparent', duration: 0.1, ease: 'power2.inOut' }, ">")

         }).catch(err => {
            console.error("Failed to load typo.svg:", err)
         })

      return () => { trigger?.kill() }
   }, [])

   return (
      <div ref={containerRef} className="flex flex-col items-center justify-center w-full z-30 pointer-events-none drop-shadow-md">
         <svg
            ref={svgRef}
            className="w-[90%] max-w-[750px] h-auto drop-shadow-md"
            xmlns="http://www.w3.org/2000/svg"
         />
         <div
            className="h-[60px] flex items-center justify-center mt-6"
            style={{ fontFamily: '"Outfit", "Poppins"', fontWeight: 800 }}
         >
            {showText && (
               <BlurText
                  text="crafting the perfect recipe"
                  delay={45}
                  animateBy="words"
                  direction="top"
                  className="text-2xl md:text-3xl tracking-wide text-orange-500 drop-shadow-md m-0"
               />
            )}
         </div>
      </div>
   )
}
