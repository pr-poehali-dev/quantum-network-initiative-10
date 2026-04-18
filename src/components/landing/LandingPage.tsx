import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import Section from './Section'
import Layout from './Layout'
import { sections } from './sections'

const THREATS = [
  { name: 'Trojan.Win32.Agent.xyz', path: 'C:\\Users\\User\\AppData\\Temp\\svchost32.exe', level: 'Высокая' },
  { name: 'Adware.SearchBar.gen', path: 'C:\\Program Files\\SearchToolbar\\toolbar.dll', level: 'Средняя' },
  { name: 'Spyware.KeyLogger.b', path: 'C:\\Windows\\System32\\drivers\\kbdhook.sys', level: 'Критическая' },
  { name: 'Worm.AutoRun.USB', path: 'D:\\autorun.inf', level: 'Высокая' },
  { name: 'Backdoor.IRC.Bot', path: 'C:\\Users\\User\\Downloads\\crack_v2.exe', level: 'Критическая' },
]

function AntivirusNotification() {
  const [visible, setVisible] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [found, setFound] = useState(0)
  const [done, setDone] = useState(false)
  const [threat] = useState(() => THREATS[Math.floor(Math.random() * THREATS.length)])

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!scanning) return
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setDone(true); return 100 }
        if (p === 40) setFound(1)
        if (p === 75) setFound(2)
        return p + 2
      })
    }, 60)
    return () => clearInterval(interval)
  }, [scanning])

  if (!visible) return null

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40 w-80 rounded-lg overflow-hidden shadow-2xl"
      style={{ background: '#1a1a2e', border: '1px solid #e74c3c' }}
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      <div className="flex items-center gap-2 px-4 py-2" style={{ background: '#e74c3c' }}>
        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="text-white text-xs font-bold tracking-wide uppercase">Антивирус — Предупреждение</span>
        <button onClick={() => setVisible(false)} className="ml-auto text-white opacity-70 hover:opacity-100 text-lg leading-none">×</button>
      </div>

      <div className="p-4">
        {!scanning && !done && (
          <>
            <p className="text-red-400 font-bold text-sm mb-1">⚠️ Обнаружена подозрительная активность!</p>
            <p className="text-gray-300 text-xs mb-1">Угроза: <span className="text-yellow-400">{threat.name}</span></p>
            <p className="text-gray-500 text-xs mb-3 truncate">{threat.path}</p>
            <p className="text-gray-400 text-xs mb-3">Уровень опасности: <span className="text-red-400 font-bold">{threat.level}</span></p>
            <div className="flex gap-2">
              <button
                onClick={() => setScanning(true)}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-2 rounded transition-colors"
              >
                Сканировать сейчас
              </button>
              <button
                onClick={() => setVisible(false)}
                className="flex-1 border border-gray-600 text-gray-400 hover:text-gray-200 text-xs py-2 rounded transition-colors"
              >
                Игнорировать
              </button>
            </div>
          </>
        )}

        {scanning && !done && (
          <>
            <p className="text-green-400 text-xs font-bold mb-2 animate-pulse">Сканирование системы...</p>
            <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
              <motion.div
                className="h-2 rounded-full bg-green-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-gray-500 text-xs mb-1">{progress}% завершено</p>
            {found > 0 && <p className="text-red-400 text-xs">Найдено угроз: {found}</p>}
          </>
        )}

        {done && (
          <>
            <p className="text-red-400 font-bold text-sm mb-2">🚨 Найдено угроз: {found}</p>
            <p className="text-gray-300 text-xs mb-1 truncate">• {threat.name}</p>
            <p className="text-gray-300 text-xs mb-3">• Adware.SearchBar.gen</p>
            <button
              onClick={() => setVisible(false)}
              className="w-full bg-green-600 hover:bg-green-500 text-white text-xs font-bold py-2 rounded transition-colors"
            >
              Удалить угрозы
            </button>
          </>
        )}
      </div>
    </motion.div>
  )
}

