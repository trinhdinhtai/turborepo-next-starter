import { type ReactNode } from "react"
import { replaceOrDefault } from "@/layouts/shared"
import { PageBody, TocNav } from "@/page.client"
import { type TableOfContents } from "@tafiui/core/server"
import { AnchorProvider, type AnchorProviderProps } from "@tafiui/core/toc"

import { TOCProps } from "@/components/layout/toc"

type TableOfContentOptions = Omit<TOCProps, "items" | "children"> &
  Pick<AnchorProviderProps, "single"> & {
    enabled: boolean
    component: ReactNode

    /**
     * @defaultValue 'normal'
     */
    style?: "normal" | "clerk"
  }

export interface DocsPageProps {
  toc?: TableOfContents
  tableOfContent?: Partial<TableOfContentOptions>
  children: ReactNode
}

export function DocsPage({
  toc = [],
  tableOfContent: {
    enabled: tocEnabled,
    component: tocReplace,
    ...tocOptions
  } = {},
  ...props
}: DocsPageProps): ReactNode {
  const isTocRequired =
    toc.length > 0 ||
    tocOptions.footer !== undefined ||
    tocOptions.header !== undefined

  return (
    <AnchorProvider toc={toc}>
      <PageBody>
        {replaceOrDefault({}, <TocNav></TocNav>)}
        {props.children}
      </PageBody>
    </AnchorProvider>
  )
}
