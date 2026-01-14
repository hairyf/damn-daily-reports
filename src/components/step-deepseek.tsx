import { useTheme } from '@heroui/use-theme'
import {
  ArrowRight,
  BrainCircuit,
} from 'lucide-react'

export function StepDeepSeek() {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'
  const cardClasses = isDarkMode
    ? 'bg-white/5 border border-white/10 backdrop-blur-xl'
    : 'bg-white border border-gray-200 shadow-2xl'
  const inputClasses = isDarkMode
    ? 'bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:ring-blue-500/50'
    : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:ring-blue-600/30'

  const [apiKey, setApiKey] = useState('')
  function onDeepSeekSubmit(_apiKey: string) {

  }

  function onSkip() {

  }
  return (
    <div className={`${cardClasses} p-8 rounded-3xl`}>
      <div className="flex items-center space-x-4 mb-6">
        <div className={`${isDarkMode ? 'bg-indigo-500/20' : 'bg-indigo-50'} p-3 rounded-2xl`}>
          <BrainCircuit className="text-indigo-600" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold">配置 DeepSeek API</h2>
          <p className={`${isDarkMode ? 'text-white/60' : 'text-gray-500'} text-sm`}>连接大模型以增强自动化能力</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className={`text-xs uppercase tracking-widest font-semibold px-1 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>DeepSeek API Key</label>
          <input
            type="text"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder="sk-..."
            className={`w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all ${inputClasses}`}
          />
        </div>
        <div className={`p-4 border rounded-xl ${isDarkMode ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-yellow-50 border-yellow-200'}`}>
          <p className={`text-xs flex items-start ${isDarkMode ? 'text-yellow-200/80' : 'text-yellow-700'}`}>
            <span className="mr-2">💡</span>
            Tip：点击 Skip 跳过，您之后可以在自动化页面单独设置模型配置。
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={onSkip}
            className={`flex-1 font-bold py-3 rounded-xl transition-all ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-white/70' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
          >
            Skip
          </button>
          <button
            onClick={() => onDeepSeekSubmit(apiKey)}
            className="flex-[2] bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>确认配置</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
