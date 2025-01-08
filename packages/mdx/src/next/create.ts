import { findConfigFile } from "@/config/load";
import type { NextConfig } from "next";
import { type Options as MDXLoaderOptions } from "@/loader-mdx";

export interface CreateMDXOptions {
  /**
   * Path to source configuration file
   */
  configPath?: string;
}

export function createMDX({
  configPath = findConfigFile(),
}: CreateMDXOptions = {}) {
  // Next.js performs multiple iteration on the `next.config.js` file
  // the first time contains the original arguments of `next dev`
  // we only execute on the first iteration
  const isDev = process.argv.includes("dev");
  const isBuild = process.argv.includes("build");

  return (nextConfig: NextConfig = {}): NextConfig => {
    const mdxLoaderOptions: MDXLoaderOptions = {
      _ctx: {
        configPath,
      },
    };
    return {
      ...nextConfig,
      webpack(config, options) {
        config.resolve ||= {};
        config.module ||= {};
        config.module.rules ||= [];

        config.module.rules.push({
          test: /\.mdx?$/,
          use: [
            options.defaultLoaders.babel,
            {
              loader: "@tafiui/mdx/loader-mdx",
              options: mdxLoaderOptions,
            },
          ],
        });

        config.plugins ||= [];

        return nextConfig.webpack?.(config, options) ?? config;
      },
    };
  };
}
