import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaCode } from "react-icons/fa"
import { SiReact, SiTailwindcss } from "react-icons/si"
import { useTheme } from "../context/ThemeContext"
import { useReducedMotion } from "../hooks/useReducedMotion"

const SimpleGradient = ({ theme }) => {
    const gradients = {
        emerald: 'from-green-500/10 via-transparent to-transparent',
        solar: 'from-orange-400/15 via-yellow-300/5 to-transparent',
        cosmic: 'from-purple-500/10 via-pink-500/5 to-transparent',
        midnight: 'from-indigo-500/10 via-blue-500/5 to-transparent'
    }

    return (
        <div className={`absolute inset-0 bg-gradient-to-tr ${gradients[theme] || gradients.midnight} pointer-events-none`} />
    )
}

// Matrix Rain Effect - Emerald Theme (Optimized)
const MatrixRain = ({ reduced }) => {
    const canvasRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting)
        }, { threshold: 0 })

        if (canvasRef.current) observer.observe(canvasRef.current)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (reduced || !isVisible) return

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }
        resizeCanvas()

        const chars = 'アイウエオ0123456789<>/{}[]()'
        const charArray = chars.split('')
        const fontSize = 14
        const columns = Math.floor(canvas.width / fontSize)
        const drops = Array(columns).fill(0).map(() => Math.random() * -50)

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.03)' // Lower opacity = longer trails
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = '#10b981'
            ctx.font = `${fontSize}px monospace`

            for (let i = 0; i < drops.length; i++) {
                const char = charArray[Math.floor(Math.random() * charArray.length)]
                ctx.fillText(char, i * fontSize, drops[i] * fontSize)
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0
                drops[i]++
            }
        }

        const interval = setInterval(draw, 60)
        window.addEventListener('resize', resizeCanvas)
        return () => { clearInterval(interval); window.removeEventListener('resize', resizeCanvas) }
    }, [reduced, isVisible])

    if (reduced) return <SimpleGradient theme="emerald" />
    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" />
}

const StarField = ({ reduced }) => {
    const canvasRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting)
        }, { threshold: 0 })

        if (canvasRef.current) observer.observe(canvasRef.current)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (reduced || !isVisible) return

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }
        resizeCanvas()

        // Reduced star count
        const stars = Array(50).fill(0).map(() => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speed: Math.random() * 0.3 + 0.1,
            opacity: Math.random() * 0.5 + 0.3
        }))

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.02)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            stars.forEach(star => {
                ctx.beginPath()
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(99, 102, 241, ${star.opacity})`
                ctx.fill()

                star.y -= star.speed
                if (star.y < 0) { star.y = canvas.height; star.x = Math.random() * canvas.width }
            })
        }

        const interval = setInterval(draw, 50)
        window.addEventListener('resize', resizeCanvas)
        return () => { clearInterval(interval); window.removeEventListener('resize', resizeCanvas) }
    }, [reduced, isVisible])

    if (reduced) return <SimpleGradient theme="midnight" />
    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" />
}

// Nebula Effect - Cosmic Theme (Optimized)
const NebulaEffect = ({ reduced }) => {
    const canvasRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting)
        }, { threshold: 0 })

        if (canvasRef.current) observer.observe(canvasRef.current)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (reduced || !isVisible) return

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }
        resizeCanvas()

        // Reduced particle count
        const particles = Array(30).fill(0).map(() => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.2,
            speedY: (Math.random() - 0.5) * 0.2,
            hue: Math.random() * 60 + 260
        }))

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.03)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            particles.forEach(p => {
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, 0.5)`
                ctx.fill()

                p.x += p.speedX
                p.y += p.speedY
                if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
                if (p.y < 0 || p.y > canvas.height) p.speedY *= -1
            })
        }

        const interval = setInterval(draw, 50)
        window.addEventListener('resize', resizeCanvas)
        return () => { clearInterval(interval); window.removeEventListener('resize', resizeCanvas) }
    }, [reduced, isVisible])

    if (reduced) return <SimpleGradient theme="cosmic" />
    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" />
}

// Simple Solar Glow for mobile (no WebGL)
const SolarGlow = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[200%] h-96 rounded-[100%] bg-gradient-to-b from-amber-500/20 via-orange-400/12 to-transparent blur-2xl" />
        <div className="absolute top-0 left-[10%] w-80 h-80 bg-orange-400/15 rounded-full blur-[100px]" />
        <div className="absolute top-10 right-[15%] w-64 h-64 bg-yellow-500/12 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-600/20 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent" />
    </div>
)

