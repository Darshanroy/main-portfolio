import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Twitter, MessageCircle, MapPin } from 'lucide-react'

const ContactSection = () => {
    return (
        <section id="contact" className="relative py-20 px-6 lg:px-20 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="relative glass rounded-3xl p-12 md:p-16 lg:p-20 border border-primary/20 overflow-hidden">
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Left Side - CTA */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <motion.h2
                                    className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <span className="text-white">READY TO</span>{' '}
                                    <span className="text-gradient">BUILD?</span>
                                </motion.h2>

                                <motion.p
                                    className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    Let's collaborate and build the next generation of AI-powered solutions together.
                                </motion.p>

                                {/* Social Links */}
                                <motion.div
                                    className="flex items-center gap-4 mb-8"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <span className="text-white/50 font-mono text-sm">CONNECT:</span>
                                    {[
                                        { icon: Github, href: 'https://github.com/Darshanroy', label: 'GITHUB' },
                                        { icon: Linkedin, href: 'https://www.linkedin.com/in/darshankumarr/', label: 'LINKEDIN' },
                                        { icon: Twitter, href: '#', label: 'TWITTER' },
                                    ].map((social, index) => (
                                        <motion.a
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="text-white/50 hover:text-primary transition-colors font-mono text-sm"
                                        >
                                            {social.label}
                                        </motion.a>
                                    ))}
                                </motion.div>
                            </motion.div>

                            {/* Right Side - Contact Info & CTAs */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="space-y-6"
                            >
                                {/* Contact Info Cards */}
                                <div className="space-y-4 mb-8">
                                    <motion.a
                                        href="mailto:Darshankumar@gmail.com"
                                        whileHover={{ x: 5, scale: 1.02 }}
                                        className="flex items-center gap-4 p-4 glass rounded-xl border border-white/10 hover:border-primary/50 transition-all group"
                                    >
                                        <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-all">
                                            <Mail className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-white/50">Email</p>
                                            <p className="text-white font-mono">Darshankumar@gmail.com</p>
                                        </div>
                                    </motion.a>

                                    <motion.a
                                        href="https://wa.me/918453036381"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ x: 5, scale: 1.02 }}
                                        className="flex items-center gap-4 p-4 glass rounded-xl border border-white/10 hover:border-accent/50 transition-all group"
                                    >
                                        <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-all">
                                            <MessageCircle className="w-6 h-6 text-accent" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-white/50">WhatsApp</p>
                                            <p className="text-white font-mono">+91 8453036381</p>
                                        </div>
                                    </motion.a>

                                    <motion.div
                                        whileHover={{ x: 5, scale: 1.02 }}
                                        className="flex items-center gap-4 p-4 glass rounded-xl border border-white/10"
                                    >
                                        <div className="p-3 bg-secondary/10 rounded-lg">
                                            <MapPin className="w-6 h-6 text-secondary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-white/50">Location</p>
                                            <p className="text-white font-mono">Bengaluru, India</p>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* CTA Buttons */}
                                <div className="space-y-4">
                                    <motion.a
                                        href="https://wa.me/918453036381?text=Hi%20Darshan%2C%20I%27d%20like%20to%20discuss%20an%20AI%20project"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="block w-full px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full font-display font-bold text-lg text-white text-center shadow-lg shadow-pink-500/50 hover:shadow-pink-500/70 transition-all"
                                    >
                                        💬 Let's Chat on WhatsApp
                                    </motion.a>

                                    <motion.a
                                        href="#work"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="block w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-display font-bold text-lg text-white text-center shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all"
                                    >
                                        📂 Browse My Projects
                                    </motion.a>

                                    <motion.a
                                        href="mailto:Darshankumar@gmail.com"
                                        whileHover={{ scale: 1.02 }}
                                        className="block text-center text-white/50 hover:text-white transition-colors font-mono text-sm py-2"
                                    >
                                        Or send me an email →
                                    </motion.a>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactSection
