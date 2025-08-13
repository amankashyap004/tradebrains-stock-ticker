import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import TickerBar from "@/components/TickerBar";
import Header from "@/components/common/Header";
import { FavoritesProvider } from "@/context/FavoritesContext";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Stock Ticker | Trade Brains",
    template: "%s | Trade Brains",
  },
  description: "Trade Brains Stock Ticker",
  // metadataBase: new URL("/"),
  openGraph: {
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Trade Brains Stock Ticker",
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
        className={`${poppins.className} antialiased bg-[#292E3F] text-white scroll-smooth`}
      >
        <Header />
        <div className="h-24"></div>
         <FavoritesProvider>{children}</FavoritesProvider>
        <div className="fixed bottom-0 left-0 right-0">
          <TickerBar />
        </div>
        <div className="h-24"></div>
      </body>
    </html>
  );
}
