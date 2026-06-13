import { useState, useEffect, useRef, memo } from "react"
import { ABOUT_TEXT } from "../constants"
import { motion, useInView } from "framer-motion"
import { FaMapMarkerAlt, FaClock, FaCircle, FaCode, FaBriefcase, FaRocket, FaTerminal, FaSun, FaStar, FaMoon } from "react-icons/fa"
import { useTheme } from "../context/ThemeContext"
import { DESIGN_CONFIG } from "../constants/design"
import GsapReveal from "./GsapReveal"


// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime = null
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [isInView, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

// Separate Clock component to prevent full re-renders
const LocalTime = memo(() => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  })

  return <p className="[color:var(--text-primary)] text-sm font-mono">{formattedTime}</p>
})

LocalTime.displayName = "LocalTime"

// Theme-specific decoration icon for stats
const ThemeIcon = ({ theme }) => {
  const iconClass = "text-[8px] [color:var(--accent)] opacity-60"
  switch (theme) {
    case 'emerald': return <FaTerminal className={iconClass} />
    case 'solar': return <FaSun className={iconClass} />
    case 'cosmic': return <FaStar className={iconClass} />
    case 'midnight':
    default: return <FaMoon className={iconClass} />
  }
}

const About = () => {
  const { theme } = useTheme()

  const startDate = new Date(2025, 8, 1)
  const endDate = new Date(2026, 5, 1)
  const experienceMonths = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24 * 30))

  const stats = [
    { icon: FaBriefcase, value: experienceMonths, suffix: "+", label: "Months Experience" },
    { icon: FaRocket, value: 22, suffix: "", label: "Projects Built" },
    { icon: FaCode, value: 7, suffix: "+", label: "Technologies" },
  ]

  return (
    <div className="pb-24">
      <GsapReveal y={50} delay={0.2}>
        <h2
          className={`my-20 text-center [color:var(--text-primary)] ${DESIGN_CONFIG.HEADERS.H2}`}
        >
          The Engineer
        </h2>

      </GsapReveal>


      <div className="flex flex-wrap lg:flex-nowrap items-stretch justify-center gap-6 md:gap-8 max-w-6xl mx-auto px-4">
        {/* Main About Text */}
        <motion.div
          className="w-full lg:w-3/5 [background-color:rgba(var(--bg-secondary),0.2)] border [border-color:var(--border-color)] p-6 md:p-8 lg:p-12 rounded-2xl md:rounded-[2.5rem] blur-optimized gpu-accel"
          style={{ backgroundColor: 'color-mix(in srgb, var(--bg-secondary), transparent 80%)' }}
        >
          <p className="text-sm md:text-base lg:text-lg leading-relaxed tracking-tight [color:var(--text-secondary)] font-light text-justify">
            {ABOUT_TEXT}
          </p>
        </motion.div>


        {/* Right Column - Stats & Status */}
        <div className="w-full lg:w-2/5 grid grid-cols-1 gap-4">
          {/* Animated Stats Cards */}
          <GsapReveal stagger={0.1} y={30} delay={0.4}>
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative overflow-hidden [background-color:rgba(var(--bg-secondary),0.4)] border [border-color:var(--border-color)] p-4 rounded-2xl blur-optimized hover:border-[color:var(--accent)] transition-all duration-500 text-center gpu-accel"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--bg-secondary), transparent 60%)' }}
                >

                  {/* Theme decoration in corner */}
                  <div className="absolute top-2 right-2">
                    <ThemeIcon theme={theme} />
                  </div>

                  <stat.icon className="mx-auto text-xl [color:var(--accent)] mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-2xl font-bold [color:var(--text-primary)]">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-[10px] [color:var(--text-secondary)] opacity-60 uppercase tracking-wide mt-1">
                    {stat.label}
                  </p>
                  {/* Glow on hover */}
                  <div className="absolute inset-0 [background-color:var(--accent)] opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl" />
                </motion.div>
              ))}
            </div>
          </GsapReveal>


          {/* Live Status Card */}
          <motion.div
            className="group relative overflow-hidden [background-color:rgba(var(--bg-secondary),0.4)] border [border-color:var(--border-color)] p-8 rounded-[2.5rem] blur-optimized hover:border-[color:var(--accent)] transition-all duration-500 gpu-accel"
            style={{ backgroundColor: 'color-mix(in srgb, var(--bg-secondary), transparent 60%)' }}
          >

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold [color:var(--text-secondary)] uppercase tracking-widest opacity-70">Current Status</h3>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                  <FaCircle className="text-[6px] text-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-green-500 uppercase">Available</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl [background-color:var(--bg-secondary)] flex items-center justify-center [color:var(--accent)] border [border-color:var(--border-color)]">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="text-[10px] [color:var(--text-secondary)] font-bold uppercase opacity-60">Location</p>
                    <p className="[color:var(--text-primary)] text-sm">Agartala, India 🇮🇳</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl [background-color:var(--bg-secondary)] flex items-center justify-center [color:var(--accent)] border [border-color:var(--border-color)]">
                    <FaClock />
                  </div>
                  <div>
                    <p className="text-[10px] [color:var(--text-secondary)] font-bold uppercase opacity-60">Local Time</p>
                    <LocalTime />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t [border-color:var(--border-color)] opacity-50">
                <p className="text-xs [color:var(--text-secondary)] leading-relaxed font-light italic">
                  "Always exploring the intersection of automation and elegant backend design."
                </p>
              </div>
            </div>
            {/* Decorative Background Glow */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 [background-color:var(--accent)] opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-500" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default memo(About)
