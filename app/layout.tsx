import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "INFONET | Solutions IT et Technologies Numériques - Burundi",
  description:
    "INFONET - Entreprise leader en solutions informatiques et technologies numériques au Burundi. Services IT, développement web, connectivité internet et solutions technologiques innovantes.",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} font-sans antialiased bg-white`}>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
