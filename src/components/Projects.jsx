import { useRef, memo } from "react"
import { PROJECTS } from "../constants"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { FaGithub } from "react-icons/fa"
import ArchitectureDiagram from "./ArchitectureDiagram"
import { DESIGN_CONFIG } from "../constants/design"
import GsapReveal from "./GsapReveal"



const ProjectItem = memo(({ project, index }) => {
  const containerRef = useRef(null)

  // Scroll parallax for the image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Smooth parallax values
  const rawY = useTransform(scrollYProgress, [0, 1], [-50, 50])
  useSpring(rawY, { stiffness: 100, damping: 30 })
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1])

  const isEven = index % 2 === 0

  return (
    <div ref={containerRef} className="min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center py-12 lg:py-20 relative px-6 md:px-12 lg:px-0">
      {/* Massive Background Index */}
      <motion.span
        initial={{ opacity: 0, x: isEven ? -100 : 100 }}
        whileInView={{ opacity: 0.15, x: isEven ? -20 : 20 }}
        transition={{ duration: 1.5 }}
        className={`absolute text-[15rem] md:text-[25rem] font-black pointer-events-none select-none [color:var(--accent)] hidden lg:block ${isEven ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 z-0 gpu-accel`}
      >
        0{index + 1}
      </motion.span>

      <motion.div
        style={{ opacity, scale }}
        className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24 w-full max-w-7xl relative z-10`}
      >
        {/* Architecture Diagram Container */}
        <div className="w-full lg:w-3/5 group items-center justify-center flex">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] overflow-visible">
            <ArchitectureDiagram projectTitle={project.title} />

            {/* Hover Actions */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--bg-primary)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px] will-change-[opacity]">
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg shadow-2xl"
              >
                <FaGithub className="text-2xl" />
                <span>View Source</span>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Narrative Content */}
        <div className={`w-full lg:w-2/5 space-y-8 text-center ${isEven ? 'lg:text-left' : 'lg:text-right'}`}>
          <div className="space-y-4">
            <motion.div>
              <h3 className={`[color:var(--text-primary)] tracking-tighter leading-tight mb-2 ${DESIGN_CONFIG.HEADERS.H3}`}>
                {project.title}
              </h3>

              <div className={`h-1.5 w-20 [background-color:var(--accent)] rounded-full mx-auto ${isEven ? 'lg:ml-0' : 'lg:mr-0'}`} />
            </motion.div>


            <motion.p
              className="text-lg md:text-xl leading-relaxed [color:var(--text-secondary)] font-light"
            >

              {project.description}
            </motion.p>
          </div>

          <div className={`flex flex-wrap gap-2 justify-center ${isEven ? 'lg:justify-start' : 'lg:justify-end'}`}>
            {project.technologies.map((tech, i) => (
              <span key={i} className="px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-full border border-[color:var(--border-color)] [color:var(--text-primary)] bg-white/5 backdrop-blur-md">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
})

ProjectItem.displayName = "ProjectItem"

const Projects = () => {
  return (
    <div className="relative pt-32 pb-64 overflow-hidden">
      <GsapReveal y={50}>
        <div className="max-w-7xl mx-auto px-4 mb-32 relative text-center">
          <h2
            className={`[color:var(--text-primary)] ${DESIGN_CONFIG.HEADERS.H2}`}
          >
            What I Shipped
          </h2>


          <p className="mt-4 text-lg md:text-xl [color:var(--text-secondary)] opacity-50 uppercase tracking-[0.5em] font-medium">Systems I Designed</p>
        </div>
      </GsapReveal>


      <div className="space-y-[10vh] md:space-y-[0vh]">
        {PROJECTS.map((project, index) => (
          <ProjectItem key={index} project={project} index={index} />
        ))}
      </div>
    </div>
  )
}

export default Projects
