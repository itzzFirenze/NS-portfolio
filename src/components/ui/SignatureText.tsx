'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import opentype from 'opentype.js'

gsap.registerPlugin(ScrollTrigger)

// Shifted the Y values up by 40 pixels to avoid overlapping with the bottom text/buttons
const LINES = [
   { text: 'crafting', y: 50 },
   { text: 'the perfect', y: 120 },
   { text: 'recipe', y: 190 },
]
const FONT_SIZE = 80
const VIEWBOX_WIDTH = 700

export default function SignatureText() {
   const svgRef = useRef<SVGSVGElement>(null)

   useEffect(() => {
      let trigger: ScrollTrigger

      opentype.load('/fonts/Caveat-Bold.ttf').then(font => {
         const svg = svgRef.current
         if (!svg) return

         const paths: SVGPathElement[] = []

         LINES.forEach(({ text, y }) => {
            // Dynamically center the text by measuring its width in pixels for this font size
            const textWidth = font.getAdvanceWidth(text, FONT_SIZE)
            const x = (VIEWBOX_WIDTH - textWidth) / 2

            const otPath = font.getPath(text, x, y, FONT_SIZE)
            const contours = otPath.toPathData(2).match(/M[^M]+/g) || []

            contours.forEach(d => {
               const el = document.createElementNS('http://www.w3.org/2000/svg', 'path')
               el.setAttribute('d', d.trim())
               el.style.fill = 'none'
               el.style.stroke = '#FF6B35'
               el.style.strokeWidth = '3'
               el.style.strokeLinecap = 'round'
               el.style.strokeLinejoin = 'round'
               svg.appendChild(el)

               const len = el.getTotalLength() || 1000
               // Add a slight buffer (+5) to prevent SVG dot artifacts due to rounding/antialiasing
               el.style.strokeDasharray = `${len + 5} ${len + 5}`
               // We will let GSAP set the initial offset via fromTo
               paths.push(el)
            })
         })

         const tl = gsap.timeline()

         trigger = ScrollTrigger.create({
            animation: tl,
            trigger: '#hero',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
         })

         tl.fromTo(paths,
            {
               strokeDashoffset: (i, el) => (el.getTotalLength() || 1000) + 5,
               opacity: 0
            },
            {
               strokeDashoffset: 0,
               opacity: 1,
               ease: 'none',
               stagger: 0.2, // Tighter stagger so it completes before the end of the scroll
            })
      }).catch(err => {
         console.error("Failed to load Caveat TTF for opentype rendering:", err)
      })

      return () => { trigger?.kill() }
   }, [])

   return (
      <svg
         ref={svgRef}
         viewBox="0 0 700 340"
         className="absolute inset-0 w-full h-full z-30 pointer-events-none drop-shadow-md"
         xmlns="http://www.w3.org/2000/svg"
      />
   )
}
