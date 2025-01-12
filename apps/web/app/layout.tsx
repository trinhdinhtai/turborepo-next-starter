import type { Metadata } from "next"

import "./globals.css"

import { ViewTransitions } from "next-view-transitions"
import { RootProvider } from "tafiui/provider"

import { geistMono, geistSans } from "@/lib/fonts"
import { cn, constructMetadata } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = constructMetadata({
  title: "Tafi UI",
  description: "Beautiful UI components for React",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <RootProvider>
          <body
            className={cn(
              "bg-background relative flex min-h-screen w-full flex-col justify-center overflow-x-hidden scroll-smooth font-sans antialiased",
              `${geistSans.variable} ${geistMono.variable}`
            )}
          >
            <ThemeProvider attribute="class" defaultTheme="dark">
              <TooltipProvider>
                {children}
                <Toaster />
              </TooltipProvider>
            </ThemeProvider>
          </body>
        </RootProvider>
      </html>
    </ViewTransitions>
  )
}
