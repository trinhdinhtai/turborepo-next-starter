"use client";

import { Button } from "@/components/ui/button";
import useClipboard from "@/hooks/use-clipboard";
import { NpmCommands } from "@/types/unist";
import type { DropdownMenuTriggerProps } from "@radix-ui/react-dropdown-menu";
import { useCallback, useEffect, useState } from "react";

interface CopyNpmCommandButtonProps extends DropdownMenuTriggerProps {
  commands: Required<NpmCommands>;
}

export default function CopyNpmCommandButton({
  commands,
  className,
  ...props
}: CopyNpmCommandButtonProps) {
  const [hasCopied, setHasCopied] = useState(false);
  const { copyToClipboardWithMeta } = useClipboard();

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  const copyCommand = useCallback(
    (value: string, pm: "npm" | "pnpm" | "yarn" | "bun") => {
      copyToClipboardWithMeta(value, {
        name: "copy_npm_command",
        properties: {
          command: value,
          pm,
        },
      });
      setHasCopied(true);
    },
    []
  );

  return <>Copy npm command button</>;
}
