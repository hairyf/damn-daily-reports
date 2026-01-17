import { listen } from '@tauri-apps/api/event'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { Provider } from './provider.tsx'
import './styles/main.css'

listen('schedule:collect', () => {
  console.log('Schedule Collect Event Received')
})

listen('schedule:generate', () => {
  console.log('Schedule Generate Event Received')
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