// Dynamic import for LightRays (WebGL) - only on desktop
const LightRaysWrapper = ({ reduced }) => {
    const [LightRays, setLightRays] = useState(null)
    const [isVisible, setIsVisible] = useState(false)
    const wrapperRef = useRef(null)

    useEffect(() => {
        if (!reduced) {
            import('./LightRays').then(module => setLightRays(() => module.default))
        }
    }, [reduced])

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting)
        }, { threshold: 0 })

        if (wrapperRef.current) observer.observe(wrapperRef.current)
        return () => observer.disconnect()
    }, [])

    if (reduced || !LightRays) return <SolarGlow />

    return (
        <div ref={wrapperRef} className="absolute inset-0 w-full h-full pointer-events-none">
            {isVisible && (
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#ff5e00"
                    raysSpeed={0.6}
                    lightSpread={1.5}
                    rayLength={1.8}
                    pulsating={true}
                    fadeDistance={1.2}
                    saturation={1.3}
                    followMouse={false}
                    noiseAmount={0.05}
                    distortion={0.02}
                />
            )}
        </div>
    )
}

const CYBER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!"
const TARGET = "TANMOY"

const THEME_STYLES = {
    midnight: { stroke: "#818cf8", glow: "rgba(99, 102, 241, 0.3)" },
    solar: { stroke: "#b45309", glow: "rgba(180, 113, 9, 0.25)" },
    cosmic: { stroke: "#c084fc", glow: "rgba(192, 132, 252, 0.3)" },
    emerald: { stroke: "#34d399", glow: "rgba(52, 211, 153, 0.3)" },
}

const CyberText = ({ theme }) => {
    const containerRef = useRef(null)
    const [displayText, setDisplayText] = useState(TARGET.split(""))
    const [glitchIndex, setGlitchIndex] = useState(-1)
    const intervalsRef = useRef([])
    const hasPlayedRef = useRef(false)

    const cleanup = () => {
        intervalsRef.current.forEach(clearInterval)
        intervalsRef.current = []
    }

    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !hasPlayedRef.current) {
                hasPlayedRef.current = true
                runScramble()
            }
        }, { threshold: 0.1 })

        observer.observe(el)
        return () => { observer.disconnect(); cleanup() }
    }, [])

    const runScramble = () => {
        cleanup()
        let resolved = 0

        const scrambleId = setInterval(() => {
            setDisplayText(
                TARGET.split("").map((ch, i) =>
                    i < resolved ? ch : CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)]
                )
            )
        }, 50)
        intervalsRef.current.push(scrambleId)

        const resolveId = setInterval(() => {
            resolved++
            if (resolved > TARGET.length) {
                clearInterval(scrambleId)
                clearInterval(resolveId)
                setDisplayText(TARGET.split(""))

                const glitchId = setInterval(() => {
                    const idx = Math.floor(Math.random() * TARGET.length)
                    setGlitchIndex(idx)
                    setTimeout(() => setGlitchIndex(-1), 120)
                }, 800)
                intervalsRef.current.push(glitchId)

                const restartId = setTimeout(() => {
                    setGlitchIndex(-1)
                    runScramble()
                }, 4000)
                intervalsRef.current.push(restartId)
            }
        }, 250)
        intervalsRef.current.push(resolveId)
    }

    const isSolar = theme === "solar"
    const ts = THEME_STYLES[theme] || THEME_STYLES.midnight

    return (
        <div
            ref={containerRef}
            className="absolute bottom-0 left-0 right-0 pointer-events-none select-none z-0 hidden md:flex justify-center overflow-hidden"
        >
            <div
                className="text-[14vw] font-black tracking-[0.08em] whitespace-nowrap leading-[0.75] text-center"
                style={{
                    fontFamily: "'Orbitron', sans-serif",
                    opacity: isSolar ? 0.18 : 0.12,
                    WebkitTextFillColor: "transparent",
                    WebkitTextStroke: `2px ${ts.stroke}`,
                    paintOrder: "stroke fill",
                    textShadow: `0 0 40px ${ts.glow}, 0 0 80px ${ts.glow}`,
                }}
            >
                {displayText.map((char, i) => (
                    <span
                        key={i}
                        style={{
                            display: "inline-block",
                            opacity: glitchIndex === i ? 0.3 : 1,
                            transform: glitchIndex === i ? `translateY(${Math.random() > 0.5 ? 4 : -4}px) scaleX(${Math.random() > 0.5 ? 1.05 : 0.95})` : "none",
                            transition: "opacity 0.05s, transform 0.05s",
                        }}
                    >
                        {char}
                    </span>
                ))}
            </div>
        </div>
    )
}

