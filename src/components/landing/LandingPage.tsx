import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import Section from './Section'
import Layout from './Layout'
import { sections } from './sections'

function VirusEasterEgg({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800)
    const t2 = setTimeout(() => setPhase(2), 2000)
    const t3 = setTimeout(() => setPhase(3), 3500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: '#000' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={phase === 3 ? onClose : undefined}
    >
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-sm"
          style={{
            width: Math.random() * 80 + 10,
            height: Math.random() * 80 + 10,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: `hsl(${120 + Math.random() * 40}, 100%, ${30 + Math.random() * 30}%)`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: phase >= 1 ? [0.3, 0.8, 0.3] : 0, scale: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 1.5, delay: i * 0.05, repeat: Infinity, repeatType: 'reverse' }}
        />
      ))}

      <div className="relative z-10 text-center px-8 max-w-2xl">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <motion.p key="p0" className="text-green-400 font-mono text-xl"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              Обнаружена угроза...
            </motion.p>
          )}
          {phase === 1 && (
            <motion.div key="p1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-green-400 font-mono text-lg mb-2">{'>'} VIRUS_666.exe запущен</p>
              <p className="text-green-300 font-mono text-sm animate-pulse">Сканирую файлы... 4096 найдено...</p>
            </motion.div>
          )}
          {phase === 2 && (
            <motion.div key="p2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-red-500 font-mono text-4xl font-bold mb-4">ЗАРАЖЕНО!</p>
              <p className="text-green-400 font-mono text-sm">Привет, я вирус.<br/>Мне здесь очень уютно 😊<br/>Твой антивирус — отстой.</p>
            </motion.div>
          )}
          {phase === 3 && (
            <motion.div key="p3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-green-400 font-mono text-4xl font-bold mb-4">ШУТКА! 😄</p>
              <p className="text-green-300 font-mono text-sm mb-6">Наш антивирус поймал бы его за 0.001 сек.<br/>А ты поверил!</p>
              <p className="text-gray-500 font-mono text-xs">Нажми в любом месте, чтобы закрыть</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState(0)
  const [showVirus, setShowVirus] = useState(false)
  const [typed, setTyped] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPosition = containerRef.current.scrollTop
        const windowHeight = window.innerHeight
        const newActiveSection = Math.floor(scrollPosition / windowHeight)
        setActiveSection(newActiveSection)
      }
    }
    const container = containerRef.current
    if (container) container.addEventListener('scroll', handleScroll)
    return () => { if (container) container.removeEventListener('scroll', handleScroll) }
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const next = (typed + e.key).slice(-5).toLowerCase()
      setTyped(next)
      if (next === 'вирус' || next === 'virus') {
        setShowVirus(true)
        setTyped('')
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [typed])

  const handleNavClick = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: index * window.innerHeight, behavior: 'smooth' })
    }
  }

  return (
    <Layout>
      <AnimatePresence>
        {showVirus && <VirusEasterEgg onClose={() => setShowVirus(false)} />}
      </AnimatePresence>
      <nav className="fixed top-0 right-0 h-screen flex flex-col justify-center z-30 p-4">
        {sections.map((section, index) => (
          <button
            key={section.id}
            className={`w-3 h-3 rounded-full my-2 transition-all ${
              index === activeSection ? 'bg-white scale-150' : 'bg-gray-600'
            }`}
            onClick={() => handleNavClick(index)}
          />
        ))}
      </nav>
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-white origin-left z-30"
        style={{ scaleX }}
      />
      <div ref={containerRef} className="h-full overflow-y-auto snap-y snap-mandatory">
        {sections.map((section, index) => (
          <Section key={section.id} {...section} isActive={index === activeSection} />
        ))}
      </div>
    </Layout>
  )
}
