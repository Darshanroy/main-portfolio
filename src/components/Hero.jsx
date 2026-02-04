import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Send, Sparkles, Code2, Palette, Zap } from 'lucide-react'
import { useRef } from 'react'

const Hero = () => {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
    const y = useTransform(scrollYProgress, [0, 1], [0, -100])

    return (
        <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
            <motion.div
                style={{ opacity, scale, y }}
                className="relative z-10 text-center px-6 max-w-5xl"
            >
                {/* Floating Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-6 py-3 mb-8 glass rounded-full border border-primary/30"
                >
                    <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                    <span className="font-mono text-sm text-primary">Available for Freelance</span>
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mb-8"
                >
                    <span className="block text-xl md:text-2xl text-white/60 font-display mb-4">
                        AI and Machine Learning Engineer
                    </span>
                    <span className="block text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-none">
                        <span className="text-white">Darshan</span>
                    </span>
                    <span className="block text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-none mt-2">
                        <span className="text-gradient">Kumar</span>
                    </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                    Specializing in AI and ML solutions, with AI agents, RAG applications, and Fine-tuning.
                    Building custom AI solutions using LLMs, GraphRAG, and advanced ML frameworks.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    <motion.a
                        href="#work"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-12 py-6 bg-gradient-to-r from-primary via-secondary to-accent rounded-full font-display font-bold text-xl text-dark overflow-hidden shadow-2xl"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Explore My Work
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </motion.a>

                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-12 py-6 glass border-2 border-primary/50 rounded-full font-display font-bold text-xl text-white hover:border-primary hover:glow transition-all flex items-center gap-3 shadow-xl"
                    >
                        Let's Talk
                        <Send className="w-6 h-6" />
                    </motion.a>
                </motion.div>
            </motion.div>


            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-20 h-20 border border-primary/20 rounded-full animate-float" />
            <div className="absolute bottom-20 right-10 w-32 h-32 border border-secondary/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-accent/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
        </section>
    )
}

export default Hero
