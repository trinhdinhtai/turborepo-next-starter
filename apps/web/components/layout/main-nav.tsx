import { siteConfig } from "@/config/site";
import Link from "next/link";

export default function MainNav() {
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="relative flex items-center space-x-2 lg:mr-6">
        <span className="hidden font-bold md:inline-block">
          {siteConfig.name}
        </span>
      </Link>
    </div>
  );
}
