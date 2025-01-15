import { BaseLayoutProps } from "@/layouts/shared"
import { cn } from "@/utils/cn"

export interface DocsLayoutProps extends BaseLayoutProps {}

export function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <main
      id="nd-docs-layout"
      className={cn("flex flex-1 flex-row pe-[var(--fd-layout-offset)]")}
    >
      {children}
    </main>
  )
}
