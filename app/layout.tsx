import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "./fonts";
import UnsupportedScreen from "@/components/common/UnsupportedScreen";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kray-web.com"),
  title: "Kray - Web & App Development",
  description:
    "Kray Web Solutions: Precision coding for peak performance. We craft mobile-first, SEO-optimized websites that ensure your business stays visible and ranks",
  openGraph: {
    title: "Kray - Web & App Development",
    description:
      "Kray Web Solutions: Precision coding for peak performance. We craft mobile-first, SEO-optimized websites that ensure your business stays visible and ranks",
    type: "website",
    url: "https://www.kray-web.com",
    siteName: "Kray - Web & App Development",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Kray - Web & App Development",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <div className="hidden min-[1440px]:block w-full h-full min-h-screen">
          {children}
        </div>
        <div className="block min-[1440px]:hidden w-full h-full min-h-screen">
          <UnsupportedScreen />
        </div>
      </body>
    </html>
  );
}
