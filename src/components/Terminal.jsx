import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "../context/ThemeContext"
import { FaTerminal, FaTimes } from "react-icons/fa"

const Terminal = ({ isOpen, onClose }) => {
    const { setTheme } = useTheme()
    const [input, setInput] = useState("")
    const [history, setHistory] = useState([
        { type: "info", content: "Welcome to Tanmoy's System Terminal [Version 2.0.4]" },
        { type: "info", content: "Type 'help' to see available commands." },
    ])
    const [historyIndex, setHistoryIndex] = useState(-1)
    const [commandHistory, setCommandHistory] = useState([])
    const [isBooting, setIsBooting] = useState(false)
    const [hackActive, setHackActive] = useState(false)
    const [bootLines, setBootLines] = useState([])
    const scrollRef = useRef(null)
    const inputRef = useRef(null)
    const cpuUsage = useRef(`${Math.floor(Math.random() * 5) + 2}.4%`)

    useEffect(() => {
        if (isOpen) {
            setIsBooting(true)
            setBootLines([])
            const sequence = [
                "INITIALIZING KERNEL v5.10.0-PRO-PORTFOLIO...",
                "LOADING NEURAL MODULES... [OK]",
                "ESTABLISHING SECURE CONNECTION... [DONE]",
                "MOUNTING VIRTUAL DOM... [SUCCESS]",
                "ACCESS GRANTED. WELCOME BACK, TANMOY."
            ]

            sequence.forEach((line, i) => {
                setTimeout(() => {
                    setBootLines(prev => [...prev, line])
                    if (i === sequence.length - 1) {
                        setTimeout(() => {
                            setIsBooting(false)
                            if (inputRef.current) inputRef.current.focus()
                        }, 500)
                    }
                }, i * 150)
            })
        }
    }, [isOpen])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [history])

    const commands = ["help", "whoami", "ls", "clear", "ping", "theme", "sudo", "exit", "cd"]
    const directories = ["projects", "about", "technologies", "experience", "education", "contact"]

    const handleCommand = (e) => {
        if (e.key === "Enter" && input.trim()) {
            const fullCmd = input.trim()
            const parts = fullCmd.split(" ")
            const cmd = parts[0].toLowerCase()
            const args = parts.slice(1)

            setCommandHistory([fullCmd, ...commandHistory])
            setHistoryIndex(-1)

            const newHistory = [...history, { type: "command", content: `visitor@tanmoy:~$ ${fullCmd}` }]

            switch (cmd) {
                case "help":
                    newHistory.push({ type: "info", content: "COMMANDS:" })
                    newHistory.push({ type: "success", content: "- ls: List files and directories" })
                    newHistory.push({ type: "success", content: "- cd [dir]: Navigate/Scroll to section" })
                    newHistory.push({ type: "success", content: "- theme [name]: Switch interface theme" })
                    newHistory.push({ type: "success", content: "- whoami: Display personal kernel info" })
                    newHistory.push({ type: "success", content: "- clear: Wipe terminal history" })
                    newHistory.push({ type: "success", content: "- ping: Test connection to neural network" })
                    newHistory.push({ type: "success", content: "- help: Show this directory" })
                    newHistory.push({ type: "success", content: "- exit: Terminate terminal session" })
                    break
                case "whoami":
                    newHistory.push({ type: "info", content: "Tanmoy Debnath - Automation Engineer & Backend Developer." })
                    newHistory.push({ type: "info", content: "Current Status: Active. Location: Agartala, India. System: Optimized." })
                    break
                case "ls":
                    newHistory.push({ type: "info", content: "drwxr-xr-x  projects/" })
                    newHistory.push({ type: "info", content: "drwxr-xr-x  about/" })
                    newHistory.push({ type: "info", content: "drwxr-xr-x  technologies/" })
                    newHistory.push({ type: "info", content: "drwxr-xr-x  experience/" })
                    newHistory.push({ type: "info", content: "-rw-r--r--  resume.pdf" })
                    newHistory.push({ type: "info", content: "-rw-r--r--  config.yaml" })
                    break
                case "cd":
                    if (!args[0]) {
                        newHistory.push({ type: "error", content: "usage: cd [directory]" })
                    } else {
                        const target = args[0].replace("/", "")
                        if (directories.includes(target)) {
                            const element = document.getElementById(target)
                            if (element) {
                                element.scrollIntoView({ behavior: "smooth" })
                                newHistory.push({ type: "success", content: `Navigating to ${target}...` })
                                setTimeout(onClose, 500)
                            } else {
                                newHistory.push({ type: "error", content: `cd: no such file or directory: ${args[0]}` })
                            }
                        } else {
                            newHistory.push({ type: "error", content: `cd: no such file or directory: ${args[0]}` })
                        }
                    }
                    break
                case "theme": {
                    const themes = ["midnight", "solar", "cosmic", "emerald"]
                    if (!args[0]) {
                        newHistory.push({ type: "info", content: `Available themes: ${themes.join(", ")}` })
                    } else if (themes.includes(args[0].toLowerCase())) {
                        setTheme(args[0].toLowerCase())
                        newHistory.push({ type: "success", content: `Environment recalibrated to: ${args[0].toUpperCase()}` })
                    } else {
                        newHistory.push({ type: "error", content: `theme: calibration failed for '${args[0]}'` })
                    }
                    break
                }
                case "clear":
                    setHistory([])
                    setInput("")
                    return
                case "ping":
                    newHistory.push({ type: "info", content: "PING 127.0.0.1 (127.0.0.1): 56 data bytes" })
                    newHistory.push({ type: "success", content: "64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.042 ms" })
                    break
                case "sudo":
                    newHistory.push({ type: "error", content: "[ACCESS DENIED] User is not in the sudoers file." })
                    break
                case "exit":
                    onClose()
                    break
                case "hack":
                    setHackActive(true)
                    newHistory.push({ type: "success", content: "INJECTING EXPLOIT... [100%]" })
                    newHistory.push({ type: "error", content: "SYSTEM TAKEOVER IN PROGRESS..." })
                    setTimeout(() => setHackActive(false), 5000)
                    break
                default:
                    newHistory.push({ type: "error", content: `bash: command not found: ${cmd}` })
            }

            setHistory(newHistory)
            setInput("")
        } else if (e.key === "ArrowUp") {
            if (historyIndex < commandHistory.length - 1) {
                const nextIdx = historyIndex + 1
                setHistoryIndex(nextIdx)
                setInput(commandHistory[nextIdx])
            }
        } else if (e.key === "ArrowDown") {
            if (historyIndex > 0) {
                const nextIdx = historyIndex - 1
                setHistoryIndex(nextIdx)
                setInput(commandHistory[nextIdx])
            } else {
                setHistoryIndex(-1)
                setInput("")
            }
        } else if (e.key === "Tab") {
            e.preventDefault()
            const currentParts = input.split(" ")
            const currentCmd = currentParts[0]

            if (currentParts.length === 1) {
                const match = commands.find(c => c.startsWith(currentCmd))
                if (match) setInput(match)
            } else if (currentCmd === "cd") {
                const currentArg = currentParts[1]
                const match = directories.find(d => d.startsWith(currentArg))
                if (match) setInput(`cd ${match}`)
            }
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 pointer-events-none">
                    {/* Backdrop with heavy blur - Optimized */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 pointer-events-auto will-change-[opacity]"
                    />

                    {/* Terminal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-5xl h-full max-h-[700px] bg-black/90 border border-green-500/30 rounded-2xl shadow-[0_0_50px_rgba(34,197,94,0.1)] overflow-hidden flex flex-col pointer-events-auto group will-change-[transform,opacity]"
                    >
                        {/* CRT Scanline Effect - Optimized opacity */}
                        <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03] animate-pulse bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] will-change-[opacity]" />

                        {/* Top Bar (OSX Style) */}
                        <div className="flex items-center justify-between px-6 py-4 bg-zinc-900/50 border-b border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="flex gap-2">
                                    <div onClick={onClose} className="w-3 h-3 rounded-full bg-red-500/50 hover:bg-red-500 cursor-pointer transition-colors" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                </div>
                                <div className="flex items-center gap-3 ml-4">
                                    <FaTerminal className="text-xs text-green-500/70" />
                                    <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-zinc-500">
                                        Root Process — 127.0.0.1 — ssh
                                    </span>
                                </div>
                            </div>
                            <div className="hidden sm:flex items-center gap-6">
                                <div className="text-[10px] text-zinc-600 font-mono">CPU: {cpuUsage.current}</div>
                                <div className="text-[10px] text-zinc-600 font-mono">RAM: {hackActive ? "OVERFLOW" : "512MB"}</div>
                                <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                                    <FaTimes />
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div
                            ref={scrollRef}
                            className={`flex-1 p-6 md:p-10 font-mono text-sm md:text-base overflow-y-auto space-y-3 scrollbar-hide selection:bg-green-500/30 selection:text-green-200 ${hackActive ? "animate-[shake_0.5s_infinite]" : ""}`}
                        >
                            {isBooting ? (
                                <div className="space-y-2">
                                    {bootLines.map((line, i) => (
                                        <div key={i} className="text-green-500/80 animate-pulse">
                                            {line}
                                        </div>
                                    ))}
                                    <div className="w-full h-1 bg-green-900/20 rounded-full mt-4 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 0.8 }}
                                            className="h-full bg-green-500 shadow-[0_0_10px_#22c55e]"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {history.map((line, idx) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            key={idx}
                                            className={`${line.type === "error" ? "text-red-500" :
                                                line.type === "success" ? "text-green-400" :
                                                    line.type === "command" ? "text-white font-bold" :
                                                        line.type === "info" ? "text-zinc-400" :
                                                            "text-zinc-100"
                                                } leading-relaxed break-words whitespace-pre-wrap`}
                                        >
                                            {line.content}
                                        </motion.div>
                                    ))}

                                    <div className="flex items-start gap-3 text-white">
                                        <span className="text-green-500 font-bold shrink-0">visitor@tanmoy:~$</span>
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={handleCommand}
                                            className="flex-1 bg-transparent outline-none border-none p-0 text-green-400 placeholder:opacity-20 caret-green-500"
                                            autoFocus
                                            spellCheck={false}
                                            autoComplete="off"
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Hack Overlay (Matrix) */}
                        <AnimatePresence>
                            {hackActive && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-50 pointer-events-none bg-black flex items-center justify-center overflow-hidden"
                                >
                                    {[...Array(20)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ y: -1000 }}
                                            animate={{ y: 1000 }}
                                            transition={{
                                                duration: 2 + Math.random() * 2,
                                                repeat: Infinity,
                                                ease: "linear",
                                                delay: Math.random() * 2
                                            }}
                                            className="absolute text-green-500 font-mono text-xl opacity-20"
                                            style={{ left: `${i * 5}%` }}
                                        >
                                            {[...Array(30)].map((_, j) => (
                                                <div key={j}>{String.fromCharCode(33 + Math.random() * 93)}</div>
                                            ))}
                                        </motion.div>
                                    ))}
                                    <div className="text-red-600 font-black text-6xl md:text-9xl animate-pulse tracking-tighter opacity-80 rotate-12">
                                        SYSTEM TAKEOVER
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Footer Status Bar */}
                        <div className="px-6 py-3 bg-zinc-900/80 border-t border-white/5 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">System Online</span>
                                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                            </div>
                            <div className="text-[10px] text-zinc-500 font-mono tracking-tighter">
                                [ UTF-8 ] — [ bash ] — [ Ln {history.length}, Col {input.length} ]
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default Terminal
