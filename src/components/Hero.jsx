import { useRef, memo } from "react"

import { HERO_CONTENT } from "../constants"
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { useTheme } from "../context/ThemeContext"
import Magnetic from "./Magnetic"
import { useReducedMotion } from "../hooks/useReducedMotion"
import { DESIGN_CONFIG } from "../constants/design"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import GsapReveal from "./GsapReveal"





// Theme-specific decorative elements - optimized for performance
const ThemeDecoration = ({ theme, isLowPerf }) => {
  // Reduce elements on mobile/low-perf devices
  const elementCount = isLowPerf ? 5 : 15
  const particleCount = isLowPerf ? 4 : 10
  const starCount = isLowPerf ? 8 : 25
  const dotCount = isLowPerf ? 6 : 18

  if (isLowPerf) {
    // Simplified static decorations for mobile/low-perf
    switch (theme) {
      case 'emerald':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <div className="absolute left-[10%] top-0 w-px h-full bg-gradient-to-b from-transparent via-green-500/30 to-transparent" />
            <div className="absolute left-[90%] top-0 w-px h-full bg-gradient-to-b from-transparent via-green-500/30 to-transparent" />
          </div>
        )
      case 'solar':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-radial from-orange-400/20 via-yellow-300/10 to-transparent blur-3xl" />
          </div>
        )
      case 'cosmic':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-64 md:h-64 rounded-full bg-purple-500/10 blur-[60px]" />
          </div>
        )
      case 'midnight':
      default:
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-72 md:h-72 rounded-full bg-indigo-500/10 blur-[80px]" />
          </div>
        )
    }
  }

  // Full animations for desktop
  switch (theme) {
    case 'emerald':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(elementCount)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-green-500/60 font-mono text-sm md:text-lg font-bold hidden md:block gpu-accel"
              style={{
                left: `${5 + (i * 7) % 90}%`,
                top: `${10 + (i * 13) % 80}%`
              }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                y: [0, -10, 0],
              }}
              transition={{ duration: 3 + i * 0.2, repeat: Infinity, delay: i * 0.15 }}
            >
              {['</', '{}', '()', '=>', '[]', '/>', 'fn', '&&', '||', '::', '++', '--', '/*', '*/', '//'][i]}
            </motion.div>
          ))}
          <motion.div
            className="absolute left-[10%] top-0 w-px h-full bg-gradient-to-b from-transparent via-green-500/20 to-transparent"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute left-[90%] top-0 w-px h-full bg-gradient-to-b from-transparent via-green-500/20 to-transparent"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          />
        </div>
      )
    case 'solar':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-20 md:-top-40 -right-20 md:-right-40 w-64 h-64 md:w-[500px] md:h-[500px] rounded-full bg-gradient-radial from-orange-400/25 via-yellow-300/15 to-transparent blur-3xl gpu-accel"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 right-0 origin-top-right hidden md:block"
              style={{
                width: '2px',
                height: '150px',
                background: 'linear-gradient(to bottom, rgba(255,160,50,0.4), transparent)',
                transform: `rotate(${-20 - i * 12}deg) translateX(100px)`
              }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
          {[...Array(particleCount)].map((_, i) => (
            <motion.div
              key={`p-${i}`}
              className="absolute w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-orange-400/50 hidden sm:block gpu-accel"
              style={{ left: `${20 + i * 8}%`, top: `${15 + (i * 9) % 60}%` }}
              animate={{ y: [0, -15, 0], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
      )
    case 'cosmic':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 rounded-full bg-purple-500/10 blur-[80px] gpu-accel"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          {[...Array(starCount)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-purple-300 gpu-accel"
              style={{
                left: `${(i * 17) % 95}%`,
                top: `${(i * 13) % 90}%`,
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{ duration: 2 + (i % 4) * 0.5, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
          <motion.div
            className="absolute w-16 md:w-20 h-0.5 bg-gradient-to-r from-purple-400 to-transparent rounded-full hidden md:block gpu-accel"
            initial={{ left: '80%', top: '10%', rotate: 45 }}
            animate={{ left: ['80%', '20%'], top: ['10%', '50%'], opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
          />
        </div>
      )
    case 'midnight':
    default:
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-[400px] md:h-[400px] rounded-full bg-indigo-500/10 blur-[100px] gpu-accel"
            animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          {[...Array(dotCount)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-indigo-400 hidden sm:block gpu-accel"
              style={{
                left: `${(i * 11) % 90 + 5}%`,
                top: `${(i * 17) % 85 + 5}%`,
                width: `${3 + (i % 2) * 2}px`,
                height: `${3 + (i % 2) * 2}px`
              }}
              animate={{
                opacity: [0.2, 0.7, 0.2],
                y: [0, -8, 0]
              }}
              transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
          <div className="absolute inset-0 opacity-[0.02] hidden md:block" style={{
            backgroundImage: 'linear-gradient(to right, var(--accent) 1px, transparent 1px), linear-gradient(to bottom, var(--accent) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>
      )
  }
}

const Hero = () => {
  const { theme } = useTheme()
  const isLowPerf = useReducedMotion()
  const heroRef = useRef(null)

  useGSAP(() => {
    if (isLowPerf) return

    gsap.to(".hero-parallax", {
      yPercent: -30,


      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    })
  }, { scope: heroRef, dependencies: [isLowPerf] })

  return (
    <div ref={heroRef} className="pb-4 lg:mb-36 relative min-h-[50vh] md:min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center">

      <ThemeDecoration theme={theme} isLowPerf={isLowPerf} />

      <div className="flex flex-col items-center justify-center text-center relative z-10 px-4 pt-12 md:pt-0">
        {/* Image Section - Commented Out
        <div className="w-full lg:w-1/2">
          <div className="flex justify-center lg:p-12">
            <div className="relative group">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 1.8 }}
                className="absolute -inset-1 bg-[color:var(--accent)] rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"
              />
              <motion.img
                src={profilePicture}
                alt="Tanmoy Debnath"
                priority="true"
                fetchPriority="high"
                className="relative border border-stone-800/10 rounded-3xl grayscale-[0.2] brightness-[0.9] contrast-[1.1] sepia-[0.1] hover:grayscale-0 hover:brightness-100 transition-[filter,box-shadow,transform] duration-700 shadow-2xl w-[300px] md:w-[400px] lg:w-[500px] gpu-accel will-change-[filter]"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[color:color-mix(in_srgb,var(--accent),transparent_90%)] via-transparent to-[color:color-mix(in_srgb,var(--accent),transparent_95%)] pointer-events-none mix-blend-overlay" />
            </div>
          </div>
        </div>
        */}

        <GsapReveal stagger={0.2} y={50}>
          <div className="flex flex-col items-center max-w-5xl hero-parallax">


            <h1
              className={`[color:var(--text-primary)] leading-none text-center ${DESIGN_CONFIG.HEADERS.H1}`}
              style={{
                fontFamily: 'var(--font-name)',
                textShadow: '0 4px 60px rgba(0,0,0,0.5)'
              }}
            >
              Tanmoy{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--accent) 0%, #4f46e5 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Debnath
              </span>
            </h1>
            <div className="mt-8 h-[50px] md:h-[60px] lg:h-[80px]">
              <TypeAnimation
                sequence={[
                  'Backend Developer',
                  2000,
                  'Automation Engineer',
                  2000,
                  'Problem Solver',
                  2000
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="block bg-gradient-to-r from-stone-300 to-stone-600 bg-clip-text text-2xl md:text-3xl lg:text-4xl tracking-tight text-transparent font-medium"
                style={{ backgroundImage: 'linear-gradient(to right, var(--text-primary), var(--text-secondary))', fontFamily: 'var(--font-display)' }}
              />
            </div>
            <p
              className="my-6 max-w-3xl py-2 text-base md:text-lg lg:text-xl leading-relaxed tracking-tight [color:var(--text-secondary)] font-light"
            >
              {HERO_CONTENT}
            </p>
            <div>
              <Magnetic>
                <a
                  href="/TanmoyDebnath_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="rounded-full px-8 md:px-10 py-3 md:py-4 text-sm md:text-base font-semibold transition-all duration-300 shadow-xl active:scale-95 [background-color:var(--text-primary)] [color:var(--bg-primary)] hover:[background-color:var(--accent)] hover:text-white inline-block cursor-none"
                >
                  Download Resume
                </a>
              </Magnetic>
            </div>
          </div>
        </GsapReveal>

      </div>
    </div>
  )
}

export default memo(Hero)
