import { motion, useScroll, useTransform } from 'framer-motion'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import { useRef } from 'react'

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

const HorizontalProjects = () => {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"])

    return (
        <section id="work" ref={containerRef} className="relative py-32 overflow-hidden">
            {/* Section Header */}
            <div className="px-6 lg:px-20 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-7xl mx-auto"
                >
                    <span className="inline-block px-5 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary font-mono text-sm font-semibold mb-6">
                        LATEST WORK
                    </span>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6">
                        Featured <span className="text-gradient">Projects</span>
                    </h2>
                    <p className="text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed">
                        A curated selection of my most impactful work, showcasing innovation, creativity, and technical excellence across various domains.
                    </p>

                    {/* Desktop Scroll Instruction */}
                    <div className="hidden md:flex items-center gap-3 mt-8 text-white/50">
                        <div className="flex items-center gap-2">
                            <ArrowRight className="w-5 h-5 animate-pulse" />
                            <span className="font-mono text-sm">Scroll horizontally to explore all projects</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Horizontal Scroll Container */}
            <motion.div style={{ x }} className="flex gap-8 px-6 lg:px-20">
                {projects.map((project, index) => (
                    <motion.article
                        key={project.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="flex-shrink-0 w-[90vw] md:w-[600px] group"
                    >
                        <div className="relative h-[500px] rounded-3xl overflow-hidden glass border border-white/10 hover:border-white/30 transition-all">
                            {/* Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />

                            {/* Animated Mesh */}
                            <div className="absolute inset-0 opacity-10">
                                <div
                                    className="w-full h-full"
                                    style={{
                                        backgroundImage: `
                      repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,.03) 2px, rgba(255,255,255,.03) 4px),
                      repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,.03) 2px, rgba(255,255,255,.03) 4px)
                    `,
                                    }}
                                />
                            </div>

                            {/* Content */}
                            <div className="relative h-full p-10 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-mono text-white/80">
                                            {project.category}
                                        </span>
                                        <span className="text-white/50 font-mono text-sm">{project.year}</span>
                                    </div>

                                    <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 group-hover:text-gradient transition-all">
                                        {project.title}
                                    </h3>

                                    <p className="text-white/70 text-lg leading-relaxed mb-6">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-white/60"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <motion.a
                                        href="#"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex-1 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold text-white hover:bg-white/20 transition-all flex items-center justify-center gap-2 group/btn"
                                    >
                                        View Live
                                        <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
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

                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                    </motion.article>
                ))}

                {/* End Card */}
                <div className="flex-shrink-0 w-[90vw] md:w-[500px] flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-center p-10"
                    >
                        <h3 className="text-4xl font-display font-bold text-white mb-6">
                            Want to see more?
                        </h3>
                        <p className="text-white/70 mb-8 text-lg">
                            Check out my full portfolio and GitHub for more projects.
                        </p>
                        <motion.a
                            href="#"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-full font-display font-semibold text-dark"
                        >
                            View All Projects
                            <ArrowRight className="w-5 h-5" />
                        </motion.a>
                    </motion.div>
                </div>
            </motion.div>

            {/* Mobile Scroll Hint */}
            <div className="md:hidden mt-8 px-6 flex items-center justify-center gap-3 text-white/40">
                <ArrowRight className="w-4 h-4" />
                <span className="font-mono text-xs">Swipe to see more projects</span>
            </div>
        </section>
    )
}

export default HorizontalProjects
