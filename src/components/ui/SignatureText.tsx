'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SignatureText() {
   const containerRef = useRef<HTMLDivElement>(null)
   const svgRef = useRef<SVGSVGElement>(null)
   const [showText, setShowText] = useState(false)

   useEffect(() => {
      let trigger: ScrollTrigger

      // Fetch the new SVG file
      fetch('/nirmagar.svg')
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
               svg.setAttribute('viewBox', '0 0 547 151') // Fallback for nirmagar.svg
            }

            // Clear existing elements
            while (svg.firstChild) svg.removeChild(svg.firstChild)

            // Clone layout (defs, g, paths) directly so it retains structure and scaling
            Array.from(sourceSvg.children).forEach(child => {
               svg.appendChild(child.cloneNode(true))
            })

            // Remove any background rects coming from exports
            const rects = svg.querySelectorAll('rect')
            rects.forEach(r => r.remove())

            // Prevent outer SVG fills from overriding our paths
            svg.style.fill = 'transparent'

            // Look for <use> instances (font glyphs) or direct paths
            const uses = Array.from(svg.querySelectorAll('use'))
            const directPaths = Array.from(svg.querySelectorAll('g > path, svg > path'))

            // Since newtypo uses `<defs>` + `<use>`, we animate `<use>` directly
            const elementsToAnimate = uses.length > 0 ? uses : directPaths

            elementsToAnimate.forEach((element) => {
               const el = element as SVGElement & { dataset: any }
               let len = 1000

               // If it's a <use>, we have to measure its referenced <path>
               if (el.tagName.toLowerCase() === 'use') {
                  const href = el.getAttribute('href') || el.getAttribute('xlink:href')
                  if (href) {
                     // Get the path from <defs>
                     const sourcePath = svg.querySelector(href) as SVGPathElement
                     if (sourcePath && sourcePath.getTotalLength) {
                        len = sourcePath.getTotalLength()
                     }
                  }
                  // It's inside a scaled group (scale=0.072), so 40 * 0.072 ≈ 2.8px visual stroke
                  el.style.strokeWidth = '10'
               } else {
                  // Standard direct path handling (like typo.svg)
                  const pathEl = el as SVGPathElement
                  if (pathEl.getTotalLength) len = pathEl.getTotalLength()
                  el.style.strokeWidth = '0.5'
               }

               // Apply base styles for drawing
               el.style.fill = 'transparent'
               el.style.stroke = '#FF6B35'
               el.style.strokeLinecap = 'round'
               el.style.strokeLinejoin = 'round'
               el.style.strokeDasharray = `${len + 5} ${len + 5}`

               // Store len on dataset for stagger lookup
               el.dataset.len = len.toString()
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

            // Draw outlines
            tl.fromTo(elementsToAnimate,
               {
                  strokeDashoffset: (i, el) => parseFloat(el.dataset.len || '1000') + 5,
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

            // Fill shapes and leave stroke intact
            tl.to(elementsToAnimate, { fill: '#FF6B35', stroke: '#FF6B35', duration: 0.1, ease: 'power2.inOut' }, ">")

         }).catch(err => {
            console.error("Failed to load newtypo.svg:", err)
         })

      return () => { trigger?.kill() }
   }, [])

   return (
      <div ref={containerRef} className="flex flex-col items-center justify-center w-full z-30 pointer-events-none drop-shadow-md">
         <svg
            ref={svgRef}
            className="w-[90%] max-w-[800px] h-auto drop-shadow-md"
            xmlns="http://www.w3.org/2000/svg"
         />
      </div>
   )
}
