import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Compatibility shim so Ant Design v5 works correctly on React 19.
import '@ant-design/v5-patch-for-react-19'
import App from './App.tsx'
import './styles/global.css'
import './styles/markdown.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
