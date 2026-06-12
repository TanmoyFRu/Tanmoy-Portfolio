import { useState, useRef } from "react"
import { CONTACT } from "../constants"
import { motion, AnimatePresence } from "framer-motion"
import emailjs from "@emailjs/browser"
import confetti from "canvas-confetti"
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane, FaCheck } from "react-icons/fa"
import Magnetic from "./Magnetic"
import { DESIGN_CONFIG } from "../constants/design"
import GsapReveal from "./GsapReveal"



const CopyButton = ({ value, children, label }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(value).catch(() => {
      const textArea = document.createElement('textarea')
      textArea.value = value
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    })
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative cursor-pointer" onClick={handleCopy}>
      {children}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -40, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute left-1/2 -translate-x-1/2 px-3 py-1 bg-green-500 text-white text-[10px] font-bold rounded-full flex items-center gap-2 shadow-lg z-20"
          >
            <FaCheck /> {label} Copied!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const Contact = () => {
  const formRef = useRef()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // IMPORTANT: To make this form functional:
    // 1. Create an account at https://www.emailjs.com/
    // 2. Add a 'Service', a 'Template', and get your 'Public Key'
    // 3. Replace the strings below with your actual IDs.

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then((result) => {
        console.log("Email successfully sent!", result.text)
        setIsSubmitting(false)
        setIsSuccess(true)
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ffffff', '#fbbf24', '#34d399', '#818cf8', '#f472b6']
        })
        formRef.current.reset()
        setTimeout(() => setIsSuccess(false), 5000)
      }, (error) => {
        setIsSubmitting(false)
        console.error("FAILED to send email:", error)
        alert(`Form failed to send. Error: ${error.text || "Please check your EmailJS IDs"}. You can also email me directly at ${CONTACT.email}`)
      });
  }

  return (
    <div className="pb-32 border-t [border-color:var(--border-color)]">
      <GsapReveal y={50}>
        <h2
          className={`my-20 text-center [color:var(--text-primary)] ${DESIGN_CONFIG.HEADERS.H2}`}
        >
          Contact Me
        </h2>

      </GsapReveal>



      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info Column */}
        <GsapReveal x={-50} duration={0.8}>
          <div className="flex flex-col justify-center space-y-12">
            <div className="space-y-8">
              <h3 className={`[color:var(--text-primary)] tracking-tight ${DESIGN_CONFIG.HEADERS.H3}`}>Let's build something <br /><span className="[color:var(--accent)]">extraordinary</span> together.</h3>

              <p className="[color:var(--text-secondary)] text-lg lg:text-xl font-light leading-relaxed max-w-sm">
                I'm currently open to new opportunities and collaborations. Feel free to reach out!
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-6 group cursor-none">
                <div className="h-12 w-12 rounded-2xl [background-color:var(--bg-secondary)] border [border-color:var(--border-color)] flex items-center justify-center [color:var(--accent)] group-hover:border-[color:var(--accent)] group-hover:bg-[color:color-mix(in_srgb,var(--accent),transparent_90%)] transition-colors duration-500">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <div>
                  <p className="text-xs [color:var(--text-secondary)] uppercase tracking-widest font-bold opacity-60">Location</p>
                  <p className="[color:var(--text-primary)] font-medium">{CONTACT.address}</p>
                </div>
              </div>

              <CopyButton value={CONTACT.phoneNo} label="Phone">
                <div className="flex items-center gap-6 group cursor-none">
                  <div className="h-12 w-12 rounded-2xl [background-color:var(--bg-secondary)] border [border-color:var(--border-color)] flex items-center justify-center [color:var(--accent)] group-hover:border-[color:var(--accent)] group-hover:bg-[color:color-mix(in_srgb,var(--accent),transparent_90%)] transition-colors duration-500">
                    <FaPhoneAlt className="text-xl" />
                  </div>
                  <div>
                    <p className="text-xs [color:var(--text-secondary)] uppercase tracking-widest font-bold opacity-60">Phone</p>
                    <p className="[color:var(--text-primary)] font-medium group-hover:[color:var(--accent)] transition-colors">{CONTACT.phoneNo}</p>
                  </div>
                </div>
              </CopyButton>

              <CopyButton value={CONTACT.email} label="Email">
                <div className="flex items-center gap-6 group cursor-none">
                  <div className="h-12 w-12 rounded-2xl [background-color:var(--bg-secondary)] border [border-color:var(--border-color)] flex items-center justify-center [color:var(--accent)] group-hover:border-[color:var(--accent)] group-hover:bg-[color:color-mix(in_srgb,var(--accent),transparent_90%)] transition-colors duration-500">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <p className="text-xs [color:var(--text-secondary)] uppercase tracking-widest font-bold opacity-60">Email</p>
                    <p className="[color:var(--text-primary)] font-medium group-hover:[color:var(--accent)] transition-colors">
                      {CONTACT.email}
                    </p>
                  </div>
                </div>
              </CopyButton>
            </div>
          </div>
        </GsapReveal>


        <GsapReveal x={50} duration={0.8}>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="user_name" className="text-xs font-bold [color:var(--text-secondary)] uppercase tracking-widest ml-1 opacity-60">Name</label>
                <input
                  id="user_name"
                  type="text"
                  name="user_name"
                  required
                  placeholder="John Doe"
                  className="w-full [background-color:var(--bg-secondary)] border [border-color:var(--border-color)] rounded-2xl px-6 py-4 outline-none focus:border-[color:var(--accent)] focus:bg-[color:color-mix(in_srgb,var(--accent),transparent_95%)] transition-colors [color:var(--text-primary)] placeholder:opacity-30"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="user_email" className="text-xs font-bold [color:var(--text-secondary)] uppercase tracking-widest ml-1 opacity-60">Email</label>
                <input
                  id="user_email"
                  type="email"
                  name="user_email"
                  required
                  placeholder="john@example.com"
                  className="w-full [background-color:var(--bg-secondary)] border [border-color:var(--border-color)] rounded-2xl px-6 py-4 outline-none focus:border-[color:var(--accent)] focus:bg-[color:color-mix(in_srgb,var(--accent),transparent_95%)] transition-colors [color:var(--text-primary)] placeholder:opacity-30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-bold [color:var(--text-secondary)] uppercase tracking-widest ml-1 opacity-60">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows="5"
                placeholder="Tell me about your project..."
                className="w-full [background-color:var(--bg-secondary)] border [border-color:var(--border-color)] rounded-3xl px-6 py-4 outline-none focus:border-[color:var(--accent)] focus:bg-[color:color-mix(in_srgb,var(--accent),transparent_95%)] transition-colors [color:var(--text-primary)] placeholder:opacity-30 resize-none"
              />
            </div>

            <div className="pt-4">
              <Magnetic>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full lg:w-auto px-10 py-4 [background-color:var(--accent)] hover:opacity-90 text-white rounded-full font-bold flex items-center justify-center gap-3 transition-[opacity,transform] shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? "Sending..." : isSuccess ? "Message Sent!" : "Send Message"}
                  {!isSubmitting && !isSuccess && <FaPaperPlane className="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </button>
              </Magnetic>
            </div>

            {isSuccess && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="[color:var(--accent)] text-sm font-medium mt-4 text-center lg:text-left"
              >
                Thank you! Your message has been received.
              </motion.p>
            )}
          </form>
        </GsapReveal>

      </div>
    </div>
  )
}

export default Contact
