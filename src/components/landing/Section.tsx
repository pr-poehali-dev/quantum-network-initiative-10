import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { SectionProps } from "@/types"

function BsodScreen({ onClose }: { onClose: () => void }) {
  const [progress, setProgress] = useState(32)

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
        <div>
          <div className="text-white text-8xl font-light mb-2">:(</div>
        </div>
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
              <p className="text-white text-sm mb-1">Дополнительные сведения об этой проблеме и возможных способах ее решения см. на странице</p>
              <p className="text-white text-sm mb-4">https://www.windows.com/stopcode</p>
              <p className="text-white text-sm mb-1">При обращении в службу поддержки оставьте следующие данные:</p>
              <p className="text-white text-sm">Код остановки: ANTIVIRUS_NOT_INSTALLED</p>
            </div>
          </div>
        </div>
        <div className="text-white text-sm opacity-60">Нажми в любом месте, чтобы закрыть</div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Section({ id, title, subtitle, content, isActive, showButton, buttonText }: SectionProps) {
  const [showBsod, setShowBsod] = useState(false)

  const handleButtonClick = () => {
    setShowBsod(true)
  }

  return (
    <>
      {showBsod && <BsodScreen onClose={() => setShowBsod(false)} />}
      <section id={id} className="relative h-screen w-full snap-start flex flex-col justify-center p-8 md:p-16 lg:p-24">
        {subtitle && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            {subtitle}
          </motion.div>
        )}
        <motion.h2
          className="text-4xl md:text-6xl lg:text-[5rem] xl:text-[6rem] font-bold leading-[1.1] tracking-tight max-w-4xl text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>
        {content && (
          <motion.p
            className="text-lg md:text-xl lg:text-2xl max-w-2xl mt-6 text-neutral-400"
            initial={{ opacity: 0, y: 50 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {content}
          </motion.p>
        )}
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 md:mt-16"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={handleButtonClick}
              className="text-green-400 bg-transparent border-green-400 hover:bg-green-400 hover:text-black transition-colors text-lg px-8 py-4"
            >
              {buttonText}
            </Button>
          </motion.div>
        )}
      </section>
    </>
  )
}
