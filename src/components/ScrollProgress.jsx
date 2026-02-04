import { motion, useScroll, useSpring } from 'framer-motion'

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    return (
        <>
            {/* Horizontal Progress Bar - Top */}
            <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50">
                <motion.div
                    style={{ scaleX, transformOrigin: 'left' }}
                    className="w-full h-full bg-gradient-to-r from-primary via-secondary to-accent shadow-lg shadow-primary/50"
                />
            </div>
        </>
    )
}

export default ScrollProgress
