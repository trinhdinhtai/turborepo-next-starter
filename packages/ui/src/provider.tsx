"use client"

import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react"
import { SidebarProvider } from "@/contexts/sidebar"
import { ThemeProvider } from "next-themes"

export interface RootProviderProps {
  /**
   * Customize options of `next-themes`
   */
  theme?: Partial<ComponentPropsWithoutRef<typeof ThemeProvider>> & {
    /**
     * Enable `next-themes`
     *
     * @defaultValue true
     */
    enabled?: boolean
  }

  children: ReactNode
}

export function RootProvider({
  theme: { enabled = true, ...theme } = {},
  children,
}: RootProviderProps): ReactElement {
  let body = children

  if (enabled)
    body = (
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        {...theme}
      >
        {body}
      </ThemeProvider>
    )

  return <SidebarProvider>{body}</SidebarProvider>
}
