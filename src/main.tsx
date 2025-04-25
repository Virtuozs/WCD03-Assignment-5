import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { PokemonFilterProvider } from './context/PokemonFilterContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <PokemonFilterProvider>
        <App />
      </PokemonFilterProvider>
    </ThemeProvider>
  </StrictMode>,
)
