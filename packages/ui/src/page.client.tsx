"use client"

import { type HTMLAttributes } from "react"
import { usePageStyles } from "@/contexts/layout"
import { cn } from "@/utils/cn"

import { useNav } from "@/components/layout/nav"

export function TocNav(props: HTMLAttributes<HTMLDivElement>) {
  const { tocNav } = usePageStyles()
  const { isTransparent } = useNav()

  return (
    <header
      id="nd-tocnav"
      {...props}
      className={cn(
        "sticky top-fd-layout-top z-10 flex flex-row items-center border-b border-fd-foreground/10 text-sm backdrop-blur-md transition-colors",
        !isTransparent && "bg-fd-background/80",
        tocNav,
        props.className
      )}
    >
      {props.children}
    </header>
  )
}

export function PageBody(props: HTMLAttributes<HTMLDivElement>) {
  const { page } = usePageStyles()

  return (
    <div
      id="nd-page"
      {...props}
      className={cn("flex w-full min-w-0 flex-col", page, props.className)}
    >
      {props.children}
    </div>
  )
}
