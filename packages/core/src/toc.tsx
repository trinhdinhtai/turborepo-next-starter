"use client"

import { type ReactNode } from "react"
import type { TableOfContents } from "@/server"

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
