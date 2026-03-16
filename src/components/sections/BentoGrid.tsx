'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { GiCroissant } from 'react-icons/gi'
import { TbCertificate } from 'react-icons/tb'
import { FaCrown } from "react-icons/fa";
import FlourParticlesOverlay from '../ui/FlourParticlesOverlay'

const PROJECTS = [
   {
      title: 'The Clean Label Essentials',
      tag: 'Product Development',
      desc: 'Honest, junk-free breads—from silky toast to golden buns—crafted with simple, real ingredients for a pure, homemade taste.',
      color: '#FF6B35',
      gradientColor: 'rgba(255,107,53,0.15)',
      borderColor: 'rgba(255,107,53,0.3)',
   },
   {
      title: 'Sourdough Scale-Up',
      tag: 'Process Design',
      desc: 'Took an artisan 3-phase sourdough from a 50 kg pilot to 2.5-tonne industrial batches with no flavour compromise.',
      color: '#FF2D78',
      gradientColor: 'rgba(255,45,120,0.15)',
      borderColor: 'rgba(255,45,120,0.3)',
   },
   {
      title: 'Line Efficiency Program',
      tag: 'Display Specialist',
      desc: 'I don’t just bake; I build. By mastering the distinct temperaments of sugar, salt, and cacao, I create bespoke showpieces that serve as the heartbeat of any event. Whether it’s a modern chocolate sculpture or a traditional salt-dough bread display, my work is defined by precision, passion, and a obsession with the impossible build.',
      color: '#FFD23F',
      gradientColor: 'rgba(255,210,63,0.15)',
      borderColor: 'rgba(255,210,63,0.3)',
   },
   {
      title: 'The Wild Yeast Collection',
      tag: 'Product Development',
      desc: 'Wild-yeast sourdoughs and airy, olive-oil classics—long-fermented for a deeper flavor and the perfect, bubbly crunch.',
      color: '#FF6B35',
      gradientColor: 'rgba(255,107,53,0.15)',
      borderColor: 'rgba(255,107,53,0.3)',
   },
   {
      title: 'The All-Butter Viennoiserie',
      tag: 'Product Development',
      desc: 'Golden, 100% butter pastries—shatteringly crisp on the outside and melt-in-your-mouth soft on the inside.',
      color: '#FF6B35',
      gradientColor: 'rgba(255,107,53,0.15)',
      borderColor: 'rgba(255,107,53,0.3)',
   },
]

const CERTIFICATIONS = [
   'HACCP Level 3 — Highfield (U.S. Based)',
   'Health & Safety Essentials — IHG',
   'Basic Food Safety Program — TÜV NORD',
   'IHG Marline Courses',
   'Fire Safety Training',
]

const RESPONSIBILITIES = [
   'Lead & manage quality/quantity of all bakery production across dining & outlets',
   'Oversee baking operations: preparation methods, portion control & food delivery',
   'Develop innovative bakery items to renew hotel menus',
   'Implement stock controls & report exceptions to Executive Pastry Chef',
   'Ensure competency in machine operation & maintain cleanliness standards',
   'Maintain HACCP-compliant hygiene according to hotel & local authority rules',
   'Control food stock and cost in the section',
   'Support Executive Pastry Chef in daily operations',
]

const BIO_WORDS = [
   'Hi,', 'I', 'am', 'Nir', 'Magar', ',', 'a', 'bakery', 'professional', 'with', 'extensive',
   'experience', 'in', 'new', 'product', 'development', 'within', 'the', 'baking', 'industry.',
   'I', 'specialize', 'in', 'formulating', 'a', 'diverse', 'range', 'of', 'baked', 'goods,',
   'from', 'artisanal', 'sourdoughs', 'to', 'pastries,', 'cookies', 'and', 'chocolates.',
   'Driven', 'by', 'creativity,', 'precision,', 'and', 'a', 'passion', 'for', 'baking,',
   'I', 'continuously', 'strive', 'to', 'develop', 'products', 'that', 'combine',
   'craftsmanship,', 'innovation,', 'and', 'operational', 'excellence.',
]

const HIGHLIGHT_WORDS = ['Nir', 'Magar']

