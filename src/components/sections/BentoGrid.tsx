'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { GiCroissant, GiCakeSlice, GiFireBowl } from 'react-icons/gi'
import { PiMedalFill, PiTrophyFill } from 'react-icons/pi'
import { MdFactory } from 'react-icons/md'
import { LuAward } from 'react-icons/lu'
import { TbCertificate } from 'react-icons/tb'

const ACHIEVEMENTS = [
   { icon: PiTrophyFill, color: '#FFD23F', label: 'Employee (Supervisor) of the Quarter — Kempinski Hotel' },
   { icon: LuAward, color: '#FF6B35', label: 'Award from St. Regis Hotel Saadiyat Island, Abu Dhabi' },
   { icon: GiCakeSlice, color: '#FF2D78', label: 'Salt, Sugar & Chocolate Display Specialist' },
   { icon: GiFireBowl, color: '#FF6B35', label: 'Certified Fire Safety & IHG Marline Courses' },
]

const PROJECTS = [
   {
      title: 'Clean Label Reformulation',
      tag: 'Product Development',
      desc: 'Eliminated all E-number additives while maintaining 35-day shelf life through natural antimicrobial hurdle technology.',
      color: '#FF6B35',
      gradientColor: 'rgba(255,107,53,0.15)',
      borderColor: 'rgba(255,107,53,0.3)',
   },
   {
      title: 'Sourdough Scale-Up',
      tag: 'Process Engineering',
      desc: 'Took an artisan 3-phase sourdough from a 50 kg pilot to 2.5-tonne industrial batches with no flavour compromise.',
      color: '#FF2D78',
      gradientColor: 'rgba(255,45,120,0.15)',
      borderColor: 'rgba(255,45,120,0.3)',
   },
   {
      title: 'Line Efficiency Program',
      tag: 'Process Optimization',
      desc: 'Implemented SPC monitoring and preventive maintenance scheduling, cutting downtime losses by 22%.',
      color: '#FFD23F',
      gradientColor: 'rgba(255,210,63,0.15)',
      borderColor: 'rgba(255,210,63,0.3)',
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

export default function BentoGrid() {
   return (
      <section id="about" className="bento-section" style={{ width: '100%', background: '#080605' }}>

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

               {/* ── Row 1: Honours & Awards — full width ── */}
               <SpotlightCard className="col-full" style={{ padding: '32px 28px' }}>
                  <div style={{
                     fontSize: 10, fontWeight: 600, letterSpacing: '0.2em',
                     color: '#FFD23F', textTransform: 'uppercase',
                     fontFamily: 'Inter, sans-serif', marginBottom: 24,
                  }}>
                     Honours &amp; Awards
                  </div>
                  <div className="achievements-grid">
                     {ACHIEVEMENTS.map((a, i) => (
                        <motion.div
                           key={i}
                           initial={{ opacity: 0, scale: 0.8 }}
                           whileInView={{ opacity: 1, scale: 1 }}
                           viewport={{ once: true }}
                           transition={{ delay: i * 0.1 }}
                           style={{ textAlign: 'center' }}
                        >
                           <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
                              <a.icon size={40} color={a.color} />
                           </div>
                           <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
                              {a.label}
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </SpotlightCard>

               {/* ── Row 2: Kempinski (1) | Project 1 (2) | Certifications (1) ── */}

               <SpotlightCard
                  className="col-1"
                  style={{ minHeight: 220, padding: '28px 24px' }}
                  innerStyle={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 16 }}
               >
                  <PiTrophyFill size={48} color="#FFD23F" />
                  <div>
                     <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 16, color: '#FFF8F0', marginBottom: 8, lineHeight: 1.3 }}>
                        Supervisor of the Quarter
                     </div>
                     <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}>
                        Kempinski Hotel — outstanding leadership &amp; production excellence
                     </div>
                  </div>
                  <div style={{ width: '100%', height: 2, borderRadius: 2, background: 'linear-gradient(90deg, transparent, #FF2D78, transparent)' }} />
               </SpotlightCard>

               <SpotlightCard className="col-2" style={{ padding: '28px 30px' }}>
                  <span style={{
                     display: 'inline-block', fontSize: 11, padding: '4px 12px', borderRadius: 999,
                     fontWeight: 600, marginBottom: 14, background: PROJECTS[0].gradientColor,
                     color: PROJECTS[0].color, border: `1px solid ${PROJECTS[0].borderColor}`,
                     fontFamily: 'Inter, sans-serif',
                  }}>
                     {PROJECTS[0].tag}
                  </span>
                  <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 20, color: '#FFF8F0', marginBottom: 12 }}>
                     {PROJECTS[0].title}
                  </h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
                     {PROJECTS[0].desc}
                  </p>
                  <div style={{ marginTop: 20, height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${PROJECTS[0].color}, transparent)` }} />
               </SpotlightCard>

               <SpotlightCard className="col-1" style={{ padding: '24px 22px' }}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', color: '#FFD23F', textTransform: 'uppercase', marginBottom: 16, fontFamily: 'Inter, sans-serif' }}>
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

               {/* ── Row 3: Project 2 (2) | St. Regis (1) | Industrial Scale (1) ── */}

               <SpotlightCard className="col-2" style={{ padding: '28px 30px' }}>
                  <span style={{
                     display: 'inline-block', fontSize: 11, padding: '4px 12px', borderRadius: 999,
                     fontWeight: 600, marginBottom: 14, background: PROJECTS[1].gradientColor,
                     color: PROJECTS[1].color, border: `1px solid ${PROJECTS[1].borderColor}`,
                     fontFamily: 'Inter, sans-serif',
                  }}>
                     {PROJECTS[1].tag}
                  </span>
                  <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 20, color: '#FFF8F0', marginBottom: 12 }}>
                     {PROJECTS[1].title}
                  </h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
                     {PROJECTS[1].desc}
                  </p>
                  <div style={{ marginTop: 20, height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${PROJECTS[1].color}, transparent)` }} />
               </SpotlightCard>

               <SpotlightCard
                  className="col-1"
                  style={{ minHeight: 200, padding: '28px 24px' }}
                  innerStyle={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 16 }}
               >
                  <PiMedalFill size={44} color="#FF6B35" />
                  <div>
                     <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 16, color: '#FFF8F0', marginBottom: 8, lineHeight: 1.3 }}>
                        St. Regis Award
                     </div>
                     <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}>
                        Saadiyat Island, Abu Dhabi — excellence in luxury hospitality baking
                     </div>
                  </div>
                  <div style={{ width: '100%', height: 2, borderRadius: 2, background: 'linear-gradient(90deg, transparent, #FFD23F, transparent)' }} />
               </SpotlightCard>

               <SpotlightCard
                  className="col-1"
                  style={{ padding: '28px 22px' }}
                  innerStyle={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 10 }}
               >
                  <MdFactory size={40} color="#FF6B35" />
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 14, color: '#FFF8F0' }}>Industrial Scale</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
                     2.5-tonne batch capacity across sourdough lines
                  </div>
               </SpotlightCard>

               {/* ── Row 4: Project 3 — full width ── */}
               <SpotlightCard className="col-full" style={{ padding: '28px 32px' }}>
                  <div className="project3-inner">
                     <div style={{ flex: 1, minWidth: 0 }}>
                        <span style={{
                           display: 'inline-block', fontSize: 11, padding: '4px 12px', borderRadius: 999,
                           fontWeight: 600, marginBottom: 14, background: PROJECTS[2].gradientColor,
                           color: PROJECTS[2].color, border: `1px solid ${PROJECTS[2].borderColor}`,
                           fontFamily: 'Inter, sans-serif',
                        }}>
                           {PROJECTS[2].tag}
                        </span>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 20, color: '#FFF8F0', marginBottom: 12 }}>
                           {PROJECTS[2].title}
                        </h3>
                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
                           {PROJECTS[2].desc}
                        </p>
                     </div>
                     <div className="project3-stats">
                        <div>
                           <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 40, color: '#FFD23F' }}>22%</div>
                           <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Downtime Reduced</div>
                        </div>
                        <div>
                           <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 40, color: '#FF6B35' }}>SPC</div>
                           <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Monitoring Deployed</div>
                        </div>
                     </div>
                  </div>
               </SpotlightCard>

               {/* ── Row 5: Responsibilities — full width ── */}
               <SpotlightCard className="col-full" style={{ padding: '32px 28px' }}>
                  <div style={{
                     fontSize: 10, fontWeight: 600, letterSpacing: '0.2em',
                     color: '#FF2D78', textTransform: 'uppercase',
                     fontFamily: 'Inter, sans-serif', marginBottom: 8,
                  }}>
                     Role
                  </div>
                  <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 22, color: '#FFF8F0', marginBottom: 24 }}>
                     Head Baker — Responsibilities
                  </h3>
                  <div className="responsibilities-grid">
                     {RESPONSIBILITIES.map((r, i) => (
                        <motion.div
                           key={i}
                           initial={{ opacity: 0, x: -10 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: i * 0.05 }}
                           style={{
                              display: 'flex', alignItems: 'flex-start', gap: 10,
                              fontSize: 13, color: 'rgba(255,255,255,0.65)',
                              lineHeight: 1.6, fontFamily: 'Inter, sans-serif',
                           }}
                        >
                           <GiCroissant size={14} color="#FF6B35" style={{ flexShrink: 0, marginTop: 3 }} />
                           {r}
                        </motion.div>
                     ))}
                  </div>
               </SpotlightCard>

            </div>
         </div>
      </section>
   )
}