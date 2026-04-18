import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import type { SectionProps } from "@/types"

function BsodScreen({ onClose }: { onClose: () => void }) {
  const [progress, setProgress] = useState(32)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        return p + 1
      })
    }, 80)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col justify-between p-12 cursor-pointer"
        style={{ backgroundColor: '#0078D7', fontFamily: 'Segoe UI, sans-serif' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="text-white text-8xl font-light">:(</div>
        <div className="max-w-3xl">
          <p className="text-white text-2xl leading-relaxed mb-8">
            На вашем ПК возникла проблема, и его необходимо перезагрузить.<br />
            Мы лишь собираем некоторые сведения об ошибке, а затем будет автоматически выполнена перезагрузка.
          </p>
          <p className="text-white text-3xl font-light mb-12">{progress}% завершить</p>
          <div className="flex items-start gap-6">
            <div className="w-28 h-28 bg-white flex-shrink-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='white'/%3E%3Crect x='10' y='10' width='30' height='30' fill='%230078D7'/%3E%3Crect x='60' y='10' width='30' height='30' fill='%230078D7'/%3E%3Crect x='10' y='60' width='30' height='30' fill='%230078D7'/%3E%3Crect x='60' y='60' width='30' height='30' fill='%230078D7'/%3E%3C/svg%3E")`,
              backgroundSize: 'cover'
            }} />
            <div>
              <p className="text-white text-sm mb-1">Дополнительные сведения об этой проблеме см. на странице</p>
              <p className="text-white text-sm mb-4">https://www.windows.com/stopcode</p>
              <p className="text-white text-sm mb-1">Код остановки: ANTIVIRUS_NOT_INSTALLED</p>
            </div>
          </div>
        </div>
        <div className="text-white text-sm opacity-60">Нажми в любом месте, чтобы закрыть</div>
      </motion.div>
    </AnimatePresence>
  )
}

function StatsSection({ isActive }: { isActive: boolean }) {
  const [counts, setCounts] = useState({ threats: 0, users: 0, speed: 0, rating: 0 })

  useEffect(() => {
    if (!isActive) return
    const targets = { threats: 4800000, users: 10000000, speed: 99, rating: 49 }
    const duration = 2000
    const steps = 60
    const interval = duration / steps
    let step = 0
    const timer = setInterval(() => {
      step++
      const p = step / steps
      const ease = 1 - Math.pow(1 - p, 3)
      setCounts({
        threats: Math.floor(targets.threats * ease),
        users: Math.floor(targets.users * ease),
        speed: Math.floor(targets.speed * ease),
        rating: Math.floor(targets.rating * ease),
      })
      if (step >= steps) clearInterval(timer)
    }, interval)
    return () => clearInterval(timer)
  }, [isActive])

  const stats = [
    { label: 'Угроз заблокировано', value: counts.threats.toLocaleString('ru') + '+', icon: 'ShieldX', color: 'text-red-400' },
    { label: 'Пользователей защищены', value: counts.users.toLocaleString('ru') + '+', icon: 'Users', color: 'text-green-400' },
    { label: 'Точность обнаружения', value: counts.speed + '.9%', icon: 'Target', color: 'text-blue-400' },
    { label: 'Рейтинг пользователей', value: (counts.rating / 10).toFixed(1) + ' / 5.0', icon: 'Star', color: 'text-yellow-400' },
  ]

  return (
    <div className="grid grid-cols-2 gap-6 mt-8 max-w-2xl">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          className="border border-neutral-800 rounded-xl p-5 bg-neutral-900/50"
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        >
          <Icon name={s.icon} className={`${s.color} mb-2`} size={22} />
          <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          <p className="text-neutral-500 text-xs mt-1">{s.label}</p>
        </motion.div>
      ))}
    </div>
  )
}

function FeaturesSection({ isActive }: { isActive: boolean }) {
  const features = [
    { icon: 'Shield', title: 'Защита в реальном времени', desc: 'Блокируем угрозы до того, как они навредят' },
    { icon: 'Wifi', title: 'Защита сети и VPN', desc: 'Шифрование трафика, блокировка фишинга' },
    { icon: 'Eye', title: 'Антишпион', desc: 'Обнаруживаем кейлоггеры и слежку за камерой' },
    { icon: 'Zap', title: 'Быстрое сканирование', desc: 'Полная проверка за 2 минуты без тормозов' },
    { icon: 'Lock', title: 'Менеджер паролей', desc: 'Хранилище паролей с шифрованием AES-256' },
    { icon: 'Baby', title: 'Родительский контроль', desc: 'Защита детей от нежелательного контента' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-4xl">
      {features.map((f, i) => (
        <motion.div
          key={f.title}
          className="border border-neutral-800 rounded-xl p-4 bg-neutral-900/40 hover:border-green-800 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.08, duration: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-green-900/50 flex items-center justify-center">
              <Icon name={f.icon} size={16} className="text-green-400" />
            </div>
            <p className="text-white text-sm font-semibold">{f.title}</p>
          </div>
          <p className="text-neutral-500 text-xs">{f.desc}</p>
        </motion.div>
      ))}
    </div>
  )
}

function PricingSection({ isActive, onBsod }: { isActive: boolean, onBsod: () => void }) {
  const plans = [
    {
      name: 'Бесплатно',
      price: '0₽',
      period: 'навсегда',
      color: 'border-neutral-700',
      badge: null,
      features: ['Базовое сканирование', 'Защита от вирусов', '1 устройство'],
      cta: 'Скачать',
      ctaStyle: 'border border-neutral-600 text-neutral-300 hover:border-neutral-400',
    },
    {
      name: 'Про',
      price: '299₽',
      period: 'в месяц',
      color: 'border-green-500',
      badge: '🔥 Популярный',
      features: ['Всё из Бесплатного', 'Защита в реальном времени', 'VPN 10 ГБ/мес', 'До 3 устройств'],
      cta: 'Купить Про',
      ctaStyle: 'bg-green-600 hover:bg-green-500 text-white',
    },
    {
      name: 'Максимум',
      price: '599₽',
      period: 'в месяц',
      color: 'border-yellow-600',
      badge: null,
      features: ['Всё из Про', 'Безлимитный VPN', 'Менеджер паролей', 'До 10 устройств', '24/7 поддержка'],
      cta: 'Купить Максимум',
      ctaStyle: 'border border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-black',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-3xl">
      {plans.map((plan, i) => (
        <motion.div
          key={plan.name}
          className={`border rounded-xl p-5 bg-neutral-900/50 flex flex-col ${plan.color}`}
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.1, duration: 0.4 }}
        >
          {plan.badge && <p className="text-xs text-green-400 font-bold mb-2">{plan.badge}</p>}
          <p className="text-white font-bold text-lg">{plan.name}</p>
          <p className="text-3xl font-bold text-white mt-1">{plan.price} <span className="text-sm text-neutral-500 font-normal">{plan.period}</span></p>
          <ul className="mt-4 space-y-2 flex-1">
            {plan.features.map(f => (
              <li key={f} className="flex items-center gap-2 text-neutral-400 text-xs">
                <Icon name="Check" size={12} className="text-green-400 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <button
            onClick={onBsod}
            className={`mt-5 w-full py-2 rounded-lg text-sm font-bold transition-colors ${plan.ctaStyle}`}
          >
            {plan.cta}
          </button>
        </motion.div>
      ))}
    </div>
  )
}

const VIRUSES = [
  'вирус', 'virus', 'троян', 'trojan', 'червь', 'worm', 'шпион', 'spyware',
  'малварь', 'malware', 'ransomware', 'вымогатель', 'руткит', 'rootkit',
  'keylogger', 'кейлоггер', 'backdoor', 'бэкдор', 'adware', 'exploit',
  'эксплойт', 'ботнет', 'botnet', 'cryptominer', 'майнер',
]

export default function Section({ id, title, subtitle, content, isActive, showButton, buttonText, onVirusTrigger }: SectionProps) {
  const [showBsod, setShowBsod] = useState(false)
  const [scanInput, setScanInput] = useState('')
  const [shake, setShake] = useState(false)
  const [hint, setHint] = useState('')

  const handleScan = () => {
    const val = scanInput.trim().toLowerCase()
    if (VIRUSES.some(v => val.includes(v))) {
      setHint(''); setScanInput(''); onVirusTrigger?.()
    } else if (val === 'антивирус' || val === 'antivirus') {
      setHint(''); setShowBsod(true); setScanInput('')
    } else {
      setShake(true)
      setHint('Угроза не найдена. Попробуй ещё раз...')
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <>
      {showBsod && <BsodScreen onClose={() => setShowBsod(false)} />}
      <section id={id} className="relative h-screen w-full snap-start flex flex-col justify-center p-8 md:p-16 lg:p-24">
        {subtitle && (
          <motion.div className="mb-6"
            initial={{ opacity: 0, y: 20 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            {subtitle}
          </motion.div>
        )}

        <motion.h2
          className="text-4xl md:text-6xl lg:text-[5rem] xl:text-[6rem] font-bold leading-[1.1] tracking-tight max-w-4xl text-white"
          initial={{ opacity: 0, y: 50 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          {title}
        </motion.h2>

        {content && (
          <motion.p className="text-lg md:text-xl max-w-2xl mt-4 text-neutral-400"
            initial={{ opacity: 0, y: 50 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
            {content}
          </motion.p>
        )}

        {id === 'stats' && <StatsSection isActive={isActive} />}
        {id === 'features' && <FeaturesSection isActive={isActive} />}
        {id === 'pricing' && <PricingSection isActive={isActive} onBsod={() => setShowBsod(true)} />}

        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10">
            <Button variant="outline" size="lg" onClick={() => setShowBsod(true)}
              className="text-green-400 bg-transparent border-green-400 hover:bg-green-400 hover:text-black transition-colors text-lg px-8 py-4">
              {buttonText}
            </Button>
          </motion.div>
        )}

        {id === 'hero' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6">
            <p className="text-neutral-500 text-xs mb-2">Проверь свой ПК прямо сейчас:</p>
            <motion.div className="flex gap-2 max-w-sm"
              animate={shake ? { x: [-8, 8, -6, 6, 0] } : {}} transition={{ duration: 0.4 }}>
              <input
                type="text"
                value={scanInput}
                onChange={(e) => { setScanInput(e.target.value); setHint('') }}
                onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                placeholder="Введи название угрозы..."
                className="bg-transparent border border-neutral-700 focus:border-green-500 text-white text-sm px-4 py-2 rounded outline-none w-full placeholder:text-neutral-600 transition-colors"
              />
              <Button size="sm" onClick={handleScan}
                className="bg-green-700 hover:bg-green-600 text-black font-bold px-4 whitespace-nowrap">
                Сканировать
              </Button>
            </motion.div>
            {hint && <p className="text-red-400 text-xs mt-2">{hint}</p>}
          </motion.div>
        )}
      </section>
    </>
  )
}