import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
    {
        id: 1,
        title: 'Project Genesis',
        description: 'A revolutionary 3D web experience with real-time graphics and immersive interactions.',
        tags: ['React', 'Three.js', 'WebGL', 'GSAP'],
        gradient: 'from-primary to-secondary',
        emoji: '🚀'
    },
    {
        id: 2,
        title: 'Cyber Dashboard',
        description: 'Advanced analytics platform with real-time data visualization and futuristic UI.',
        tags: ['Vue.js', 'D3.js', 'Node.js', 'MongoDB'],
        gradient: 'from-secondary to-accent',
        emoji: '⚡'
    },
    {
        id: 3,
        title: 'Neural Network',
        description: 'AI-powered platform showcasing machine learning with interactive visualizations.',
        tags: ['Python', 'TensorFlow', 'React', 'FastAPI'],
        gradient: 'from-accent to-warning',
        emoji: '🧠'
    },
    {
        id: 4,
        title: 'Metaverse Hub',
        description: 'Web3 platform for virtual experiences with blockchain integration.',
        tags: ['Next.js', 'Solidity', 'Web3.js', 'IPFS'],
        gradient: 'from-warning to-primary',
        emoji: '🌌'
    },
]

const ProjectShowcase = () => {
    return (
        <section id="projects" className="min-h-screen py-20 px-6 lg:px-20">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-gradient mb-4">
                        Featured Projects
                    </h2>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                        A collection of my best work showcasing creativity and technical expertise
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="glass rounded-2xl overflow-hidden border border-primary/20 hover:border-primary/50 transition-all group"
                        >
                            {/* Project Image/Placeholder */}
                            <div className={`relative h-64 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
                                {/* Animated Background */}
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 90, 0],
                                    }}
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="absolute inset-0 opacity-20"
                                >
                                    <div className="w-full h-full" style={{
                                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)',
                                    }} />
                                </motion.div>

                                {/* Emoji */}
                                <span className="text-8xl filter drop-shadow-2xl group-hover:scale-110 transition-transform relative z-10">
                                    {project.emoji}
                                </span>

                                {/* Hover Overlay */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    className="absolute inset-0 bg-dark/90 flex items-center justify-center gap-4"
                                >
                                    <motion.a
                                        href="#"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="px-6 py-3 bg-primary rounded-full flex items-center gap-2 text-dark font-semibold"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                        Live Demo
                                    </motion.a>
                                    <motion.a
                                        href="#"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="px-6 py-3 glass border border-primary/50 rounded-full flex items-center gap-2 text-white font-semibold"
                                    >
                                        <Github className="w-5 h-5" />
                                        Code
                                    </motion.a>
                                </motion.div>
                            </div>

                            {/* Project Info */}
                            <div className="p-6">
                                <h3 className="text-2xl font-display font-bold mb-2 text-white group-hover:text-gradient transition-all">
                                    {project.title}
                                </h3>
                                <p className="text-white/70 mb-4">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 text-xs font-mono bg-primary/10 border border-primary/30 rounded-full text-primary"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ProjectShowcase
