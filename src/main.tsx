import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import MainRoutes from './routes.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { Toaster } from "@/components/ui/toaster"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <MainRoutes />
        <Toaster/>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
