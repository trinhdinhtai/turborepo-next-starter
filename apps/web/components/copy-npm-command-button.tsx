import { NpmCommands } from "@/types/unist";
import type { DropdownMenuTriggerProps } from "@radix-ui/react-dropdown-menu";

interface CopyNpmCommandButtonProps extends DropdownMenuTriggerProps {
  commands: Required<NpmCommands>;
}

export default function CopyNpmCommandButton({
  commands,
  className,
  ...props
}: CopyNpmCommandButtonProps) {
  return <>Copy Npm Command Button</>;
}
