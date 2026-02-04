import { motion } from 'framer-motion'
import { Code2, Palette, Rocket, Zap, Database, Globe } from 'lucide-react'

const bentoItems = [
    {
        id: 1,
        title: 'About Me',
        description: 'Passionate developer creating stunning web experiences with modern technologies and creative solutions.',
        icon: Code2,
        className: 'md:col-span-2 md:row-span-2',
        gradient: 'from-primary/20 to-secondary/20'
    },
    {
        id: 2,
        title: '5+ Years',
        description: 'Professional Experience',
        icon: Zap,
        className: 'md:col-span-1',
        gradient: 'from-accent/20 to-primary/20'
    },
    {
        id: 3,
        title: '50+ Projects',
        description: 'Successfully Delivered',
        icon: Rocket,
        className: 'md:col-span-1',
        gradient: 'from-secondary/20 to-warning/20'
    },
    {
        id: 4,
        title: 'UI/UX Design',
        description: 'Creating beautiful and intuitive user interfaces',
        icon: Palette,
        className: 'md:col-span-1',
        gradient: 'from-warning/20 to-primary/20'
    },
    {
        id: 5,
        title: 'Backend Dev',
        description: 'Building robust and scalable systems',
        icon: Database,
        className: 'md:col-span-1',
        gradient: 'from-primary/20 to-accent/20'
    },
    {
        id: 6,
        title: 'Web3 Ready',
        description: 'Experience with blockchain and decentralized apps',
        icon: Globe,
        className: 'md:col-span-2',
        gradient: 'from-secondary/20 to-primary/20'
    },
]

const BentoGrid = () => {
    return (
        <section id="about" className="min-h-screen py-20 px-6 lg:px-20">
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
                        What I Do
                    </h2>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                        Combining creativity with technology to build exceptional digital experiences
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(200px,auto)]">
                    {bentoItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className={`${item.className} glass rounded-3xl p-6 md:p-8 relative overflow-hidden group cursor-pointer border border-primary/20 hover:border-primary/50 transition-all`}
                        >
                            {/* Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            {/* Content */}
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <item.icon className="w-10 h-10 md:w-12 md:h-12 mb-4 text-primary group-hover:text-accent transition-colors" />
                                    <h3 className="text-2xl md:text-3xl font-display font-bold mb-2 text-white">
                                        {item.title}
                                    </h3>
                                    <p className="text-white/70 text-sm md:text-base">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Hover Effect Line */}
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '100%' }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                                    className="h-[2px] bg-gradient-to-r from-primary via-secondary to-accent mt-4"
                                />
                            </div>

                            {/* Floating Orb */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.6, 0.3],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default BentoGrid
