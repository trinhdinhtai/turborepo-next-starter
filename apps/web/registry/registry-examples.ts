import { Registry } from "@/registry/schema";

export const examples: Registry = [
  {
    name: "select-demo",
    type: "registry:example",
    registryDependencies: ["select"],
    files: [
      {
        path: "example/select-demo.tsx",
        type: "registry:example",
      },
    ],
  },
];
