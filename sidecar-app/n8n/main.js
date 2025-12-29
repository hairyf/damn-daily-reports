import { app } from 'electron'
import { fork } from 'child_process'

app.whenReady().then(() => {
  const childProcess = fork(require.resolve('./main.n8n.js'))
  childProcess.on('close', (code) => console.warn(`n8n child process exited with code ${code}`))
})
