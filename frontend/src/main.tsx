import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './theme/theme-provider.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { Router } from './routes/index.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <TooltipProvider>
            <Router />
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
