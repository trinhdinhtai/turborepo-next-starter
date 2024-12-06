"use client";

import ListItem from "@/components/layout/list-item";
import { Badge } from "@/components/ui/badge";
import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/registry/miami/ui/navigation-menu";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainNav() {
  const pathname = usePathname();
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="relative flex items-center space-x-2 lg:mr-6">
        <span className="hidden font-bold md:inline-block">
          {siteConfig.name}
        </span>
        <Badge variant="secondary">Beta</Badge>
      </Link>

      <nav className="hidden items-center space-x-6 text-sm font-medium xl:flex">
        {docsConfig.mainNav.map((item) =>
          item.items ? (
            <NavigationMenu key={item.title}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                  <NavigationMenuContent className="flex flex-col items-center">
                    <ul className="flex flex-col items-center gap-3 p-4">
                      {item.items.map((subItem) => (
                        <ListItem
                          key={subItem.href}
                          href={subItem.href}
                          title={subItem.title}
                        >
                          {subItem.label}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ) : (
            <Link
              key={item.href}
              href={item.href!}
              target={item.external ? "_blank" : undefined}
              className={cn(
                "hover:text-foreground/80 flex items-center justify-center transition-colors",
                pathname === item.href
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              {item.title}
              {item.external && <ExternalLinkIcon className="ml-2 size-4" />}
            </Link>
          )
        )}
      </nav>
    </div>
  );
}
