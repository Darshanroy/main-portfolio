import EnhancedBackground from './components/3D/EnhancedBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FloatingSkills from './components/FloatingSkills'
import AnimatedGrid from './components/AnimatedGrid'
import ContactSection from './components/ContactSection'
import ScrollProgress from './components/ScrollProgress'

function App() {
    return (
        <div className="relative min-h-screen overflow-x-hidden bg-dark">
            {/* Scroll Progress */}
            <ScrollProgress />

            {/* 3D Background */}
            <EnhancedBackground />

            {/* Navigation */}
            <Navbar />

            {/* Main Content */}
            <main id="home" className="relative z-10">
                <Hero />
                <FloatingSkills />
                <AnimatedGrid />
                <ContactSection />

                {/* Enhanced Footer */}
                <footer className="py-12 px-6 lg:px-20 border-t border-white/10">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="text-center md:text-left">
                                <p className="font-mono text-white/50 text-sm">
                                    © 2026 Darshan Kumar. All rights reserved.
                                </p>
                            </div>
                            <div className="flex items-center gap-6">
                                <a
                                    href="https://github.com/Darshanroy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/50 hover:text-primary transition-colors text-sm font-mono"
                                >
                                    GITHUB
                                </a>
                                <span className="text-white/20">•</span>
                                <a
                                    href="https://www.linkedin.com/in/darshankumarr/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/50 hover:text-primary transition-colors text-sm font-mono"
                                >
                                    LINKEDIN
                                </a>
                                <span className="text-white/20">•</span>
                                <a
                                    href="https://wa.me/918453036381"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/50 hover:text-accent transition-colors text-sm font-mono"
                                >
                                    WHATSAPP
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    )
}

export default App
