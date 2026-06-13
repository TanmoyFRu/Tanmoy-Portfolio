import { useState, useRef } from "react"
import { CONTACT } from "../constants"
import { motion, AnimatePresence } from "framer-motion"
import emailjs from "@emailjs/browser"
import confetti from "canvas-confetti"
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane, FaCheck, FaArrowRight } from "react-icons/fa"
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

const ContactCard = ({ icon: Icon, label, value, copyable }) => {
  const inner = (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative p-6 rounded-2xl border [border-color:var(--border-color)] [background-color:var(--bg-secondary)] group hover:border-[color:var(--accent)] transition-all duration-500 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-[var(--accent)]/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative flex items-center gap-5">
        <div className="h-12 w-12 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center [color:var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white transition-all duration-500 shrink-0">
          <Icon className="text-lg" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] [color:var(--text-secondary)] uppercase tracking-[0.2em] font-bold opacity-50 mb-1">{label}</p>
          <p className="[color:var(--text-primary)] font-medium truncate group-hover:[color:var(--accent)] transition-colors duration-300">{value}</p>
        </div>
        {copyable && (
          <FaArrowRight className="ml-auto text-xs [color:var(--text-secondary)] opacity-0 group-hover:opacity-60 group-hover:translate-x-1 transition-all duration-300 shrink-0" />
        )}
      </div>
    </motion.div>
  )

  if (copyable) {
    return <CopyButton value={value} label={label}>{inner}</CopyButton>
  }
  return inner
}

const Contact = () => {
  const formRef = useRef()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [focused, setFocused] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

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

  const inputBase = "w-full bg-transparent border-b-2 border-[var(--text-secondary)]/30 px-1 py-4 outline-none [color:var(--text-primary)] placeholder:[color:var(--text-secondary)] placeholder:opacity-40 transition-all duration-300 focus:border-[color:var(--accent)] text-base"

  return (
    <div className="pb-32 border-t [border-color:var(--border-color)]">
      <GsapReveal y={50}>
        <h2
          className={`my-20 text-center [color:var(--text-primary)] ${DESIGN_CONFIG.HEADERS.H2}`}
        >
          Let's Connect
        </h2>
      </GsapReveal>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

          <div className="lg:col-span-2 flex flex-col gap-6">
            <GsapReveal x={-30} delay={0}>
              <div className="mb-4">
                <h3 className={`[color:var(--text-primary)] tracking-tight mb-4 ${DESIGN_CONFIG.HEADERS.H3}`}>
                  Have a project in <span className="[color:var(--accent)]">mind?</span>
                </h3>
                <p className="[color:var(--text-secondary)] text-base font-light leading-relaxed opacity-70">
                  I'm open to new opportunities, freelance work, and interesting collaborations.
                </p>
              </div>
            </GsapReveal>

            <GsapReveal x={-30} delay={0.1}>
              <ContactCard icon={FaMapMarkerAlt} label="Location" value={CONTACT.address} />
            </GsapReveal>
            <GsapReveal x={-30} delay={0.15}>
              <ContactCard icon={FaPhoneAlt} label="Phone" value={CONTACT.phoneNo} copyable />
            </GsapReveal>
            <GsapReveal x={-30} delay={0.2}>
              <ContactCard icon={FaEnvelope} label="Email" value={CONTACT.email} copyable />
            </GsapReveal>
          </div>

          <GsapReveal x={50} duration={0.8} className="lg:col-span-3">
            <div className="relative p-8 md:p-10 rounded-3xl border border-[var(--text-secondary)]/20 bg-[var(--bg-secondary)] backdrop-blur-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--accent)]/3 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

              <div className="relative">
                <p className="text-xs [color:var(--text-secondary)] uppercase tracking-[0.3em] font-bold opacity-60 mb-8">Send a message</p>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative">
                      <input
                        id="user_name"
                        type="text"
                        name="user_name"
                        required
                        placeholder="Your name"
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        className={inputBase}
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-[2px] bg-[var(--accent)]"
                        initial={{ width: "0%" }}
                        animate={{ width: focused === 'name' ? "100%" : "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div className="relative">
                      <input
                        id="user_email"
                        type="email"
                        name="user_email"
                        required
                        placeholder="Your email"
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        className={inputBase}
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-[2px] bg-[var(--accent)]"
                        initial={{ width: "0%" }}
                        animate={{ width: focused === 'email' ? "100%" : "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows="4"
                      placeholder="Tell me about your project..."
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      className={`${inputBase} resize-none`}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] bg-[var(--accent)]"
                      initial={{ width: "0%" }}
                      animate={{ width: focused === 'message' ? "100%" : "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  <div className="pt-2 flex items-center gap-6">
                    <Magnetic>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-10 py-4 [background-color:var(--accent)] hover:opacity-90 text-white rounded-full font-bold flex items-center gap-3 transition-all duration-300 shadow-[0_0_30px_var(--accent-glow)] hover:shadow-[0_0_50px_var(--accent-glow)] disabled:opacity-50 disabled:cursor-not-allowed group"
                      >
                        {isSubmitting ? "Sending..." : isSuccess ? "Message Sent!" : "Send Message"}
                        {!isSubmitting && !isSuccess && <FaPaperPlane className="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                      </button>
                    </Magnetic>

                    {isSuccess && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="[color:var(--accent)] text-sm font-medium"
                      >
                        Thank you! I'll get back to you soon.
                      </motion.p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </GsapReveal>

        </div>
      </div>
    </div>
  )
}

export default Contact
