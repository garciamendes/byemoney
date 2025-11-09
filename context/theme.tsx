'use client'

import { http } from '@/shared/apiHttp/http'
import { useEffect, useOptimistic, useState, createContext } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextProps {
  theme: Theme
  loading: boolean
  toggleTheme: () => Promise<void>
}

export const ThemeContext = createContext<ThemeContextProps | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    async function loadTheme() {
      const data = await http.get<{ theme: Theme }>('/api/user/theme')
      applyTheme(data.theme)
      setLoading(false)
    }
    loadTheme()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const applyTheme = (t: Theme) => {
    document.body.classList.remove('dark', 'light')
    document.body.classList.add(t)
    setTheme(t)
  }

  const toggleTheme = async () => {
    setLoading(true)
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    applyTheme(newTheme)

    try {
      await http.patch('/api/user/theme', { theme: newTheme })
    } finally {
      setLoading(false)
    }
  }

  return (
    <ThemeContext.Provider value={{ theme: theme, loading, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
