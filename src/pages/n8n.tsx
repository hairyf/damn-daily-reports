import { Button } from '@heroui/react'
import { fetch } from '@tauri-apps/plugin-http'

function Page() {
  const n8nUrl = 'http://localhost:5678'
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  async function login() {
    await fetch(`${n8nUrl}/rest/login`, {
      method: 'POST',
      body: JSON.stringify({
        emailOrLdapLoginId: 'test@test.com',
        password: 'test',
      }),
    })
    setIsLoggedIn(true)
  }

  return (
    <layouts.default>
      <section className="flex flex-col gap-4 py-8 md:py-10 h-full">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">n8n 工作流编辑器</h1>
        </div>
        <Button onClick={login}>登录</Button>
        <div className="flex-1 w-full rounded-lg overflow-hidden">
          {isLoggedIn && (
            <iframe
              src={n8nUrl}
              className="w-full h-full min-h-[600px] border-0"
              title="n8n 工作流编辑器"
              allow="clipboard-read; clipboard-write"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
            />
          )}
        </div>
      </section>
    </layouts.default>
  )
}

export default Page
