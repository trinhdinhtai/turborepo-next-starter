import { PropsWithChildren } from "react"
import { DocsLayout } from "tafiui/layouts/docs"

export default function Layout({ children }: PropsWithChildren) {
  return <DocsLayout>{children}</DocsLayout>
}
