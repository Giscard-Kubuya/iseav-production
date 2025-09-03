import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import DynamicFavicon from "@/components/layout/DynamicFavicon";
import DynamicSEO from "@/components/layout/DynamicSEO";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title:
    "ISEAV-WALUNGU | Institut Supérieur d'Études Agronomiques et Vétérinaires de Walungu",
  description:
    "ISEAV-WALUNGU - Institut supérieur d'études agronomiques et vétérinaires situé à Walungu, Sud-Kivu, RDC. Formation en agronomie, agrovétérinaire, agroforesterie et gestion des ressources naturelles.",
  icons: {
    icon: [], // Prevent Next.js from auto-generating favicon
    shortcut: [], // Prevent shortcut icon
    apple: [], // Prevent apple-touch-icon
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} font-sans antialiased bg-white`}>
        <DynamicFavicon />
        <DynamicSEO />
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
