import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface StepStatusProps {
  icon: React.ReactNode
  title: string
  description: string
  progress: number
  loading?: boolean
  isDarkMode: boolean
}

export function StepStatus({ icon, title, description, progress, loading, isDarkMode }: StepStatusProps) {
  return (
    <div className={`p-10 rounded-3xl text-center flex flex-col items-center border ${isDarkMode
      ? 'bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl'
      : 'bg-white border-gray-200 shadow-2xl shadow-blue-500/5'
    }`}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
        className="mb-6"
      >
        <div className={`p-5 rounded-full ring-4 ${isDarkMode ? 'bg-white/5 ring-white/5' : 'bg-gray-50 ring-gray-100'}`}>
          {icon}
        </div>
      </motion.div>
      <h2 className="text-3xl font-bold mb-2 tracking-tight">{title}</h2>
      <p className={`mb-8 max-w-sm mx-auto ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>{description}</p>

      <div className={`w-full h-1.5 rounded-full overflow-hidden mb-4 ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 2 }}
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        />
      </div>

      {loading && (
        <div className={`flex items-center text-xs font-mono ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>
          <Loader2 className="animate-spin mr-2" size={14} />
          PROCESSING...
        </div>
      )}
    </div>
  )
}
