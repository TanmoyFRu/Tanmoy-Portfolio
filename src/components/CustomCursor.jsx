import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isMobile, setIsMobile] = useState(false); // Default to false
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const rafRef = useRef(null);
    const mousePos = useRef({ x: -100, y: -100 });

    // Lighter spring config
    const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Check if mobile/touch device
        const checkMobile = () => {
            const isSmallScreen = window.innerWidth < 1024;
            setIsMobile(isSmallScreen);
        };


        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        // Use RAF for smoother updates
        const updateCursor = () => {
            cursorX.set(mousePos.current.x);
            cursorY.set(mousePos.current.y);
        };

        const moveCursor = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            if (!rafRef.current) {
                rafRef.current = requestAnimationFrame(() => {
                    updateCursor();
                    rafRef.current = null;
                });
            }
        };

        const handleHover = () => setIsHovered(true);
        const handleUnhover = () => setIsHovered(false);
        const handleClick = () => {
            setIsClicked(true);
            setTimeout(() => setIsClicked(false), 150);
        };

        window.addEventListener("mousemove", moveCursor, { passive: true });
        window.addEventListener("mousedown", handleClick);

        const targets = document.querySelectorAll("a, button, input, textarea, [role='button']");
        targets.forEach((target) => {
            target.addEventListener("mouseenter", handleHover);
            target.addEventListener("mouseleave", handleUnhover);
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mousedown", handleClick);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            targets.forEach((target) => {
                target.removeEventListener("mouseenter", handleHover);
                target.removeEventListener("mouseleave", handleUnhover);
            });
        };
    }, [isMobile, cursorX, cursorY]);

    // Don't render on mobile/touch devices
    if (isMobile) return null;

    return (
        <>
            {/* Subtle Follow Halo */}
            <motion.div
                style={{
                    translateX: springX,
                    translateY: springY,
                    left: -12,
                    top: -12,
                }}
                animate={{
                    scale: isHovered ? 1.5 : 1,
                    opacity: isHovered ? 0.3 : 0.15,
                }}
                transition={{ duration: 0.15 }}
                className="fixed w-6 h-6 rounded-full pointer-events-none z-[9998] [background-color:var(--accent)] blur-[6px] will-change-transform"
            />

            {/* Mac-Style Arrow Pointer */}
            <motion.div
                style={{
                    translateX: cursorX,
                    translateY: cursorY,
                    left: 0,
                    top: 0,
                }}
                animate={{
                    scale: isClicked ? 0.9 : (isHovered ? 1.2 : 1),
                }}
                transition={{ duration: 0.1 }}
                className="fixed pointer-events-none z-[9999] will-change-transform"
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M3 3V19.44L8.33 14.11L11.89 21L14.44 19.44L10.89 12.56L18 12.56L3 3Z"
                        fill="white"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                    />
                </svg>
            </motion.div>
        </>
    );
};

export default CustomCursor;
