'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { CardData } from './SocialCardsSection'

interface SocialCardProps {
   card: CardData;
   index: number;
   totalCards: number;
   hoveredIndex: number | null;
   setHoveredIndex: (idx: number | null) => void;
   mouseX: number;
   mouseY: number;
}

export default function SocialCard({
   card,
   index,
   totalCards,
   hoveredIndex,
   setHoveredIndex,
   mouseX, // Local mouse coords from section (-1 to 1)
   mouseY,
}: SocialCardProps) {
   const cardRef = useRef<HTMLDivElement>(null)

   // Calculate spreading when a card is hovered
   // If no card is hovered, they overlap tightly.
   // If a card is hovered, others spread out.
   const isHovered = hoveredIndex === index
   const isAnyHovered = hoveredIndex !== null

   // Initial stack offset
   const baseOffset = (index - (totalCards - 1) / 2) * 50 // px translation
   const baseRotate = (index - (totalCards - 1) / 2) * 4 // deg rotation

   // Hover state calculations
   let xOffset = baseOffset
   let rotateZ = baseRotate
   let zIndex = index
   let zOffset = 0
   let scale = 1

   if (isAnyHovered) {
      if (isHovered) {
         xOffset = 0 // Centered
         rotateZ = 0 // Facing straight
         zIndex = 50
         zOffset = 100 // Forward on Z
         scale = 1.05
      } else {
         // Push others to the side
         const distance = index - hoveredIndex!
         xOffset = distance > 0 ? baseOffset + 150 : baseOffset - 150
         rotateZ = distance > 0 ? baseRotate + 5 : baseRotate - 5
         scale = 0.9
         zOffset = -50
         zIndex = index < hoveredIndex! ? index : totalCards - index
      }
   }

   // Parallax for the background image inside the card based on mouse move
   // Only prominent when this specific card is hovered, or subtly always
   const parallaxX = isHovered ? mouseX * 20 : mouseX * 5
   const parallaxY = isHovered ? mouseY * 20 : mouseY * 5

   const Icon = card.icon

   return (
      <motion.div
         ref={cardRef}
         className="absolute top-1/2 left-1/2 origin-center cursor-pointer shadow-2xl"
         style={{ zIndex }}
         initial={{ x: '-50%', y: '-50%' }}
         animate={{
            x: `calc(-50% + ${xOffset}px)`,
            y: '-50%',
            rotateZ: rotateZ,
            z: zOffset,
            scale: scale,
         }}
         transition={{
            type: 'spring',
            stiffness: 200,
            damping: 25,
            mass: 1
         }}
         onMouseEnter={() => setHoveredIndex(index)}
         onMouseLeave={() => setHoveredIndex(null)}
      >
         {/* Card Body */}
         <div 
            className="relative w-[280px] h-[400px] md:w-[320px] md:h-[460px] rounded-2xl overflow-hidden glass-card group"
            style={{
               // Highlight the border slightly when hovered
               borderColor: isHovered ? card.color : 'rgba(255, 255, 255, 0.08)'
            }}
         >
            {/* Background Image with parallax and zoom */}
            <motion.div 
               className="absolute inset-[-10%] w-[120%] h-[120%] bg-cover bg-center transition-transform duration-700 ease-out"
               style={{ 
                  backgroundImage: `url(${card.bgImage})`,
               }}
               animate={{
                  x: parallaxX,
                  y: parallaxY,
                  scale: isHovered ? 1.05 : 1
               }}
            />

            {/* Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Glowing border effect behind content */}
            {isHovered && (
               <div 
                  className="absolute inset-0 opacity-50 blur-2xl transition-opacity duration-300 pointer-events-none"
                  style={{ backgroundColor: card.color }}
               />
            )}

            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
               <div className="flex justify-between items-start">
                  <div 
                     className="w-12 h-12 rounded-full glass flex items-center justify-center transition-transform duration-300"
                     style={{ 
                        transform: isHovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1)',
                        color: isHovered ? card.color : 'white'
                     }}
                  >
                     <Icon className="w-6 h-6" />
                  </div>
                  <div className="glass px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase transition-colors"
                       style={{ color: isHovered ? card.color : 'rgba(255,255,255,0.7)' }}>
                     {card.handle}
                  </div>
               </div>
               
               <div className="transform transition-transform duration-500" style={{ y: isHovered ? 0 : 5 }}>
                  <h3 className="text-3xl font-display font-bold mb-1 text-white group-hover:drop-shadow-lg">{card.platform}</h3>
                  <p className="text-sm font-light text-white/70 line-clamp-2">{card.description}</p>
                  
                  {/* Faux button that reveals on hover */}
                  <motion.div 
                     className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider overflow-hidden"
                     style={{ color: card.color }}
                     initial={{ opacity: 0, height: 0 }}
                     animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
                  >
                     <span>Explore</span>
                     <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                     </svg>
                  </motion.div>
               </div>
            </div>
         </div>
      </motion.div>
   )
}
