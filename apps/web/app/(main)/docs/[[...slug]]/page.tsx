import { Mdx } from "@/components/mdx-components";
import { badgeVariants } from "@/components/ui/badge";
import { getTableOfContents } from "@/lib/toc";
import { cn } from "@/lib/utils";
import { allDocs } from "content-collections";
import { ChevronRightIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface DocPageProps {
  params: {
    slug: string[];
  };
}

async function getDocFromParams({ params }: DocPageProps) {
  const slug = params.slug?.join("/") || "";

  const doc = allDocs.find((doc) => {
    return doc.slug === slug;
  });

  if (!doc) {
    return null;
  }

  return doc;
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams({ params });

  if (!doc || !doc.published) {
    notFound();
  }

  const toc = await getTableOfContents(doc.body.raw);

  return (
    <main
      className={cn(
        "relative py-6 lg:gap-10 lg:py-8 xl:grid",
        doc.toc && "xl:grid-cols-[1fr_300px]"
      )}
    >
      <div className="mx-auto w-full min-w-0">
        <div className="text-muted-foreground mb-4 flex items-center space-x-1 text-sm">
          <div className="truncate">Docs</div>
          <ChevronRightIcon className="size-4" />
          <div className="text-foreground font-medium">{doc.title}</div>
        </div>
        <div className="space-y-2">
          <h1 className={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>
            {doc.title}
          </h1>
          {doc.description && (
            <p className="text-muted-foreground text-balance text-lg">
              {doc.description}
            </p>
          )}
        </div>

        {doc.links ? (
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
        ) : null}
        <div className="pb-12 pt-8">
          <Mdx code={doc.body.code} />
        </div>
      </div>
    </main>
  );
}
