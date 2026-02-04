import { motion } from 'framer-motion'
import { Brain, Zap, Database, Bot, Network, BarChart3 } from 'lucide-react'

const skills = [
    {
        id: 1,
        title: 'Custom AI & ML Solutions',
        icon: Brain,
        gradient: 'from-violet-500 to-purple-600',
        description: 'End-to-end AI/ML solutions with advanced neural networks',
        technologies: ['PyTorch', 'TensorFlow', 'GPT-4', 'Claude', 'Gemini']
    },
    {
        id: 2,
        title: 'LLM Fine-tuning',
        icon: Zap,
        gradient: 'from-orange-500 to-red-600',
        description: 'Parameter-efficient fine-tuning with QLoRA and LoRA',
        technologies: ['QLoRA', 'LoRA', 'PEFT', 'HuggingFace']
    },
    {
        id: 3,
        title: 'RAG Applications',
        icon: Database,
        gradient: 'from-emerald-500 to-teal-600',
        description: 'State-of-the-art retrieval-augmented generation',
        technologies: ['GraphRAG', 'Vector DBs', 'LangChain', 'LlamaIndex']
    },
    {
        id: 4,
        title: 'AI Agents & Chatbots',
        icon: Bot,
        gradient: 'from-pink-500 to-rose-600',
        description: 'Autonomous agents and conversational AI systems',
        technologies: ['LangGraph', 'AutoGen', 'CrewAI', 'OpenAI API']
    },
    {
        id: 5,
        title: 'MLOps & Deployment',
        icon: Network,
        gradient: 'from-indigo-500 to-purple-600',
        description: 'Production-ready ML pipelines and deployment',
        technologies: ['Docker', 'FastAPI', 'AWS', 'Kubernetes']
    },
    {
        id: 6,
        title: 'Data Engineering',
        icon: BarChart3,
        gradient: 'from-amber-500 to-orange-600',
        description: 'Data pipelines and analytics infrastructure',
        technologies: ['SQL', 'Pandas', 'NumPy', 'Apache Spark']
    },
]

const FloatingSkills = () => {
    return (
        <section id="skills" className="relative py-32 px-6 lg:px-20">
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
                        EXPERTISE
                    </span>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6">
                        AI & ML <span className="text-gradient">Capabilities</span>
                    </h2>
                    <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                        Cutting-edge AI and machine learning solutions powered by the latest frameworks and methodologies.
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="group relative"
                        >
                            <div className="relative glass rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all h-full">
                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${skill.gradient} flex items-center justify-center mb-4`}>
                                    <skill.icon className="w-7 h-7 text-white" />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-gradient transition-all">
                                    {skill.title}
                                </h3>

                                {/* Description */}
                                <p className="text-white/60 text-sm mb-4 leading-relaxed">
                                    {skill.description}
                                </p>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2">
                                    {skill.technologies.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono text-white/50"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Hover Glow */}
                                <div className={`absolute -inset-6 bg-gradient-to-r ${skill.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity pointer-events-none`} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FloatingSkills
