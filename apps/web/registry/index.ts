import { ui } from "@/registry/registry-ui";
import type { Registry } from "./schema";
import { examples } from "@/registry/registry-examples";

export const registry: Registry = [...ui, ...examples];
