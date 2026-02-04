import { motion, useScroll, useTransform } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { useRef, useState } from 'react'

const projects = [
    {
        id: 1,
        title: 'Swift Scholar',
        category: 'EdTech Platform',
        description: 'Learning network platform similar to Uber or Rapido, enabling connections between students, professionals, and experts. Features AI tutor agent and seat-based learning system.',
        tags: ['AI Agents', 'LangGraph', 'React', 'Community'],
        gradient: 'from-violet-500 via-purple-500 to-pink-500',
        year: '2025'
    },
    {
        id: 2,
        title: 'FronSoc Startup',
        category: 'B2C Platform',
        description: 'Voice-powered AI-driven e-commerce platform connecting firms and consumers across India. Includes multilingual LLM support and health tracking features.',
        tags: ['Voice AI', 'E-commerce', 'LLM', 'Health Tech'],
        gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
        year: '2024'
    },
    {
        id: 3,
        title: 'AI Agent Suite',
        category: 'AI/Automation',
        description: 'Collection of advanced AI agents including DPA (Daily Planner), AAMPA (Meeting Prep), Mental Health Supporter, and Advanced Notebook System with RAG capabilities.',
        tags: ['LangChain', 'RAG', 'NLP', 'Automation'],
        gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
        year: '2024'
    },
    {
        id: 4,
        title: 'Art & Cultural Heritage Explorer',
        category: 'AI Storytelling',
        description: 'AI-powered platform making history engaging using Streamlit, SuperTucker, Google Maps API, and Python with story generation and NLP chatbot.',
        tags: ['Streamlit', 'Google AI', 'NLP', 'Python'],
        gradient: 'from-orange-500 via-red-500 to-pink-500',
        year: '2024'
    },
]

const StackedProjects = () => {
    const containerRef = useRef(null)
    const [hoveredIndex, setHoveredIndex] = useState(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    return (
        <section id="work" ref={containerRef} className="relative py-32 px-6 lg:px-20">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
                    <span className="inline-block px-5 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary font-mono text-sm font-semibold mb-6">
                        LATEST WORK
                    </span>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6">
                        Featured <span className="text-gradient">Projects</span>
                    </h2>
                    <p className="text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed">
                        A curated selection of my most impactful work in AI and software engineering.
                    </p>
                </motion.div>

                {/* 3D Stacked Cards */}
                <div className="relative min-h-[600px] flex items-center justify-center">
                    {projects.map((project, index) => {
                        const isHovered = hoveredIndex === index
                        const isBelow = hoveredIndex !== null && index > hoveredIndex

                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 100, rotateX: 45 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                viewport={{ once: true }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                style={{
                                    position: 'absolute',
                                    transformStyle: 'preserve-3d',
                                    perspective: '1000px',
                                }}
                                animate={{
                                    y: isHovered ? -20 : index * 20,
                                    z: isHovered ? 100 : -index * 30,
                                    rotateX: isHovered ? -5 : 0,
                                    scale: isHovered ? 1.05 : isBelow ? 0.95 : 1,
                                    zIndex: isHovered ? 50 : 40 - index,
                                }}
                                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                                className="w-full max-w-3xl"
                            >
                                <div className={`relative glass rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 transition-all ${isHovered ? 'shadow-2xl' : ''}`}>
                                    {/* Gradient Background */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />

                                    {/* Content */}
                                    <div className="relative p-8 md:p-10">
                                        <div className="flex items-start justify-between mb-6">
                                            <div>
                                                <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-mono text-white/80 mb-4 inline-block">
                                                    {project.category}
                                                </span>
                                                <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
                                                    {project.title}
                                                </h3>
                                            </div>
                                            <span className="text-white/50 font-mono text-sm">{project.year}</span>
                                        </div>

                                        <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.tags.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-white/60"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex gap-4">
                                            <motion.a
                                                href="#"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="flex-1 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold text-white hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                                            >
                                                View Live
                                                <ExternalLink className="w-4 h-4" />
                                            </motion.a>
                                            <motion.a
                                                href="#"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold text-white hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                                            >
                                                <Github className="w-4 h-4" />
                                            </motion.a>
                                        </div>
                                    </div>

                                    {/* 3D Effect Line */}
                                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient}`} />
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Instruction */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-16 text-white/50 font-mono text-sm"
                >
                    Hover over cards to interact with the 3D stack
                </motion.p>
            </div>
        </section>
    )
}

export default StackedProjects
