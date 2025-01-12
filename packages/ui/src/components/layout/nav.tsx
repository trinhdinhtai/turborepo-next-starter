"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

interface NavContextType {
  isTransparent: boolean
}

const NavContext = createContext<NavContextType>({
  isTransparent: false,
})

export interface NavProviderProps {
  /**
   * Use transparent background
   *
   * @defaultValue none
   */
  transparentMode?: "always" | "top" | "none"
}

export function NavProvider({
  transparentMode = "none",
  children,
}: NavProviderProps & { children: ReactNode }) {
  const [transparent, setTransparent] = useState(transparentMode !== "none")

  useEffect(() => {
    if (transparentMode !== "top") return

    const listener = () => {
      setTransparent(window.scrollY < 10)
    }

    listener()
    window.addEventListener("scroll", listener)
    return () => {
      window.removeEventListener("scroll", listener)
    }
  }, [transparentMode])

  return (
    <NavContext.Provider value={{ isTransparent: transparent }}>
      {children}
    </NavContext.Provider>
  )
}

export function useNav(): NavContextType {
  return useContext(NavContext)
}
