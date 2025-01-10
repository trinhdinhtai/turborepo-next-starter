"use client"

import { createContext, useMemo, type ReactNode } from "react"
import type { TableOfContents } from "@/server"
import { useAnchorObserver } from "@/utils/use-anchor-observer"

const ActiveAnchorContext = createContext<string[]>([])

export interface AnchorProviderProps {
  toc: TableOfContents
  /**
   * Only accept one active item at most
   *
   * @defaultValue true
   */
  single?: boolean
  children?: ReactNode
}

export function AnchorProvider({
  toc,
  single = true,
  children,
}: AnchorProviderProps): React.ReactElement {
  const headings = useMemo(() => {
    return toc.map((item) => item.url.split("#")[1]!)
  }, [toc])

  return (
    <ActiveAnchorContext.Provider value={useAnchorObserver(headings, single)}>
      {children}
    </ActiveAnchorContext.Provider>
  )
}
