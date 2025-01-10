import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRightIcon, ExternalLinkIcon } from "lucide-react"

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

  const { title, description } = doc.data

  return (
    <main
      className={cn(
        "relative py-6 lg:gap-10 lg:py-8 xl:grid",
        doc.data.toc && "xl:grid-cols-[1fr_300px]"
      )}
    >
      <div className="mx-auto w-full min-w-0">
        <div className="text-muted-foreground mb-4 flex items-center space-x-1 text-sm">
          <div className="truncate">Docs</div>
          <ChevronRightIcon className="size-4" />
          <div className="text-foreground font-medium">{title}</div>
        </div>
        <div className="space-y-2">
          <h1 className={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>
            {title}
          </h1>
          {description && (
            <p className="text-muted-foreground text-balance text-lg">
              {description}
            </p>
          )}
        </div>

        {/* {doc.links ? (
          <div className="flex items-center space-x-2 pt-4">
            {doc.links?.doc && (
              <Link
                href={doc.links.doc}
                target="_blank"
                rel="noreferrer"
                className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
              >
                Docs
                <ExternalLinkIcon className="size-3" />
              </Link>
            )}
            {doc.links?.api && (
              <Link
                href={doc.links.api}
                target="_blank"
                rel="noreferrer"
                className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
              >
                API Reference
                <ExternalLinkIcon className="size-3" />
              </Link>
            )}
          </div>
        ) : null} */}
        {/* <div className="pb-12 pt-8">
          <Mdx code={doc.body.code} />
        </div> */}
      </div>

      {/* {doc.toc && (
        <div className="hidden text-sm xl:block">
          <div className="sticky top-16 -mt-10 pt-4">
            <ScrollArea className="pb-10">
              <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] space-y-4 py-12">
                <TableOfContents toc={toc} />
              </div>
            </ScrollArea>
          </div>
        </div>
      )} */}
    </main>
  )
}
