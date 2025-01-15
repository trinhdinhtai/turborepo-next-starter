import { defineConfig } from "tsup"

export default defineConfig({
  external: [
    "@algolia/client-search",
    "algoliasearch",
    "unified",
    "next",
    "react",
    "react-dom",
  ],
  dts: true,
  target: "es2022",
  format: "esm",
  entry: ["src/{toc,sidebar}.tsx", "src/{server,source,mdx-plugins}/index.ts"],
})