const RESPONSIVE_STYLES = `
   .bento-section { padding: 96px 0 80px; }
   .bento-container { max-width: 1280px; margin: 0 auto; padding: 0 32px; }
   .bento-header { text-align: center; margin-bottom: 56px; }

   .bento-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
   }
   .col-full { grid-column: 1 / -1; }
   .col-2    { grid-column: span 2; }
   .col-1    { grid-column: span 1; }

   .achievements-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
   }
   .responsibilities-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 12px;
   }
   .project3-inner {
      display: flex;
      align-items: center;
      gap: 40px;
      flex-wrap: wrap;
   }
   .project3-stats {
      display: flex;
      gap: 40px;
      text-align: center;
      flex-shrink: 0;
   }

   .bio-word {
      display: inline-block;
      margin-right: 5px;
      margin-bottom: 4px;
   }

   .bio-word.highlight {
      color: #FF6B35;
   }

   .bio-divider {
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,107,53,0.5), rgba(255,45,120,0.5), transparent);
      margin: 24px 0;
   }

   .floating-icon {
      animation: floatIcon 4s ease-in-out infinite;
   }
   @keyframes floatIcon {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-6px) rotate(4deg); }
   }

   /* ── Tablet ── */
   @media (max-width: 768px) {
      .bento-grid {
         grid-template-columns: repeat(2, 1fr);
         gap: 14px;
      }
      .col-full { grid-column: 1 / -1; }
      .col-2    { grid-column: 1 / -1; }
      .col-1    { grid-column: span 1; }

      .achievements-grid {
         grid-template-columns: repeat(2, 1fr);
         gap: 20px;
      }
      .responsibilities-grid {
         grid-template-columns: 1fr;
      }
      .project3-inner {
         flex-direction: column !important;
         align-items: flex-start !important;
         gap: 24px !important;
      }
      .project3-stats {
         justify-content: flex-start;
      }
   }

   /* ── Mobile ── */
   @media (max-width: 480px) {
      .bento-section  { padding: 56px 0 40px !important; }
      .bento-container { padding: 0 16px !important; }
      .bento-header   { margin-bottom: 32px !important; }

      .bento-grid {
         grid-template-columns: 1fr;
         gap: 12px;
      }
      .col-full { grid-column: 1 / -1; }
      .col-2    { grid-column: 1 / -1; }
      .col-1    { grid-column: 1 / -1; }

      .achievements-grid {
         grid-template-columns: repeat(2, 1fr);
         gap: 16px;
      }
      .project3-stats {
         justify-content: center;
         width: 100%;
      }
   }
`

function SpotlightCard({
   children,
   style = {},
   innerStyle = {},
   className = '',
}: {
   children: React.ReactNode
   style?: React.CSSProperties
   innerStyle?: React.CSSProperties
   className?: string
}) {
   const cardRef = useRef<HTMLDivElement>(null)
   const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 })

   const onMouseMove = (e: React.MouseEvent) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setSpotlight({ x, y, opacity: 1 })
   }

   return (
      <motion.div
         ref={cardRef}
         className={`glass-card bento-card ${className}`}
         style={{ borderRadius: 20, position: 'relative', overflow: 'hidden', cursor: 'default', ...style }}
         onMouseMove={onMouseMove}
         onMouseLeave={() => setSpotlight(s => ({ ...s, opacity: 0 }))}
         whileHover={{ y: -4 }}
         transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
         <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
            borderRadius: 20, opacity: spotlight.opacity,
            background: `radial-gradient(circle 200px at ${spotlight.x}% ${spotlight.y}%, rgba(255,107,53,0.13), transparent)`,
            transition: 'opacity 0.3s',
         }} />
         <div style={{ position: 'relative', zIndex: 1, height: '100%', ...innerStyle }}>
            {children}
         </div>
      </motion.div>
   )
}

// Wrapper that animates a full row into view on scroll
function RowReveal({
   children,
   delay = 0,
   className = '',
   style = {},
}: {
   children: React.ReactNode
   delay?: number
   className?: string
   style?: React.CSSProperties
}) {
   return (
      <motion.div
         className={className}
         style={style}
         initial={{ opacity: 0, y: 48, filter: 'blur(6px)' }}
         whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
         viewport={{ once: true, margin: '-60px' }}
         transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      >
         {children}
      </motion.div>
   )
}

