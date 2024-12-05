import { Metadata } from "next";

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

interface ConstructMetadataProps extends Metadata {
  title?: string;
  description?: string;
  image?: string;
}

export function constructMetadata({
  title = "TafiUI - Modern UI Kit for React",
  description = "TafiUI is a modern UI kit for React that helps you build beautiful websites and applications.",
  image = absoluteUrl("/api/og"),
  ...props
}: ConstructMetadataProps): Metadata {
  return {
    title,
    description,
    keywords: [
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Landing Page",
      "Components",
      "Next.js",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "trinhdinhtai",
    },
    icons: "/favicon.ico",
    metadataBase: new URL("https://nyxbui.design"),
    authors: [
      {
        name: "tafiui",
        url: "https://tafiui.dev",
      },
    ],
    creator: "trinhdinhtai",
    ...props,
  };
}
