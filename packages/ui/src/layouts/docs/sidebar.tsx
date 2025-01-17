"use client"

import { ReactNode, type HTMLAttributes } from "react"
import { cn } from "@/utils/cn"
import { SidebarList } from "@tafiui/core/sidebar"

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  /**
   * Open folders by default if their level is lower or equal to a specific level
   * (Starting from 1)
   *
   * @defaultValue 0
   */
  defaultOpenLevel?: number

  /**
   * Prefetch links
   *
   * @defaultValue true
   */
  prefetch?: boolean
}

export function Sidebar({
  defaultOpenLevel = 0,
  prefetch = true,
  inner,
  ...props
}: SidebarProps & { inner?: HTMLAttributes<HTMLDivElement> }) {
  return <>Test</>
}
