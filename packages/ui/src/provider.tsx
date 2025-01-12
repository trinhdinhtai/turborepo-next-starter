"use client"

import type { ReactElement, ReactNode } from "react"

export interface RootProviderProps {
  children: ReactNode
}

export function RootProvider({ children }: RootProviderProps): ReactElement {
  let body = children

  return <>{body}</>
}
