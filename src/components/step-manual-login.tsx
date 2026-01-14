import { useTheme } from '@heroui/use-theme'
import {
  AlertCircle,
  ArrowRight,
} from 'lucide-react'

export function ManualLoginN8n() {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'
  const cardClasses = isDarkMode
    ? 'bg-white/5 border border-white/10 backdrop-blur-xl'
    : 'bg-white border border-gray-200 shadow-2xl'
  const inputClasses = isDarkMode
    ? 'bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:ring-blue-500/50'
    : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:ring-blue-600/30'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function onAccountSubmit(_username: string, _password: string) {

  }

  return (
    <div className={`${cardClasses} p-8 rounded-3xl`}>
      <div className="flex items-center space-x-4 mb-6">
        <div className={`${isDarkMode ? 'bg-red-500/20' : 'bg-red-50'} p-3 rounded-2xl`}>
          <AlertCircle className="text-red-500" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold">账号初始化失败</h2>
          <p className={`${isDarkMode ? 'text-white/60' : 'text-gray-500'} text-sm`}>可能以前启动过 n8n，请输入旧账号进行手动登录</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className={`text-xs uppercase tracking-widest font-semibold px-1 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="n8n-admin"
            className={`w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all ${inputClasses}`}
          />
        </div>
        <div className="space-y-2">
          <label className={`text-xs uppercase tracking-widest font-semibold px-1 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            className={`w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all ${inputClasses}`}
          />
        </div>
        <button
          onClick={() => onAccountSubmit(username, password)}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>确认登录</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
}
