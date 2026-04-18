import { Badge } from "@/components/ui/badge"

export const sections = [
  {
    id: 'hero',
    subtitle: <Badge variant="outline" className="text-green-400 border-green-400">⚡ Защита в реальном времени</Badge>,
    title: "Лучший антивирус.",
    showButton: true,
    buttonText: 'Скачать бесплатно'
  },
  {
    id: 'stats',
    title: 'Цифры говорят сами.',
    content: ''
  },
  {
    id: 'features',
    title: 'Полная защита.',
    content: ''
  },
  {
    id: 'pricing',
    title: 'Выбери свой план.',
    content: ''
  },
  {
    id: 'join',
    title: 'Скачай прямо сейчас.',
    content: 'Более 10 000 000 пользователей уже под защитой. Установка занимает 30 секунд.',
    showButton: true,
    buttonText: 'Скачать бесплатно'
  },
]
