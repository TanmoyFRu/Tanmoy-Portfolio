import { memo } from "react"
import { BiLogoPostgresql } from "react-icons/bi"
import { SiRedis, SiFastapi, SiPython, SiDocker, SiCelery, SiGoogle, SiPytorch, SiKubernetes } from "react-icons/si"
import { RiReactjsLine } from "react-icons/ri"
import { motion } from 'framer-motion'
import Magnetic from "./Magnetic"
import { DESIGN_CONFIG } from "../constants/design"
import GsapReveal from "./GsapReveal"

const Technologies = () => {
    const techs = [
        { icon: <SiPython className="text-5xl text-yellow-400" />, name: "Python", desc: "Core Engine", size: "lg:col-span-2", floatDelay: 0 },
        { icon: <SiPytorch className="text-5xl text-orange-600" />, name: "PyTorch", desc: "DL Framework", size: "lg:col-span-1", floatDelay: 0.1 },
        { icon: <SiFastapi className="text-5xl text-green-500" />, name: "FastAPI", desc: "API Excellence", size: "lg:col-span-1", floatDelay: 0.2 },
        { icon: <SiKubernetes className="text-5xl text-blue-600" />, name: "Kubernetes", desc: "Orchestration", size: "lg:col-span-1", floatDelay: 0.3 },
        { icon: <SiDocker className="text-5xl text-blue-500" />, name: "Docker", desc: "Infrastructure", size: "lg:col-span-1", floatDelay: 0.4 },
        { icon: <BiLogoPostgresql className="text-5xl text-sky-700" />, name: "PostgreSQL", desc: "Data Persistence", size: "lg:col-span-1", floatDelay: 0.5 },
        { icon: <SiRedis className="text-5xl text-red-600" />, name: "Redis", desc: "In-Memory", size: "lg:col-span-1", floatDelay: 0.6 },
        { icon: <SiCelery className="text-5xl text-green-400" />, name: "Celery", desc: "Background Tasks", size: "lg:col-span-1", floatDelay: 0.7 },
        { icon: <SiGoogle className="text-5xl text-blue-400" />, name: "Gemini AI", desc: "LLM Integration", size: "lg:col-span-1", floatDelay: 0.8 },
        { icon: <RiReactjsLine className="text-5xl text-cyan-400" />, name: "React", desc: "Modern UI", size: "lg:col-span-1", floatDelay: 0.9 },
    ]




    return (
        <div className="pb-32">
            <GsapReveal y={50}>
                <h2
                    className={`my-20 text-center [color:var(--text-primary)] ${DESIGN_CONFIG.HEADERS.H2}`}
                >
                    Tech Arsenal
                </h2>

            </GsapReveal>



            <GsapReveal stagger={0.05} y={30} delay={0.2}>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto px-4">
                    {techs.map((tech, index) => (
                        <motion.div
                            key={index}
                            className={`${tech.size} group`}
                        >

                            <Magnetic>
                                <div className="h-full flex flex-col items-center justify-center p-8 rounded-[2.5rem] border [border-color:var(--border-color)] [background-color:rgba(var(--bg-secondary),0.4)] hover:border-[color:var(--accent)] transition-all duration-300 shadow-xl hover:shadow-[0_0_40px_var(--accent-glow)] active:scale-95 cursor-none relative overflow-hidden">
                                    {/* Glowing background on hover */}
                                    <div className="absolute inset-0 [background-color:var(--accent)] opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-[2.5rem]" />

                                    <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 relative z-10">
                                        {tech.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold [color:var(--text-primary)] relative z-10">{tech.name}</h3>
                                    <p className="text-xs [color:var(--text-secondary)] mt-1 relative z-10">{tech.desc}</p>

                                    {/* Decorative corner accent */}
                                    <div className="absolute -bottom-4 -right-4 w-16 h-16 [background-color:var(--accent)] opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-300" />
                                </div>
                            </Magnetic>
                        </motion.div>
                    ))}
                </div>
            </GsapReveal>
        </div>

    )
}

export default memo(Technologies)
