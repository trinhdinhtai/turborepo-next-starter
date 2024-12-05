import MainNav from "@/components/layout/main-nav";
import { cn } from "@/lib/utils";

export default function SiteHeader() {
  return (
    <header
      className={cn(
        "supports-[backdrop-filter]:bg-background/90 bg-background/40 sticky top-0 z-40 w-full backdrop-blur-lg"
      )}
    >
      <div className="container flex h-16 items-center">
        <MainNav />
      </div>
    </header>
  );
}
