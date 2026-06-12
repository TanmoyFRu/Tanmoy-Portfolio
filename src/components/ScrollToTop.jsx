import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaArrowUp } from "react-icons/fa"
import Magnetic from "./Magnetic"
import { useTheme } from "../context/ThemeContext"

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility, { passive: true })
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }



  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-10 right-10 z-[100]">
          <Magnetic>
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              onClick={scrollToTop}
              className="h-14 w-14 rounded-full [background-color:var(--bg-secondary)] border [border-color:var(--border-color)] [color:var(--accent)] flex items-center justify-center shadow-2xl active:scale-95 transition-all duration-300 backdrop-blur-md cursor-none hover:border-[color:var(--accent)] glow-btn"
              aria-label="Scroll to top"
            >
              <FaArrowUp className="text-xl" />
            </motion.button>
          </Magnetic>
        </div>
      )}

    </AnimatePresence>
  )
}

export default ScrollToTop
