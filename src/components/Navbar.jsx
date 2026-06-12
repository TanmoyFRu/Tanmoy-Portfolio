import { useState } from "react"
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTerminal, FaBars, FaTimes } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import logo from "../assets/RefinedTDLogo.webp"
import Magnetic from "./Magnetic"
import ThemeToggle from "./ThemeToggle"

const navLinks = [
  { id: "about", label: "About" },
  { id: "technologies", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
]

const socialLinks = [
  { href: "https://www.linkedin.com/in/tanmoy-debnath", icon: FaLinkedin, label: "LinkedIn", hoverClass: "hover:[color:var(--accent)]" },
  { href: "https://github.com/TanmoyFRu", icon: FaGithub, label: "GitHub", hoverClass: "hover:[color:var(--text-primary)]" },
  { href: "https://www.facebook.com/tanmoy.debnath.9699523", icon: FaFacebook, label: "Facebook", hoverClass: "hover:[color:var(--accent)]" },
  { href: "https://www.instagram.com/_tanmoy.pvt/", icon: FaInstagram, label: "Instagram", hoverClass: "hover:text-pink-500" },
]

const Navbar = ({ onTerminalToggle }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNavClick = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
    setMobileOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg border-b [border-color:var(--border-color)] [background-color:color-mix(in_srgb,var(--bg-primary),transparent_80%)]">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between py-6 px-8 lg:px-16">
        <div className="flex flex-shrink-0 items-center">
          <Magnetic>
            <a href="/" aria-label="Home" className="group">
              <img
                src={logo}
                className="relative transition-transform duration-500 group-hover:scale-105"
                width={50}
                height={50}
                alt="Logo"
              />
            </a>
          </Magnetic>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <Magnetic>
              <button
                onClick={onTerminalToggle}
                className="p-2 [color:var(--text-secondary)] hover:[color:var(--accent)] rounded-full transition-colors duration-300"
                aria-label="Open Terminal"
                title="Open Terminal (`)"
              >
                <FaTerminal className="text-xl" />
              </button>
            </Magnetic>
            <ThemeToggle />
          </div>

          <div className="hidden md:flex items-center gap-2">
            {socialLinks.map((social) => (
              <Magnetic key={social.label}>
                <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}
                  className={`p-2 [color:var(--text-secondary)] ${social.hoverClass} rounded-full transition-colors duration-300`}>
                  <social.icon className="text-2xl" />
                </a>
              </Magnetic>
            ))}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 [color:var(--text-secondary)] hover:[color:var(--accent)] transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t [border-color:var(--border-color)] [background-color:color-mix(in_srgb,var(--bg-primary),transparent_50%)] backdrop-blur-xl"
          >
            <div className="px-8 py-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="block w-full text-left text-base font-medium [color:var(--text-secondary)] hover:[color:var(--accent)] transition-colors py-2"
                >
                  {link.label}
                </button>
              ))}
              <div className="flex items-center gap-4 pt-4 border-t [border-color:var(--border-color)]">
                {socialLinks.map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}
                    className={`p-2 [color:var(--text-secondary)] ${social.hoverClass} rounded-full transition-colors duration-300`}>
                    <social.icon className="text-xl" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
