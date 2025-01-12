import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRightIcon, ExternalLinkIcon } from "lucide-react"
import { DocsPage } from "tafiui/page"

import { source } from "@/lib/source"
import { getTableOfContents } from "@/lib/toc"
import { cn } from "@/lib/utils"
import { badgeVariants } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mdx } from "@/components/mdx-components"
import TableOfContents from "@/components/toc"

interface DocPageProps {
  params: Promise<{
    slug: string[]
  }>
}

export default async function DocPage({ params }: DocPageProps) {
  const pageParams = await params
  const doc = source.getPage(pageParams.slug)

  if (!doc) notFound()

  const { title, description, body, toc } = doc.data

  return (
    <DocsPage toc={toc}>
      <div className="pb-12 pt-8">
        <Mdx code={body} />
      </div>
    </DocsPage>
  )
}
