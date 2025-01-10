import { type ReactNode } from "react"
import { type TableOfContents } from "@tafiui/core/server"

export interface DocsPageProps {
  toc?: TableOfContents
}

export function DocsPage({ toc = [], ...props }: DocsPageProps): ReactNode {
  return null
}
