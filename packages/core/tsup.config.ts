import { defineConfig } from "tsup";

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
  entry: ["src/{toc,link}.tsx"],
});
