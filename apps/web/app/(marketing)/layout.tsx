import { PropsWithChildren } from "react";

export default async function MarketingLayout({ children }: PropsWithChildren) {
  return (
    <>
      <SiteBanner />
      <main className="flex-1">{children}</main>
    </>
  );
}