export default function BentoGrid() {
   return (
      <section id="about" className="bento-section" style={{ width: '100%', background: '#080605', position: 'relative', overflow: 'hidden' }}>
         {/* Full-section flour particle overlay */}
         <FlourParticlesOverlay count={100} position="absolute" />

         <style>{RESPONSIVE_STYLES}</style>

         <div className="bento-container">

            {/* Section header */}
            <motion.div
               className="bento-header"
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
            >
               <div style={{
                  fontSize: 11, fontWeight: 600, letterSpacing: '0.3em',
                  color: '#FF6B35', textTransform: 'uppercase',
                  fontFamily: 'Inter, sans-serif', marginBottom: 14,
               }}>
                  The Lab
               </div>
               <h2 style={{
                  fontFamily: 'Outfit, sans-serif', fontWeight: 900,
                  fontSize: 'clamp(1.8rem, 5vw, 3rem)',
                  color: '#FFF8F0', lineHeight: 1.15, margin: 0,
               }}>
                  Work &amp; <span className="gradient-text">Achievements</span>
               </h2>
            </motion.div>

            {/* ── Bento grid ── */}
            <div className="bento-grid">

               {/* ── Row 1: Bio — full width ── */}
               <RowReveal className="col-full" delay={0}>
                  <SpotlightCard style={{ padding: '40px 36px', overflow: 'hidden' }}>
                     {/* Ambient background orbs */}
                     <div style={{
                        position: 'absolute', top: -60, right: -60, width: 260, height: 260,
                        borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)',
                        pointerEvents: 'none',
                     }} />
                     <div style={{
                        position: 'absolute', bottom: -40, left: '30%', width: 200, height: 200,
                        borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,45,120,0.07) 0%, transparent 70%)',
                        pointerEvents: 'none',
                     }} />

                     <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32, flexWrap: 'wrap' }}>

                        {/* Left: Animated icon cluster */}
                        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                           <motion.div
                              className="floating-icon"
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                              style={{
                                 width: 72, height: 72, borderRadius: 20,
                                 background: 'linear-gradient(135deg, rgba(255,107,53,0.2), rgba(255,45,120,0.15))',
                                 border: '1px solid rgba(255,107,53,0.3)',
                                 display: 'flex', alignItems: 'center', justifyContent: 'center',
                              }}
                           >
                              <GiCroissant size={38} color="#FF6B35" />
                           </motion.div>

                           {/* Vertical accent line */}
                           <motion.div
                              initial={{ scaleY: 0 }}
                              whileInView={{ scaleY: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: 0.6 }}
                              style={{
                                 width: 2, height: 48,
                                 background: 'linear-gradient(to bottom, #FF6B35, transparent)',
                                 transformOrigin: 'top',
                              }}
                           />

                           <motion.div
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 1 }}
                              style={{
                                 width: 8, height: 8, borderRadius: '50%',
                                 background: '#FF2D78',
                                 boxShadow: '0 0 12px #FF2D78',
                              }}
                           />
                        </div>

                        {/* Right: Animated bio text */}
                        <div style={{ flex: 1, minWidth: 240 }}>
                           <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5 }}
                              style={{
                                 fontSize: 13, fontWeight: 600, letterSpacing: '0.3em',
                                 color: '#FF6B35', textTransform: 'uppercase',
                                 fontFamily: 'Inter, sans-serif', marginBottom: 18,
                              }}
                           >
                              About Me
                           </motion.div>

                           <div style={{ lineHeight: 1.95, fontSize: 16, fontFamily: 'Outfit, sans-serif', color: 'rgba(255,248,240,0.85)' }}>
                              {BIO_WORDS.map((word, i) => {
                                 const isHighlight = HIGHLIGHT_WORDS.includes(word)
                                 return (
                                    <motion.span
                                       key={i}
                                       className={`bio-word${isHighlight ? ' highlight' : ''}`}
                                       initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                                       whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                       viewport={{ once: true }}
                                       transition={{
                                          duration: 0.35,
                                          delay: 0.1 + i * 0.03,
                                          ease: 'easeOut',
                                       }}
                                       style={{
                                          fontWeight: isHighlight ? 700 : 400,
                                          color: isHighlight ? '#FF6B35' : undefined,
                                       }}
                                    >
                                       {word}
                                    </motion.span>
                                 )
                              })}
                           </div>

                           <div className="bio-divider" />

                        </div>
                     </div>
                  </SpotlightCard>
               </RowReveal>

               {/* ── Row 2: Crown (1) | Project 1 (2) | Certifications (1) ── */}
               <RowReveal className="col-1" delay={0}>
                  <SpotlightCard
                     style={{ minHeight: 220, padding: '28px 24px', height: '100%' }}
                     innerStyle={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 16 }}
                  >
                     <FaCrown size={48} color="#FFD23F" />
                     <div>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 16, color: '#FFF8F0', marginBottom: 8, lineHeight: 1.3 }}>
                           Private chef of the Prince
                        </div>
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}>
                           Served as a private chef for the palace of his highness crown prince of Fujairah
                        </div>
                     </div>
                     <div style={{ width: '100%', height: 2, borderRadius: 2, background: 'linear-gradient(90deg, transparent, #FF2D78, transparent)' }} />
                  </SpotlightCard>
               </RowReveal>

               <RowReveal className="col-2" delay={0.1}>
                  <SpotlightCard style={{ padding: '28px 30px', height: '100%' }}>
                     <span style={{
                        display: 'inline-block', fontSize: 13, padding: '4px 12px', borderRadius: 999,
                        fontWeight: 600, marginBottom: 14, background: PROJECTS[0].gradientColor,
                        color: PROJECTS[0].color, border: `1px solid ${PROJECTS[0].borderColor}`,
                        fontFamily: 'Inter, sans-serif',
                     }}>
                        {PROJECTS[0].tag}
                     </span>

                     <ul style={{ paddingLeft: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, listStyleType: 'none' }}>
                        {[PROJECTS[0], PROJECTS[3], PROJECTS[4]].map((project, i) => (
                           <li key={i} style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                              <span style={{ color: PROJECTS[0].color, flexShrink: 0, marginTop: 2 }}>•</span>
                              <span><span style={{ fontWeight: 500, color: '#FFF8F0' }}>{project.title}</span> : {project.desc}</span>
                           </li>
                        ))}
                     </ul>

                     <div style={{ marginTop: 20, height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${PROJECTS[0].color}, transparent)` }} />
                  </SpotlightCard>
               </RowReveal>

               <RowReveal className="col-1" delay={0.2}>
                  <SpotlightCard style={{ padding: '24px 22px', height: '100%' }}>
                     <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.2em', color: '#FFD23F', textTransform: 'uppercase', marginBottom: 16, fontFamily: 'Inter, sans-serif' }}>
                        Certifications
                     </div>
                     <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
                        {CERTIFICATIONS.map((c, i) => (
                           <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, fontFamily: 'Inter, sans-serif' }}>
                              <TbCertificate size={14} color="#FF6B35" style={{ flexShrink: 0, marginTop: 2 }} />
                              {c}
                           </li>
                        ))}
                     </ul>
                  </SpotlightCard>
               </RowReveal>

               <RowReveal className="col-full" delay={0}>
                  <SpotlightCard style={{ padding: '32px 28px', height: '100%' }}>
                     <span style={{
                        display: 'inline-block', fontSize: 13, padding: '4px 12px', borderRadius: 999,
                        fontWeight: 600, marginBottom: 14, background: PROJECTS[2].gradientColor,
                        color: PROJECTS[2].color, border: `1px solid ${PROJECTS[2].borderColor}`,
                        fontFamily: 'Inter, sans-serif',
                     }}>
                        {PROJECTS[2].tag}
                     </span>
                     <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
                        {PROJECTS[2].desc}
                     </p>
                     <div style={{ marginTop: 20, height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${PROJECTS[2].color}, transparent)` }} />
                  </SpotlightCard>
               </RowReveal>

            </div>
         </div>
      </section>
   )
}