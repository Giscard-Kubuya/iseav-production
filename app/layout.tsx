import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PublicHeader from "@/components/layout/PublicHeader";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title:
    "INFONET | Solutions IT et Technologies Numériques - Burundi",
  description:
    "INFONET - Entreprise leader en solutions informatiques et technologies numériques au Burundi. Services IT, développement web, connectivité internet et solutions technologiques innovantes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} font-sans antialiased bg-white`}>
        <div className="min-h-screen flex flex-col">
          <PublicHeader />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
