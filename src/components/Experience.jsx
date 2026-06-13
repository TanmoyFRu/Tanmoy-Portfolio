import { EXPERIENCES } from "../constants"
import { motion } from "framer-motion"
import { memo, useRef } from "react"
import { DESIGN_CONFIG } from "../constants/design"
import GsapReveal from "./GsapReveal"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"




const TimelinePath = ({ containerRef }) => {
    const lineRef = useRef(null)

    useGSAP(() => {
        if (!lineRef.current) return

        gsap.fromTo(lineRef.current, {
            scaleY: 0,
            transformOrigin: "top",
        }, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 20%",
                end: "bottom 80%",
                scrub: 0.5,
            }
        })
    }, { scope: containerRef })

    return (
        <div className="hidden md:block absolute left-10 md:left-1/2 top-0 bottom-0 w-[2px] bg-[var(--border-color)]/30 overflow-hidden">
            <div
                ref={lineRef}
                className="w-full h-full bg-gradient-to-b from-[var(--accent)] via-[var(--accent)] to-transparent shadow-[0_0_10px_var(--accent)]"
            />
        </div>
    )
}

const ExperienceCard = ({ experience, index }) => {
    const isEven = index % 2 === 0

    return (
        <div className={`relative flex flex-col md:flex-row items-start justify-between mb-16 md:mb-24 w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
            {/* Logo Marker on Timeline */}
            <GsapReveal y={30} delay={index * 0.1} className="hidden md:block absolute left-10 md:left-1/2 md:ml-[-24px] top-6 z-20">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-2 border-[var(--accent)] shadow-[0_0_20px_rgba(var(--accent-rgb),0.2)] flex items-center justify-center p-0 backdrop-blur-3xl transform -translate-x-1/2 md:translate-x-0 group hover:scale-110 transition-transform duration-500 overflow-hidden">
                    <img
                        src={experience.logo}
                        alt={experience.company}
                        className="w-full h-full object-contain transition-all duration-500"
                    />
                </div>
            </GsapReveal>

            {/* Content Card */}
            <div className={`w-full md:w-[45%] text-left ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                <GsapReveal y={30} delay={index * 0.1}>
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="p-1 rounded-3xl bg-gradient-to-br from-[var(--border-color)]/50 to-transparent hover:from-[var(--accent)]/50 transition-all duration-500 group"
                    >
                        <div className="bg-[var(--bg-secondary)]/90 backdrop-blur-xl p-8 rounded-[1.4rem] border border-[var(--border-color)] group-hover:border-[var(--accent)]/50 transition-colors">
                            {/* Header (No Logo here anymore) */}
                            <div className={`flex flex-col gap-2 mb-6 ${isEven ? 'items-start' : 'md:items-end items-start'}`}>
                                <h3 className={`font-bold [color:var(--text-primary)] group-hover:[color:var(--accent)] transition-colors ${DESIGN_CONFIG.HEADERS.H3}`}>
                                    {experience.company}
                                </h3>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-black tracking-widest text-[var(--accent)] uppercase opacity-80">
                                        {experience.year}
                                    </span>
                                </div>
                                <h4 className="text-lg md:text-xl font-semibold [color:var(--text-primary)] opacity-90 mt-2">
                                    {experience.role}
                                </h4>
                            </div>

                            {/* Achievements List */}
                            <ul className={`space-y-4 mb-8 ${isEven ? 'text-left' : 'md:text-right text-left'}`}>
                                {experience.highlights.map((highlight, i) => (
                                    <li key={i} className={`flex gap-3 text-sm md:text-base leading-relaxed [color:var(--text-secondary)] opacity-70 group-hover:opacity-100 transition-opacity ${isEven ? 'items-start' : 'md:flex-row-reverse items-start'}`}>
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0 shadow-[0_0_5px_var(--accent)]" />
                                        <span>{highlight}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Tech Stack Pills */}
                            <div className={`flex flex-wrap gap-2 ${isEven ? 'justify-start' : 'md:justify-end justify-start'}`}>
                                {experience.technologies.map((tech, i) => (
                                    <span key={i} className="px-3 py-1 text-[10px] font-bold bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-secondary)] group-hover:text-[var(--accent)] group-hover:border-[var(--accent)]/30 transition-all">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </GsapReveal>
            </div>

            {/* Spacer for the other side */}
            <div className="hidden md:block w-[45%]" />
        </div>
    )
}

const Experience = () => {
    const containerRef = useRef(null)

    // Ensure ScrollTrigger refreshes when component mounts to fix loading issues
    useGSAP(() => {
        ScrollTrigger.refresh()
    }, { scope: containerRef })

    return (
        <section id="experience" ref={containerRef} className="relative py-24 border-t [border-color:var(--border-color)] overflow-hidden">
            <GsapReveal y={50}>
                <h2 className={`mb-24 text-center [color:var(--text-primary)] ${DESIGN_CONFIG.HEADERS.H2}`}>
                    Where I Built
                </h2>
            </GsapReveal>

            <div className="max-w-7xl mx-auto px-6 relative">
                <TimelinePath containerRef={containerRef} />

                <div className="relative">
                    {EXPERIENCES.map((exp, index) => (
                        <ExperienceCard key={index} experience={exp} index={index} />
                    ))}
                </div>
            </div>

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `radial-gradient(var(--accent) 0.5px, transparent 0.5px)`, backgroundSize: '30px 30px' }} />
        </section>
    )
}

export default memo(Experience)
