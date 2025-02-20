import type { Metadata } from "next"

import "./globals.css"

import { ReactNode } from "react"
import { ViewTransitions } from "next-view-transitions"
import { RootProvider } from "tafiui/provider"

import { geistMono, geistSans } from "@/lib/fonts"
import { cn, constructMetadata } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"

export const metadata: Metadata = constructMetadata({
  title: "Tafi UI",
  description: "Beautiful UI components for React",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body
          className={cn(
            "flex flex-col min-h-screen bg-background font-sans",
            `${geistSans.variable} ${geistMono.variable}`
          )}
        >
          <RootProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </RootProvider>
        </body>
      </html>
    </ViewTransitions>
  )
}
