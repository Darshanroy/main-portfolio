import { motion } from 'framer-motion'
import { ExternalLink, Github, Star, Code2 } from 'lucide-react'
import { useState } from 'react'

const projects = [
    {
        id: 1,
        title: 'Swift Scholar',
        category: 'EdTech Platform',
        description: 'Learning network enabling connections between students and experts with AI tutor agents.',
        tags: ['AI Agents', 'LangGraph', 'React'],
        gradient: 'from-violet-500 to-purple-600',
        year: '2025',
        featured: true
    },
    {
        id: 2,
        title: 'FronSoc Startup',
        category: 'B2C Platform',
        description: 'Voice-powered AI e-commerce platform with multilingual LLM support.',
        tags: ['Voice AI', 'E-commerce', 'LLM'],
        gradient: 'from-cyan-500 to-blue-600',
        year: '2024',
        featured: true
    },
    {
        id: 3,
        title: 'AI Agent Suite',
        category: 'AI/Automation',
        description: 'Collection of AI agents: DPA, AAMPA, Mental Health Support, RAG System.',
        tags: ['LangChain', 'RAG', 'NLP'],
        gradient: 'from-emerald-500 to-teal-600',
        year: '2024',
        featured: true
    },
    {
        id: 4,
        title: 'Art & Heritage Explorer',
        category: 'AI Storytelling',
        description: 'AI-powered history platform with story generation and NLP chatbot.',
        tags: ['Streamlit', 'Google AI', 'Python'],
        gradient: 'from-orange-500 to-red-600',
        year: '2024',
        featured: true
    },
    {
        id: 5,
        title: 'Civic Assistance Agent',
        category: 'AI Public Service',
        description: 'AI agent system for civic services with LLM integration and real-time assistance.',
        tags: ['LangChain', 'FastAPI', 'React'],
        gradient: 'from-pink-500 to-rose-600',
        year: '2024',
        featured: false
    },
    {
        id: 6,
        title: 'LLM Fine-Tuning Platform',
        category: 'ML Infrastructure',
        description: 'Platform for parameter-efficient fine-tuning with QLoRA and training optimization.',
        tags: ['PyTorch', 'LoRA', 'HuggingFace'],
        gradient: 'from-indigo-500 to-purple-600',
        year: '2024',
        featured: false
    },
    {
        id: 7,
        title: 'Financial Analysis Bot',
        category: 'FinTech AI',
        description: 'Real-time market analysis bot with sentiment analysis and trend prediction.',
        tags: ['Python', 'TensorFlow', 'NLP'],
        gradient: 'from-amber-500 to-orange-600',
        year: '2024',
        featured: false
    },
    {
        id: 8,
        title: 'Code Assistant AI',
        category: 'Developer Tools',
        description: 'AI-powered coding assistant with context-aware suggestions and debugging.',
        tags: ['GPT-4', 'VS Code', 'TypeScript'],
        gradient: 'from-teal-500 to-cyan-600',
        year: '2024',
        featured: false
    },
]

const AnimatedGrid = () => {
    const [filter, setFilter] = useState('all')

    const filteredProjects = filter === 'all'
        ? projects
        : filter === 'featured'
            ? projects.filter(p => p.featured)
            : projects

    return (
        <section id="work" className="relative py-32 px-6 lg:px-20">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <span className="inline-block px-5 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary font-mono text-sm font-semibold mb-6">
                        PORTFOLIO
                    </span>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6">
                        Featured <span className="text-gradient">Projects</span>
                    </h2>
                    <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-8">
                        A showcase of innovative projects spanning AI, web development, and automation.
                    </p>

                    {/* Filter Buttons */}
                    <div className="flex justify-center gap-4 flex-wrap">
                        {['all', 'featured'].map((filterType) => (
                            <motion.button
                                key={filterType}
                                onClick={() => setFilter(filterType)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-2 rounded-full font-mono text-sm font-semibold transition-all ${filter === filterType
                                    ? 'bg-gradient-to-r from-primary to-secondary text-dark'
                                    : 'glass border border-white/20 text-white/70 hover:text-white'
                                    }`}
                            >
                                {filterType === 'all' ? 'All Projects' : 'Featured Only'}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Animated Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 50 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                                layout: { duration: 0.3 }
                            }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="group relative"
                        >
                            <div className="relative glass rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all h-full">
                                {/* Featured Badge */}
                                {project.featured && (
                                    <div className="absolute top-4 right-4 z-10">
                                        <motion.div
                                            initial={{ rotate: -10 }}
                                            animate={{ rotate: 10 }}
                                            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                                            className={`px-3 py-1 bg-gradient-to-r ${project.gradient} rounded-full flex items-center gap-1`}
                                        >
                                            <Star className="w-3 h-3 text-white fill-white" />
                                            <span className="text-xs font-bold text-white">Featured</span>
                                        </motion.div>
                                    </div>
                                )}

                                {/* Gradient Header */}
                                <div className={`relative h-32 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                                    <div className="absolute inset-0 bg-black/20" />
                                    <motion.div
                                        className="absolute inset-0 opacity-30"
                                        animate={{
                                            backgroundPosition: ['0% 0%', '100% 100%'],
                                        }}
                                        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                                        style={{
                                            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)`,
                                            backgroundSize: '200% 200%'
                                        }}
                                    />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <span className="px-2 py-1 bg-black/30 backdrop-blur-sm rounded text-xs font-mono text-white">
                                            {project.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-xl font-display font-bold text-white group-hover:text-gradient transition-all">
                                            {project.title}
                                        </h3>
                                        <span className="text-white/50 font-mono text-xs">{project.year}</span>
                                    </div>

                                    <p className="text-white/70 text-sm leading-relaxed mb-4">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono text-white/60"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <motion.a
                                            href="#"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex-1 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-sm font-semibold text-white hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                                        >
                                            <ExternalLink className="w-3 h-3" />
                                            Live
                                        </motion.a>
                                        <motion.a
                                            href="#"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-sm font-semibold text-white hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Github className="w-3 h-3" />
                                        </motion.a>
                                    </div>
                                </div>

                                {/* Hover Glow */}
                                <div className={`absolute -inset-10 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity pointer-events-none`} />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Project Count */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12 text-white/50 font-mono text-sm"
                >
                    Showing {filteredProjects.length} of {projects.length} projects
                </motion.p>
            </div>
        </section>
    )
}

export default AnimatedGrid
