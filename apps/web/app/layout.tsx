import type { Metadata } from "next";
import "./globals.css";
import { cn, constructMetadata } from "@/lib/utils";
import { ViewTransitions } from "next-view-transitions";
import { geistMono, geistSans } from "@/lib/fonts";

export const metadata: Metadata = constructMetadata({
  title: "Tafi UI",
  description: "Beautiful UI components for React",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body
          className={cn(
            "bg-background relative flex min-h-screen w-full flex-col justify-center overflow-x-hidden scroll-smooth font-sans antialiased",
            `${geistSans.variable} ${geistMono.variable}`
          )}
        >
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
