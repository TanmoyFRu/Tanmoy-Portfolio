import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"




const GsapReveal = ({ children, delay = 0, duration = 1.2, y = 50, x = 0, skewY = 0, stagger = 0.1, scrub = false, start = "top 90%", className = "" }) => {
    const containerRef = useRef()
    const [hasAnimated, setHasAnimated] = useState(false)

    useGSAP(() => {
        const elements = containerRef.current?.children
        if (!elements || elements.length === 0) return

        gsap.set(elements, { opacity: 0, y: y, x: x, skewY: skewY })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: start,
                toggleActions: scrub ? "play none none reverse" : "play none none none",
                scrub: scrub,
                onEnter: () => setHasAnimated(true),
            }
        })

        tl.to(elements, {
            y: 0,
            x: 0,
            skewY: 0,
            opacity: 1,
            duration: duration,
            stagger: stagger,
            ease: "power4.out",
            delay: delay
        })
    }, { scope: containerRef })

    useEffect(() => {
        const fallbackTimer = setTimeout(() => {
            if (!hasAnimated && containerRef.current) {
                const elements = containerRef.current.children
                if (elements && elements.length > 0) {
                    gsap.to(elements, { opacity: 1, y: 0, x: 0, skewY: 0, duration: 0.5 })
                }
            }
        }, 2000)

        return () => clearTimeout(fallbackTimer)
    }, [hasAnimated])

    return (
        <div ref={containerRef} className={`gsap-reveal-container ${className}`}>
            {children}
        </div>
    )
}

export default GsapReveal
