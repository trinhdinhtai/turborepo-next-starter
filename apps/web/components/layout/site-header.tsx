import { CommandMenu } from "@/components/command-menu";
import { Icons } from "@/components/icons";
import MainNav from "@/components/layout/main-nav";
import MobileNav from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import NumberTicker from "@/registry/miami/ui/number-ticker";
import { StarIcon } from "lucide-react";
import Link from "next/link";

export default async function SiteHeader() {
  let stars = 0;

  try {
    const response = await fetch(
      "https://api.github.com/repos/trinhdinhtai/turborepo-next-starter",
      {
        headers: process.env.GITHUB_OAUTH_TOKEN
          ? {
              Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
              "Content-Type": "application/json",
            }
          : {},
        next: {
          revalidate: 3600,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      stars = data.stargazers_count || stars;
    }
  } catch (error) {
    console.error("Error fetching GitHub stars:", error);
  }

  return (
    <header
      className={cn(
        "supports-[backdrop-filter]:bg-background/90 bg-background/40 sticky top-0 z-40 w-full backdrop-blur-lg"
      )}
    >
      <div className="container flex h-16 items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
          <Link
            className={cn(
              buttonVariants({
                variant: "rainbow",
              }),
              "hidden md:inline-flex"
            )}
            target="_blank"
            href={siteConfig.links.github}
          >
            <div className="flex items-center">
              <Icons.Github className="size-4" />
              <span className="ml-1 lg:hidden">Star</span>
              <span className="ml-1 hidden lg:inline">Star on GitHub</span>{" "}
            </div>
            <div className="ml-2 flex items-center gap-1 text-sm md:flex">
              <StarIcon className="size-4 text-gray-500 transition-all duration-300 group-hover:text-yellow-300" />
              <NumberTicker
                value={stars}
                className="font-display font-medium text-white dark:text-black"
              />
            </div>
          </Link>

          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>

          <nav className="flex items-center gap-1">
            <ThemeToggle />
          </nav>
        </div>
      </div>
      <hr className="m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-200/30 to-neutral-200/0" />
    </header>
  );
}
