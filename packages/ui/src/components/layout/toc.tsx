"use client"

import { useMemo, type ReactNode } from "react"
import { cn } from "@/utils/cn"
import { PopoverTriggerProps } from "@radix-ui/react-popover"
import type { TOCItemType } from "@tafiui/core/server"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface TOCProps {
  /**
   * Custom content in TOC container, before the main TOC
   */
  header?: ReactNode

  /**
   * Custom content in TOC container, after the main TOC
   */
  footer?: ReactNode

  children: ReactNode
}

export const TocPopover = Popover

export function TocPopoverTrigger({
  items,
  ...props
}: PopoverTriggerProps & { items: TOCItemType[] }) {
  return (
    <PopoverTrigger
      {...props}
      className={cn(
        "inline-flex items-center gap-2 text-nowrap px-4 py-2 text-start",
        props.className
      )}
    >
      Toc trigger
    </PopoverTrigger>
  )
}
