import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Learning Hub",
  description: "A demonstration of Next.js core features",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased text-slate-200`}>
        <nav className="sticky top-0 z-50 glass border-b border-white/10 px-6 py-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold gradient-text">
              Next Learning
            </Link>
            <div className="space-x-6 text-sm font-medium">
              <Link href="/products" className="hover:text-primary transition-colors">Produtos</Link>
              <Link href="/posts" className="hover:text-primary transition-colors">Posts</Link>
              <Link href="/gallery" className="hover:text-primary transition-colors font-bold text-accent">Galeria (Intercept)</Link>
              <Link href="/streaming" className="hover:text-primary transition-colors">Streaming</Link>
            </div>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto px-6 py-12">
          {children}
          {modal}
        </main>
      </body>
    </html>
  );
}
