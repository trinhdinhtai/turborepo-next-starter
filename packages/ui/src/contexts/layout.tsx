"use client"

import { createContext, useContext } from "react"

export interface PageStyles {
  tocNav?: string
  toc?: string
  page?: string
  article?: string
}

/**
 * applied styles to different layout components in `Page` from layouts
 */
const StylesContext = createContext<PageStyles>({
  tocNav: "xl:hidden",
  toc: "max-xl:hidden",
})

export function usePageStyles() {
  return useContext(StylesContext)
}
