import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import BuyingBuddyScript from "@/components/property/BuyingBuddyScript";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "1352 Lofts - Real Estate",
  description: "Find your dream home with 1352 Lofts Real Estate",
  openGraph: {
    title: "1352 Lofts - Luxury Real Estate",
    description: "Find your dream home with 1352 Lofts Real Estate",
    url: 'https://1352south.vercel.app',
    siteName: '1352 Lofts',
    locale: 'en_US',
    type: 'website',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <BuyingBuddyScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          
          </div>
        </ErrorBoundary>
      </body>
    </html>
  );
}
