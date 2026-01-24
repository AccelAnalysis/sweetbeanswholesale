import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/cart-provider";
import { CartDrawer } from "@/components/cart-drawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sweet Beans Coffee & Roastery | Hampton, VA",
  description: "Local small-batch coffee roaster in Hampton, VA. Serving the Peninsula with fresh roasted coffee, wholesale partnerships, and community vibes.",
  openGraph: {
    title: "Sweet Beans Coffee & Roastery | Hampton, VA",
    description: "Local small-batch coffee roaster in Hampton, VA. Serving the Peninsula with fresh roasted coffee, wholesale partnerships, and community vibes.",
    images: [
      {
        url: "/sweetbeanswholesale/Sweet_Beans_Logo_Jan2026.png",
        width: 1200,
        height: 630,
        alt: "Sweet Beans Coffee & Roastery Logo",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
