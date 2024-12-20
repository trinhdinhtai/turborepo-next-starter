import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import { PropsWithChildren } from "react";

import "@/styles/mdx.css";

export default async function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
