import { Sidebar } from "@/layouts/docs/sidebar"
import { BaseLayoutProps } from "@/layouts/shared"
import { cn } from "@/utils/cn"

export interface DocsLayoutProps extends BaseLayoutProps {}

export function DocsLayout({ children }: DocsLayoutProps) {
  const Aside = Sidebar
  return (
    <main
      id="nd-docs-layout"
      className={cn("flex flex-1 flex-row pe-[var(--fd-layout-offset)]")}
    >
      <Aside className="flex-none w-[var(--fd-sidebar-width)]">
        <div>Test</div>
      </Aside>
      {children}
    </main>
  )
}
