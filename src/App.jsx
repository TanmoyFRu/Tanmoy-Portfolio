import { useEffect, useState } from "react"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import Projects from "./components/Projects"
import Technologies from "./components/Technologies"
import Experience from "./components/Experience"
import Education from "./components/Education"
import About from "./components/About"
import Contact from "./components/Contact"
import Noise from "./components/Noise"
import CustomCursor from "./components/CustomCursor"
import ScrollToTop from "./components/ScrollToTop"
import Footer from "./components/Footer"
import SplashScreen from "./components/SplashScreen"
import SectionNav from "./components/SectionNav"
import ErrorBoundary from "./components/ErrorBoundary"
import Lenis from "lenis"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"

import Magnetic from "./components/Magnetic"
import Terminal from "./components/Terminal"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"



const App = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
    if (isMobile) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    })

    // Sync Lenis with GSAP's ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    const tickerCallback = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCallback)

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(tickerCallback)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "`" || e.key === "tilde") {
        e.preventDefault()
        setIsTerminalOpen(prev => !prev)
      }
      if (e.key === "Escape" && isTerminalOpen) {
        setIsTerminalOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isTerminalOpen])

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  return (
    <ErrorBoundary>
      <div className="overflow-x-hidden antialiased selection:bg-indigo-500/30 selection:text-indigo-200 lg:cursor-none">
        <a href="#about" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[var(--accent)] focus:text-white focus:rounded-lg">
          Skip to main content
        </a>
        {isLoading && <SplashScreen onComplete={() => setIsLoading(false)} />}

        <CustomCursor />
        <Noise />

        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 [background-color:var(--accent)] origin-left z-[100] will-change-transform"
          style={{ scaleX }}
        />

        <div className="fixed inset-0 -z-10 bg-radial-gradient h-full w-full" />

        <div className="container mx-auto">
          <Navbar onTerminalToggle={() => setIsTerminalOpen(true)} />

          <div className="px-8">
            <div id="hero">
              <Hero />
            </div>

            <motion.section
              id="about"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={sectionVariants}
            >
              <About />
            </motion.section>

            <motion.section
              id="technologies"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={sectionVariants}
            >
              <Technologies />
            </motion.section>

            <section id="experience">
              <Experience />
            </section>

            <section id="education">
              <Education />
            </section>
          </div>

          <motion.div
            id="projects"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="w-full"
          >
            <Projects />
          </motion.div>

          <div className="px-8">
            <motion.section
              id="contact"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionVariants}
            >
              <Contact />
            </motion.section>
          </div>
        </div>

        <Footer />

        <ScrollToTop />
        <SectionNav />

        <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      </div>
    </ErrorBoundary>
  )
}

export default App