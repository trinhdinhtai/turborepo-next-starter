// @ts-nocheck

"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { useConfig } from "@/hooks/use-config";
import { useMDXComponent } from "@content-collections/mdx/react";

const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "font-heading mt-2 scroll-m-20 text-4xl font-bold",
        className
      )}
      {...props}
    />
  ),
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const [config] = useConfig();
  const Component = useMDXComponent(code, {
    style: config.style,
  });

  return (
    <article className={cn("mx-auto max-w-[120ch]")}>
      <Component components={components} />
    </article>
  );
}
