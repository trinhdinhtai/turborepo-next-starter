"use client"

import { type HTMLAttributes } from "react"
import { usePageStyles } from "@/contexts/layout"
import { cn } from "@/utils/cn"

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
