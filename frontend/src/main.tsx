import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './theme/theme-provider.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { Router } from './routes/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
