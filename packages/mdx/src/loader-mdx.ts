import { type LoaderContext } from "webpack";
import grayMatter from "gray-matter";
import { getConfigHash } from "@/config/cached";
import { parse } from "node:querystring";

export interface Options {
  /**
   * @internal
   */
  _ctx: {
    configPath: string;
  };
}

function parseQuery(query: string): {
  collection?: string;
  hash?: string;
} {
  let collection: string | undefined;
  let hash: string | undefined;
  const parsed = parse(query.slice(1));

  if (parsed.collection && typeof parsed.collection === "string")
    collection = parsed.collection;

  if (parsed.hash && typeof parsed.hash === "string") hash = parsed.hash;

  return { collection, hash };
}

export default async function loader(
  this: LoaderContext<Options>,
  source: string,
  callback: LoaderContext<Options>["callback"]
): Promise<void> {
  this.cacheable(true);
  const context = this.context;
  const filePath = this.resourcePath;
  const { _ctx } = this.getOptions();
  const matter = grayMatter(source);

  // notice that `resourceQuery` can be missing (e.g. `page.mdx`)
  const {
    hash: configHash = await getConfigHash(_ctx.configPath),
    collection: collectionId,
  } = parseQuery(this.resourceQuery);
}