const Footer = () => {
    const { theme } = useTheme()
    const currentYear = new Date().getFullYear()
    const isSolar = theme === 'solar'
    const reduced = useReducedMotion()

    const socialLinks = [
        { icon: FaGithub, href: "https://github.com/TanmoyFRu", label: "GitHub" },
        { icon: FaLinkedin, href: "https://linkedin.com/in/tanmoy-debnath", label: "LinkedIn" },
        { icon: FaEnvelope, href: "mailto:tanmoydn2003@gmail.com", label: "Email" },
    ]

    const navLinks = [
        { name: "About Me", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "My Experience", href: "#experience" },
        { name: "My Education", href: "#education" },
        { name: "Contact Me", href: "#contact" },
    ]

    const renderThemeEffect = () => {
        switch (theme) {
            case 'emerald': return <MatrixRain reduced={reduced} />
            case 'midnight': return <StarField reduced={reduced} />
            case 'solar': return <SolarGlow />
            case 'cosmic': return <NebulaEffect reduced={reduced} />
            default: return <StarField reduced={reduced} />
        }
    }

    return (
        <footer className="relative overflow-hidden [background-color:var(--bg-primary)] border-t [border-color:var(--border-color)]">
            {renderThemeEffect()}

            <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-20 md:py-32">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4 text-center sm:text-left"
                    >
                        <h3 className="text-xl md:text-2xl font-bold [color:var(--text-primary)]">
                            Tanmoy<span className="[color:var(--accent)]">.</span>
                        </h3>
                        <p className={`text-sm [color:var(--text-secondary)] leading-relaxed ${isSolar ? 'opacity-90' : 'opacity-70'}`}>
                            Backend developer crafting robust APIs and scalable systems.
                        </p>
                        <div className="flex items-center gap-3 pt-2 justify-center sm:justify-start">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    className="h-9 w-9 md:h-10 md:w-10 rounded-lg [background-color:var(--bg-secondary)] border [border-color:var(--border-color)] flex items-center justify-center [color:var(--text-secondary)] hover:[color:var(--accent)] hover:border-[color:var(--accent)] transition-[background-color,border-color,color,transform] duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon className="text-sm md:text-base" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="space-y-4 text-center sm:text-left"
                    >
                        <h4 className="text-xs font-bold [color:var(--text-secondary)] uppercase tracking-[0.15em]">
                            Quick Links
                        </h4>
                        <nav className="grid grid-cols-2 gap-2">
                            {navLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className={`text-sm [color:var(--text-secondary)] hover:[color:var(--accent)] transition-colors ${isSolar ? 'opacity-90' : 'opacity-70'} hover:opacity-100`}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </nav>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-4 text-center sm:text-left sm:col-span-2 md:col-span-1"
                    >
                        <h4 className="text-xs font-bold [color:var(--text-secondary)] uppercase tracking-[0.15em]">
                            Built With
                        </h4>
                        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                            {/* Tags remain same */}
                            <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md [background-color:var(--bg-secondary)] border [border-color:var(--border-color)] text-xs [color:var(--text-secondary)]">
                                <SiReact className="text-cyan-400" /> React
                            </span>
                            <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md [background-color:var(--bg-secondary)] border [border-color:var(--border-color)] text-xs [color:var(--text-secondary)]">
                                <SiTailwindcss className="text-sky-400" /> Tailwind
                            </span>
                            <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md [background-color:var(--bg-secondary)] border [border-color:var(--border-color)] text-xs [color:var(--text-secondary)]">
                                <FaCode className="[color:var(--accent)]" /> Framer
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>

            <CyberText theme={theme} />

            <div className="relative z-20 border-t [border-color:var(--border-color)] bg-[rgba(var(--bg-primary),0.8)] backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-5 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
                    <p className={`text-xs [color:var(--text-secondary)] ${isSolar ? 'opacity-80' : 'opacity-50'}`}>
                        © {currentYear} Tanmoy Debnath
                    </p>
                    <p className={`text-xs [color:var(--text-secondary)] ${isSolar ? 'opacity-80' : 'opacity-50'} flex items-center gap-1`}>
                        Made with <FaHeart className="text-red-500 text-[10px]" /> & <span className="[color:var(--accent)]">lots of coffee</span>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
