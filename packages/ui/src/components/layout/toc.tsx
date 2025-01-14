"use client"

import { useMemo, type ReactNode } from "react"
import { cn } from "@/utils/cn"
import { PopoverTriggerProps } from "@radix-ui/react-popover"
import type { TOCItemType } from "@tafiui/core/server"
import * as Primitive from "@tafiui/core/toc"
import { ChevronRight, Text } from "lucide-react"

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
  const active = Primitive.useActiveAnchor()
  const current = useMemo(() => {
    return items.find((item) => active === item.url.slice(1))?.title
  }, [items, active]) as ReactNode

  return (
    <PopoverTrigger
      {...props}
      className={cn(
        "inline-flex items-center gap-2 text-nowrap px-4 py-2 text-start",
        props.className
      )}
    >
      {current ? (
        <>
          <ChevronRight className="-mx-1.5 size-4 shrink-0 text-fd-muted-foreground" />
          <span className="truncate text-fd-muted-foreground">{current}</span>
        </>
      ) : null}
    </PopoverTrigger>
  )
}
