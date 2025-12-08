import type { Metadata } from "next";
import { Exo_2, Gajraj_One } from "next/font/google";
import "./globals.css";

export const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});


export const gajrajOne = Gajraj_One({
  variable: "--font-gajrajone",
  subsets: ["latin"],
  weight: ["400"],
});


export const metadata: Metadata = {
  metadataBase: new URL('https://kray-web.com'),
  title: "Kray - Web & App Development",
  description: "Kray Web Solutions: Precision coding for peak performance. We craft mobile-first, SEO-optimized websites that ensure your business stays visible and ranks",
  openGraph: {
    title: "Kray - Web & App Development",
    description: "Kray Web Solutions: Precision coding for peak performance. We craft mobile-first, SEO-optimized websites that ensure your business stays visible and ranks",
    type: "website",
    url: "https://kray-web.com",
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
      <body
        className={`${exo2.className} antialiased bg-(--color-white-grey)`}
      >
        {children}
      </body>
    </html>
  );
}