function ShakeEasterEgg({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 700)
    const t2 = setTimeout(() => setStep(2), 3000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black cursor-pointer"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={step === 2 ? onClose : undefined}
    >
      {[...Array(20)].map((_, i) => (
        <motion.div key={i} className="absolute w-full h-1 pointer-events-none"
          style={{ top: `${Math.random() * 100}%`, backgroundColor: i % 3 === 0 ? '#ff0000' : i % 3 === 1 ? '#00ff00' : '#0000ff', opacity: 0.15 }}
          animate={{ x: [-20, 20, -15, 15, 0], opacity: step >= 1 ? [0, 0.3, 0] : 0 }}
          transition={{ duration: 0.3, delay: i * 0.05, repeat: step < 2 ? Infinity : 0 }}
        />
      ))}

      <div className="relative z-10 text-center px-8 max-w-xl">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="g0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.p
                className="text-white font-mono text-3xl font-bold"
                animate={{ x: [-4, 4, -3, 3, 0], color: ['#ff0000', '#00ff00', '#0000ff', '#ffffff'] }}
                transition={{ duration: 0.15, repeat: Infinity }}
              >
                ⚠️ НЕСТАБИЛЬНОСТЬ СИСТЕМЫ
              </motion.p>
            </motion.div>
          )}
          {step === 1 && (
            <motion.div key="g1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.p
                className="text-red-500 font-mono text-5xl font-bold mb-4"
                animate={{ skewX: [-5, 5, -3, 3, 0] }}
                transition={{ duration: 0.2, repeat: Infinity }}
              >
                ГЛЮК!
              </motion.p>
              <p className="text-green-300 font-mono text-sm">Зафиксировано резкое движение мышью.<br/>Антивирус подозревает панику пользователя...</p>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="g2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-green-400 font-mono text-5xl font-bold mb-4">ШУТКА! 😄</p>
              <p className="text-green-300 font-mono text-sm mb-6">Не тряси мышкой — ПК не сломается!<br/>Хотя без антивируса — кто знает...</p>
              <p className="text-gray-500 font-mono text-xs">Нажми в любом месте, чтобы закрыть</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function KonamiEasterEgg({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 600)
    const t2 = setTimeout(() => setStep(2), 1800)
    const t3 = setTimeout(() => setStep(3), 3200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={step === 3 ? onClose : undefined}
    >
      {[...Array(30)].map((_, i) => (
        <motion.div key={i} className="absolute text-green-500 font-mono text-xs select-none pointer-events-none"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          initial={{ opacity: 0, y: -20 }}
          animate={step >= 1 ? { opacity: [0, 1, 0], y: [0, 80] } : {}}
          transition={{ duration: 2 + Math.random() * 2, delay: i * 0.08, repeat: Infinity }}
        >
          {Math.random() > 0.5 ? '1' : '0'}
        </motion.div>
      ))}

      <div className="relative z-10 text-center px-8 max-w-2xl">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.p key="s0" className="text-green-400 font-mono text-2xl"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              Код принят...
            </motion.p>
          )}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-green-400 font-mono text-6xl font-bold mb-4">👾</p>
              <p className="text-green-400 font-mono text-2xl font-bold mb-2">ТЫ ХАКЕР!</p>
              <p className="text-green-300 font-mono text-sm animate-pulse">Получаю доступ к системе...</p>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-yellow-400 font-mono text-lg mb-2">{'> root@antivirus:~#'}</p>
              <p className="text-green-300 font-mono text-sm mb-1">{'[OK] Доступ к ПК получен'}</p>
              <p className="text-green-300 font-mono text-sm mb-1">{'[OK] Все файлы найдены'}</p>
              <p className="text-red-400 font-mono text-sm mb-1 animate-pulse">{'[!!] Загружаю вирусы... 100%'}</p>
              <p className="text-green-300 font-mono text-sm">{'[OK] Готово. Добро пожаловать.'}</p>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-green-400 font-mono text-5xl font-bold mb-4">ШУТКА! 😄</p>
              <p className="text-green-300 font-mono text-sm mb-2">Конami-код найден. Ты настоящий геймер!</p>
              <p className="text-green-300 font-mono text-sm mb-6">↑↑↓↓←→←→BA — классика с 1986 года</p>
              <p className="text-gray-500 font-mono text-xs">Нажми в любом месте, чтобы закрыть</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

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
  const [showKonami, setShowKonami] = useState(false)
  const [showShake, setShowShake] = useState(false)
  const [glitch, setGlitch] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [inputVal, setInputVal] = useState('')
  const [shake, setShake] = useState(false)
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

  // Mouse shake easter egg
  useEffect(() => {
    let moves: number[] = []
    let triggered = false
    const handleMove = (e: MouseEvent) => {
      const now = Date.now()
      moves.push(now)
      moves = moves.filter(t => now - t < 500)
      if (moves.length > 20 && !triggered && !showShake) {
        triggered = true
        setGlitch(true)
        setTimeout(() => {
          setGlitch(false)
          setShowShake(true)
          triggered = false
          moves = []
        }, 1200)
      }
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [showShake])

  // Konami code easter egg
  useEffect(() => {
    const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
    let pos = 0
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === KONAMI[pos]) {
        pos++
        if (pos === KONAMI.length) {
          setShowKonami(true)
          pos = 0
        }
      } else {
        pos = e.key === KONAMI[0] ? 1 : 0
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const handleSecretSubmit = () => {
    if (inputVal.trim().toLowerCase() === 'вирус' || inputVal.trim().toLowerCase() === 'virus') {
      setShowInput(false)
      setInputVal('')
      setShowVirus(true)
    } else {
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  const handleNavClick = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: index * window.innerHeight, behavior: 'smooth' })
    }
  }

  return (
    <Layout style={glitch ? { filter: 'hue-rotate(180deg) contrast(2)', transition: 'none' } : {}}>
      <AntivirusNotification />
      <AnimatePresence>
        {showVirus && <VirusEasterEgg onClose={() => setShowVirus(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showKonami && <KonamiEasterEgg onClose={() => setShowKonami(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showShake && <ShakeEasterEgg onClose={() => setShowShake(false)} />}
      </AnimatePresence>

      {/* Скрытая кнопка-пасхалка */}
      <button
        className="fixed bottom-4 left-4 z-40 w-6 h-6 opacity-10 hover:opacity-40 transition-opacity"
        onClick={() => setShowInput(true)}
        title=""
      >
        <span className="text-green-400 font-mono text-xs">{'>'}_</span>
      </button>

      {/* Диалог ввода секретного слова */}
      <AnimatePresence>
        {showInput && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/70"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) { setShowInput(false); setInputVal('') } }}
          >
            <motion.div
              className="bg-gray-900 border border-green-500 rounded-lg p-8 w-80 font-mono"
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              animate={shake ? { x: [-10, 10, -8, 8, 0] } : { scale: 1, opacity: 1 }}
              transition={shake ? { duration: 0.4 } : {}}
            >
              <p className="text-green-400 text-sm mb-1">{'>'} АНТИВИРУС v2.0</p>
              <p className="text-green-300 text-xs mb-4 opacity-60">Введите секретный код доступа:</p>
              <input
                autoFocus
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSecretSubmit()}
                placeholder="_ _ _ _ _"
                className="w-full bg-black border border-green-700 text-green-400 font-mono text-center text-lg px-3 py-2 rounded outline-none focus:border-green-400 placeholder:text-green-900 tracking-widest"
              />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleSecretSubmit}
                  className="flex-1 bg-green-700 hover:bg-green-600 text-black font-bold py-2 rounded text-sm transition-colors"
                >
                  ВВОД
                </button>
                <button
                  onClick={() => { setShowInput(false); setInputVal('') }}
                  className="flex-1 border border-gray-600 hover:border-gray-400 text-gray-400 py-2 rounded text-sm transition-colors"
                >
                  ОТМЕНА
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
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
          <Section key={section.id} {...section} isActive={index === activeSection} onVirusTrigger={() => setShowVirus(true)} />
        ))}
      </div>
    </Layout>
  )
}