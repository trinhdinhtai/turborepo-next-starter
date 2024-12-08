"use client";

import useClipboard from "@/hooks/use-clipboard";
import { Event } from "@/lib/events";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/registry/miami/ui/button";
import { CheckIcon, ClipboardIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface CopyButtonProps extends ButtonProps {
  value: string;
  event?: Event["name"];
}

export default function CopyButton({
  value,
  className,
  variant = "ghost",
  event,
  ...props
}: CopyButtonProps) {
  const { copyToClipboardWithMeta } = useClipboard();
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <Button
      size="icon"
      variant={variant}
      className={cn(
        "relative z-10 size-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:size-3",
        className
      )}
      onClick={() => {
        copyToClipboardWithMeta(
          value,
          event
            ? {
                name: event,
                properties: {
                  code: value,
                },
              }
            : undefined
        );
        setHasCopied(true);
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
    </Button>
  );
}
